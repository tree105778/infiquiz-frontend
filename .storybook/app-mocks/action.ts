// Mock of `@/lib/action` for the react-vite Storybook builder.
//
// `logout` is a `'use server'` action that transitively imports `@/lib/backend`
// (which reads `process.env.API_URL` and pulls in `server-only` / `next/headers`).
// In the real app the `'use server'` boundary means the client only ever gets a
// network stub for the action, so that server code is never bundled client-side.
// Storybook's Vite builder doesn't understand `'use server'`, so without this
// alias it bundles the real implementation and crashes on load with
// `process is not defined`. Aliased in `.storybook/main.ts`.

export async function logout(): Promise<void> {}
