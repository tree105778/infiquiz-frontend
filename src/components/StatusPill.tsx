import { Pill } from '@/design-system';

type StatusPillProps = { status: 'completed' | 'in_progress' | 'abandoned' };

export function StatusPill({ status }: StatusPillProps) {
  if (status === 'in_progress') return <Pill tone="cream">진행 중</Pill>;
  if (status === 'abandoned') return <Pill tone="hairline">중단</Pill>;
  return null;
}
