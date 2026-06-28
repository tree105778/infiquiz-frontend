'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Button,
  buttonClass,
  Card,
  Modal,
  ModalTitle,
  Text,
  tabularNums,
  useToast,
} from '@/design-system';
import type { SessionDetailAttempt, SessionDetailResponse } from '@/types/api';

/**
 * 결과 카드(클라이언트): 점수·정답률·ELO 카운트업 + 한번더/홈/오답 리뷰/공유.
 * 모든 수치는 서버가 준 session(score·attempts)에서만 파생한다. 오답 리뷰는
 * attempts에 enrich된 stem/userAnswer/correctAnswer/explanation을 사용한다.
 */
export default function QuizResult({
  session,
}: {
  session: SessionDetailResponse;
}) {
  const router = useRouter();
  const { push } = useToast();
  const { topic, mode, score, attempts } = session;

  const correct = score.correct;
  const total = score.total;
  const accuracyPct = Math.round(score.accuracy * 100);
  const delta = score.ratingDelta;
  const ratingBefore = attempts.length ? attempts[0].ratingBefore : 0;
  const ratingAfter = attempts.length
    ? attempts[attempts.length - 1].ratingAfter
    : ratingBefore + delta;
  const wrong = attempts.filter((a) => !a.isCorrect);

  const [scoreDisplay, setScoreDisplay] = useState(0);
  const [ratingDisplay, setRatingDisplay] = useState(ratingBefore);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  // count-up: 점수 → 0.4s 뒤 ELO
  useEffect(() => {
    let i = 0;
    const id1 = setInterval(() => {
      i++;
      setScoreDisplay(Math.round((correct * i) / 14));
      if (i >= 14) clearInterval(id1);
    }, 30);

    let id2: ReturnType<typeof setInterval> | undefined;
    const t = setTimeout(() => {
      let j = 0;
      id2 = setInterval(() => {
        j++;
        setRatingDisplay(
          Math.round(ratingBefore + (ratingAfter - ratingBefore) * (j / 24)),
        );
        if (j >= 24 && id2) clearInterval(id2);
      }, 25);
    }, 400);

    return () => {
      clearInterval(id1);
      clearTimeout(t);
      if (id2) clearInterval(id2);
    };
  }, [correct, ratingBefore, ratingAfter]);

  const playAgain = () =>
    router.push(`/quiz?topic=${encodeURIComponent(topic.slug)}&mode=${mode}`);

  const sign = delta >= 0 ? '+' : '';
  const shareText =
    mode === 'fixed'
      ? `${topic.nameKo}에서 ${correct}/${total}!\nELO ${ratingBefore} → ${ratingAfter} (${sign}${delta})\ninfiquiz에서 풀어보기`
      : `${topic.nameKo} 연습 ${total}문제!\nELO ${ratingBefore} → ${ratingAfter} (${sign}${delta})\ninfiquiz에서 풀어보기`;

  const copyShare = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      push({ message: '복사됐어요! ✓', kind: 'success' });
    } catch {
      push({ message: '복사 실패. 다시 시도해 주세요.', kind: 'error' });
    }
  };

  return (
    <main
      style={{
        padding: '64px 24px 48px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div style={{ width: '100%', maxWidth: 560 }}>
        <Card
          className="iq-scale-in"
          style={{
            background: 'var(--color-canvas)',
            boxShadow: 'var(--shadow-2)',
            padding: 40,
            textAlign: 'center',
            border: '1px solid var(--color-hairline)',
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: 'var(--color-primary-subdued)',
              fontSize: 34,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 12,
            }}
          >
            🏆
          </div>
          <Text variant="headingMd" tone="inkSecondary" align="center">
            {topic.nameKo} · {mode === 'fixed' ? '도전 완료' : '연습 완료'}
          </Text>

          <div
            className={tabularNums}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 88,
              lineHeight: 1,
              margin: '20px 0 8px',
              color: 'var(--color-ink)',
            }}
          >
            {mode === 'fixed' ? (
              <>
                <span>{scoreDisplay}</span>
                <span style={{ color: 'var(--color-ink-mute)' }}>
                  {' '}
                  / {total}
                </span>
              </>
            ) : (
              <>{total} 문제</>
            )}
          </div>
          <Text variant="bodyMd" tone="inkMute" align="center" tabular>
            정답 {correct}개 · {accuracyPct}% 정답률
          </Text>

          <div
            style={{
              height: 1,
              background: 'var(--color-hairline)',
              margin: '32px 0',
            }}
          />

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
              fontSize: 24,
            }}
          >
            <span style={{ color: 'var(--color-ink-mute)' }}>
              {ratingBefore}
            </span>
            <span style={{ margin: '0 14px', color: 'var(--color-ink-mute)' }}>
              →
            </span>
            <span style={{ color: 'var(--color-primary)' }}>
              {ratingDisplay}
            </span>
          </div>
          <div
            className={tabularNums}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 26,
              color: delta >= 0 ? 'var(--color-primary)' : 'var(--color-ruby)',
              marginTop: 4,
            }}
          >
            {delta >= 0 ? '+' : ''}
            {delta}
          </div>

          <div
            style={{
              height: 1,
              background: 'var(--color-hairline)',
              margin: '32px 0 24px',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Button variant="primary" size="xl" onClick={playAgain} autoFocus>
              한번 더 <span aria-hidden>▶</span>
            </Button>
            <Link
              className={buttonClass({ variant: 'secondary', size: 'lg' })}
              href="/home"
            >
              홈으로
            </Link>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 24,
              marginTop: 20,
            }}
          >
            {wrong.length > 0 && (
              <button
                type="button"
                onClick={() => setReviewOpen((v) => !v)}
                style={linkBtn}
              >
                {reviewOpen ? '오답 숨기기 ▲' : `오답 보기 (${wrong.length}) ↓`}
              </button>
            )}
            <button
              type="button"
              onClick={() => setShareOpen(true)}
              style={linkBtn}
            >
              공유 🔗
            </button>
          </div>
        </Card>

        {reviewOpen && wrong.length > 0 && (
          <section className="iq-fade-in" style={{ marginTop: 16 }}>
            <Text variant="headingSm" tone="ink" style={{ marginBottom: 12 }}>
              틀린 문제 ({wrong.length})
            </Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {wrong.map((a) => (
                <AttemptRow key={a.quizItemId} attempt={a} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* 공유 모달 */}
      <Modal open={shareOpen} onClose={() => setShareOpen(false)} width={440}>
        <ModalTitle variant="headingMd">결과 공유</ModalTitle>
        <Card variant="soft" style={{ padding: 20, marginTop: 16 }}>
          <pre
            style={{
              margin: 0,
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              color: 'var(--color-ink)',
              whiteSpace: 'pre-wrap',
              lineHeight: 1.6,
            }}
          >
            {shareText}
          </pre>
        </Card>
        <Button
          variant="primary"
          size="lg"
          block
          onClick={copyShare}
          style={{ marginTop: 16 }}
        >
          복사하기 📋
        </Button>
        <Button
          variant="ghost"
          size="md"
          block
          onClick={() => setShareOpen(false)}
          style={{ marginTop: 12 }}
        >
          닫기
        </Button>
      </Modal>

      <style>{`
        @keyframes iqScaleIn { from { opacity: 0; transform: scale(0.94); } to { opacity: 1; transform: scale(1); } }
        @keyframes iqFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .iq-scale-in { animation: iqScaleIn 360ms var(--ease-out); }
        .iq-fade-in { animation: iqFadeIn 280ms var(--ease-out); }
      `}</style>
    </main>
  );
}

const linkBtn: React.CSSProperties = {
  background: 'transparent',
  border: 0,
  cursor: 'pointer',
  color: 'var(--color-primary)',
  fontSize: 13,
  fontFamily: 'inherit',
};

function AttemptRow({ attempt }: { attempt: SessionDetailAttempt }) {
  const [open, setOpen] = useState(false);
  return (
    <Card style={{ padding: 16, textAlign: 'left' }}>
      <Text variant="headingSm" tone="ink">
        Q{attempt.questionIndex}. {attempt.stem}
      </Text>
      <Text variant="bodyMd" tone="inkSecondary" style={{ marginTop: 6 }}>
        내 답:{' '}
        <span style={{ color: 'var(--color-ruby)' }}>
          {attempt.userAnswer || '—'}
        </span>
        {' / '}
        정답:{' '}
        <span style={{ color: 'var(--color-primary)' }}>
          {attempt.correctAnswer || '—'}
        </span>
      </Text>
      {attempt.explanation && (
        <>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            style={{ ...linkBtn, marginTop: 8, padding: 0 }}
          >
            {open ? '간단히 ▲' : '설명 보기 ▼'}
          </button>
          {open && (
            <div
              className="iq-fade-in"
              style={{
                marginTop: 10,
                padding: 14,
                background: 'var(--color-canvas-soft)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              <Text variant="bodyMd" tone="inkSecondary">
                💡 {attempt.explanation}
              </Text>
            </div>
          )}
        </>
      )}
    </Card>
  );
}
