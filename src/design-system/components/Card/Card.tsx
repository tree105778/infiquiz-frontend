import { forwardRef, type HTMLAttributes } from 'react';
import {
  type CardRecipeVariants,
  card,
} from '@/design-system/components/Card/Card.css';
import { cx } from '@/utils/cx';

export type CardProps = HTMLAttributes<HTMLDivElement> & CardRecipeVariants;
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant, interactive, className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx(card({ variant, interactive }), className)}
      {...rest}
    />
  );
});

export function cardClass(variants: CardRecipeVariants = {}) {
  return card(variants);
}
