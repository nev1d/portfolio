'use client';

import React, { Suspense } from 'react';

import { AnimatePresence, useIsomorphicLayoutEffect } from 'framer-motion';

import { Background } from '@/components/feature/scene/Backround';
import { Camera } from '@/components/feature/scene/Camera';
import { CanvasLoader } from '@/components/feature/scene/CanvasLoader';
import { Lights } from '@/components/feature/scene/Lights';
import { Face } from '@/components/feature/scene/models/Face';
import { MenuList } from '@/components/feature/scene/models/menu/MenuList';
import { SkillsModels } from '@/components/feature/skills/SkillsModels';
import { PagesEnum } from '@/constants/pages';
import { useCurrentPathname } from '@/hooks/useCurrentPathname';
import { useAppStore } from '@/store/app';
import { MenuStatus, useMenuStore } from '@/store/menu/menuStore';
import { Physics } from '@react-three/cannon';
import { Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import cn from './style.module.css';

export const Scene = () => {
    const setMenuStatus = useMenuStore((store) => store.setMenuStatus);
    const setHasBeenInitialized = useMenuStore((store) => store.setHasBeenInitialized);
    const setAppLoaded = useAppStore((store) => store.setAppLoaded);

    const pathName = useCurrentPathname();

    useIsomorphicLayoutEffect(() => {
        if (pathName === PagesEnum.MAIN) {
            setMenuStatus(MenuStatus.INITIAL);
        } else {
            setMenuStatus(MenuStatus.OPEN);
            setHasBeenInitialized();
            setAppLoaded();
        }
    }, [pathName]);

    return (
        <div className={cn.wrapper}>
            <Canvas shadows gl={{ alpha: false }} camera={{ position: [0, 15, 55], fov: 50 }}>
                <AnimatePresence>
                    <Suspense fallback={<CanvasLoader />}>
                        {/* Background and Fog */}
                        <Background backgroundColor='#1d1d20' />

                        {/* Lights */}
                        <Lights />

                        {/* Camera */}
                        <Camera />

                        <Stars />

                        {/* Physic objects */}
                        <Physics gravity={[0, -20, 0]}>
                            <MenuList />

                            {/* About Models */}
                            <Face />

                            {/* Skills Models */}
                            <SkillsModels />
                        </Physics>
                    </Suspense>
                </AnimatePresence>
            </Canvas>
        </div>
    );
};
