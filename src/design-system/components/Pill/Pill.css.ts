import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/design-system/tokens';

export const pill = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 5,
    padding: '4px 9px',
    borderRadius: vars.radius.pill,
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: 0.1,
    textTransform: 'uppercase',
  },
  variants: {
    tone: {
      default: {
        background: vars.color.primarySubdued,
        color: vars.color.primaryPress,
      },
      cream: {
        background: vars.color.canvasCream,
        color: vars.color.lemon,
      },
      hairline: {
        background: vars.color.hairline,
        color: vars.color.inkMute,
      },
    },
  },
  defaultVariants: {
    tone: 'default',
  },
});

export type PillRecipeVariants = NonNullable<Parameters<typeof pill>[0]>;
