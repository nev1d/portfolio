'use client';

import { Comfortaa } from 'next/font/google';
import React from 'react';

import { AnimatePresence } from 'framer-motion';

import { Scene } from '@/components/feature/scene';
import { AnimatedPageLayout } from '@/components/shared/layouts/AnimatedPageLayout';
import { MainLayout } from '@/components/shared/layouts/MainLayout';
import { PageLoader } from '@/components/shared/PageLoader';
import { PageMetadata } from '@/constants/pages/metadata';
import { useCurrentPathname } from '@/hooks/useCurrentPathname';
import { useAppStore } from '@/store/app';

import '@assets/styles/__global.css';
import '@assets/styles/__reset.css';
import '@assets/styles/__variables.css';

const comfortaa = Comfortaa({ subsets: ['latin', 'cyrillic'], weight: ['300', '400', '500', '700'], preload: true });

const RootLayout = () => {
    const loaded = useAppStore((store) => store.loaded);
    const pathname = useCurrentPathname();

    const title = `Daniil Nikoniuk - ${PageMetadata[pathname].title}`;

    return (
        <html lang='en'>
            <head>
                <title>{title}</title>
                <meta
                    name='description'
                    content='Hi there, I’m Daniil. 21 y.o. Frontend Developer based in Belgrad, Serbia'
                />

                <link rel='icon' href='/favicon/favicon-16x16.png' type='image/png' sizes='16x16' />
                <link rel='icon' href='/favicon/favicon-32x32.png' type='image/png' sizes='32x32' />

                <link rel='apple-touch-icon' href='/favicon/favicon-32x32.png' type='image/png' sizes='32x32' />

                <meta property='og:title' content='Daniil Nikoniuk - Frontend Developer' />
                <meta property='og:site_name' content='Daniil Nikoniuk - Frontend Developer' />
                <meta property='og:url' content='nikoni.uk' />
                <meta property='og:description' content='21 y.o. Frontend Developer based in Belgrad, Serbia' />
                <meta property='og:type' content='website' />
                <meta property='og:image' content='' />
                <meta name='twitter:card' content='summary' />
                <meta name='twitter:site' content='@nev1d' />
                <meta name='twitter:title' content='Daniil Nikoniuk - Frontend Developer' />
                <meta name='twitter:description' content='21 y.o. Frontend Developer based in Belgrad, Serbia' />
            </head>
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
