import { Spinner } from '@/design-system';

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Spinner size="lg" />
    </div>
  );
}
