import { globalFontFace } from '@vanilla-extract/css';

const PRETENDARD = 'Pretendard';
const FACES = [
  { weight: '100', file: 'Pretendard-Thin.otf' },
  { weight: '200', file: 'Pretendard-ExtraLight.otf' },
  { weight: '300', file: 'Pretendard-Light.otf' },
  { weight: '400', file: 'Pretendard-Regular.otf' },
  { weight: '500', file: 'Pretendard-Medium.otf' },
  { weight: '600', file: 'Pretendard-SemiBold.otf' },
  { weight: '700', file: 'Pretendard-Bold.otf' },
  { weight: '800', file: 'Pretendard-ExtraBold.otf' },
  { weight: '900', file: 'Pretendard-Black.otf' },
] as const;

for (const { weight, file } of FACES) {
  globalFontFace(PRETENDARD, {
    src: `url("/fonts/${file}") format("opentype")`,
    fontWeight: weight,
    fontStyle: 'normal',
    fontDisplay: 'swap',
  });
}
