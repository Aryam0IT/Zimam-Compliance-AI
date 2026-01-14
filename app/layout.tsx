import './globals.css';
import type { Metadata } from 'next';
import { LangProvider } from './components/LangProvider';

export const metadata: Metadata = {
  title: 'Zimam',
  description: 'Zimam Dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
