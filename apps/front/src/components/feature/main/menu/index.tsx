'use client';

import React from 'react';

import { MenuBackground } from '@/components/feature/main/menu/Backround';
import { MenuCamera } from '@/components/feature/main/menu/Camera';
import { MenuLights } from '@/components/feature/main/menu/Lights';
import { MenuList } from '@/components/feature/main/menu/MenuList';
import { MenuReflector } from '@/components/feature/main/menu/Reflector';
import { Physics } from '@react-three/cannon';
import { Canvas } from '@react-three/fiber';

import cn from './style.module.css';

export const Menu = () => {
    return (
        <div className={cn.wrapper}>
            <Canvas shadows gl={{ alpha: false }} camera={{ position: [-10, 15, 55], fov: 50 }}>
                {/* Background and Fog */}
                <MenuBackground backgroundColor='#1d1d20' />

                {/* Lights */}
                <MenuLights />

                {/* Camera */}
                <MenuCamera />

                {/* Physic objects */}
                <Physics gravity={[0, -20, 0]}>
                    <MenuList />
                    <MenuReflector />
                </Physics>
            </Canvas>
        </div>
    );
};
