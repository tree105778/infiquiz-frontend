import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import GridTopicList from '@/app/_components/GridTopicList';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Button, Spinner, Text } from '@/design-system';
import { getCurrentUser } from '@/lib/dal';

export default async function Home() {
  const user = await getCurrentUser();
  if (user) redirect('/home');
  return (
    <>
      <div className="bg-[url(/gradient-mesh.svg)] bg-no-repeat">
        <Header transparent />
        <Text as="h1" align="center" variant="displayLg" tone="ink">
          지금 풀 수 있는 문제
        </Text>
        <Suspense fallback={<Spinner className="m-auto" size="lg" />}>
          <GridTopicList />
        </Suspense>
      </div>
      <div className="flex flex-col items-center gap-4">
        <Text as="h1" variant="displayLg" tone="ink">
          한 판 해볼래요?
        </Text>
        <Text tone="inkMute">5초만에 가입하고 첫 주제를 골라보세요.</Text>
        <Button size="xl">
          시작하기 <span aria-hidden>▶</span>
        </Button>
      </div>
      <Footer />
    </>
  );
}
