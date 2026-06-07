/**
 * Auth types — `/api/v1/auth/*`.
 *
 * Source of truth: server `src/features/auth/openapi.ts` +
 * `src/features/auth/routes.ts`.
 *
 * Kakao + Google OAuth are handled entirely client-side via the Supabase JS
 * SDK (`supabase.auth.signInWithOAuth({ provider: 'kakao' })`) — the backend
 * exposes NO endpoints for them. Only the custom Naver bridge is server-side.
 *
 * Endpoints (both are browser-navigation redirects, not fetch/JSON calls):
 *   GET /api/v1/auth/naver          → 302 to Naver authorize URL
 *   GET /api/v1/auth/naver/callback → 302 to a Supabase magic-link URL
 *
 * The frontend initiates `/auth/naver` by setting `window.location`; the
 * callback is triggered by Naver itself, never called from frontend code.
 */

/**
 * Query params on the SUCCESS branch of the Naver callback. The handler
 * (`naver.ts`) rejects the callback with 400 `INVALID_CALLBACK` unless BOTH
 * `code` and `state` are present — so both are required here. Note this is
 * stricter than the OpenAPI doc schema, which marks `state` optional.
 */
export interface NaverCallbackSuccessQuery {
  code: string;
  state: string;
}

/**
 * Query params on the ERROR branch — Naver appends these when the user denies
 * access or auth fails, and the server 302-redirects to
 * `${FRONTEND_ORIGIN}/login?error=...`.
 */
export interface NaverCallbackErrorQuery {
  error: string;
  error_description?: string;
}

/** Full query shape Naver may send to `GET /api/v1/auth/naver/callback`. */
export type NaverCallbackQuery =
  | NaverCallbackSuccessQuery
  | NaverCallbackErrorQuery;

/**
 * Legacy/unused JSON body. The callback 302-redirects instead of returning
 * this; kept only to document the alternative non-redirect mode.
 */
export interface NaverMagicLinkResponse {
  magicLink: string;
}
