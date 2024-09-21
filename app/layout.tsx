import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { MantineProvider } from '@mantine/core';
import StyledComponentsRegistry from './registry';
import { theme } from '@/theme';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Weather Dashboard',
  description: 'Weather Dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MantineProvider
          theme={theme}
          defaultColorScheme={'light'}
          forceColorScheme='light'
        >
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </MantineProvider>
      </body>
    </html>
  );
}
