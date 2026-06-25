import { useCallback, useEffect, useRef, useState } from 'react';
import { submitAnswer } from '@/lib/action';
import {
  apiRoutes,
  type QuizNextResultEvent,
  type QuizProgress,
  type SafeQuizItem,
  type SessionDetailResponse,
  type SubmitAnswerResponse,
  type SubmitAnswerValue,
} from '@/types/api';

type QuizPhase =
  | 'loading' // 다음 문제 요청 중 (pool hit이면 매우 짧음)
  | 'generating' // pool miss → AI 생성 중 (agent 이벤트 수신)
  | 'answering' // 문제 표시, 사용자 입력 대기
  | 'submitting' // 채점 중
  | 'graded' // 채점 결과 표시 (다음 대기)
  | 'completed' // fixed 모드 완주
  | 'error';
export function useQuizHook(session: SessionDetailResponse) {
  const [phase, setPhase] = useState<QuizPhase>('loading');
  const [item, setItem] = useState<SafeQuizItem | null>(null);
  const [progress, setProgress] = useState<QuizProgress>({
    answered: session.attempts.length, // ← 새로고침 복원: 백엔드에서 시드
    total: session.totalCount,
  });
  const [questionNumber, setQuestionNumber] = useState(
    session.attempts.length + 1,
  );
  const [feedback, setFeedback] = useState<SubmitAnswerResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const esRef = useRef<EventSource | null>(null); // 현재 SSE 연결
  const mountedRef = useRef(true); // 언마운트 후 setState 방지
  const shownAtRef = useRef(0); // 문제 표시 시각 → timeMs 계산

  // ── 다음 문제 받기 (SSE) ───────────────────────────────
  const openNext = useCallback(() => {
    esRef.current?.close(); // 이전 스트림 정리 (자동 재연결 차단)
    setFeedback(null);
    setItem(null);
    setError(null);
    setPhase('loading');

    const es = new EventSource(apiRoutes.sessionNext(session.sessionId));
    esRef.current = es;

    // pool miss일 때만: "생성 중…" 진행 표시
    es.addEventListener('agent', () => {
      if (mountedRef.current) setPhase('generating');
    });

    // 항상 한 번: 문제 도착
    es.addEventListener('result', (e: MessageEvent) => {
      es.close(); // ⚠️ 닫지 않으면 자동 재연결로 다음 문제를 또 당겨옴
      if (!mountedRef.current) return;
      const data = JSON.parse(e.data) as QuizNextResultEvent;
      setItem(data.item);
      setProgress(data.progress);
      setQuestionNumber(data.progress.answered + 1); // 지금 푸는 문제 번호
      shownAtRef.current = performance.now();
      setPhase('answering');
    });

    es.addEventListener('error', () => {
      es.close();
      if (!mountedRef.current) return;
      setError('문제를 불러오지 못했어요.');
      setPhase('error');
    });
  }, [session.sessionId]);

  // ── 정답 제출 (서버 액션) ──────────────────────────────
  const submit = useCallback(
    (answer: SubmitAnswerValue) => {
      if (!item || phase !== 'answering') return; // 중복 제출 방지
      setPhase('submitting');

      submitAnswer(session.sessionId, {
        quizItemId: item.quizItemId,
        answer,
        timeMs: Math.round(performance.now() - shownAtRef.current),
      })
        .then((res) => {
          if (!mountedRef.current) return;
          setFeedback(res);
          setProgress(res.progress); // ← 진행도도 백엔드가 준 값으로
          setPhase(res.sessionStatus === 'completed' ? 'completed' : 'graded');
        })
        .catch((err: unknown) => {
          if (!mountedRef.current) return;
          setError(err instanceof Error ? err.message : '채점에 실패했어요.');
          setPhase('error');
        });
    },
    [item, phase, session.sessionId],
  );

  // ── 다음으로 ───────────────────────────────────────────
  const next = useCallback(() => {
    if (phase === 'completed') return; // 완주했으면 더 진행 안 함 (결과 화면은 컴포넌트가)
    openNext();
  }, [phase, openNext]);

  // ── 진입 시 첫 문제 로드 + 언마운트 정리 ────────────────
  useEffect(() => {
    mountedRef.current = true;
    if (session.status !== 'in_progress') {
      setPhase('completed'); // 방어망 (page에서 이미 걸러짐)
    } else {
      openNext();
    }
    return () => {
      mountedRef.current = false;
      esRef.current?.close(); // StrictMode 이중 호출·이탈 시 스트림 닫기
    };
  }, [openNext, session.status]);

  return {
    topic: session.topic,
    phase,
    item,
    progress,
    questionNumber,
    feedback,
    error,
    submit,
    next,
  };
}
