import localFont from 'next/font/local';

export const pretendard = localFont({
  // 가변 폰트 1개로 100–900 전 weight를 커버한다.
  // 기존 9개 OTF(각 ~1.5MB) → 단일 가변 woff2(~2MB)로 교체:
  //   prod preload 링크 9개 → 1개, 강제 fetch 용량 ~13MB → ~2MB.
  // 💡 src/app/ 에서 최상단 public/ 까지 ../../ 로 도달한다.
  src: '../../public/fonts/PretendardVariable.woff2',
  weight: '100 900',
  style: 'normal',
  variable: '--font-pretendard',
  display: 'swap',
});
