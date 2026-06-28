import { redirect } from 'next/navigation';
import QuizPage from '@/_pages/QuizPage';
import { createQuizSession, getCurrentQuizSession } from '@/lib/action';
import { backendFetch } from '@/lib/backend';
import { apiRoutes, type SessionDetailResponse } from '@/types/api';

/**
 * /quiz?topic=<slug>&mode=fixed|practice&count=<n>
 *
 * 세션 "준비" 책임만 서버에서 처리한다(쿠키 인증은 backendFetch가 포워딩):
 *   1) 같은 주제·모드로 진행 중(in_progress)인 세션이 있으면 이어한다 (중복 생성 방지)
 *   2) 없으면 새로 만든다
 *   3) detail을 읽어 복원 상태로 클라이언트 런타임(QuizPage)에 넘긴다
 * 세션 id가 URL에 노출되지 않고, 새로고침해도 active 조회로 같은 세션에 수렴한다.
 */
export default async function Quiz({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string; mode?: string; count?: string }>;
}) {
  const { topic, mode: modeParam, count } = await searchParams;
  if (!topic) redirect('/home');

  const mode = modeParam === 'practice' ? 'practice' : 'fixed';

  const { sessions } = await getCurrentQuizSession();
  const existing = sessions.find(
    (s) => s.topicSlug === topic && s.mode === mode,
  );

  let sessionId: string;
  if (existing) {
    sessionId = existing.id;
  } else {
    const created = await createQuizSession({
      topicSlug: topic,
      mode,
      count: count ? Number(count) : 10,
    });
    sessionId = created.sessionId;
  }

  const detailRes = await backendFetch(apiRoutes.sessionDetail(sessionId));
  if (!detailRes.ok) throw new Error('세션을 불러오지 못했어요');
  const session: SessionDetailResponse = await detailRes.json();
  // 완료/포기된 세션은 풀이를 다시 시작하지 않는다. (결과 화면 /done은 후속 작업)
  if (session.status !== 'in_progress') redirect('/home');

  return <QuizPage session={session} />;
}
