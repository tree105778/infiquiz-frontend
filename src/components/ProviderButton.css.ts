import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/design-system/tokens';

/**
 * Provider login buttons follow each provider's OFFICIAL brand guideline
 * (logo mandatory, fixed colors, fixed corner radius — NOT a pill):
 *  - Kakao:  developers.kakao.com/docs/latest/ko/kakaologin/design-guide
 *  - Google: developers.google.com/identity/branding-guidelines
 *  - Naver:  navercorp brand guide + Ncloud button spec
 */
export const providerButton = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 48,
    padding: '0 20px',
    border: '1px solid transparent',
    // Brand buttons use the OS/system typeface (per Kakao guide; Google falls
    // back to system, Naver allows brand-consistent fonts).
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", Roboto, "Malgun Gothic", Pretendard, system-ui, sans-serif',
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
      '&:focus-visible': { boxShadow: vars.shadow.focusRing, outline: 'none' },
    },
  },
  variants: {
    provider: {
      // #FEE500 bg, label #000 @ 85%, fixed 12px radius, no border.
      kakao: {
        background: '#FEE500',
        color: 'rgba(0, 0, 0, 0.85)',
        borderRadius: 12,
        selectors: { '&:hover': { background: '#FDD835' } },
      },
      // Light theme: white bg, #1f1f1f text, #747775 1px stroke, 4px radius.
      google: {
        background: '#ffffff',
        color: '#1f1f1f',
        borderColor: '#747775',
        borderRadius: 4,
        selectors: { '&:hover': { background: '#f7f8f8' } },
      },
      // Naver Green, white label + white N, 4px radius.
      naver: {
        background: '#03C75A',
        color: '#ffffff',
        borderRadius: 4,
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
