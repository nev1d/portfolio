'use client';

import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { PageAnimationConfig, PageConfig } from '@/app/config';
import { PagesEnum } from '@/constants/pages';
import { useHasBeenMounted } from '@/hooks/useHasBeenMounted';

import cn from './style.module.css';
export const AnimatedPageLayout: React.FC = () => {
    const hasBeenMounted = useHasBeenMounted();

    const pathName = usePathname() as PagesEnum;

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
