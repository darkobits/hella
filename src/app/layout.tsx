'use client';

import 'bootstrap/dist/css/bootstrap.css';
import 'etc/global-styles.css';

import importDynamic from 'next/dynamic';
import React from 'react';


export const dynamic = 'force-dynamic';


const App = importDynamic(() => import('app/App'), { ssr: false });


/**
 * TODO: Migrate this to server side headers.
 *
 * <meta
 *   name="Content-Security-Policy"
 *   content="
 *     default-src 'self';
 *     font-src 'self' fonts.googleapis.com fonts.gstatic.com;
 *   "
 * />
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-bs-theme="dark">
      <head>
        <title>Hella</title>
        <meta charSet="utf-8" />
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <App>
          {children}
        </App>
      </body>
    </html>
  );
}
