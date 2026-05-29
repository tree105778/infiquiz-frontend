import { style } from '@vanilla-extract/css';
import { vars } from '@/design-system/tokens';

export const textInput = style({
  width: '100%',
  background: vars.color.canvas,
  border: `1px solid ${vars.color.hairlineInput}`,
  borderRadius: vars.radius.sm,
  padding: '12px 14px',
  fontFamily: vars.font.body,
  fontSize: 15,
  fontWeight: 400,
  color: vars.color.ink,
  outline: 'none',
  transition: [
    `border-color ${vars.motion.durationHover} ${vars.motion.easeOut}`,
    `box-shadow ${vars.motion.durationHover} ${vars.motion.easeOut}`,
  ].join(', '),
  selectors: {
    '&::placeholder': { color: vars.color.inkMute },
    '&:focus': {
      borderColor: vars.color.primary,
      boxShadow: vars.shadow.focusRing,
    },
  },
});
