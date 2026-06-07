/**
 * Topic catalog types — `GET /api/v1/topics` (public, no auth).
 *
 * Source of truth: server `src/features/topics/openapi.ts` +
 * `src/features/topics/routes.ts`.
 */

/** A single active topic as exposed to the public catalog. */
export interface TopicListItem {
  slug: string;
  nameKo: string;
  nameEn: string;
  description: string | null;
  iconUrl: string | null;
  color: string | null;
  difficultyMin: number;
  difficultyMax: number;
}

/** `GET /api/v1/topics` → 200. Sorted by display order then slug. */
export interface TopicListResponse {
  topics: TopicListItem[];
}
