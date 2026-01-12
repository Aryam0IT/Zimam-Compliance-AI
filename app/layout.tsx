import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zimam',
  description: 'Zimam Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
