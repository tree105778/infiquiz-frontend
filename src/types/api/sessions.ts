/**
 * Quiz session types — `/api/v1/quiz/sessions/*`.
 *
 * Source of truth: server `src/features/sessions/openapi.ts`,
 * `src/features/sessions/schemas.ts`, `src/features/sessions/service.ts`,
 * `src/features/sessions/routes.ts`.
 *
 * Endpoints:
 *   POST /api/v1/quiz/sessions            → CreateSessionResponse (201)
 *   GET  /api/v1/quiz/sessions/:id/next   → SSE stream (text/event-stream)
 *   POST /api/v1/quiz/sessions/:id/answers→ SubmitAnswerResponse (200)
 *   GET  /api/v1/quiz/sessions/:id        → SessionDetailResponse (200)
 */

import type { ISODateString, UUID } from './common';

/** Fixed-length quiz vs open-ended practice. */
export type QuizMode = 'fixed' | 'practice';

/** Lifecycle state of a session. */
export type SessionStatus = 'in_progress' | 'completed' | 'abandoned';

/** The four supported question shapes. */
export type QuestionType =
  | 'multiple_choice'
  | 'short_answer'
  | 'true_false'
  | 'fill_blank';

// ── POST /api/v1/quiz/sessions ──────────────────────────────────────────

/**
 * Create a quiz session. `count` is REQUIRED when `mode === 'fixed'` and must
 * be OMITTED when `mode === 'practice'`. Range 1–50.
 */
export interface CreateSessionBody {
  topic_slug: string;
  mode: QuizMode;
  count?: number;
}

export interface CreateSessionResponse {
  sessionId: UUID;
  topic: {
    slug: string;
    nameKo: string;
    nameEn: string;
  };
  mode: QuizMode;
  totalCount: number | null;
  startedAt: ISODateString;
}

// ── GET /api/v1/quiz/sessions/:id/next (SSE) ────────────────────────────

/** One selectable option in a multiple-choice question. */
export interface QuizChoice {
  id: string;
  text: string;
}

interface SafeQuizItemBase {
  quizItemId: UUID;
  topic: string;
  stem: string;
}

export interface MultipleChoiceQuizItem extends SafeQuizItemBase {
  questionType: 'multiple_choice';
  multipleChoice: {
    choices: QuizChoice[];
  };
}

export interface ShortAnswerQuizItem extends SafeQuizItemBase {
  questionType: 'short_answer';
  /** Intentionally carries no accepted answers — only a UI placeholder hint. */
  shortAnswer: {
    placeholder?: string;
  };
}

export interface TrueFalseQuizItem extends SafeQuizItemBase {
  questionType: 'true_false';
  trueFalse: {
    statement: string;
  };
}

export interface FillBlankQuizItem extends SafeQuizItemBase {
  questionType: 'fill_blank';
  fillBlank: {
    textWithBlank: string;
  };
}

/**
 * Answer-stripped projection of a quiz item, streamed in the `result` SSE
 * event. The server always populates exactly the per-type field that matches
 * `questionType`, so this is modeled as a discriminated union.
 */
export type SafeQuizItem =
  | MultipleChoiceQuizItem
  | ShortAnswerQuizItem
  | TrueFalseQuizItem
  | FillBlankQuizItem;

/** Answered-vs-total counter, carried by `result` events and answer responses. */
export interface QuizProgress {
  answered: number;
  /** `null` for practice mode (open-ended). */
  total: number | null;
}

/** `result` SSE event — the next item is ready to render. */
export interface QuizNextResultEvent {
  item: SafeQuizItem;
  progress: QuizProgress;
  /** `pool` = served from the precomputed pool; `agent` = generated on miss. */
  source: 'pool' | 'agent';
}

/** `error` SSE event — terminal; the stream closes after it. */
export interface QuizNextErrorEvent {
  code: string;
  message: string;
}

/**
 * `agent` SSE event — agent-pipeline telemetry, emitted only on the pool-miss
 * fallback path. `type` is the underlying node event (e.g. `node_started`,
 * `node_completed`); the remaining fields vary by node.
 */
export interface QuizNextAgentEvent {
  type: string;
  [key: string]: unknown;
}

/**
 * Maps each SSE `event:` name on `GET /quiz/sessions/:id/next` to its `data`
 * payload. Use to type an `EventSource` listener dispatch.
 */
export interface QuizNextSseEventMap {
  agent: QuizNextAgentEvent;
  result: QuizNextResultEvent;
  error: QuizNextErrorEvent;
}

export type QuizNextSseEventName = keyof QuizNextSseEventMap;

// ── POST /api/v1/quiz/sessions/:id/answers ──────────────────────────────

/**
 * Submitted answer value. Shape depends on the question type:
 *   - multiple_choice → choice `id` (string)
 *   - short_answer / fill_blank → free text (string)
 *   - true_false → boolean, or the strings `'true'` / `'false'`
 * Arrays are accepted by the server but unused by current question types.
 */
export type SubmitAnswerValue = string | number | boolean | string[];

export interface SubmitAnswerBody {
  quizItemId: UUID;
  answer: SubmitAnswerValue;
  /** Time spent on the question, milliseconds. */
  timeMs?: number;
}

export interface SubmitAnswerResponse {
  isCorrect: boolean;
  correctAnswer: string;
  explanation: string | null;
  ratingBefore: number;
  ratingAfter: number;
  ratingDelta: number;
  itemRatingBefore: number;
  itemRatingAfter: number;
  sessionStatus: 'in_progress' | 'completed';
  progress: QuizProgress;
}

// ── GET /api/v1/quiz/sessions/:id ───────────────────────────────────────

export interface SessionDetailAttempt {
  quizItemId: UUID;
  /** 1-based position within the session. */
  questionIndex: number;
  isCorrect: boolean;
  timeMs: number | null;
  ratingBefore: number;
  ratingAfter: number;
  createdAt: ISODateString;
  /** Post-session review fields (enriched server-side from the quiz item). */
  stem: string;
  /** Display-ready user answer (multiple_choice → chosen option's text). */
  userAnswer: string;
  correctAnswer: string;
  explanation: string | null;
}

/**
 * Flat session detail (NOT nested under `session`): `sessionId`, `topic`, etc.
 * are top-level, and `ratingDelta` lives on `score`, not the envelope.
 */
export interface SessionDetailResponse {
  sessionId: UUID;
  topic: {
    slug: string;
    nameKo: string;
  };
  mode: QuizMode;
  status: SessionStatus;
  totalCount: number | null;
  startedAt: ISODateString;
  completedAt: ISODateString | null;
  attempts: SessionDetailAttempt[];
  score: {
    correct: number;
    total: number;
    /** Ratio in `[0, 1]`. */
    accuracy: number;
    ratingDelta: number;
  };
}
