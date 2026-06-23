'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Avatar } from '@/design-system';
import { logout } from '@/lib/action';
import { fadeInUpFast } from '@/styles/page.css';
import * as styles from './AvatarMenu.css';

export function AvatarMenu({ initial }: { initial: string }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  });

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <Avatar
        initial={initial}
        onClick={() => setOpen((v) => !v)}
        aria-label="계정 메뉴"
      />
      {open && (
        <div className={`${styles.menu} ${fadeInUpFast}`}>
          <Link
            href="/profile"
            className={styles.item}
            onClick={() => setOpen(false)}
          >
            프로필
          </Link>
          <div className={styles.sep} />
          <form action={logout}>
            <button type="submit" className={styles.item}>
              로그아웃
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
