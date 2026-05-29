import {
  createGlobalTheme,
  createGlobalThemeContract,
} from '@vanilla-extract/css';
import { colors } from './colors';
import { layout, motion, radius, shadow, space } from './space';
import { fontFamily, typeScale } from './typography';

/**
 * Single source of truth for theme tokens.
 *
 * `vars` is a typed reference object whose leaves resolve to CSS variable
 * references — e.g. `vars.color.primary` is the string `var(--color-primary)`.
 * The contract uses explicit, kebab-cased names so existing inline
 * `style={{ color: "var(--color-primary)" }}` usages keep working during the
 * migration window and so design-time tooling can read the variables.
 *
 * Adding a dark theme later is `createGlobalTheme(".dark", vars, { ... })`
 * with the same shape; no component code needs to change.
 */

const contractShape = {
  color: {
    primary: 'color-primary',
    primaryDeep: 'color-primary-deep',
    primaryPress: 'color-primary-press',
    primarySoft: 'color-primary-soft',
    primarySubdued: 'color-primary-subdued',
    primaryAlpha08: 'color-primary-alpha-08',
    primaryAlpha16: 'color-primary-alpha-16',
    primaryAlpha40: 'color-primary-alpha-40',
    primaryAlpha00: 'color-primary-alpha-00',
    brandDark900: 'color-brand-dark-900',
    ruby: 'color-ruby',
    magenta: 'color-magenta',
    lemon: 'color-lemon',
    success: 'color-success',

    canvas: 'color-canvas',
    canvasSoft: 'color-canvas-soft',
    canvasCream: 'color-canvas-cream',
    hairline: 'color-hairline',
    hairlineInput: 'color-hairline-input',

    ink: 'color-ink',
    inkSecondary: 'color-ink-secondary',
    inkMute: 'color-ink-mute',
    inkMute2: 'color-ink-mute-2',
    onPrimary: 'color-on-primary',

    shadowBlue: 'color-shadow-blue',
    shadowBlue08: 'color-shadow-blue-08',
    shadowBlue04: 'color-shadow-blue-04',
    scrim: 'color-scrim',

    skeletonStart: 'color-skeleton-start',
    skeletonMid: 'color-skeleton-mid',
  },
  font: {
    display: 'font-display',
    body: 'font-body',
    mono: 'font-mono',
  },
  type: {
    displayXxlSize: 'type-display-xxl-size',
    displayXxlLh: 'type-display-xxl-lh',
    displayXxlTracking: 'type-display-xxl-tracking',
    displayXlSize: 'type-display-xl-size',
    displayXlLh: 'type-display-xl-lh',
    displayXlTracking: 'type-display-xl-tracking',
    displayLgSize: 'type-display-lg-size',
    displayLgLh: 'type-display-lg-lh',
    displayLgTracking: 'type-display-lg-tracking',
    displayMdSize: 'type-display-md-size',
    displayMdLh: 'type-display-md-lh',
    displayMdTracking: 'type-display-md-tracking',
    headingLgSize: 'type-heading-lg-size',
    headingLgLh: 'type-heading-lg-lh',
    headingLgTracking: 'type-heading-lg-tracking',
    headingMdSize: 'type-heading-md-size',
    headingMdLh: 'type-heading-md-lh',
    headingMdTracking: 'type-heading-md-tracking',
    headingSmSize: 'type-heading-sm-size',
    headingSmLh: 'type-heading-sm-lh',
    headingSmTracking: 'type-heading-sm-tracking',
    bodyLgSize: 'type-body-lg-size',
    bodyLgLh: 'type-body-lg-lh',
    bodyLgTracking: 'type-body-lg-tracking',
    bodyMdSize: 'type-body-md-size',
    bodyMdLh: 'type-body-md-lh',
    bodyMdTracking: 'type-body-md-tracking',
    bodyTabularSize: 'type-body-tabular-size',
    bodyTabularLh: 'type-body-tabular-lh',
    bodyTabularTracking: 'type-body-tabular-tracking',
    buttonMdSize: 'type-button-md-size',
    buttonMdLh: 'type-button-md-lh',
    buttonSmSize: 'type-button-sm-size',
    buttonSmLh: 'type-button-sm-lh',
    captionSize: 'type-caption-size',
    captionLh: 'type-caption-lh',
    captionTracking: 'type-caption-tracking',
    microSize: 'type-micro-size',
    microLh: 'type-micro-lh',
    microCapSize: 'type-micro-cap-size',
    microCapLh: 'type-micro-cap-lh',
    microCapTracking: 'type-micro-cap-tracking',
  },
  space: {
    xxs: 'space-xxs',
    xs: 'space-xs',
    sm: 'space-sm',
    md: 'space-md',
    lg: 'space-lg',
    xl: 'space-xl',
    xxl: 'space-xxl',
    huge: 'space-huge',
  },
  radius: {
    xs: 'radius-xs',
    sm: 'radius-sm',
    md: 'radius-md',
    lg: 'radius-lg',
    xl: 'radius-xl',
    pill: 'radius-pill',
  },
  shadow: {
    level1: 'shadow-1',
    level2: 'shadow-2',
    focusRing: 'shadow-focus-ring',
  },
  motion: {
    easeOut: 'ease-out',
    durationHover: 'duration-hover',
    durationState: 'duration-state',
    durationPage: 'duration-page',
  },
  layout: {
    containerMax: 'container-max',
    sectionPadMarketing: 'section-pad-marketing',
    sectionPadProduct: 'section-pad-product',
    navHeight: 'nav-h',
  },
} as const;

