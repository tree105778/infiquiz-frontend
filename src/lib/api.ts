import type { TopicListResponse } from '@/types/api';

export async function getTopics() {
  const res = await fetch(`${process.env.API_URL}/api/v1/topics`);
  if (!res.ok) throw new Error('Failed to fetch topics');
  const data: TopicListResponse = await res.json();
  return data.topics;
}
