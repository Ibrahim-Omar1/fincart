import { Inter } from 'next/font/google';
import React from 'react';

import type { Metadata } from 'next';

import Header from '@/components/header';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next.js 15 E-commerce',
  description: 'Modern e-commerce app built with Next.js 15',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
