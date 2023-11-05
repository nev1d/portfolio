import { headers } from 'next/headers';
import React from 'react';

import { Scene } from '@/components/feature/scene';
import { AnimatedPageLayout } from '@/components/shared/layouts/AnimatedPageLayout';
import { MainLayout } from '@/components/shared/layouts/MainLayout';
import { RootLayoutAnimationPresence } from '@/components/shared/layouts/RootLayout/animationPresence';
import { SoonPlaceholder } from '@/components/shared/SoonPlaceholder';

import isMobile from 'is-mobile';

export const RootLayout = () => {
    const headersList = headers();
    const userAgent = headersList.get('user-agent');

    return isMobile({ ua: userAgent || '' }) ? (
        <SoonPlaceholder />
    ) : (
        <>
            <Scene />
            <RootLayoutAnimationPresence>
                <MainLayout>
                    <AnimatedPageLayout />
                </MainLayout>
            </RootLayoutAnimationPresence>
        </>
    );
};
