import type { HTMLAttributes } from 'react';
import {
  type SpinnerRecipeVariants,
  spinner,
} from '@/design-system/components/Spinner/Spinner.css';
import { cx } from '@/design-system/utils/cx';

export type SpinnerProps = HTMLAttributes<HTMLSpanElement> &
  SpinnerRecipeVariants;

export function Spinner({ size, className, ...rest }: SpinnerProps) {
  return (
    <output
      aria-label="Loading"
      className={cx(spinner({ size }), className)}
      {...rest}
    />
  );
}
