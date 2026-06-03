import type { AnchorHTMLAttributes, ReactNode, Ref } from 'react';

// Mock of `next/link` for Storybook. Renders a plain <a>, stripping the
// Next-only props so they never leak onto the DOM element (which would
// produce React "unknown attribute" warnings and noisy console output).

type UrlObject = {
  pathname?: string;
  query?: Record<string, unknown>;
  hash?: string;
};

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string | UrlObject;
  children?: ReactNode;
  ref?: Ref<HTMLAnchorElement>;
  // Next-only props — accepted and intentionally discarded:
  replace?: boolean;
  scroll?: boolean;
  prefetch?: boolean | null;
  shallow?: boolean;
  passHref?: boolean;
  legacyBehavior?: boolean;
  locale?: string | boolean;
  onNavigate?: (event: unknown) => void;
  transitionTypes?: string[];
};

function formatHref(href: string | UrlObject): string {
  if (typeof href === 'string') return href;
  const { pathname = '', query, hash = '' } = href;
  const search = query
    ? `?${new URLSearchParams(
        Object.entries(query).map(([key, value]) => [key, String(value)]),
      ).toString()}`
    : '';
  return `${pathname}${search}${hash}`;
}

export default function Link({
  href,
  children,
  ref,
  replace,
  scroll,
  prefetch,
  shallow,
  passHref,
  legacyBehavior,
  locale,
  onNavigate,
  transitionTypes,
  ...rest
}: LinkProps) {
  return (
    <a ref={ref} href={formatHref(href)} {...rest}>
      {children}
    </a>
  );
}
