'use client';

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import type { ToastKind } from '@/design-system/components/Toast/Toast.css';

import * as styles from './Toast.css';

type ToastInput = {
  message: string;
  kind?: ToastKind;
  ms?: number;
};
type ToastItem = { id: string; message: string; kind: ToastKind; ms: number };

const ToastCtx = createContext<{ push: (t: ToastInput) => void }>({
  push: () => {},
});

const ICON: Record<ToastKind, string> = {
  info: 'ⓘ',
  success: '✓',
  error: '⚠',
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const push = useCallback((opts: ToastInput) => {
    const id = Math.random().toString(36).slice(2);
    const item: ToastItem = { id, kind: 'info', ms: 3000, ...opts };
    setToasts((arr) => [...arr, item]);
    setTimeout(
      () => setToasts((arr) => arr.filter((t) => t.id !== id)),
      item.ms,
    );
  }, []);

  return (
    <ToastCtx.Provider value={{ push }}>
      {children}
      <div className={styles.host}>
        {toasts.map((t) => (
          <div key={t.id} className={styles.toast({ kind: t.kind })}>
            <span className={styles.icon({ kind: t.kind })}>
              {ICON[t.kind]}
            </span>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  return useContext(ToastCtx);
}
