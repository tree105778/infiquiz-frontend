import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/design-system/tokens';

export const providerButton = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 48,
    padding: '0 22px',
    border: '1px solid transparent',
    borderRadius: vars.radius.pill,
    fontFamily: vars.font.display,
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 1,
    textDecoration: 'none',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: [
      `background ${vars.motion.durationHover} ${vars.motion.easeOut}`,
      `border-color ${vars.motion.durationHover} ${vars.motion.easeOut}`,
    ].join(', '),
    selectors: {
      '&:focus-visible': {
        boxShadow: vars.shadow.focusRing,
        outline: 'none',
      },
    },
  },
  variants: {
    // Brand palettes per provider (Kakao/Naver are fixed brand colors; Google
    // uses a neutral white surface with a hairline border per its guidelines).
    provider: {
      kakao: {
        background: '#FEE500',
        color: '#191919',
        selectors: { '&:hover': { background: '#FDD835' } },
      },
      google: {
        background: vars.color.canvas,
        color: vars.color.ink,
        borderColor: vars.color.hairline,
        selectors: { '&:hover': { background: vars.color.canvasSoft } },
      },
      naver: {
        background: '#03C75A',
        color: '#ffffff',
        selectors: { '&:hover': { background: '#02B351' } },
      },
    },
    block: {
      true: { width: '100%' },
      false: { width: 'auto' },
    },
  },
  defaultVariants: {
    block: true,
  },
});
