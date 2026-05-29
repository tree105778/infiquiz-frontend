import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../tokens/contract.css';
import { fadeUp, scaleIn, shimmer, spin } from './keyframes.css';

/**
 * Global utility classes — `.btn`, `.t-*`, `.card-*`, `.pill-*`, `.spinner`,
 * `.skel`, `.tnum`, `.fade-in`, `.scale-in`, `.text-input`, `.select-input`.
 *
 * These exist so JSX that originated in the design prototype keeps rendering
 * during the migration to the React primitives in `@/design-system`. They
 * read the same theme variables as the recipes, so visual output stays in
 * lock-step automatically.
 *
 * Prefer the React primitives (`<Button>`, `<Text>`, `<Card>`, `<Pill>`,
 * `<Spinner>`, `<Skeleton>`, `<TextInput>`, `<Select>`) in new code — these
 * utilities are intentionally non-composable and untyped.
 */

// Typography utilities --------------------------------------------------------

globalStyle('.t-display-xxl', {
  fontFamily: vars.font.display,
  fontSize: vars.type.displayXxlSize,
  lineHeight: vars.type.displayXxlLh,
  letterSpacing: '-2.2px',
  fontWeight: 300,
});
globalStyle('.t-display-xl', {
  fontFamily: vars.font.display,
  fontSize: vars.type.displayXlSize,
  lineHeight: vars.type.displayXlLh,
  letterSpacing: '-1.6px',
  fontWeight: 300,
});
globalStyle('.t-display-lg', {
  fontFamily: vars.font.display,
  fontSize: vars.type.displayLgSize,
  lineHeight: vars.type.displayLgLh,
  letterSpacing: '-1px',
  fontWeight: 300,
});
globalStyle('.t-display-md', {
  fontFamily: vars.font.display,
  fontSize: vars.type.displayMdSize,
  lineHeight: vars.type.displayMdLh,
  letterSpacing: '-0.6px',
  fontWeight: 300,
});
globalStyle('.t-heading-lg', {
  fontFamily: vars.font.display,
  fontSize: vars.type.headingLgSize,
  lineHeight: vars.type.headingLgLh,
  letterSpacing: '-0.4px',
  fontWeight: 300,
});
globalStyle('.t-heading-md', {
  fontFamily: vars.font.display,
  fontSize: vars.type.headingMdSize,
  lineHeight: vars.type.headingMdLh,
  letterSpacing: '-0.3px',
  fontWeight: 300,
});
globalStyle('.t-heading-sm', {
  fontFamily: vars.font.display,
  fontSize: vars.type.headingSmSize,
  lineHeight: vars.type.headingSmLh,
  letterSpacing: 0,
  fontWeight: 500,
});
globalStyle('.t-body-lg', {
  fontFamily: vars.font.body,
  fontSize: vars.type.bodyLgSize,
  lineHeight: vars.type.bodyLgLh,
  letterSpacing: 0,
  fontWeight: 400,
});
globalStyle('.t-body-md', {
  fontFamily: vars.font.body,
  fontSize: vars.type.bodyMdSize,
  lineHeight: vars.type.bodyMdLh,
  letterSpacing: 0,
  fontWeight: 400,
});
globalStyle('.t-body-tabular', {
  fontFamily: vars.font.body,
  fontSize: vars.type.bodyTabularSize,
  lineHeight: vars.type.bodyTabularLh,
  letterSpacing: vars.type.bodyTabularTracking,
  fontWeight: 400,
  fontFeatureSettings: '"tnum"',
  fontVariantNumeric: 'tabular-nums',
});
globalStyle('.t-button-md', {
  fontFamily: vars.font.display,
  fontSize: vars.type.buttonMdSize,
  lineHeight: vars.type.buttonMdLh,
  letterSpacing: 0,
  fontWeight: 500,
});
globalStyle('.t-button-sm', {
  fontFamily: vars.font.display,
  fontSize: vars.type.buttonSmSize,
  lineHeight: vars.type.buttonSmLh,
  letterSpacing: 0,
  fontWeight: 500,
});
globalStyle('.t-caption', {
  fontFamily: vars.font.body,
  fontSize: vars.type.captionSize,
  lineHeight: vars.type.captionLh,
  letterSpacing: vars.type.captionTracking,
  fontWeight: 400,
  fontFeatureSettings: '"tnum"',
  fontVariantNumeric: 'tabular-nums',
});
globalStyle('.t-micro', {
  fontFamily: vars.font.body,
  fontSize: vars.type.microSize,
  lineHeight: vars.type.microLh,
  letterSpacing: 0,
  fontWeight: 400,
});
globalStyle('.t-micro-cap', {
  fontFamily: vars.font.display,
  fontSize: vars.type.microCapSize,
  lineHeight: vars.type.microCapLh,
  letterSpacing: vars.type.microCapTracking,
  fontWeight: 500,
  textTransform: 'uppercase',
});

