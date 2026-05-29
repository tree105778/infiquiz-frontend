import { style } from '@vanilla-extract/css';
import { shimmer } from '@/design-system/styles';
import { vars } from '@/design-system/tokens';

export const skeleton = style({
  background: `linear-gradient(90deg, ${vars.color.skeletonStart} 0%, ${vars.color.skeletonMid} 50%, ${vars.color.skeletonStart} 100%)`,
  backgroundSize: '200% 100%',
  animation: `${shimmer} 1.5s linear infinite`,
  borderRadius: vars.radius.md,
});
