import { style } from '@vanilla-extract/css';
import { fadeIn, modalIn } from '@/design-system/styles';
import { vars } from '@/design-system/tokens';

export const overlay = style({
  position: 'fixed',
  inset: 0,
  zIndex: 100,
  background: vars.color.scrim,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  animation: `${fadeIn} 200ms ${vars.motion.easeOut}`,
});

export const dialog = style({
  background: vars.color.canvas,
  borderRadius: vars.radius.lg,
  boxShadow: vars.shadow.level2,
  padding: vars.space.xxl,
  maxWidth: 480,
  width: '92vw',
  animation: `${modalIn} 240ms ${vars.motion.easeOut}`,
});
