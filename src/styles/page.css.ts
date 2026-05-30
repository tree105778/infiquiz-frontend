import { style } from '@vanilla-extract/css';
import { fadeUp, scaleIn } from '@/design-system/styles/keyframes.css';
import { vars } from '@/design-system/tokens/contract.css';

export const pageMain = style({
  maxWidth: vars.layout.containerMax,
  margin: '0 auto',
  padding: `${vars.space.huge} ${vars.space.huge} ${vars.space.xxl}`,
});

export const pageTitle = style({
  color: vars.color.ink,
  margin: 0,
});

export const pageSub = style({
  color: vars.color.inkMute,
  margin: '6px 0 0',
});

export const meshBg = style({
  position: 'absolute',
  inset: '0 0 auto 0',
  height: 580,
  backgroundImage: 'url("/assets/gradient-mesh.svg")',
  backgroundSize: '100% 100%',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center top',
  pointerEvents: 'none',
  zIndex: 0,
});

export const fadeInUp = style({
  animation: `${fadeUp} 320ms ${vars.motion.easeOut} both`,
});

export const fadeInUpFast = style({
  animation: `${fadeUp} 200ms ${vars.motion.easeOut} both`,
});

export const scaleInAnim = style({
  animation: `${scaleIn} 320ms ${vars.motion.easeOut} both`,
});