globalStyle('.tnum', {
  fontVariantNumeric: 'tabular-nums',
  fontFeatureSettings: '"tnum"',
  letterSpacing: '-0.01em',
});

// Buttons ---------------------------------------------------------------------

globalStyle('.btn', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  border: '1px solid transparent',
  borderRadius: vars.radius.pill,
  fontFamily: vars.font.display,
  fontWeight: 500,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  transition: [
    `background ${vars.motion.durationHover} ${vars.motion.easeOut}`,
    `color ${vars.motion.durationHover} ${vars.motion.easeOut}`,
    `border-color ${vars.motion.durationHover} ${vars.motion.easeOut}`,
    `box-shadow ${vars.motion.durationHover} ${vars.motion.easeOut}`,
  ].join(', '),
});
globalStyle('.btn:disabled', { opacity: 0.45, cursor: 'not-allowed' });
globalStyle('.btn:focus-visible', {
  boxShadow: vars.shadow.focusRing,
  outline: 'none',
});

globalStyle('.btn-sm', {
  padding: '7px 14px',
  fontSize: 13,
  lineHeight: 1,
  height: 32,
});
globalStyle('.btn-md', {
  padding: '10px 18px',
  fontSize: 14,
  lineHeight: 1,
  height: 40,
});
globalStyle('.btn-lg', {
  padding: '13px 22px',
  fontSize: 15,
  lineHeight: 1,
  height: 48,
});
globalStyle('.btn-xl', {
  padding: '16px 28px',
  fontSize: 16,
  lineHeight: 1,
  height: 56,
});

globalStyle('.btn-primary', {
  background: vars.color.primary,
  color: vars.color.onPrimary,
});
globalStyle('.btn-primary:hover:not(:disabled)', {
  background: vars.color.primaryDeep,
});
globalStyle('.btn-primary:active:not(:disabled)', {
  background: vars.color.primaryPress,
});

globalStyle('.btn-secondary', {
  background: vars.color.canvas,
  color: vars.color.primary,
  borderColor: vars.color.primary,
});
globalStyle('.btn-secondary:hover:not(:disabled)', {
  background: vars.color.primaryAlpha08,
});

globalStyle('.btn-ghost', {
  background: 'transparent',
  color: vars.color.inkSecondary,
  borderColor: vars.color.hairline,
});
globalStyle('.btn-ghost:hover:not(:disabled)', {
  background: vars.color.canvasSoft,
  color: vars.color.ink,
});

globalStyle('.btn-on-dark', {
  background: vars.color.canvas,
  color: vars.color.brandDark900,
});
globalStyle('.btn-on-dark:hover:not(:disabled)', {
  background: vars.color.canvasSoft,
});

// Cards -----------------------------------------------------------------------

globalStyle('.card-surface', {
  background: vars.color.canvas,
  border: `1px solid ${vars.color.hairline}`,
  borderRadius: vars.radius.lg,
});
globalStyle('.card-cream', {
  background: vars.color.canvasCream,
  borderRadius: vars.radius.lg,
});
globalStyle('.card-soft', {
  background: vars.color.canvasSoft,
  borderRadius: vars.radius.lg,
});
globalStyle('.card-dark', {
  background: vars.color.brandDark900,
  color: vars.color.onPrimary,
  borderRadius: vars.radius.lg,
});

// Pills -----------------------------------------------------------------------

