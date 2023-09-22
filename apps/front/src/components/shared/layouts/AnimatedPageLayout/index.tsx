'use client';

import React, { useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { PagesEnum } from '@/constants/pages';
import { PageAnimationConfig, PageConfig } from '@/constants/pages/animation';
import { useCurrentPathname } from '@/hooks/useCurrentPathname';
import { useHasBeenMounted } from '@/hooks/useHasBeenMounted';

import cn from './style.module.css';
export const AnimatedPageLayout: React.FC = () => {
    const hasBeenMounted = useHasBeenMounted();

    const pathName = useCurrentPathname();

    const [animationOrder, setAnimationOrder] = useState<[PagesEnum | string | null, PagesEnum]>([null, pathName]);

    useEffect(() => {
        if (!hasBeenMounted) return;

        setAnimationOrder((prev) => {
            return [prev[1], pathName];
        });
    }, [pathName]);

    return (
        <AnimatePresence>
            {animationOrder.map((currentRoute) => {
                if (!currentRoute) return;

                const visible = currentRoute == pathName;

                const Component = PageConfig[currentRoute as PagesEnum];

                const animation = PageAnimationConfig[currentRoute as PagesEnum];

                if (!visible) return null;

                return (
                    <motion.div {...animation} key={currentRoute} className={cn.animation}>
                        <Component />
                    </motion.div>
                );
            })}
        </AnimatePresence>
    );
};
