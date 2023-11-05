import { headers } from 'next/headers';
import React from 'react';

import { Scene } from '@/components/feature/scene';
import { AnimatedPageLayout } from '@/components/shared/layouts/AnimatedPageLayout';
import { MainLayout } from '@/components/shared/layouts/MainLayout';
import { WithPageLoader } from '@/components/shared/layouts/RootLayout/withPageLoader';
import { WithPageUtils } from '@/components/shared/layouts/RootLayout/withPageUtils';
import { WithResizeSubscriber } from '@/components/shared/layouts/RootLayout/withResizeSubscriber';
import { SoonPlaceholder } from '@/components/shared/SoonPlaceholder';

import isMobile from 'is-mobile';

export const RootLayout = () => {
    const headersList = headers();
    const userAgent = headersList.get('user-agent');

    return (
        <WithResizeSubscriber>
            {isMobile({ ua: userAgent || '' }) ? (
                <SoonPlaceholder />
            ) : (
                <WithPageUtils>
                    <Scene />
                    <WithPageLoader>
                        <MainLayout>
                            <AnimatedPageLayout />
                        </MainLayout>
                    </WithPageLoader>
                </WithPageUtils>
            )}
        </WithResizeSubscriber>
    );
};
