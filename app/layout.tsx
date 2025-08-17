import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Astral Explorers - Astronomy Club',
  description: 'Join us in exploring the wonders of the universe. Professional astronomy club dedicated to celestial observation and space education.',
  keywords: 'astronomy, stargazing, telescope, space, planets, constellations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-space-navy overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}