export const vars = createGlobalThemeContract(contractShape);

createGlobalTheme(':root', vars, {
  color: colors,
  font: fontFamily,
  type: {
    displayXxlSize: typeScale.displayXxl.size,
    displayXxlLh: typeScale.displayXxl.lineHeight,
    displayXxlTracking: typeScale.displayXxl.tracking,
    displayXlSize: typeScale.displayXl.size,
    displayXlLh: typeScale.displayXl.lineHeight,
    displayXlTracking: typeScale.displayXl.tracking,
    displayLgSize: typeScale.displayLg.size,
    displayLgLh: typeScale.displayLg.lineHeight,
    displayLgTracking: typeScale.displayLg.tracking,
    displayMdSize: typeScale.displayMd.size,
    displayMdLh: typeScale.displayMd.lineHeight,
    displayMdTracking: typeScale.displayMd.tracking,
    headingLgSize: typeScale.headingLg.size,
    headingLgLh: typeScale.headingLg.lineHeight,
    headingLgTracking: typeScale.headingLg.tracking,
    headingMdSize: typeScale.headingMd.size,
    headingMdLh: typeScale.headingMd.lineHeight,
    headingMdTracking: typeScale.headingMd.tracking,
    headingSmSize: typeScale.headingSm.size,
    headingSmLh: typeScale.headingSm.lineHeight,
    headingSmTracking: typeScale.headingSm.tracking,
    bodyLgSize: typeScale.bodyLg.size,
    bodyLgLh: typeScale.bodyLg.lineHeight,
    bodyLgTracking: typeScale.bodyLg.tracking,
    bodyMdSize: typeScale.bodyMd.size,
    bodyMdLh: typeScale.bodyMd.lineHeight,
    bodyMdTracking: typeScale.bodyMd.tracking,
    bodyTabularSize: typeScale.bodyTabular.size,
    bodyTabularLh: typeScale.bodyTabular.lineHeight,
    bodyTabularTracking: typeScale.bodyTabular.tracking,
    buttonMdSize: typeScale.buttonMd.size,
    buttonMdLh: typeScale.buttonMd.lineHeight,
    buttonSmSize: typeScale.buttonSm.size,
    buttonSmLh: typeScale.buttonSm.lineHeight,
    captionSize: typeScale.caption.size,
    captionLh: typeScale.caption.lineHeight,
    captionTracking: typeScale.caption.tracking,
    microSize: typeScale.micro.size,
    microLh: typeScale.micro.lineHeight,
    microCapSize: typeScale.microCap.size,
    microCapLh: typeScale.microCap.lineHeight,
    microCapTracking: typeScale.microCap.tracking,
  },
  space,
  radius,
  shadow,
  motion,
  layout,
});
