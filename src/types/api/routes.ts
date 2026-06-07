/**
 * Canonical request paths for every backend endpoint, so callers never
 * hardcode URL strings. Builders take path params and return the full path.
 *
 * Source of truth: server `src/app.ts` (route mounting) and each feature's
 * `openapi.ts`. `/health` is the only route NOT under `/api/v1`.
 */

/** Common prefix for the versioned API. */
export const API_BASE = '/api/v1' as const;

export const apiRoutes = {
  // topics
  topics: () => `${API_BASE}/topics`,

  // me (profiles)
  me: () => `${API_BASE}/me`,
  meStats: () => `${API_BASE}/me/stats`,
  meTopicStats: () => `${API_BASE}/me/stats/topics`,
  meAttempts: () => `${API_BASE}/me/attempts`,
  meSessions: () => `${API_BASE}/me/sessions`,
  meActiveSessions: () => `${API_BASE}/me/sessions/active`,

  // quiz (sessions)
  createSession: () => `${API_BASE}/quiz/sessions`,
  sessionNext: (id: string) => `${API_BASE}/quiz/sessions/${id}/next`,
  sessionAnswers: (id: string) => `${API_BASE}/quiz/sessions/${id}/answers`,
  sessionDetail: (id: string) => `${API_BASE}/quiz/sessions/${id}`,

  // leaderboard
  leaderboard: () => `${API_BASE}/leaderboard`,
  leaderboardMe: () => `${API_BASE}/leaderboard/me`,

  // admin
  adminMetrics: () => `${API_BASE}/admin/metrics`,

  // auth (browser-navigation redirects)
  authNaver: () => `${API_BASE}/auth/naver`,
  authNaverCallback: () => `${API_BASE}/auth/naver/callback`,

  // health (root, not under /api/v1)
  health: () => '/health',
} as const;

export type ApiRoutes = typeof apiRoutes;
