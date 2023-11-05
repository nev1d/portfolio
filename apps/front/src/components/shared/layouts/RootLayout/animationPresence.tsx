'use client';

import React, { PropsWithChildren } from 'react';

import { PageLoader } from '@/components/shared/PageLoader';
import { useAppStore } from '@/store/app';

import { AnimatePresence } from 'framer-motion';

export const RootLayoutAnimationPresence: React.FC<PropsWithChildren> = ({ children }) => {
    const loaded = useAppStore((store) => store.loaded);

    return <AnimatePresence>{loaded ? children : <PageLoader key='loader' />}</AnimatePresence>;
};
