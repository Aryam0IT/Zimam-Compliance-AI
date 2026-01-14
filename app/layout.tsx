import './globals.css';
import type { Metadata } from 'next';
import LangProvider from './components/LangProvider'; // ✅ بدون {}

export const metadata: Metadata = {
  title: 'Zimam',
  description: 'Zimam Dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <LangProvider defaultLang="en">{children}</LangProvider>
      </body>
    </html>
  );
}
