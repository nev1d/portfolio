import React, { useEffect, useState } from 'react';

import { useFrame } from '@react-three/fiber';

import { animate, useMotionValue } from 'framer-motion';
import * as THREE from 'three';

type MovingLightProps = {
    position?: THREE.Vector3Tuple;
    radius?: number;
    enable?: boolean;
};

export const MovingLight: React.FC<MovingLightProps> = ({ position = [0, 100, 0], radius = 200, enable = true }) => {
    const [lightPosition, setLightPosition] = useState(new THREE.Vector3(position[0], position[1], position[2])); // Initial light position

    const intensity = useMotionValue(0);

    useEffect(() => {
        animate(intensity, enable ? 1 : 0, { duration: 1 });
    }, [enable]);

    useFrame(() => {
        const time = performance.now() * 0.001;
        const x = position[0] + Math.cos(time) * radius;
        const z = position[2] + Math.sin(time) * radius;

        setLightPosition(new THREE.Vector3(x, position[1], z));
    });

    return <directionalLight position={lightPosition} intensity={intensity.get()} color={0xffffff} />;
};
