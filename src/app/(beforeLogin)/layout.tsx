import type { Metadata } from 'next';
import '../globals.css';
import { pretendard } from '@/app/fonts';

export const metadata: Metadata = {
  title: 'Infiquiz',
  description: '',
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
