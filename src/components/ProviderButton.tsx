import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cx } from '@/design-system';
import { providerButton } from './ProviderButton.css';

export type OAuthProvider = 'kakao' | 'google' | 'naver';

const LABELS: Record<OAuthProvider, string> = {
  kakao: '카카오로 시작하기',
  google: '구글로 시작하기',
  naver: '네이버로 시작하기',
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

export type ProviderButtonProps = {
  provider: OAuthProvider;
  /** Where the backend redirects the user after a successful login. */
  returnTo?: string;
  /** Full-width button (default: true). */
  block?: boolean;
  className?: string;
  /** Overrides the default "<provider>로 시작하기" label. */
  children?: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children'>;

/**
 * "Start with <provider>" OAuth button (Kakao / Google / Naver).
 *
 * Renders a plain `<a>` that does a full-page navigation — intentionally NOT
 * `next/link`. Login flows through cross-origin 302 redirects
 * (api → provider → callback), which client-side routing cannot follow. Because
 * there is no click handler, this works inside Server Components.
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
      {children ?? LABELS[provider]}
    </a>
  );
}
