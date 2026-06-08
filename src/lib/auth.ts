export type AuthProvider = 'kakao' | 'google' | 'naver';

/** Same-origin URL the browser navigates to for login (proxied to backend). */
export function loginUrl(provider: AuthProvider, returnTo?: string): string {
  const p = new URLSearchParams({ provider });
  if (returnTo) p.set('return_to', returnTo);
  return `/api/v1/auth/login?${p.toString()}`;
}

/** Logs out via the backend; cookie is cleared server-side. */
export async function logout(): Promise<void> {
  await fetch('/api/v1/auth/logout', {
    method: 'POST',
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
  });
}
