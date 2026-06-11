import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Button, Card, Text } from '@/design-system';
import { getTopics } from '@/lib/api';

export default async function Home() {
  const topics = await getTopics();
  return (
    <>
      <div>
        <Header />
        <Text as="h1" variant="displayLg" tone="ink">
          지금 풀 수 있는 문제
        </Text>
        <div className="grid grid-cols-4 gap-4">
          {topics.map((t) => (
            <Card key={t.slug} interactive>
              <h2>{t.nameKo}</h2>
              <p>{t.nameEn}</p>
            </Card>
          ))}
        </div>
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
