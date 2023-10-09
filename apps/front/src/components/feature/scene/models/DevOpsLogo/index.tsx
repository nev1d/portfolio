import React from 'react';

import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

import { useObjectRotation } from '@/hooks/useObjectRotation';
import { useGLTF } from '@react-three/drei';

type GLTFResult = GLTF & {
    nodes: {
        Torus002: THREE.Mesh;
    };
    materials: {
        ['Material.001']: THREE.MeshStandardMaterial;
    };
};
export const DevOpsLogo = (props: JSX.IntrinsicElements['group']) => {
    const { ref: rotationRef } = useObjectRotation({
        rotationSide: 'y',
        autoRotation: true,
    });

    const { nodes, materials } = useGLTF('/models/devops.glb') as GLTFResult;

    return (
        <group {...props} dispose={null}>
            <group ref={rotationRef} rotation={[0, 1.5707963267948966, 0]} position={[60, -8, 6]}>
                <mesh
                    geometry={nodes.Torus002.geometry}
                    material={materials['Material.001']}
                    position={[0.025, -0.395, -0.028]}
                    rotation={[3.094, -0.004, 0.611]}
                    scale={0.5}
                />
            </group>
        </group>
    );
};

useGLTF.preload('/models/devops.glb');
