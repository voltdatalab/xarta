import type { Metadata } from "next";
import {NextIntlClientProvider} from 'next-intl';
import {getLocale} from 'next-intl/server';

import "./globals.css";


export const metadata: Metadata = {
  title: "Xarta"
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
