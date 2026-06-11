import LoginPage from '@/_pages/login';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ return_to?: string }>;
}) {
  return <LoginPage searchParams={searchParams} />;
}
