'use client';

import React from 'react';

import { MenuList } from '@/components/feature/main/menu/MenuList';
import { Physics } from '@react-three/cannon';
import { CameraControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import cn from './style.module.css';

export const Menu = () => {
    return (
        <div className={cn.wrapper}>
            <Canvas shadows gl={{ alpha: false }} camera={{ position: [-10, 35, 45], fov: 50 }}>
                <color attach='background' args={['#000000']} />
                {/* Lights */}
                <ambientLight color={'#CCCCCC'} />
                <directionalLight args={[0xffffff, 1]} position={[5, 5, 20]} />
                <directionalLight args={[0xffffff, 0.5]} position={[-5, -5, -20]} />

                {/* Camera */}
                <CameraControls makeDefault />

                <Physics gravity={[0, -20, 0]}>
                    <MenuList />
                </Physics>
            </Canvas>
        </div>
    );
};
