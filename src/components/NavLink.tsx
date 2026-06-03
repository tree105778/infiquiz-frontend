'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { cx } from '@/design-system';
import * as styles from './NavLink.css';

type NavLinkProps = {
  href: string;
  // Routes that should mark this link active. The "주제" item points to
  // /home but should also light up on /home itself, so multiple paths
  // can match. Use a tuple of allowed prefixes.
  matches?: ReadonlyArray<string>;
  children: ReactNode;
};

// Tiny client island purely for the active-route highlight. Without
// usePathname we'd need to thread the current segment through every
// Server Component above. The Header stays a Server Component because
// only the link decoration needs the client boundary.
export function NavLink({ href, matches, children }: NavLinkProps) {
  const pathname = usePathname();
  const matchSet = matches ?? [href];
  const isActive = matchSet.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
  return (
    <Link
      href={href}
      className={cx(styles.navLink, isActive && styles.navLinkActive)}
    >
      {children}
    </Link>
  );
}
