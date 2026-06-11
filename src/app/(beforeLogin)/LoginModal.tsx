'use client';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';
import type { ReactNode } from 'react';
import { Modal } from '@/design-system';

export default function LoginModal({ children }: { children: ReactNode }) {
  const isOpen = useSelectedLayoutSegment('modal');
  const router = useRouter();
  return (
    <Modal
      open={isOpen === 'login'}
      onClose={() => {
        router.back();
      }}
      aria-label="로그인"
    >
      {children}
    </Modal>
  );
}
