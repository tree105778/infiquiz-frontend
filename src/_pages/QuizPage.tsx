'use client';

import { useRouter } from 'next/navigation';
import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Button,
  Modal,
  ModalDescription,
  ModalFooter,
  ModalTitle,
  Spinner,
  Text,
  TextInput,
  tabularNums,
} from '@/design-system';
import { useQuizHook } from '@/hooks/useQuizHook';
import type {
  QuizChoice,
  SafeQuizItem,
  SessionDetailResponse,
  SubmitAnswerResponse,
  SubmitAnswerValue,
} from '@/types/api';

type AnswerValue = SubmitAnswerValue | null;
type SetAnswer = Dispatch<SetStateAction<AnswerValue>>;

/**
 * /quiz 런타임 화면. 서버(page.tsx)가 복원한 세션을 받아 useQuizHook으로
 * SSE 문제 로딩 → 답변(서버 액션 채점) → 피드백 → 다음을 구동한다.
 * 진행도/번호/ELO는 모두 백엔드 응답에서 동기화된다(클라가 따로 세지 않음).
 * 디자인: claude.ai/design infiquiz `src/quiz.jsx`. 토큰 CSS 변수가 레포
 * design-system contract와 동일해 인라인 var(--…)를 그대로 사용한다.
 */
export default function QuizPage({
  session,
}: {
  session: SessionDetailResponse;
}) {
  const router = useRouter();
  const {
    topic,
    phase,
    item,
    progress,
    questionNumber,
    feedback,
    error,
    submit,
    next,
  } = useQuizHook(session);

  const mode = session.mode;
  const total = session.totalCount;

  const [answer, setAnswer] = useState<AnswerValue>(null);
  const [exitOpen, setExitOpen] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  // 새 문제가 도착하면 입력값 초기화. itemId는 본문에서 쓰지 않지만 "새 문제일 때
  // 리셋"의 트리거이므로 의도적으로 의존성에 둔다(제거하면 첫 문제 외엔 리셋 안 됨).
  const itemId = item?.quizItemId;
  // biome-ignore lint/correctness/useExhaustiveDependencies: itemId는 리셋 트리거(본문 미사용 의도)
  useEffect(() => {
    setAnswer(null);
  }, [itemId]);

  // 경과 시간 타이머
  useEffect(() => {
    const id = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const finish = useCallback(
    () => router.push(`/quiz/sessions/${session.sessionId}/done`),
    [router, session.sessionId],
  ); // 완주 → 결과 화면

  const onSubmit = useCallback(() => {
    if (item && hasAnswer(item, answer)) submit(answer as SubmitAnswerValue);
  }, [item, answer, submit]);

  // 키보드 단축키 (디자인 명세). 입력 포커스 중에는 숫자/OX 핫키를 막는다.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (exitOpen) return;
      const typing = document.activeElement?.tagName === 'INPUT';
      if (phase === 'answering' && item) {
        if (
          item.questionType === 'multiple_choice' &&
          !typing &&
          ['1', '2', '3', '4', '5'].includes(e.key)
        ) {
          const c = item.multipleChoice.choices[Number(e.key) - 1];
          if (c) setAnswer(c.id);
        }
        if (item.questionType === 'true_false' && !typing) {
          if (['o', 'O', 't', 'T'].includes(e.key)) setAnswer(true);
          if (['x', 'X', 'f', 'F'].includes(e.key)) setAnswer(false);
        }
        if (e.key === 'Enter' && !typing) onSubmit();
      }
      if (
        (phase === 'graded' || phase === 'completed') &&
        (e.key === ' ' || e.key === 'Enter')
      ) {
        e.preventDefault();
        if (phase === 'completed') finish();
        else next();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const mm = String(Math.floor(elapsed / 60)).padStart(2, '0');
  const ss = String(elapsed % 60).padStart(2, '0');
  const progressPct = total ? (progress.answered / total) * 100 : 0;
  const confirming = phase === 'submitting';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-canvas)' }}>
      {/* 미니멀 헤더 */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          height: 56,
          background: 'var(--color-canvas)',
          borderBottom: '1px solid var(--color-hairline)',
        }}
      >
        <div
          style={{
            maxWidth: 1080,
            margin: '0 auto',
            height: '100%',
            padding: '0 32px',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExitOpen(true)}
            style={{ border: 0, color: 'var(--color-ink-mute)' }}
          >
            ✕ 나가기
          </Button>
          <Text
            as="div"
            variant="bodyLg"
            tone="ink"
            style={{ flex: 1, textAlign: 'center' }}
          >
            {topic.nameKo} · {mode === 'fixed' ? '도전 모드' : '연습 모드'}
          </Text>
          <span
            className={tabularNums}
            style={{ color: 'var(--color-ink)', fontSize: 14 }}
          >
            {total
              ? `${Math.min(questionNumber, total)}/${total}`
              : `${questionNumber}문제`}
          </span>
          <span
            className={tabularNums}
            style={{ color: 'var(--color-ink-mute)', fontSize: 14 }}
          >
            ⏱ {mm}:{ss}
          </span>
        </div>
        {mode === 'fixed' && (
          <div style={{ height: 4, background: 'var(--color-hairline)' }}>
            <div
              style={{
                height: '100%',
                width: `${progressPct}%`,
                background: 'var(--color-primary)',
                transition: 'width 300ms var(--ease-out)',
              }}
            />
          </div>
        )}
      </header>

      <main
        style={{ maxWidth: 800, margin: '0 auto', padding: '64px 24px 96px' }}
      >
        {phase === 'loading' && <LoadingState />}
        {phase === 'generating' && <AgentGenerating />}
        {item && (phase === 'answering' || phase === 'submitting') && (
          <Question
            item={item}
            questionNumber={questionNumber}
            answer={answer}
            setAnswer={setAnswer}
            confirming={confirming}
            onSubmit={onSubmit}
          />
        )}
        {(phase === 'graded' || phase === 'completed') && feedback && (
          <Feedback
            feedback={feedback}
            isLast={phase === 'completed'}
            onNext={phase === 'completed' ? finish : next}
          />
        )}
        {phase === 'error' && (
          <ErrorState
            message={error}
            onRetry={next}
            onExit={() => setExitOpen(true)}
          />
        )}
      </main>

      {/* 나가기 모달 */}
      <Modal open={exitOpen} onClose={() => setExitOpen(false)}>
        <ModalTitle variant="displayMd">세션을 나가시겠어요?</ModalTitle>
        <ModalDescription>
          지금까지 푼 <span className={tabularNums}>{progress.answered}</span>
          문제는 저장돼요. 나중에 이어서 풀 수 있어요.
        </ModalDescription>
        <ModalFooter>
          <Button
            variant="secondary"
            size="md"
            onClick={() => setExitOpen(false)}
          >
            계속 풀기
          </Button>
          <Button
            variant="ghost"
            size="md"
            onClick={() => router.push('/home')}
          >
            나가기
          </Button>
        </ModalFooter>
      </Modal>

      <QuizStyles />
    </div>
  );
}

// ── 상태별 뷰 ────────────────────────────────────────────────────────────

function LoadingState() {
  return (
    <div style={{ textAlign: 'center', padding: '80px 0' }}>
      <Spinner size="lg" style={{ color: 'var(--color-primary)' }} />
      <Text
        variant="bodyMd"
        tone="inkMute"
        align="center"
        style={{ marginTop: 24 }}
      >
        세션 준비 중...
      </Text>
    </div>
  );
}

/** pool miss 시 "생성 중" 진행 표시. 실제 SSE agent 이벤트는 단계 인덱스를
 *  주지 않으므로, 시각적 단계는 타이머로 진행시킨다(문제 도착 시 hook이 phase를
 *  'answering'으로 바꾸며 언마운트된다). */
function AgentGenerating() {
  const labels = ['최신 자료 검색', '새 문제 초안 작성', '문제 검증', '마무리'];
  const [step, setStep] = useState(1);
  useEffect(() => {
    const ts = [
      setTimeout(() => setStep(2), 1600),
      setTimeout(() => setStep(3), 3600),
      setTimeout(() => setStep(4), 5200),
    ];
    return () => ts.forEach(clearTimeout);
  }, []);
  return (
    <div className="iq-fade-in" style={{ textAlign: 'center' }}>
      <Text variant="displayMd" tone="ink" align="center">
        ✨ AI가 문제를 만들고 있어요
      </Text>
      <Text
        variant="bodyMd"
        tone="inkMute"
        align="center"
        style={{ marginTop: 12, maxWidth: 460, marginInline: 'auto' }}
      >
        처음 시도하는 난이도에 맞는 문제를 준비하고 있어요. 잠시만요 (보통
        5~15초).
      </Text>
      <div
        style={{
          maxWidth: 320,
          margin: '40px auto 0',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          textAlign: 'left',
        }}
      >
        {labels.map((label, i) => {
          const idx = i + 1;
          const isDone = idx < step;
          const isActive = idx === step;
          return (
            <div
              key={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                color: isDone
                  ? 'var(--color-ink)'
                  : isActive
                    ? 'var(--color-primary)'
                    : 'var(--color-hairline-input)',
                fontSize: 15,
              }}
            >
              <span
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 9999,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isDone ? 'var(--color-primary)' : 'transparent',
                  color: isDone ? '#fff' : 'inherit',
                  border: isActive
                    ? '2px solid currentColor'
                    : isDone
                      ? '0'
                      : '1.5px solid currentColor',
                  fontSize: 13,
                  animation: isActive
                    ? 'iqPulse 1.2s var(--ease-out) infinite'
                    : 'none',
                }}
              >
                {isDone ? '✓' : isActive ? '●' : ''}
              </span>
              <span>
                {label}
                {isActive ? '...' : ''}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Question({
  item,
  questionNumber,
  answer,
  setAnswer,
  confirming,
  onSubmit,
}: {
  item: SafeQuizItem;
  questionNumber: number;
  answer: AnswerValue;
  setAnswer: SetAnswer;
  confirming: boolean;
  onSubmit: () => void;
}) {
  return (
    <div className="iq-fade-in" key={item.quizItemId}>
      <Text variant="microCap" tone="inkMute">
        Q{questionNumber}
      </Text>
      <Text
        as="h2"
        variant="displayMd"
        tone="ink"
        style={{ margin: '12px 0 32px', lineHeight: 1.4 }}
      >
        {item.stem}
      </Text>

      {item.questionType === 'multiple_choice' && (
        <ChoiceList
          choices={item.multipleChoice.choices}
          answer={answer}
          setAnswer={setAnswer}
          disabled={confirming}
        />
      )}
      {item.questionType === 'true_false' && (
        <TFChoices
          answer={answer}
          setAnswer={setAnswer}
          disabled={confirming}
        />
      )}
      {item.questionType === 'short_answer' && (
        <ShortAnswer
          placeholder={item.shortAnswer.placeholder}
          answer={answer}
          setAnswer={setAnswer}
          disabled={confirming}
          onEnter={onSubmit}
        />
      )}
      {item.questionType === 'fill_blank' && (
        <FillBlank
          textWithBlank={item.fillBlank.textWithBlank}
          answer={answer}
          setAnswer={setAnswer}
          disabled={confirming}
          onEnter={onSubmit}
        />
      )}

      <div style={{ marginTop: 32, textAlign: 'center' }}>
        <Button
          variant="primary"
          size="xl"
          onClick={onSubmit}
          disabled={!hasAnswer(item, answer) || confirming}
          style={{ minWidth: 240 }}
        >
          {confirming ? (
            <>
              <Spinner /> 채점 중...
            </>
          ) : (
            '확인'
          )}
        </Button>
      </div>
    </div>
  );
}

function ChoiceList({
  choices,
  answer,
  setAnswer,
  disabled,
}: {
  choices: QuizChoice[];
  answer: AnswerValue;
  setAnswer: SetAnswer;
  disabled: boolean;
}) {
  const nums = ['①', '②', '③', '④', '⑤'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {choices.map((c, i) => {
        const selected = answer === c.id;
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => !disabled && setAnswer(c.id)}
            disabled={disabled && !selected}
            className="iq-choice"
            style={{
              textAlign: 'left',
              background: selected
                ? 'var(--color-primary-subdued)'
                : 'var(--color-canvas)',
              border: selected
                ? '2px solid var(--color-primary)'
                : '1px solid var(--color-hairline)',
              borderRadius: 'var(--radius-lg)',
              padding: selected ? '15px 20px' : '16px 21px',
              minHeight: 56,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              fontFamily: 'inherit',
              fontSize: 16,
              color: 'var(--color-ink)',
              cursor: disabled ? 'not-allowed' : 'pointer',
              opacity: disabled && !selected ? 0.45 : 1,
              transition:
                'background 160ms var(--ease-out), border-color 160ms var(--ease-out), box-shadow 160ms var(--ease-out)',
            }}
          >
            <span
              style={{
                color: selected
                  ? 'var(--color-primary-press)'
                  : 'var(--color-ink-mute)',
                fontSize: 22,
                fontWeight: 300,
                lineHeight: 1,
                fontFamily: 'var(--font-display)',
              }}
            >
              {nums[i]}
            </span>
            <span style={{ flex: 1 }}>{c.text}</span>
            <span
              className={tabularNums}
              style={{
                color: 'var(--color-ink-mute)',
                opacity: selected ? 1 : 0.4,
                fontSize: 12,
              }}
            >
              {i + 1}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function TFChoices({
  answer,
  setAnswer,
  disabled,
}: {
  answer: AnswerValue;
  setAnswer: SetAnswer;
  disabled: boolean;
}) {
  const opts = [
    { val: true, label: '참', symbol: 'O', color: 'var(--color-primary)' },
    { val: false, label: '거짓', symbol: 'X', color: 'var(--color-ruby)' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      {opts.map((opt) => {
        const selected = answer === opt.val;
        return (
          <button
            key={opt.label}
            type="button"
            onClick={() => !disabled && setAnswer(opt.val)}
            disabled={disabled && !selected}
            style={{
              height: 200,
              background: selected
                ? 'var(--color-primary-subdued)'
                : 'var(--color-canvas)',
              border: selected
                ? `2px solid ${opt.color}`
                : '2px solid var(--color-hairline)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              fontFamily: 'inherit',
              cursor: disabled ? 'not-allowed' : 'pointer',
              opacity: disabled && !selected ? 0.45 : 1,
              transition: 'all 160ms var(--ease-out)',
            }}
          >
            <span
              style={{
                fontSize: 56,
                fontWeight: 300,
                color: opt.color,
                fontFamily: 'var(--font-display)',
                lineHeight: 1,
              }}
            >
              {opt.symbol}
            </span>
            <Text variant="bodyLg" tone="ink">
              {opt.label}
            </Text>
          </button>
        );
      })}
    </div>
  );
}

function ShortAnswer({
  placeholder,
  answer,
  setAnswer,
  disabled,
  onEnter,
}: {
  placeholder?: string;
  answer: AnswerValue;
  setAnswer: SetAnswer;
  disabled: boolean;
  onEnter: () => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return (
    <div>
      <TextInput
        ref={ref}
        type="text"
        placeholder={placeholder || '정답을 입력하세요'}
        value={typeof answer === 'string' ? answer : ''}
        disabled={disabled}
        onChange={(e) => setAnswer(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
            e.preventDefault();
            onEnter();
          }
        }}
        style={{
          height: 56,
          fontSize: 18,
          padding: '16px 20px',
          width: '100%',
        }}
      />
      <Text variant="caption" tone="inkMute" style={{ marginTop: 8 }}>
        힌트: 한 단어 또는 짧은 구문
      </Text>
    </div>
  );
}

function FillBlank({
  textWithBlank,
  answer,
  setAnswer,
  disabled,
  onEnter,
}: {
  textWithBlank: string;
  answer: AnswerValue;
  setAnswer: SetAnswer;
  disabled: boolean;
  onEnter: () => void;
}) {
  const value = typeof answer === 'string' ? answer : '';
  // 백엔드 FillBlankSchema는 단일 빈칸(blankAnswer 단수) + 정답은 free-text 문자열
  // 매칭(acceptedAnswers + blankAnswer). textWithBlank의 빈칸 표식은 프롬프트에
  // 강제돼 있지 않으므로(LLM 재량), 첫 표식만 입력칸으로 치환하고 못 찾으면 폴백한다.
  const split = splitOnBlank(textWithBlank);
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      onEnter();
    }
  };

  if (split) {
    return (
      <div
        style={{
          fontSize: 24,
          lineHeight: 1.7,
          color: 'var(--color-ink)',
          fontFamily: 'var(--font-display)',
          fontWeight: 300,
        }}
      >
        <span>{split[0]}</span>
        <input
          type="text"
          value={value}
          disabled={disabled}
          aria-label="빈칸"
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={onKeyDown}
          style={{
            display: 'inline-block',
            width: 140,
            margin: '0 6px',
            border: 'none',
            borderBottom: '2px solid var(--color-primary)',
            background: 'transparent',
            fontSize: 22,
            padding: '4px 0',
            textAlign: 'center',
            outline: 'none',
            color: 'var(--color-ink)',
            fontFamily: 'inherit',
            fontWeight: 400,
          }}
        />
        <span>{split[1]}</span>
      </div>
    );
  }

  // 표식을 못 찾으면 지문 + 단일 입력으로 폴백.
  return (
    <div>
      <Text
        variant="headingMd"
        tone="ink"
        style={{ marginBottom: 16, lineHeight: 1.6 }}
      >
        {textWithBlank}
      </Text>
      <TextInput
        type="text"
        placeholder="빈칸에 들어갈 답"
        value={value}
        disabled={disabled}
        onChange={(e) => setAnswer(e.target.value)}
        onKeyDown={onKeyDown}
        style={{
          height: 56,
          fontSize: 18,
          padding: '16px 20px',
          width: '100%',
        }}
      />
    </div>
  );
}

function Feedback({
  feedback,
  isLast,
  onNext,
}: {
  feedback: SubmitAnswerResponse;
  isLast: boolean;
  onNext: () => void;
}) {
  const {
    isCorrect,
    correctAnswer,
    explanation,
    ratingBefore,
    ratingAfter,
    ratingDelta,
  } = feedback;
  const [display, setDisplay] = useState(ratingBefore);

  useEffect(() => {
    const steps = 24;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplay(
        Math.round(ratingBefore + (ratingAfter - ratingBefore) * (i / steps)),
      );
      if (i >= steps) clearInterval(id);
    }, 25);
    return () => clearInterval(id);
  }, [ratingBefore, ratingAfter]);

  return (
    <div className="iq-fade-in">
      <div style={{ textAlign: 'center' }}>
        <div
          className="iq-scale-in"
          style={{
            width: 80,
            height: 80,
            borderRadius: 9999,
            margin: '0 auto 16px',
            background: isCorrect
              ? 'var(--color-primary)'
              : 'var(--color-ruby)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 44,
            fontWeight: 300,
            fontFamily: 'var(--font-display)',
            lineHeight: 1,
          }}
        >
          {isCorrect ? '✓' : '✕'}
        </div>
        <Text
          variant="displayLg"
          tone={isCorrect ? 'primary' : 'ruby'}
          align="center"
          style={{ marginBottom: 8 }}
        >
          {isCorrect ? '정답이에요!' : '아쉬워요'}
        </Text>
        {!isCorrect && (
          <Text variant="bodyLg" tone="inkMute" align="center">
            정답은 “
            <span style={{ color: 'var(--color-ink)' }}>{correctAnswer}</span>”
            였어요
          </Text>
        )}
      </div>

      {/* ELO 변화 */}
      <div
        style={{
          margin: '32px auto 0',
          maxWidth: 360,
          textAlign: 'center',
          padding: 20,
          background: 'var(--color-canvas-soft)',
          borderRadius: 'var(--radius-lg)',
        }}
      >
        <Text
          variant="microCap"
          tone="inkMute"
          align="center"
          style={{ marginBottom: 8 }}
        >
          ELO
        </Text>
        <div
          className={tabularNums}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            fontSize: 28,
            color: 'var(--color-ink)',
          }}
        >
          <span style={{ color: 'var(--color-ink-mute)' }}>{ratingBefore}</span>
          <span style={{ margin: '0 12px', color: 'var(--color-ink-mute)' }}>
            →
          </span>
          <span
            style={{
              color: isCorrect ? 'var(--color-primary)' : 'var(--color-ruby)',
            }}
          >
            {display}
          </span>
        </div>
        <div
          className={tabularNums}
          style={{
            color: isCorrect ? 'var(--color-primary)' : 'var(--color-ruby)',
            marginTop: 4,
            fontSize: 15,
          }}
        >
          {ratingDelta > 0 ? '+' : ''}
          {ratingDelta}
        </div>
      </div>

      {/* 설명 */}
      {explanation && (
        <div
          style={{
            padding: 24,
            marginTop: 24,
            background: 'var(--color-canvas-soft)',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          <Text variant="headingSm" tone="ink" style={{ marginBottom: 10 }}>
            💡 설명
          </Text>
          <Text
            variant="bodyMd"
            tone="inkSecondary"
            style={{ lineHeight: 1.55 }}
          >
            {explanation}
          </Text>
        </div>
      )}

      <div style={{ marginTop: 32, textAlign: 'center' }}>
        <Button
          variant="primary"
          size="xl"
          onClick={onNext}
          autoFocus
          style={{ minWidth: 280 }}
        >
          {isLast ? '결과 보기' : '다음 문제'} <span aria-hidden>▶</span>
        </Button>
        <Text
          variant="microCap"
          tone="inkMute"
          align="center"
          style={{ marginTop: 8 }}
        >
          SPACE ↵
        </Text>
      </div>
    </div>
  );
}

function ErrorState({
  message,
  onRetry,
  onExit,
}: {
  message: string | null;
  onRetry: () => void;
  onExit: () => void;
}) {
  return (
    <div style={{ textAlign: 'center', padding: '64px 0' }}>
      <Text variant="displayMd" tone="ink" align="center">
        문제가 생겼어요
      </Text>
      <Text
        variant="bodyMd"
        tone="inkMute"
        align="center"
        style={{ marginTop: 12 }}
      >
        {message ?? '잠시 후 다시 시도해 주세요.'}
      </Text>
      <div
        style={{
          marginTop: 24,
          display: 'flex',
          gap: 12,
          justifyContent: 'center',
        }}
      >
        <Button variant="primary" size="lg" onClick={onRetry}>
          다시 시도
        </Button>
        <Button variant="ghost" size="lg" onClick={onExit}>
          나가기
        </Button>
      </div>
    </div>
  );
}

function QuizStyles() {
  return (
    <style>{`
      @keyframes iqFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
      @keyframes iqScaleIn { from { opacity: 0; transform: scale(0.7); } to { opacity: 1; transform: scale(1); } }
      @keyframes iqPulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(83, 58, 253, 0.4); } 50% { box-shadow: 0 0 0 8px rgba(83, 58, 253, 0); } }
      .iq-fade-in { animation: iqFadeIn 280ms var(--ease-out); }
      .iq-scale-in { animation: iqScaleIn 360ms var(--ease-out); }
      .iq-choice:hover:not(:disabled) { background: var(--color-canvas-soft) !important; box-shadow: var(--shadow-1); }
    `}</style>
  );
}

// ── helpers ──────────────────────────────────────────────────────────────

// 빈칸 표식 후보: 밑줄(전각 포함) 2개+, [BLANK]/[ ], ( )(전각 포함), …/... 말줄임
const BLANK_RE =
  /[_＿]{2,}|\[\s*BLANK\d*\s*\]|\[\s*\]|\(\s*\)|（\s*）|\.{3,}|…+/;

/** textWithBlank를 첫 빈칸 표식 기준으로 [앞, 뒤]로 분리. 표식이 없으면 null. */
function splitOnBlank(text: string): [string, string] | null {
  const m = text.match(BLANK_RE);
  if (!m || m.index === undefined) return null;
  return [text.slice(0, m.index), text.slice(m.index + m[0].length)];
}

function hasAnswer(item: SafeQuizItem, a: AnswerValue): boolean {
  if (a === null || a === undefined) return false;
  switch (item.questionType) {
    case 'multiple_choice':
      return typeof a === 'string' && a.length > 0;
    case 'true_false':
      return typeof a === 'boolean';
    case 'short_answer':
    case 'fill_blank':
      return typeof a === 'string' && a.trim().length > 0;
    default:
      return false;
  }
}
