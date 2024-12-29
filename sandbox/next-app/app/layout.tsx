import { createTheme } from '@react-universal/core';
import { AppRouterProdivder } from '@react-universal/next';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterProdivder
          theme={createTheme({
            fonts: {
              body: {
                family: inter.style.fontFamily,
              },
              heading: {
                family: inter.style.fontFamily,
              },
              mono: {
                family:
                  'ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro", "Fira Mono", "Droid Sans Mono", "Courier New", monospace',
              },
            },
          })}
        >
          {children}
        </AppRouterProdivder>
      </body>
    </html>
  );
}
