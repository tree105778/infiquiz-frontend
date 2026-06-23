import type { Metadata } from 'next';
import '@/app/globals.css';
import { pretendard } from '@/app/fonts';

export const metadata: Metadata = {
  title: 'Infiquiz',
  description: '무한으로 즐기는 생성형 AI 퀴즈',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
