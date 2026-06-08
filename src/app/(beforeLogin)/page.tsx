import { buttonClass } from '@/design-system';
import { loginUrl } from '@/lib/auth';

export default function LoginPage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 12,
        padding: '32px 16px',
      }}
    >
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
        Infiquiz에 오신 것을 환영합니다
      </h1>
      <p style={{ color: '#6b7280', marginBottom: 24 }}>
        소셜 계정으로 간편하게 시작하세요
      </p>

      <a
        href={loginUrl('kakao')}
        className={buttonClass({ variant: 'primary', size: 'lg', block: true })}
        style={{
          maxWidth: 320,
          background: '#FEE500',
          color: '#191919',
          borderColor: 'transparent',
        }}
      >
        카카오로 시작하기
      </a>

      <a
        href={loginUrl('google')}
        className={buttonClass({ variant: 'ghost', size: 'lg', block: true })}
        style={{ maxWidth: 320 }}
      >
        구글로 시작하기
      </a>

      <a
        href={loginUrl('naver')}
        className={buttonClass({ variant: 'primary', size: 'lg', block: true })}
        style={{
          maxWidth: 320,
          background: '#03C75A',
          color: '#fff',
          borderColor: 'transparent',
        }}
      >
        네이버로 시작하기
      </a>
    </div>
  );
}
