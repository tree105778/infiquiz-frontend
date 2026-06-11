import 'server-only';
import { headers } from 'next/headers';

const BACKEND = process.env.API_URL ?? '';

export async function backendFetch(path: string, init?: RequestInit) {
  const cookie = (await headers()).get('cookie') ?? '';
  return fetch(`${BACKEND}${path}`, {
    ...init,
    headers: {
      cookie,
      ...(init?.headers ?? {}),
    },
    cache: 'no-store',
  });
}
