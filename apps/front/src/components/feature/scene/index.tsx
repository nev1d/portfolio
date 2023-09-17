'use client';

import React from 'react';

import { useIsomorphicLayoutEffect } from 'framer-motion';

import { Background } from '@/components/feature/scene/Backround';
import { Camera } from '@/components/feature/scene/Camera';
import { Lights } from '@/components/feature/scene/Lights';
import Face from '@/components/shared/models/Face';
import { MenuList } from '@/components/shared/models/menu/MenuList';
import { PagesEnum } from '@/constants/pages';
import { useCurrentPathname } from '@/hooks/useCurrentPathname';
import { MenuStatus, useMenuStore } from '@/store/menu/menuStore';
import { Physics } from '@react-three/cannon';
import { Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import cn from './style.module.css';

export const Scene = () => {
    const setMenuStatus = useMenuStore((store) => store.setMenuStatus);
    const setHasBeenInitialized = useMenuStore((store) => store.setHasBeenInitialized);

    const pathName = useCurrentPathname();

    useIsomorphicLayoutEffect(() => {
        if (pathName === PagesEnum.MAIN) {
            setMenuStatus(MenuStatus.INITIAL);
        } else {
            setMenuStatus(MenuStatus.OPEN);
            setHasBeenInitialized();
        }
    }, [pathName]);

    return (
        <div className={cn.wrapper}>
            <Canvas shadows gl={{ alpha: false }} camera={{ position: [0, 15, 55], fov: 50 }}>
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
                    <Face />
                </Physics>
            </Canvas>
        </div>
    );
};
