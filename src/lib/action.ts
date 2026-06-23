'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { backendFetch } from '@/lib/backend';

export async function logout() {
  try {
    await backendFetch('/api/v1/auth/logout', {
      method: 'POST',
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
    });
  } catch {}

  const cookieStore = await cookies();
  for (const c of cookieStore.getAll()) {
    if (c.name.startsWith('sb-') && c.name.includes('-auth-token'))
      cookieStore.delete(c.name);
  }

  redirect('/');
}
