import { redirect } from 'next/navigation';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { backendFetch } from '@/lib/backend';
import { getCurrentUser } from '@/lib/dal';
import { apiRoutes, type SessionDetailResponse } from '@/types/api';
import QuizResult from './QuizResult';

/**
 * /quiz/sessions/:id/done — 세션 결과 화면.
 *
 * 진실의 원천은 GET /quiz/sessions/:id (소유권 검증됨 → 남의 세션이면 404).
 * 새로고침해도 같은 결과를 다시 읽을 뿐(생성 없음)이라 안전하다.
 * 디자인: claude.ai/design infiquiz `src/done.jsx`.
 */
export default async function QuizDonePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const res = await backendFetch(apiRoutes.sessionDetail(id));
  if (res.status === 404) redirect('/home'); // 없거나 내 세션이 아님
  if (!res.ok) throw new Error('결과를 불러오지 못했어요');
  const session: SessionDetailResponse = await res.json();

  // 아직 진행 중인 세션이면 결과가 아니라 풀이로 돌려보낸다.
  if (session.status === 'in_progress') {
    redirect(
      `/quiz?topic=${encodeURIComponent(session.topic.slug)}&mode=${session.mode}`,
    );
  }

  return (
    <>
      <Header profile={user} />
      <QuizResult session={session} />
      <Footer />
    </>
  );
}
