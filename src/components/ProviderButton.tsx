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
 *  - Google: the official 4-color "G", verbatim vector extracted from Google's
 *    downloadable sign-in assets (signin-assets.zip, identity branding guide).
 *  - Naver: the official N glyph (via simple-icons, which tracks the brand mark).
 *  - Kakao: a faithful bare speech-bubble reproduction (#000). The official
 *    symbol is gated behind the Kakao developer console
 *    ([도구] > [리소스 다운로드] > [카카오 로그인]); simple-icons only ships the
 *    *app icon*, which the login guide prohibits. Drop the console asset in to
 *    replace this.
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
    // Official Google "G" — verbatim from signin-assets.zip (icon-only asset).
    return (
      <svg width={18} height={18} viewBox="10 10 20 20" aria-hidden="true">
        <path
          fill="#4285F4"
          d="M29.6 20.2273C29.6 19.5182 29.5364 18.8364 29.4182 18.1818H20V22.05H25.3818C25.15 23.3 24.4455 24.3591 23.3864 25.0682V27.5773H26.6182C28.5091 25.8364 29.6 23.2727 29.6 20.2273Z"
        />
        <path
          fill="#34A853"
          d="M20 30C22.7 30 24.9636 29.1045 26.6181 27.5773L23.3863 25.0682C22.4909 25.6682 21.3454 26.0227 20 26.0227C17.3954 26.0227 15.1909 24.2636 14.4045 21.9H11.0636V24.4909C12.7091 27.7591 16.0909 30 20 30Z"
        />
        <path
          fill="#FBBC04"
          d="M14.4045 21.9C14.2045 21.3 14.0909 20.6591 14.0909 20C14.0909 19.3409 14.2045 18.7 14.4045 18.1V15.5091H11.0636C10.3864 16.8591 10 18.3864 10 20C10 21.6136 10.3864 23.1409 11.0636 24.4909L14.4045 21.9Z"
        />
        <path
          fill="#E94235"
          d="M20 13.9773C21.4681 13.9773 22.7863 14.4818 23.8227 15.4727L26.6909 12.6045C24.9591 10.9909 22.6954 10 20 10C16.0909 10 12.7091 12.2409 11.0636 15.5091L14.4045 18.1C15.1909 15.7364 17.3954 13.9773 20 13.9773Z"
        />
      </svg>
    );
  }
  // naver — official N glyph (simple-icons), white on the green button.
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#ffffff"
        d="M16.273 12.845 7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845Z"
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
