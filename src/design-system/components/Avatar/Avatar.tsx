import { assignInlineVars } from '@vanilla-extract/dynamic';
import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { avatar, sizeVar } from '@/design-system/components/Avatar/Avatar.css';
import { cx } from '@/utils/cx';

export type AvatarProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  initial?: string;
  size?: number;
};

export const Avatar = forwardRef<HTMLButtonElement, AvatarProps>(
  function Avatar(
    { initial, size, className, type = 'button', children, ...rest },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        style={assignInlineVars({
          [sizeVar]: size ? `${size}px` : '32px',
        })}
        className={cx(avatar, className)}
        {...rest}
      >
        {children ?? initial}
      </button>
    );
  },
);
