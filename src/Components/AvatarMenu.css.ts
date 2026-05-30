import { style } from '@vanilla-extract/css';
import { vars } from '@/design-system/tokens/contract.css';

export const wrap = style({
  position: 'relative',
});

export const menu = style({
  position: 'absolute',
  top: 44,
  right: 0,
  background: vars.color.canvas,
  border: `1px solid ${vars.color.hairline}`,
  borderRadius: vars.radius.md,
  boxShadow: vars.shadow.level2,
  minWidth: 180,
  padding: 6,
  zIndex: 60,
});

export const item = style({
  display: 'block',
  width: '100%',
  textAlign: 'left',
  background: 'transparent',
  border: 0,
  padding: '9px 12px',
  fontSize: 14,
  color: vars.color.ink,
  borderRadius: vars.radius.sm,
  cursor: 'pointer',
  textDecoration: 'none',
  selectors: {
    '&:hover': { background: vars.color.canvasSoft },
  },
});

export const sep = style({
  height: 1,
  background: vars.color.hairline,
  margin: '4px 0',
});
