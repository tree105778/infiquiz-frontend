export const space = {
  xxs: '2px',
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  xxl: '32px',
  huge: '64px',
} as const;

export const radius = {
  xs: '4px',
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  pill: '9999px',
} as const;

export const shadow = {
  level1: '0 1px 3px rgba(0, 55, 112, 0.08)',
  level2: '0 8px 24px rgba(0, 55, 112, 0.08), 0 2px 6px rgba(0, 55, 112, 0.04)',
  focusRing: '0 0 0 3px rgba(83, 58, 253, 0.16)',
} as const;

export const motion = {
  easeOut: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
  durationHover: '160ms',
  durationState: '240ms',
  durationPage: '480ms',
} as const;

export const layout = {
  containerMax: '1200px',
  sectionPadMarketing: '96px',
  sectionPadProduct: '48px',
  navHeight: '64px',
} as const;
