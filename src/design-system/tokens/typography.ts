export const fontFamily = {
  display: `"Pretendard", "SF Pro Display", system-ui, -apple-system, sans-serif`,
  body: `"Pretendard", "SF Pro Display", system-ui, -apple-system, sans-serif`,
  mono: `var(--font-jetbrains-mono), "JetBrains Mono", ui-monospace, Menlo, Consolas, monospace`,
} as const;

type Scale = {
  size: string;
  lineHeight: string;
  tracking: string;
};

export const typeScale = {
  displayXxl: { size: '56px', lineHeight: '1.03', tracking: '-1.4px' },
  displayXl: { size: '48px', lineHeight: '1.15', tracking: '-0.96px' },
  displayLg: { size: '32px', lineHeight: '1.1', tracking: '-0.64px' },
  displayMd: { size: '26px', lineHeight: '1.12', tracking: '-0.26px' },
  headingLg: { size: '22px', lineHeight: '1.1', tracking: '-0.22px' },
  headingMd: { size: '20px', lineHeight: '1.4', tracking: '-0.2px' },
  headingSm: { size: '18px', lineHeight: '1.4', tracking: '0' },
  bodyLg: { size: '16px', lineHeight: '1.4', tracking: '0' },
  bodyMd: { size: '15px', lineHeight: '1.4', tracking: '0' },
  bodyTabular: { size: '14px', lineHeight: '1.4', tracking: '-0.42px' },
  buttonMd: { size: '16px', lineHeight: '1', tracking: '0' },
  buttonSm: { size: '14px', lineHeight: '1', tracking: '0' },
  caption: { size: '13px', lineHeight: '1.4', tracking: '-0.39px' },
  micro: { size: '11px', lineHeight: '1.4', tracking: '0' },
  microCap: { size: '10px', lineHeight: '1.15', tracking: '0.1px' },
} as const satisfies Record<string, Scale>;

export type TypeScaleKey = keyof typeof typeScale;
