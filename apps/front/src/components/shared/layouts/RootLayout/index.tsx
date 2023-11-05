import React from 'react';

import { Scene } from '@/components/feature/scene';
import { AnimatedPageLayout } from '@/components/shared/layouts/AnimatedPageLayout';
import { MainLayout } from '@/components/shared/layouts/MainLayout';
import { WithPageLoader } from '@/components/shared/layouts/RootLayout/withPageLoader';
import { WithPageUtils } from '@/components/shared/layouts/RootLayout/withPageUtils';
import { WithResizeSubscriber } from '@/components/shared/layouts/RootLayout/withResizeSubscriber';

export const RootLayout = () => {
    return (
        <WithResizeSubscriber>
            <WithPageUtils>
                <Scene />
                <WithPageLoader>
                    <MainLayout>
                        <AnimatedPageLayout />
                    </MainLayout>
                </WithPageLoader>
            </WithPageUtils>
        </WithResizeSubscriber>
    );
};
