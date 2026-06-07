/**
 * Leaderboard types — `/api/v1/leaderboard*` (auth-gated).
 *
 * Source of truth: server `src/features/leaderboard/openapi.ts` +
 * `src/features/leaderboard/routes.ts`.
 *
 * Endpoints:
 *   GET /api/v1/leaderboard?topic=&limit= → LeaderboardResponse
 *   GET /api/v1/leaderboard/me?topic=     → MyTopicRankResponse
 *
 * User IDs are never exposed — only display name, avatar, and rating.
 */

/** One ranked participant in a topic's top-N list. */
export interface LeaderboardTopRow {
  rank: number;
  displayName: string;
  avatarUrl: string | null;
  rating: number;
}

/** The caller's standing on a topic, embedded in {@link LeaderboardResponse}. */
export interface MyTopicRank {
  rank: number | null;
  rating: number | null;
  total: number;
  /** Percentile in `[0, 1]`, or `null` when unranked. */
  percentile: number | null;
}

/** `GET /api/v1/leaderboard` query params. `topic` is required. */
export interface LeaderboardQuery {
  topic: string;
  /** Top-N page size. Default 20, hard-capped at 100. */
  limit?: number;
}

/** `GET /api/v1/leaderboard` → 200. Top-N plus the caller's own rank. */
export interface LeaderboardResponse {
  topic: string;
  top: LeaderboardTopRow[];
  /** `null` when the caller has no rating on this topic. */
  me: MyTopicRank | null;
}

/** `GET /api/v1/leaderboard/me` query params. `topic` is required. */
export interface MyTopicRankQuery {
  topic: string;
}

/**
 * `GET /api/v1/leaderboard/me` → 200. Cheaper than the full leaderboard.
 *
 * The contract types `rank`/`rating`/`percentile` as nullable, but the route
 * returns 404 `NO_RATING` rather than a 200 when the caller is unranked — so
 * on a 200 these are effectively non-null.
 */
export interface MyTopicRankResponse {
  topic: string;
  rank: number | null;
  rating: number | null;
  total: number;
  percentile: number | null;
}