globalStyle('.pill-tag-soft', {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 5,
  padding: '4px 9px',
  background: vars.color.primarySubdued,
  color: vars.color.primaryPress,
  borderRadius: vars.radius.pill,
  fontFamily: vars.font.display,
  fontSize: 11,
  fontWeight: 500,
  letterSpacing: '0.1px',
  textTransform: 'uppercase',
});
globalStyle('.pill-cream', {
  background: vars.color.canvasCream,
  color: vars.color.lemon,
});
globalStyle('.pill-hairline', {
  background: vars.color.hairline,
  color: vars.color.inkMute,
});

// Spinner ---------------------------------------------------------------------

globalStyle('.spinner', {
  width: 16,
  height: 16,
  border: '2px solid currentColor',
  borderRightColor: 'transparent',
  borderRadius: '50%',
  display: 'inline-block',
  animation: `${spin} 700ms linear infinite`,
  verticalAlign: 'middle',
  opacity: 0.8,
});
globalStyle('.spinner.lg', { width: 48, height: 48, borderWidth: 3 });

// Skeleton --------------------------------------------------------------------

globalStyle('.skel', {
  background: `linear-gradient(90deg, ${vars.color.skeletonStart} 0%, ${vars.color.skeletonMid} 50%, ${vars.color.skeletonStart} 100%)`,
  backgroundSize: '200% 100%',
  animation: `${shimmer} 1.5s linear infinite`,
  borderRadius: vars.radius.md,
});

// Inputs ----------------------------------------------------------------------

globalStyle('.text-input', {
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
});
globalStyle('.text-input::placeholder', { color: vars.color.inkMute });
globalStyle('.text-input:focus', {
  borderColor: vars.color.primary,
  boxShadow: vars.shadow.focusRing,
});

const CARET = `url("data:image/svg+xml,%3Csvg viewBox='0 0 12 8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2364748d' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`;
globalStyle('.select-input', {
  background: vars.color.canvas,
  border: `1px solid ${vars.color.hairlineInput}`,
  borderRadius: vars.radius.sm,
  padding: '9px 36px 9px 12px',
  fontFamily: vars.font.body,
  fontSize: 14,
  fontWeight: 400,
  color: vars.color.ink,
  appearance: 'none',
  cursor: 'pointer',
  backgroundImage: CARET,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 12px center',
  backgroundSize: 10,
});

// Animations ------------------------------------------------------------------

globalStyle('.fade-in', {
  animation: `${fadeUp} 320ms ${vars.motion.easeOut} both`,
});
globalStyle('.fade-in-fast', {
  animation: `${fadeUp} 200ms ${vars.motion.easeOut} both`,
});
globalStyle('.scale-in', {
  animation: `${scaleIn} 320ms ${vars.motion.easeOut} both`,
});

// Page chrome (page-main, page-title, page-sub, mesh-bg) ----------------------

globalStyle('.page-main', {
  maxWidth: vars.layout.containerMax,
  margin: '0 auto',
  padding: `${vars.space.huge} ${vars.space.huge} ${vars.space.xxl}`,
});
globalStyle('.page-title', { color: vars.color.ink, margin: 0 });
globalStyle('.page-sub', { color: vars.color.inkMute, margin: '6px 0 0' });

globalStyle('.mesh-bg', {
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

// Hover surfaces used by topic/choice/activity rows --------------------------

globalStyle('.topic-mini, .topic-card', {
  transition: [
    `transform ${vars.motion.durationHover} ${vars.motion.easeOut}`,
    `box-shadow ${vars.motion.durationHover} ${vars.motion.easeOut}`,
  ].join(', '),
});
globalStyle('.topic-mini:hover, .topic-card:hover', {
  transform: 'translateY(-2px)',
  boxShadow: vars.shadow.level2,
});
globalStyle('.choice-card:hover:not(:disabled)', {
  background: vars.color.canvasSoft,
  boxShadow: vars.shadow.level1,
});
globalStyle('.topic-row:hover', { background: vars.color.canvasSoft });
globalStyle('.activity-row:hover', {
  background: vars.color.canvasSoft,
  borderColor: vars.color.hairlineInput,
});
