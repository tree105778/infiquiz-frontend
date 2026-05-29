import { type ButtonHTMLAttributes, forwardRef } from 'react';
import {
  type ButtonRecipeVariants,
  button,
} from '@/design-system/components/Button/Button.css';
import { cx } from '@/utils/cx';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonRecipeVariants;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant, size, block, className, type = 'button', ...rest },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={cx(button({ variant, size, block }), className)}
        {...rest}
      />
    );
  },
);

export function buttonClass(variants: ButtonRecipeVariants = {}) {
  return button(variants);
}
