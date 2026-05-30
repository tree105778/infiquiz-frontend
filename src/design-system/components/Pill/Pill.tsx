import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from '@/design-system/utils/cx';
import { type PillRecipeVariants, pill } from './Pill.css';

export type PillProps = HTMLAttributes<HTMLSpanElement> & PillRecipeVariants;

export const Pill = forwardRef<HTMLSpanElement, PillProps>(function Pill(
  { tone, className, ...rest },
  ref,
) {
  return <span ref={ref} className={cx(pill({ tone }), className)} {...rest} />;
});
