import { style } from '@vanilla-extract/css';
import { vars } from '@/design-system';

// The in-quiz bar deliberately diverges from the global chrome: it's a slim 56px
// (vs. the 64px marketing/app nav, vars.layout.navHeight) over a narrower 1080px
// reading column (vs. the 1200px vars.layout.containerMax). Both are quiz-only
// literals carried straight from the design spec, so they stay as constants here.
const BAR_HEIGHT = 56;
const COLUMN_MAX = 1080;

export const header = style({
  position: 'sticky',
  top: 0,
  zIndex: 50,
  height: BAR_HEIGHT,
  background: vars.color.canvas,
  borderBottom: `1px solid ${vars.color.hairline}`,
});

export const inner = style({
  maxWidth: COLUMN_MAX,
  height: '100%',
  margin: '0 auto',
  padding: `0 ${vars.space.xxl}`,
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.lg,
});

// Minimal ghost-style exit affordance — lighter than the design-system Button
// (no border, tighter padding) to keep the quiz chrome out of the way.
export const exitButton = style({
  background: 'transparent',
  border: 0,
  padding: '6px 10px',
  borderRadius: vars.radius.pill,
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  color: vars.color.inkMute,
  fontFamily: 'inherit',
  fontSize: 13,
  cursor: 'pointer',
  transition: [
    `background ${vars.motion.durationHover} ${vars.motion.easeOut}`,
    `color ${vars.motion.durationHover} ${vars.motion.easeOut}`,
  ].join(', '),
  selectors: {
    '&:hover': {
      background: vars.color.canvasSoft,
      color: vars.color.ink,
    },
    '&:focus-visible': {
      boxShadow: vars.shadow.focusRing,
      outline: 'none',
    },
  },
});

export const title = style({
  flex: 1,
  textAlign: 'center',
  color: vars.color.ink,
  fontSize: 14,
});

export const count = style({
  color: vars.color.ink,
  fontSize: 14,
});

export const timer = style({
  // Nudged off the count by a hair more than the row gap, matching the spec.
  marginLeft: vars.space.sm,
  color: vars.color.inkMute,
  fontSize: 14,
});

export const progressTrack = style({
  height: 4,
  background: vars.color.hairline,
});

// Width is driven inline from the live `progress` value; the rest is static.
export const progressFill = style({
  height: '100%',
  background: vars.color.primary,
  transition: `width 300ms ${vars.motion.easeOut}`,
});
