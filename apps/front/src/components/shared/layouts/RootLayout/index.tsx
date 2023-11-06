import React from 'react';

import { Scene } from '@/components/feature/scene';
import { AnimatedPageLayout } from '@/components/shared/layouts/AnimatedPageLayout';
import { MainLayout } from '@/components/shared/layouts/MainLayout';
import { WithMediaQueries } from '@/components/shared/layouts/RootLayout/withMediaQueries';
import { WithPageLoader } from '@/components/shared/layouts/RootLayout/withPageLoader';
import { WithPageUtils } from '@/components/shared/layouts/RootLayout/withPageUtils';

export const RootLayout = () => {
    return (
        <WithMediaQueries>
            <WithPageUtils>
                <Scene />
                <WithPageLoader>
                    <MainLayout>
                        <AnimatedPageLayout />
                    </MainLayout>
                </WithPageLoader>
            </WithPageUtils>
        </WithMediaQueries>
    );
};
