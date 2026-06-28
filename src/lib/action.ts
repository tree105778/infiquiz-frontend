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
  count = 10,
}: {
  topicSlug: string;
  mode?: 'fixed' | 'practice';
  count?: number;
}): Promise<CreateSessionResponse> {
  const res = await backendFetch(apiRoutes.createSession(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // 백엔드 Zod 스키마는 snake_case(topic_slug)를 기대한다. 또한 fixed면
    // count 필수(1~50), practice면 count를 생략해야 한다(있으면 400 VALIDATION_ERROR).
    body: JSON.stringify(
      mode === 'fixed'
        ? { topic_slug: topicSlug, mode, count }
        : { topic_slug: topicSlug, mode },
    ),
  });

  if (res.status === 401) redirect('/login?return_to=/quiz');
  if (res.status === 404) redirect('/home');
  if (!res.ok) throw new Error('세션을 시작하지 못했어요');

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
