/**
 * infiquiz backend API types — hand-authored mirror of the server's OpenAPI
 * contract (infiquiz-server `/api/openapi.json`). Import from `@/types/api`.
 *
 * Organized per backend feature:
 *   - common      shared primitives (errors, pagination, scalars)
 *   - topics      GET /topics
 *   - sessions    POST/GET /quiz/sessions/* (incl. SafeQuizItem + SSE events)
 *   - profiles    GET /me/*
 *   - leaderboard GET /leaderboard*
 *   - auth        GET /auth/naver*
 *   - admin       GET /admin/metrics
 *   - health      GET /health
 *   - routes      request-path builders (apiRoutes)
 */

export * from './admin';
export * from './auth';
export * from './common';
export * from './health';
export * from './leaderboard';
export * from './profiles';
export * from './routes';
export * from './sessions';
export * from './topics';
