import { Comfortaa } from 'next/font/google';
import React from 'react';

import { RootLayout } from '@/components/shared/layouts/RootLayout';
import { RootTitle } from '@/components/shared/layouts/RootLayout/title';
import { Analytics } from '@vercel/analytics/react';

import '@assets/styles/__global.css';
import '@assets/styles/__reset.css';
import '@assets/styles/__variables.css';

const comfortaa = Comfortaa({ subsets: ['latin', 'cyrillic'], weight: ['300', '400', '500', '700'], preload: true });

const Layout = () => {
    return (
        <html lang='en'>
            <head>
                <RootTitle />
                <meta
                    name='description'
                    content='Hi there, I’m Daniil. 22 y.o. Frontend Developer based in Belgrad, Serbia'
                />

                <link rel='icon' href='/favicon/favicon-16x16.png' type='image/png' sizes='16x16' />
                <link rel='icon' href='/favicon/favicon-32x32.png' type='image/png' sizes='32x32' />

                <link rel='apple-touch-icon' href='/favicon/favicon-32x32.png' type='image/png' sizes='32x32' />

                <meta property='og:title' content='Daniil Nikoniuk - Frontend Developer' />
                <meta property='og:site_name' content='Daniil Nikoniuk - Frontend Developer' />
                <meta property='og:url' content='nikoni.uk' />
                <meta property='og:description' content='22 y.o. Frontend Developer based in Belgrad, Serbia' />
                <meta property='og:type' content='website' />
                <meta property='og:image' content='https://nikoni.uk/images/opengraph.png' />
                <meta name='twitter:card' content='summary' />
                <meta name='twitter:site' content='@nev1d' />
                <meta name='twitter:title' content='Daniil Nikoniuk - Frontend Developer' />
                <meta name='twitter:description' content='22 y.o. Frontend Developer based in Belgrad, Serbia' />
                <meta name='twitter:image' content='https://nikoni.uk/images/opengraph.png' />
            </head>
            <body className={comfortaa.className}>
                <RootLayout />
                <Analytics />
            </body>
        </html>
    );
};

export default Layout;
