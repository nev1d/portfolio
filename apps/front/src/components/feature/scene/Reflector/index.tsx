import React, { useRef } from 'react';

import { Mesh } from 'three';

import { usePlane } from '@react-three/cannon';
import { MeshReflectorMaterial } from '@react-three/drei';

export const Reflector: React.FC = () => {
    const [ref] = usePlane(
        () => ({
            rotation: [-Math.PI / 2, 0, 0],
            mass: 0,
            position: [0, -10, 0],
        }),
        useRef<Mesh>(null),
        [],
    );

    return (
        <mesh ref={ref}>
            <planeGeometry args={[1000, 1000]} />
            <MeshReflectorMaterial
                blur={[128, 128]}
                mixBlur={1}
                mixStrength={0.25}
                resolution={256}
                mirror={1}
                minDepthThreshold={0.25}
                maxDepthThreshold={1}
                depthScale={50}
                metalness={0.6}
                roughness={1}
                color='#1d1d20'
            />
        </mesh>
    );
};
