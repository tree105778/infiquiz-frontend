import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { text } from '@/design-system/components/Text/Text.css';
import { cx } from '@/utils/cx';

type TextVariants = NonNullable<Parameters<typeof text>[0]>;

type TextOwnProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & TextVariants;

export type TextProps<T extends ElementType = 'p'> = TextOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof TextOwnProps<T>>;

export function Text<T extends ElementType = 'p'>({
  as,
  variant,
  tone,
  tabular,
  align,
  className,
  children,
  ...rest
}: TextProps<T>) {
  const Component = (as ?? 'p') as ElementType;
  return (
    <Component
      className={cx(text({ variant, tone, tabular, align }), className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
