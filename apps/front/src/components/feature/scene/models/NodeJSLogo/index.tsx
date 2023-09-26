import React from 'react';

import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

import { useObjectRotation } from '@/hooks/useObjectRotation';
import { useGLTF } from '@react-three/drei';

type GLTFResult = GLTF & {
    nodes: {
        LOGO: THREE.Mesh;
    };
    materials: {
        ['Material.001']: THREE.MeshStandardMaterial;
    };
};

export const NodeJSLogo = (props: JSX.IntrinsicElements['group']) => {
    const { ref: rotationRef } = useObjectRotation({
        rotationSide: 'y',
        autoRotation: true,
    });

    const { nodes, materials } = useGLTF('/models/nodejs.glb') as GLTFResult;

    return (
        <group {...props} dispose={null} rotation={[0, 1.5707963267948966, 0]} position={[80, -8, -6]}>
            <group ref={rotationRef}>
                <group position={[0, -0.001, -0.084]} rotation={[Math.PI / 2, 0, 0]} scale={0.5}>
                    <mesh
                        geometry={nodes.LOGO.geometry}
                        material={materials['Material.001']}
                        position={[-0.003, 0.469, 0.009]}
                    />
                </group>
            </group>
        </group>
    );
};

useGLTF.preload('/models/nodejs.glb');
