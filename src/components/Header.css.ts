import { style } from '@vanilla-extract/css';
import { vars } from '@/design-system';

export const header = style({
  position: 'sticky',
  top: 0,
  zIndex: 50,
  height: vars.layout.navHeight,
  background: vars.color.canvas,
  borderBottom: `1px solid ${vars.color.hairline}`,
});

export const headerTransport = style({
  background: 'transparent',
  borderBottom: 'transparent',
});

export const inner = style({
  maxWidth: vars.layout.containerMax,
  height: '100%',
  margin: '0 auto',
  padding: `0 ${vars.space.huge}`,
  display: 'flex',
  alignItems: 'center',
  gap: 32,
});

export const nav = style({
  display: 'flex',
  gap: 28,
  flex: 1,
});

export const right = style({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
});

export const logoMark = style({
  display: 'flex',
  alignItems: 'center',
  gap: 9,
});

export const logoWord = style({
  fontFamily: vars.font.display,
  fontWeight: 300,
  fontSize: 19,
  letterSpacing: '-0.5px',
  color: vars.color.ink,
});
