import LoginPage from '@/_pages/login';

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ return_to?: string }>;
}) {
  return (
    <div className="m-auto max-w-[75vw]">
      <LoginPage searchParams={searchParams} />
    </div>
  );
}
