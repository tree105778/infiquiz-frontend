import { headers } from 'next/headers';

export interface Me {
  userId: string;
  displayName: string;
  avatarUrl: string | null;
  bio: string | null;
  createdAt: string;
}

const BACKEND = process.env.BACKEND_INTERNAL_URL ?? '';

/**
 * Server-component identity check. RSC fetches do NOT pass through next.config
 * rewrites, so we call the backend directly and forward the incoming cookies.
 * Returns null when unauthenticated.
 */
export async function fetchMe(): Promise<Me | null> {
  const cookie = (await headers()).get('cookie') ?? '';
  const res = await fetch(`${BACKEND}/api/v1/me`, {
    headers: { cookie },
    cache: 'no-store',
  });
  if (!res.ok) return null;
  return (await res.json()) as Me;
}
