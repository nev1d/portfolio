import React from 'react';

import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

import { useObjectRotation } from '@/hooks/useObjectRotation';
import { useGLTF } from '@react-three/drei';

type GLTFResult = GLTF & {
    nodes: {
        ['React-Logo_Material002_0']: THREE.Mesh;
    };
    materials: {
        ['Material.002']: THREE.MeshStandardMaterial;
    };
};

export const ReactLogo: React.FC<JSX.IntrinsicElements['group']> = (props) => {
    const { ref: rotationRef } = useObjectRotation({
        rotationSide: 'y',
        autoRotation: true,
    });

    const { nodes } = useGLTF('/models/react.glb') as GLTFResult;

    return (
        <group {...props} dispose={null}>
            <group ref={rotationRef} rotation={[0, 1.5707963267948966, 0]} scale={0.5} position={[140, -8, 6]}>
                <mesh
                    geometry={nodes['React-Logo_Material002_0'].geometry}
                    rotation={[Math.PI / 1.2, 0, -Math.PI / 2]}
                    scale={[1, 1, 1]}
                >
                    <meshPhongMaterial color='#d1d1d1' />
                </mesh>
            </group>
        </group>
    );
};

useGLTF.preload('/models/react.gltf');
