import { style } from '@vanilla-extract/css';
import { vars } from '@/design-system/tokens/contract.css';

export const navLink = style({
  color: vars.color.inkSecondary,
  fontSize: 14,
  fontWeight: 400,
  position: 'relative',
  padding: '4px 0',
  cursor: 'pointer',
  selectors: {
    '&:hover': { color: vars.color.primary },
  },
});

export const navLinkActive = style({
  color: vars.color.ink,
  selectors: {
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: -10,
      height: 2,
      background: vars.color.primary,
      borderRadius: 1,
    },
  },
});
