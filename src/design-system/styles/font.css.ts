import { globalFontFace } from '@vanilla-extract/css';

// 가변 폰트 단일 @font-face.
// 앱(Next)에서 next/font가 preload하는 PretendardVariable.woff2와 "같은 파일"을
// Storybook/Vite(및 앱의 var() 폴백)용으로 등록한다.
// fontWeight 범위 '100 900' = wght 축 전 구간을 한 파일로 커버.
globalFontFace('Pretendard', {
  src: 'url("/fonts/PretendardVariable.woff2") format("woff2")',
  fontWeight: '100 900',
  fontStyle: 'normal',
  fontDisplay: 'swap',
});
