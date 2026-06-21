import { Button, Card, Text } from '@/design-system';
import { getTopics } from '@/lib/api';

export default async function TopicList() {
  const topics = await getTopics();

  return (
    <div>
      {topics.map((t) => (
        <Card key={t.slug} className="p-6 mb-2">
          <Text as="h2" variant="displayLg">
            {t.nameKo}
          </Text>
          <Text tone="inkMute">{t.nameEn}</Text>
          <Text variant="bodyLg">{t.description}</Text>
          <Button size="lg" className="mt-2">
            도전
          </Button>
        </Card>
      ))}
    </div>
  );
}
