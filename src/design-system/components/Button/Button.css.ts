import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/design-system/tokens';

export const button = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    border: '1px solid transparent',
    borderRadius: vars.radius.pill,
    fontWeight: 500,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: [
      `background ${vars.motion.durationHover} ${vars.motion.easeOut}`,
      `color ${vars.motion.durationHover} ${vars.motion.easeOut}`,
      `border-color ${vars.motion.durationHover} ${vars.motion.easeOut}`,
      `box-shadow ${vars.motion.durationHover} ${vars.motion.easeOut}`,
    ].join(', '),
    selectors: {
      '&:disabled': { opacity: 0.45, cursor: 'not-allowed' },
      '&:focus-visible': {
        boxShadow: vars.shadow.focusRing,
        outline: 'none',
      },
    },
  },
  variants: {
    variant: {
      primary: {
        background: vars.color.primary,
        color: vars.color.onPrimary,
        selectors: {
          '&:hover:not(:disabled)': {
            background: vars.color.primaryDeep,
          },
          '&:active:not(:disabled)': { background: vars.color.primaryPress },
        },
      },
      secondary: {
        background: vars.color.canvas,
        color: vars.color.primary,
        borderColor: vars.color.primary,
        selectors: {
          '&:hover:not(:disabled)': {
            background: vars.color.primaryAlpha08,
          },
        },
      },
      ghost: {
        background: 'transparent',
        color: vars.color.inkSecondary,
        borderColor: vars.color.hairline,
        selectors: {
          '&:hover:not(:disabled)': {
            background: vars.color.canvasSoft,
            color: vars.color.ink,
          },
        },
      },
      onDark: {
        background: vars.color.canvas,
        color: vars.color.brandDark900,
        selectors: {
          '&:hover:not(:disabled)': {
            background: vars.color.canvasSoft,
          },
        },
      },
    },
    size: {
      sm: {
        padding: '7px 14px',
        fontSize: 13,
        lineHeight: 1,
        height: 32,
      },
      md: {
        padding: '10px 18px',
        fontSize: 14,
        lineHeight: 1,
        height: 40,
      },
      lg: {
        padding: '13px 22px',
        fontSize: 15,
        lineHeight: 1,
        height: 48,
      },
      xl: {
        padding: '16px 28px',
        fontSize: 16,
        lineHeight: 1,
        height: 56,
      },
    },
    block: {
      true: { width: '100%' },
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export type ButtonRecipeVariants = NonNullable<Parameters<typeof button>[0]>;
