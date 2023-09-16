'use client';

import { Comfortaa } from 'next/font/google';
import React from 'react';

import { Menu } from '@/components/feature/main/menu';
import { AnimatedPageLayout } from '@/components/shared/layouts/AnimatedPageLayout';

import '@assets/styles/__global.css';
import '@assets/styles/__reset.css';
import '@assets/styles/__variables.css';

const comfortaa = Comfortaa({ subsets: ['latin', 'cyrillic'], weight: ['300', '400', '500', '700'] });

const RootLayout = () => {
    return (
        <html lang='en'>
            <body className={comfortaa.className}>
                <Menu />
                <AnimatedPageLayout />
            </body>
        </html>
    );
};

export default RootLayout;
