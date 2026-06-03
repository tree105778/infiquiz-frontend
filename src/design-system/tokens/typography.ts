// 앱(Next)에서는 next/font가 `--font-pretendard`를 주입한다(자동 preload + size-adjust 폴백으로 CLS↓).
// var() 폴백 `"Pretendard"`는 next/font가 없는 환경(Storybook/Vite 등)에서
// font.css.ts의 globalFontFace로 등록된 "Pretendard" 페이스로 떨어지게 한다.
// ⚠️ 폴백 인자가 없으면 변수 미정의 시 font-family 선언 전체가 무효화(IACVT)되므로 반드시 필요.
const pretendard = `var(--font-pretendard, "Pretendard")`;

export const fontFamily = {
  display: `${pretendard}, "SF Pro Display", system-ui, -apple-system, sans-serif`,
  body: `${pretendard}, "SF Pro Display", system-ui, -apple-system, sans-serif`,
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
