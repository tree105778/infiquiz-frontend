'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { backendFetch } from '@/lib/backend';
import {
  apiRoutes,
  type CreateSessionResponse,
  type MeActiveSessionsResponse,
  type SubmitAnswerBody,
  type SubmitAnswerResponse,
} from '@/types/api';

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

export async function createQuizSession({
  topicSlug,
  mode = 'fixed',
  count = 20,
}: {
  topicSlug: string;
  mode?: 'fixed' | 'practice';
  count?: number;
}): Promise<CreateSessionResponse> {
  const res = await backendFetch('/api/v1/quiz/sessions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topicSlug, mode, count }),
  });

  if (res.status === 401) redirect('/login?return_to=/quiz');
  if (res.status === 404) redirect('/home');

  return res.json();
}

export async function getCurrentQuizSession(): Promise<MeActiveSessionsResponse> {
  const res = await backendFetch(apiRoutes.meActiveSessions());
  if (res.status === 401) redirect('/login?return_to=/quiz');
  return res.json();
}

export async function submitAnswer(
  sessionId: string,
  body: SubmitAnswerBody,
): Promise<SubmitAnswerResponse> {
  const res = await backendFetch(apiRoutes.sessionAnswers(sessionId), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error('요청에 실패했습니다');

  return res.json();
}
