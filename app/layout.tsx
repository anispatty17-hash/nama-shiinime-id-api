import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Shiinime ID API',
  description: 'Production-ready proxy API for Android clients',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
