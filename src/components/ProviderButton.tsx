import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cx } from '@/design-system';
import { providerButton } from './ProviderButton.css';

export type OAuthProvider = 'kakao' | 'google' | 'naver';

// Official guideline-approved labels (see ProviderButton.css for sources).
const LABELS: Record<OAuthProvider, string> = {
  kakao: '카카오 로그인',
  google: 'Google 계정으로 로그인',
  naver: '네이버 아이디로 로그인',
};

/**
 * Backend-mediated OAuth start URL. A same-origin path that the backend proxies
 * and 302-redirects to the provider — no supabase-js on the client.
 */
export function providerLoginUrl(
  provider: OAuthProvider,
  returnTo?: string,
): string {
  const params = new URLSearchParams({ provider });
  if (returnTo) params.set('return_to', returnTo);
  return `/api/v1/auth/login?${params.toString()}`;
}

/**
 * Each provider's brand symbol — MANDATORY per their button guidelines.
 * These are faithful inline reproductions of the official marks (Kakao
 * speech-bubble #000, Google 4-color G, Naver white N). For guaranteed
 * compliance the official downloadable assets may replace these later.
 */
function ProviderLogo({ provider }: { provider: OAuthProvider }) {
  if (provider === 'kakao') {
    return (
      <svg width={18} height={18} viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="#000000"
          d="M12 4C7.03 4 3 7.13 3 11c0 2.46 1.63 4.62 4.1 5.86-.18.65-.66 2.4-.76 2.78-.12.47.17.46.36.33.15-.1 2.39-1.62 3.36-2.27.62.09 1.27.14 1.94.14 4.97 0 9-3.13 9-7 0-3.87-4.03-7-9-7z"
        />
      </svg>
    );
  }
  if (provider === 'google') {
    return (
      <svg width={18} height={18} viewBox="0 0 48 48" aria-hidden="true">
        <path
          fill="#EA4335"
          d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
        />
        <path
          fill="#4285F4"
          d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
        />
        <path
          fill="#FBBC05"
          d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
        />
        <path
          fill="#34A853"
          d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
        />
      </svg>
    );
  }
  // naver
  return (
    <svg width={15} height={13} viewBox="0 0 24 20" aria-hidden="true">
      <path
        fill="#ffffff"
        d="M16.273 12.845 7.376 0H0v20h7.726V7.155L16.624 20H24V0h-7.727z"
      />
    </svg>
  );
}

export type ProviderButtonProps = {
  provider: OAuthProvider;
  /** Where the backend redirects the user after a successful login. */
  returnTo?: string;
  /** Full-width button (default: true). */
  block?: boolean;
  className?: string;
  /** Overrides the default guideline label. The logo always renders. */
  children?: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children'>;

/**
 * "Start with <provider>" OAuth button (Kakao / Google / Naver), styled to each
 * provider's official brand guideline (mandatory logo, fixed colors + corner
 * radius).
 *
 * Renders a plain `<a>` that does a full-page navigation — intentionally NOT
 * `next/link`. Login flows through cross-origin 302 redirects
 * (api → provider → callback), which client-side routing cannot follow. With no
 * click handler it works inside Server Components.
 */
export function ProviderButton({
  provider,
  returnTo,
  block = true,
  className,
  children,
  ...rest
}: ProviderButtonProps) {
  return (
    <a
      href={providerLoginUrl(provider, returnTo)}
      className={cx(providerButton({ provider, block }), className)}
      {...rest}
    >
      <ProviderLogo provider={provider} />
      <span>{children ?? LABELS[provider]}</span>
    </a>
  );
}
