import { Comfortaa } from 'next/font/google';
import React from 'react';

const comfortaa = Comfortaa({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body className={comfortaa.className}>{children}</body>
        </html>
    );
}
