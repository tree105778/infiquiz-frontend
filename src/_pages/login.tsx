import Image from 'next/image';
import { ProviderButton } from '@/components/ProviderButton';
import { Text } from '@/design-system';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ return_to?: string }>;
}) {
  const { return_to } = await searchParams;
  const back = typeof return_to === 'string' ? return_to : '/';

  return (
    <div className="flex flex-col items-center gap-6">
      <Image
        src="/infiquiz-logo.png"
        alt="infiquiz logo"
        width={48}
        height={48}
      />
      <Text as="h1" variant="displayLg" tone="ink">
        시작하려면
        <br /> 로그인해주세요
      </Text>
      <ProviderButton provider="kakao" returnTo={back} />
      <ProviderButton provider="google" returnTo={back} />
      <ProviderButton provider="naver" returnTo={back} />
      <div className="w-full h-px bg-gray-400" />
      <Text tone="inkMute">
        로그인하면 <span className="text-blue-500">이용약관</span> 및{' '}
        <span className="text-blue-500">개인정보처리방침</span>에
        <br />
        동의한 것으로 간주됩니다.
      </Text>
      <Text tone="primary">← 처음으로 돌아가기</Text>
    </div>
  );
}
