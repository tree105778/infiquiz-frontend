import { forwardRef, type SelectHTMLAttributes } from 'react';
import { select } from '@/design-system/components/Select/Select.css';
import { cx } from '@/design-system/utils/cx';

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ className, ...rest }, ref) {
    return <select ref={ref} className={cx(select, className)} {...rest} />;
  },
);
