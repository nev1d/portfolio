'use client';

import React, { useEffect, useState } from 'react';

import { AnimatedElement } from '@/components/core/animation/AnimatedElement';
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

    return animationOrder.map((currentRoute) => {
        if (!currentRoute) return;

        const visible = currentRoute === pathName;

        const Component = PageConfig[currentRoute as PagesEnum];

        const animation = PageAnimationConfig[currentRoute as PagesEnum];

        return (
            <AnimatedElement visible={visible} animation={animation} key={currentRoute}>
                {(ref) => {
                    return (
                        <div ref={ref} className={cn.animation}>
                            <Component />
                        </div>
                    );
                }}
            </AnimatedElement>
        );
    });
};
