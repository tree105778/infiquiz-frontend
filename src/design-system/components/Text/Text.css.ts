import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../../tokens/contract.css';

export const text = recipe({
  base: {
    margin: 0,
  },
  variants: {
    variant: {
      displayXxl: {
        fontFamily: vars.font.display,
        fontSize: vars.type.displayXxlSize,
        lineHeight: vars.type.displayXxlLh,
        letterSpacing: '-2.2px',
        fontWeight: 300,
      },
      displayXl: {
        fontFamily: vars.font.display,
        fontSize: vars.type.displayXlSize,
        lineHeight: vars.type.displayXlLh,
        letterSpacing: '-1.6px',
        fontWeight: 300,
      },
      displayLg: {
        fontFamily: vars.font.display,
        fontSize: vars.type.displayLgSize,
        lineHeight: vars.type.displayLgLh,
        letterSpacing: '-1px',
        fontWeight: 300,
      },
      displayMd: {
        fontFamily: vars.font.display,
        fontSize: vars.type.displayMdSize,
        lineHeight: vars.type.displayMdLh,
        letterSpacing: '-0.6px',
        fontWeight: 300,
      },
      headingLg: {
        fontFamily: vars.font.display,
        fontSize: vars.type.headingLgSize,
        lineHeight: vars.type.headingLgLh,
        letterSpacing: '-0.4px',
        fontWeight: 300,
      },
      headingMd: {
        fontFamily: vars.font.display,
        fontSize: vars.type.headingMdSize,
        lineHeight: vars.type.headingMdLh,
        letterSpacing: '-0.3px',
        fontWeight: 300,
      },
      headingSm: {
        fontFamily: vars.font.display,
        fontSize: vars.type.headingSmSize,
        lineHeight: vars.type.headingSmLh,
        letterSpacing: 0,
        fontWeight: 500,
      },
      bodyLg: {
        fontFamily: vars.font.body,
        fontSize: vars.type.bodyLgSize,
        lineHeight: vars.type.bodyLgLh,
        letterSpacing: 0,
        fontWeight: 400,
      },
      bodyMd: {
        fontFamily: vars.font.body,
        fontSize: vars.type.bodyMdSize,
        lineHeight: vars.type.bodyMdLh,
        letterSpacing: 0,
        fontWeight: 400,
      },
      bodyTabular: {
        fontFamily: vars.font.body,
        fontSize: vars.type.bodyTabularSize,
        lineHeight: vars.type.bodyTabularLh,
        letterSpacing: vars.type.bodyTabularTracking,
        fontWeight: 400,
        fontFeatureSettings: '"tnum"',
        fontVariantNumeric: 'tabular-nums',
      },
      buttonMd: {
        fontFamily: vars.font.display,
        fontSize: vars.type.buttonMdSize,
        lineHeight: vars.type.buttonMdLh,
        letterSpacing: 0,
        fontWeight: 500,
      },
      buttonSm: {
        fontFamily: vars.font.display,
        fontSize: vars.type.buttonSmSize,
        lineHeight: vars.type.buttonSmLh,
        letterSpacing: 0,
        fontWeight: 500,
      },
      caption: {
        fontFamily: vars.font.body,
        fontSize: vars.type.captionSize,
        lineHeight: vars.type.captionLh,
        letterSpacing: vars.type.captionTracking,
        fontWeight: 400,
        fontFeatureSettings: '"tnum"',
        fontVariantNumeric: 'tabular-nums',
      },
      micro: {
        fontFamily: vars.font.body,
        fontSize: vars.type.microSize,
        lineHeight: vars.type.microLh,
        letterSpacing: 0,
        fontWeight: 400,
      },
      microCap: {
        fontFamily: vars.font.display,
        fontSize: vars.type.microCapSize,
        lineHeight: vars.type.microCapLh,
        letterSpacing: vars.type.microCapTracking,
        fontWeight: 500,
        textTransform: 'uppercase',
      },
    },
    tone: {
      default: {},
      ink: { color: vars.color.ink },
      inkSecondary: { color: vars.color.inkSecondary },
      inkMute: { color: vars.color.inkMute },
      onPrimary: { color: vars.color.onPrimary },
      primary: { color: vars.color.primary },
      ruby: { color: vars.color.ruby },
    },
    tabular: {
      true: {
        fontVariantNumeric: 'tabular-nums',
        fontFeatureSettings: '"tnum"',
        letterSpacing: '-0.01em',
      },
    },
    align: {
      left: { textAlign: 'left' },
      center: { textAlign: 'center' },
      right: { textAlign: 'right' },
    },
  },
  defaultVariants: {
    variant: 'bodyMd',
    tone: 'default',
  },
});

// Standalone class for tabular numerics anywhere (replaces .tnum utility).
export const tabularNums = style({
  fontVariantNumeric: 'tabular-nums',
  fontFeatureSettings: '"tnum"',
  letterSpacing: '-0.01em',
});
