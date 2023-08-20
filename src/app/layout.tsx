import type { Metadata } from 'next';
import { NextAuthProvider } from '@/app/provider';
import SC from '@/lib/StyledComponentsReg';
import NextTopLoader from 'nextjs-toploader';
import config from '@/app/config';
import './globals.css';
import RouterLoading from './RouterLoading';

export const metadata: Metadata = {
  title: config.APP_KOR_NAME,
  description: config.APP_DESCRIPTION,
  themeColor: config.META_THEME_COLOR,

  openGraph: {
    title: config.APP_KOR_NAME,
    description: config.APP_DESCRIPTION,
    siteName: config.APP_KOR_NAME,
    locale: 'ko_KR',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang='ko'>
      <body>
        <NextAuthProvider>
          <SC>
            <RouterLoading />
            {children}
          </SC>
        </NextAuthProvider>
      </body>
    </html>
  );
}
