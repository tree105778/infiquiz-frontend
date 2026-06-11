import { redirect } from 'next/navigation';
import { cache } from 'react';
import { backendFetch } from '@/lib/backend';

export type Me = {
  userId: string;
  displayName: string;
  avatarUrl: string | null;
  bio: string | null;
  createdAt: string;
};

export const getCurrentUser = cache(async (): Promise<Me | null> => {
  const res = await backendFetch('/api/v1/me');
  if (!res.ok) return null;
  return res.json();
});

export async function requireUser() {
  const me = await getCurrentUser();
  if (!me) redirect('/login');
  return me;
}
