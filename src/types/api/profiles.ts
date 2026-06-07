/**
 * Self-info ("me") types — `/api/v1/me/*` (all auth-gated).
 *
 * Source of truth: server `src/features/profiles/openapi.ts`,
 * `src/features/profiles/schemas.ts`, `src/features/profiles/routes.ts`.
 *
 * Endpoints:
 *   GET /api/v1/me               → MeProfile
 *   GET /api/v1/me/stats         → MeStats
 *   GET /api/v1/me/stats/topics  → MeTopicStatsResponse
 *   GET /api/v1/me/attempts      → MeAttemptsResponse (cursor-paginated)
 *   GET /api/v1/me/sessions      → MeSessionsResponse (cursor-paginated)
 *   GET /api/v1/me/sessions/active → MeActiveSessionsResponse
 */

import type {
  CursorPage,
  CursorPaginationQuery,
  ISODateString,
  UUID,
} from './common';
import type { QuizMode, SessionStatus } from './sessions';

/** `GET /api/v1/me` → 200. Auto-created on first hit after OAuth signup. */
export interface MeProfile {
  userId: UUID;
  displayName: string;
  avatarUrl: string | null;
  bio: string | null;
  createdAt: ISODateString;
}

/** `GET /api/v1/me/stats` → 200. Aggregate counters for the caller. */
export interface MeStats {
  totalAttempts: number;
  totalCorrect: number;
  /** Ratio in `[0, 1]`. */
  accuracy: number;
  /**
   * Distinct active days, computed over the most recent 5000 attempts —
   * heavy users may see a silent undercount until this moves to an RPC.
   */
  activeDays: number;
  sessionsCompleted: number;
}

/** Per-topic rating + attempt breakdown for the caller. */
export interface TopicStat {
  topicSlug: string;
  topicNameKo: string;
  rating: number;
  /** Rating confidence in `[0, 1]`. */
  confidence: number;
  attemptCount: number;
  correctCount: number;
  /** Ratio in `[0, 1]`. */
  accuracy: number;
}

/** `GET /api/v1/me/stats/topics` → 200. */
export interface MeTopicStatsResponse {
  topics: TopicStat[];
}

/** A single past attempt in the caller's history. */
export interface AttemptListItem {
  id: UUID;
  sessionId: UUID;
  quizItemId: UUID;
  topicSlug: string;
  isCorrect: boolean;
  timeMs: number | null;
  ratingBefore: number;
  ratingAfter: number;
  createdAt: ISODateString;
}

/** A single session in the caller's history / active list. */
export interface SessionListItem {
  id: UUID;
  topicSlug: string;
  mode: QuizMode;
  totalCount: number | null;
  status: SessionStatus;
  startedAt: ISODateString;
  completedAt: ISODateString | null;
}

/** `GET /api/v1/me/attempts` query params (reverse-chronological page). */
export type MeAttemptsQuery = CursorPaginationQuery;

/** `GET /api/v1/me/attempts` → 200. */
export type MeAttemptsResponse = CursorPage<AttemptListItem>;

/** `GET /api/v1/me/sessions` query params; optional status filter. */
export interface MeSessionsQuery extends CursorPaginationQuery {
  /** Invalid values are silently ignored (no 400). */
  status?: SessionStatus;
}

/** `GET /api/v1/me/sessions` → 200. */
export type MeSessionsResponse = CursorPage<SessionListItem>;

/** `GET /api/v1/me/sessions/active` → 200. Small, unpaginated list. */
export interface MeActiveSessionsResponse {
  sessions: SessionListItem[];
}
