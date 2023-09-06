'use client';

import React from 'react';

import { MenuLights } from '@/components/feature/main/menu/Lights';
import { MenuList } from '@/components/feature/main/menu/MenuList';
import { MenuReflector } from '@/components/feature/main/menu/Reflector';
import { Physics } from '@react-three/cannon';
import { CameraControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import cn from './style.module.css';

export const Menu = () => {
    return (
        <div className={cn.wrapper}>
            <Canvas shadows gl={{ alpha: false }} camera={{ position: [-10, 35, 45], fov: 50 }}>
                <fog attach='fog' args={['#1d1d20', 45, 95]} />
                <color attach='background' args={['#1d1d20']} />
                {/* Lights */}
                <MenuLights />

                {/* Camera */}
                <CameraControls makeDefault />

                <Physics gravity={[0, -20, 0]}>
                    <MenuList />
                    <MenuReflector />
                </Physics>
            </Canvas>
        </div>
    );
};
