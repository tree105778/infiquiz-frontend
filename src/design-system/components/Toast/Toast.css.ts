import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { toastIn } from '@/design-system/styles';
import { vars } from '@/design-system/tokens';

export const host = style({
  position: 'fixed',
  top: 80,
  right: 24,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  zIndex: 200,
});

export const toast = recipe({
  base: {
    background: vars.color.brandDark900,
    color: vars.color.onPrimary,
    padding: '12px 16px',
    borderRadius: vars.radius.md,
    boxShadow: vars.shadow.level2,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    minWidth: 260,
    maxWidth: 360,
    fontSize: 14,
    animation: `${toastIn} 200ms ${vars.motion.easeOut}`,
  },
  variants: {
    kind: {
      info: {},
      success: {},
      error: {},
    },
  },
  defaultVariants: { kind: 'info' },
});

export const icon = recipe({
  base: {},
  variants: {
    kind: {
      info: { color: vars.color.primarySoft },
      success: { color: vars.color.success },
      error: { color: vars.color.ruby },
    },
  },
  defaultVariants: { kind: 'info' },
});

export type ToastKind = NonNullable<
  NonNullable<Parameters<typeof toast>[0]>['kind']
>;
