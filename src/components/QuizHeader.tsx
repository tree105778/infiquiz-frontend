'use client';

import { cx, tabularNums } from '@/design-system';
import * as styles from './QuizHeader.css';

export type QuizMode = 'fixed' | 'practice';

type QuizHeaderProps = {
  /** Topic under quiz — its emoji + Korean name fill the centered label. */
  topic: { emoji: string; nameKo: string };
  /**
   * 'fixed' = 도전 모드: a fixed-length session that shows a progress bar.
   * 'practice' = 연습 모드: an endless session with no bar.
   */
  mode: QuizMode;
  /** Zero-based index of the current question (the quiz FSM's `qIdx`). */
  questionIndex: number;
  /** Number of questions in a fixed session. Required when `mode === 'fixed'`. */
  total?: number;
  /**
   * True once the current question has been graded (the feedback phase). It
   * bumps the fixed-mode counter and the progress bar to include the question
   * the user just answered.
   */
  answered?: boolean;
  /** Seconds elapsed since the session started; rendered as mm:ss. */
  elapsedSeconds: number;
  /** Fired when the user clicks 나가기 — the page opens its exit confirmation. */
  onExit: () => void;
};

export function QuizHeader({
  topic,
  mode,
  questionIndex,
  total = 0,
  answered = false,
  elapsedSeconds,
  onExit,
}: QuizHeaderProps) {
  const modeLabel = mode === 'fixed' ? '도전 모드' : '연습 모드';
  const answeredOffset = answered ? 1 : 0;

  const countText =
    mode === 'fixed'
      ? `${Math.min(total, questionIndex + answeredOffset)}/${total}`
      : `${questionIndex + 1}문제 풀이 중`;

  const progress =
    mode === 'fixed' && total > 0
      ? ((questionIndex + answeredOffset) / total) * 100
      : 0;

  const mm = String(Math.floor(elapsedSeconds / 60)).padStart(2, '0');
  const ss = String(elapsedSeconds % 60).padStart(2, '0');

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <button type="button" className={styles.exitButton} onClick={onExit}>
          <span aria-hidden>✕</span> 나가기
        </button>

        <div className={styles.title}>
          {topic.emoji} {topic.nameKo} · {modeLabel}
        </div>

        <div className={cx(styles.count, tabularNums)}>{countText}</div>

        <div className={cx(styles.timer, tabularNums)}>
          <span aria-hidden>⏱</span> {mm}:{ss}
        </div>
      </div>

      {mode === 'fixed' && (
        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </header>
  );
}
