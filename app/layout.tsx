import type { Metadata } from 'next';
import { Nunito, Comfortaa } from 'next/font/google';

import { Layout } from '@/Components/Layout';
import Providers from './Providers';
import './globals.css';

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  display: 'swap',
});

const comfortaa = Comfortaa({
  variable: '--font-comfortaa',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Vidya Bridge - Educational Sponsorship Platform',
  description: 'Transparent educational sponsorship for children in India using blockchain technology',
  keywords: ['education', 'sponsorship', 'blockchain', 'transparency', 'India', 'children'],
  authors: [{ name: 'Vidya Bridge Team' }],
  openGraph: {
    title: 'Vidya Bridge - Educational Sponsorship Platform',
    description: 'Transparent educational sponsorship for children in India using blockchain technology',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vidya Bridge - Educational Sponsorship Platform',
    description: 'Transparent educational sponsorship for children in India using blockchain technology',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${nunito.variable} ${comfortaa.variable} antialiased h-full`}>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
