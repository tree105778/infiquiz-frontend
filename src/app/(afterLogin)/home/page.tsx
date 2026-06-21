import { redirect } from 'next/navigation';
import TopicList from '@/app/_components/TopicList';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Text } from '@/design-system';
import { getCurrentUser } from '@/lib/dal';

export default async function Home() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  return (
    <>
      <Header profile={user} />
      <div className="m-auto max-w-[80vw] p-6">
        <div className="my-3">
          <Text as="h1" tone="ink" variant="displayLg">
            안녕하세요, {user.displayName}님 👋
          </Text>
          <Text tone="inkMute">오늘은 어떤 주제 풀어볼까요?</Text>
        </div>
        <TopicList />
        <Footer />
      </div>
    </>
  );
}
