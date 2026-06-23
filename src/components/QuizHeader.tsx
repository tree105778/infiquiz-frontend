'use client';

import { cx, tabularNums } from '@/design-system';
import * as styles from './QuizHeader.css';

type QuizHeaderProps = {
  /** Topic under quiz — its emoji + Korean name fill the centered label. */
  topic: { emoji: string; nameKo: string };
  /** Zero-based index of the current question (the quiz FSM's `qIdx`). */
  questionIndex: number;
  /**
   * Number of questions in a fixed session. When provided, the header shows a
   * `n/total` counter and a progress bar; when omitted, it falls back to the
   * endless "N문제 풀이 중" label with no bar.
   */
  total?: number;
  /**
   * True once the current question has been graded (the feedback phase). It
   * bumps the counter and the progress bar to include the question the user
   * just answered.
   */
  answered?: boolean;
  /**
   * Seconds elapsed since the session started; rendered as mm:ss. When omitted,
   * the timer is hidden entirely.
   */
  elapsedSeconds?: number;
  /** Fired when the user clicks 나가기 — the page opens its exit confirmation. */
  onExit: () => void;
};

export function QuizHeader({
  topic,
  questionIndex,
  total,
  answered = false,
  elapsedSeconds,
  onExit,
}: QuizHeaderProps) {
  const hasTotal = total != null && total > 0;
  const answeredOffset = answered ? 1 : 0;

  const countText = hasTotal
    ? `${Math.min(total, questionIndex + answeredOffset)}/${total}`
    : `${questionIndex + 1}문제 풀이 중`;

  const progress = hasTotal
    ? ((questionIndex + answeredOffset) / total) * 100
    : 0;

  const timer =
    elapsedSeconds != null
      ? `${String(Math.floor(elapsedSeconds / 60)).padStart(2, '0')}:${String(
          elapsedSeconds % 60,
        ).padStart(2, '0')}`
      : null;

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <button type="button" className={styles.exitButton} onClick={onExit}>
          <span aria-hidden>✕</span> 나가기
        </button>

        <div className={styles.title}>
          {topic.emoji} {topic.nameKo}
        </div>

        <div className={cx(styles.count, tabularNums)}>{countText}</div>

        {timer != null && (
          <div className={cx(styles.timer, tabularNums)}>
            <span aria-hidden>⏱</span> {timer}
          </div>
        )}
      </div>

      {hasTotal && (
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
