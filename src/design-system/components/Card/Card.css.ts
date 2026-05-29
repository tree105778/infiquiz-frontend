import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/design-system/tokens';

export const card = recipe({
  base: {
    borderRadius: vars.radius.lg,
  },
  variants: {
    variant: {
      surface: {
        background: vars.color.canvas,
        border: `1px solid ${vars.color.hairline}`,
      },
      cream: {
        background: vars.color.canvasCream,
      },
      soft: {
        background: vars.color.canvasSoft,
      },
      dark: {
        background: vars.color.brandDark900,
        color: vars.color.onPrimary,
      },
    },
    interactive: {
      true: {
        transition: [
          `transform ${vars.motion.durationHover} ${vars.motion.easeOut}`,
          `box-shadow ${vars.motion.durationHover} ${vars.motion.easeOut}`,
        ].join(', '),
        selectors: {
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: vars.shadow.level2,
          },
        },
      },
    },
  },
  defaultVariants: {
    variant: 'surface',
  },
});

export type CardRecipeVariants = NonNullable<Parameters<typeof card>[0]>;
