/**
 * Operator dashboard types — `GET /api/v1/admin/metrics` (admin-gated).
 *
 * Source of truth: server `src/features/admin/openapi.ts` +
 * `src/features/admin/routes.ts`. Requires the caller to be in the admin
 * allowlist; non-admins get 403 `FORBIDDEN`.
 */

/**
 * Per-topic pool counts. Tolerant of partial failure: a row may carry
 * `error: 'POOL_QUERY_FAILED'` with `null` counts instead of real numbers.
 */
export interface AdminPoolStat {
  topic: string;
  itemCount: number | null;
  lowDifficultyCount: number | null;
  /** Present only when this row's count query failed. */
  error?: string;
}

/** `GET /api/v1/admin/metrics` → 200. */
export interface AdminMetricsResponse {
  /** Report date, `YYYY-MM-DD`. */
  date: string;
  llmCostUsdToday: number;
  llmCallsToday: number;
  generatedItemsToday: number;
  budgetCapUsd: number;
  budgetRemainingUsd: number;
  budgetExceeded: boolean;
  poolStats: AdminPoolStat[];
}
