import { recipe } from '@vanilla-extract/recipes';
import { spin } from '@/design-system/styles';

export const spinner = recipe({
  base: {
    border: '2px solid currentColor',
    borderRightColor: 'transparent',
    borderRadius: '50%',
    display: 'inline-block',
    animation: `${spin} 700ms linear infinite`,
    verticalAlign: 'middle',
    opacity: 0.8,
    margin: 0,
    padding: 0,
  },
  variants: {
    size: {
      sm: {
        width: 16,
        height: 16,
        borderWidth: 2,
      },
      lg: {
        width: 48,
        height: 48,
        borderWidth: 3,
      },
    },
  },
  defaultVariants: { size: 'sm' },
});

export type SpinnerRecipeVariants = NonNullable<Parameters<typeof spinner>[0]>;
