/**
 * Shared API primitives for the infiquiz backend.
 *
 * Hand-authored to mirror the server's OpenAPI contract. Sources of truth:
 *   - `src/lib/openapi-registry.ts`   (error envelope, security scheme)
 *   - `src/middleware/errorHandler.ts` (error shape on the wire)
 *   - `src/lib/cursor.ts` / `src/lib/pagination.ts` (cursor pagination)
 *
 * Every route is prefixed with `/api/v1` except `/health` (see `health.ts`).
 * Authenticated routes expect `Authorization: Bearer <supabase-jwt>`.
 */

/** RFC-4122 UUID string. */
export type UUID = string;

/** ISO-8601 datetime string, e.g. `2026-05-23T12:34:56.789Z`. */
export type ISODateString = string;

/** Topic identifier slug, e.g. `javascript`. */
export type TopicSlug = string;

/**
 * Stable, machine-readable error codes returned in the error envelope.
 *
 * `code` is the contract; `message` is human-readable and may change, so
 * branch on `code`. The `(string & {})` arm keeps the union open to codes
 * the server may add later while preserving autocomplete for the known set.
 */
export type ApiErrorCode =
  // auth / authorization
  | 'UNAUTHENTICATED'
  | 'INVALID_TOKEN'
  | 'FORBIDDEN'
  // request validation
  | 'VALIDATION_ERROR'
  | 'INVALID_SESSION_ID'
  | 'INVALID_CURSOR'
  | 'MISSING_TOPIC'
  // missing resources
  | 'TOPIC_NOT_FOUND'
  | 'SESSION_NOT_FOUND'
  | 'QUIZ_ITEM_NOT_FOUND'
  | 'NO_RATING'
  // session state conflicts
  | 'SESSION_ALREADY_COMPLETED'
  | 'SESSION_COMPLETE'
  | 'DUPLICATE_ATTEMPT'
  // capacity guards
  | 'RATE_LIMITED'
  | 'BUDGET_EXCEEDED'
  // naver oauth bridge
  | 'NAVER_NOT_CONFIGURED'
  | 'INVALID_CALLBACK'
  // server
  | 'INTERNAL_ERROR'
  // open arm: keeps autocomplete for the known set above while tolerating
  // codes not surfaced in a top-level envelope (e.g. the admin per-row
  // `POOL_QUERY_FAILED`) or any code added server-side later.
  | (string & {});

/**
 * Simplified RFC-7807 error body. Every non-2xx JSON response is wrapped in
 * an {@link ApiErrorEnvelope} whose `error` field has this shape.
 */
export interface ApiError {
  code: ApiErrorCode;
  message: string;
  /** Optional per-code extra context (e.g. Zod `flatten()` for validation). */
  details?: Record<string, unknown>;
}

/** Top-level envelope returned by every endpoint on error. */
export interface ApiErrorEnvelope {
  error: ApiError;
}

/** Shared query params for every cursor-paginated list endpoint. */
export interface CursorPaginationQuery {
  /**
   * base64url-encoded cursor copied from the previous page's `nextCursor`.
   * Malformed cursors return 400 `INVALID_CURSOR`.
   */
  cursor?: string;
  /**
   * Page size hint. Default 20. Values above 100 are capped to 100;
   * non-positive, NaN, or non-numeric values fall back to the default 20.
   * The server never rejects a bad `limit` with 400 (`lib/pagination.ts`).
   */
  limit?: number;
}

/** Envelope returned by cursor-paginated list endpoints. */
export interface CursorPage<T> {
  items: T[];
  /** `null` when there are no more _pages. */
  nextCursor: string | null;
}
