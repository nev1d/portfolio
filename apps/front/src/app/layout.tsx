'use client';
import { Comfortaa } from 'next/font/google';
import React from 'react';

import { AnimatedPageLayout } from '@/components/shared/layouts/AnimatedPageLayout';

const comfortaa = Comfortaa({ subsets: ['latin', 'cyrillic'], weight: ['300', '400', '500', '700'] });

const RootLayout = () => {
    return (
        <html lang='en'>
            <body className={comfortaa.className}>
                <AnimatedPageLayout />
            </body>
        </html>
    );
};

export default RootLayout;
