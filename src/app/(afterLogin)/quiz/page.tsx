import { redirect } from 'next/navigation';
import { createQuizSession, getCurrentQuizSession } from '@/lib/action';
import { backendFetch } from '@/lib/backend';
import { apiRoutes, type SessionDetailResponse } from '@/types/api';

export default async function QuizPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;
  if (!topic) redirect('/home');

  const sessions = (await getCurrentQuizSession()).sessions;
  const existing = sessions.find((s) => s.topicSlug === topic);

  let sessionId: string;
  if (existing) {
    sessionId = existing.id;
  } else {
    const { sessionId: id } = await createQuizSession({ topicSlug: topic });
    sessionId = id;
  }

  const detailRes = await backendFetch(apiRoutes.sessionDetail(sessionId));
  if (!detailRes.ok) throw new Error('세션을 불러오지 못했어요');
  const session: SessionDetailResponse = await detailRes.json();
  if (session.status !== 'in_progress') redirect('/home');

  return null;
}
