'use client';

import { Comfortaa } from 'next/font/google';
import React from 'react';

import { AnimatePresence } from 'framer-motion';

import { Scene } from '@/components/feature/scene';
import { AnimatedPageLayout } from '@/components/shared/layouts/AnimatedPageLayout';
import { MainLayout } from '@/components/shared/layouts/MainLayout';
import { PageLoader } from '@/components/shared/PageLoader';
import { useAppStore } from '@/store/app';

import '@assets/styles/__global.css';
import '@assets/styles/__reset.css';
import '@assets/styles/__variables.css';

const comfortaa = Comfortaa({ subsets: ['latin', 'cyrillic'], weight: ['300', '400', '500', '700'], preload: true });

const RootLayout = () => {
    const loaded = useAppStore((store) => store.loaded);

    return (
        <html lang='en'>
            <body className={comfortaa.className}>
                <Scene />
                <AnimatePresence>
                    {loaded ? (
                        <MainLayout>
                            <AnimatedPageLayout />
                        </MainLayout>
                    ) : (
                        <PageLoader key='loader' />
                    )}
                </AnimatePresence>
            </body>
        </html>
    );
};

export default RootLayout;
