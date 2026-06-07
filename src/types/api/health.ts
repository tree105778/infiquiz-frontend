/**
 * Health probe type — `GET /health`.
 *
 * Source of truth: server `src/features/health/openapi.ts`. NOTE: this route
 * is public and lives at the root, NOT under `/api/v1`. Used by the Fly.io
 * health check.
 */

export interface HealthResponse {
  status: 'ok';
  uptime_s: number;
}
