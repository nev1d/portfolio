'use client';

import { Canvas } from '@react-three/fiber';
import { Debug, Physics, usePlane } from '@react-three/cannon';
import { CameraControls, Center, OrthographicCamera } from '@react-three/drei';
import React from 'react';

import cn from './style.module.css';
import { WordList } from '@/components/feature/main/menu/WordList';

const distance = 20;

export const Plane = () => {
    const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0] }));

    return (
        <mesh ref={ref}>
            <planeGeometry args={[100, 100]} />
        </mesh>
    );
};

const menu = ['hire me', 'portfolio', 'about', 'who am`i'];

export const Menu = () => {
    return (
        <div className={cn.wrapper}>
            <Canvas shadows gl={{ alpha: false }} camera={{ position: [-10, 35, 45], fov: 50 }}>
                <color attach='background' args={['lightblue']} />
                {/* Lights */}
                <ambientLight color={0xcccccc} />
                <directionalLight args={[0xffffff, 0.5]} position={[5, 5, 20]} isDirectionalLight={true} />
                <directionalLight args={[0xffffff, 1]} position={[-5, -5, -20]} />

                {/* Camera */}
                <CameraControls makeDefault />

                <Physics gravity={[0, -20, 0]}>
                    <WordList items={menu} />
                </Physics>
            </Canvas>
        </div>
    );
};
