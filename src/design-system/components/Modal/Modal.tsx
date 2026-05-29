import { type ReactNode, useEffect } from 'react';
import { dialog, overlay } from '@/design-system/components/Modal/Modal.css';
import { cx } from '@/utils/cx';

export type ModalProps = {
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
  width?: number;
  className?: string;
};

export function Modal({
  open,
  onClose,
  children,
  width = 480,
  className,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <div className={overlay} onClick={onClose} role="presentation">
      <div
        className={cx(dialog, className)}
        style={{ maxWidth: width }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>
  );
}
