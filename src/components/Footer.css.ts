import { style } from '@vanilla-extract/css';
import { vars } from '@/design-system';

export const footer = style({
  borderTop: `1px solid ${vars.color.hairline}`,
  padding: `24px ${vars.space.huge}`,
  color: vars.color.inkMute,
  fontSize: 13,
  display: 'flex',
  gap: 16,
  maxWidth: vars.layout.containerMax,
  margin: '0 auto',
});

export const dot = style({
  color: vars.color.hairline,
});
