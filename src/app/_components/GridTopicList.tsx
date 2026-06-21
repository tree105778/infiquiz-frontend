import { Card, Text } from '@/design-system';
import { getTopics } from '@/lib/api';

export default async function GridTopicList() {
  const topics = await getTopics();

  return (
    <div className="m-auto max-w-[50vw] p-6">
      <div className="grid grid-cols-4 gap-4">
        {topics.map((t) => (
          <Card
            key={t.slug}
            interactive
            className="h-35 flex flex-col justify-end py-6 px-2"
          >
            <Text as="h2" variant="displayLg">
              {t.nameKo}
            </Text>
            <Text tone="inkMute">{t.nameEn}</Text>
          </Card>
        ))}
      </div>
    </div>
  );
}
