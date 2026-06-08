'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Avatar } from '@/design-system';
import { logout } from '@/lib/auth';
import { fadeInUpFast } from '@/styles/page.css';
import * as styles from './AvatarMenu.css';

export function AvatarMenu({ initial }: { initial: string }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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

  async function onLogout() {
    await logout();
    router.replace('/');
    router.refresh();
  }

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
          <button type="button" className={styles.item} onClick={onLogout}>
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}
