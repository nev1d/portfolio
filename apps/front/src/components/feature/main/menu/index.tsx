'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

import { useIsomorphicLayoutEffect } from 'framer-motion';

import { MenuBackground } from '@/components/feature/main/menu/Backround';
import { MenuCamera } from '@/components/feature/main/menu/Camera';
import { MenuLights } from '@/components/feature/main/menu/Lights';
import { MenuList } from '@/components/feature/main/menu/MenuList';
import { PagesEnum } from '@/constants/pages';
import { MenuStatus, useMenuStore } from '@/store/menu/menuStore';
import { Physics } from '@react-three/cannon';
import { Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import cn from './style.module.css';

export const Menu = () => {
    const setMenuStatus = useMenuStore((store) => store.setMenuStatus);

    const pathName = usePathname() as PagesEnum;

    useIsomorphicLayoutEffect(() => {
        if (pathName === PagesEnum.MAIN) {
            setMenuStatus(MenuStatus.INITIAL);
        } else {
            setMenuStatus(MenuStatus.OPEN);
        }
    }, [pathName]);

    return (
        <div className={cn.wrapper}>
            <Canvas shadows gl={{ alpha: false }} camera={{ position: [0, 15, 55], fov: 50 }}>
                {/* Background and Fog */}
                <MenuBackground backgroundColor='#1d1d20' />

                {/* Lights */}
                <MenuLights />

                {/* Camera */}
                <MenuCamera />

                <Stars />

                {/* Physic objects */}
                <Physics gravity={[0, -20, 0]}>
                    <MenuList />
                </Physics>
            </Canvas>
        </div>
    );
};
