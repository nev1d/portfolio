'use client';

import { Canvas } from '@react-three/fiber';
import { Physics, usePlane } from '@react-three/cannon';
import React from 'react';

export const Plane = () => {
    const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0] }));

    return (
        <mesh ref={ref}>
            <planeGeometry args={[100, 100]} />
        </mesh>
    );
};
export const Menu = () => {
    return (
        <Canvas
            style={{ width: '100%', height: '100%' }}
            shadows
            dpr={[1, 2]}
            gl={{ alpha: false }}
            camera={{ position: [-1, 5, 5], fov: 45 }}
        >
            <color attach='background' args={['lightblue']} />
            <ambientLight />
            <Physics>
                <Plane />
            </Physics>
        </Canvas>
    );
};
