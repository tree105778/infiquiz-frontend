export type AuthProvider = 'kakao' | 'google' | 'naver';

export function loginUrl(provider: AuthProvider, returnTo?: string) {
  const p = new URLSearchParams({ provider });
  if (returnTo) p.set('return_to', returnTo);
  return `/api/v1/auth/login?${p.toString()}`;
}
