import React from 'react';

import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

import { useObjectRotation } from '@/hooks/useObjectRotation';
import { useGLTF } from '@react-three/drei';

type GLTFResult = GLTF & {
    nodes: {
        Vue: THREE.Mesh;
        Vue001: THREE.Mesh;
    };
    materials: {
        ['Material.001']: THREE.MeshStandardMaterial;
        Material: THREE.MeshStandardMaterial;
    };
};

export const VueLogo: React.FC<JSX.IntrinsicElements['group']> = (props) => {
    const { ref: rotationRef } = useObjectRotation({
        rotationSide: 'y',
        autoRotation: true,
    });

    const { nodes, materials } = useGLTF('/models/vue.glb') as GLTFResult;

    return (
        <group {...props} dispose={null}>
            <group ref={rotationRef} rotation={[0, 1.5707963267948966, 0]} position={[120, -8, -5]} scale={1.3}>
                <mesh
                    geometry={nodes.Vue.geometry}
                    material={materials['Material.001']}
                    position={[0.002, 0.823, 0.294]}
                    scale={1.777}
                />
                <mesh
                    geometry={nodes.Vue001.geometry}
                    material={materials.Material}
                    position={[0.002, 0.823, 0.294]}
                    scale={1.777}
                />
            </group>
        </group>
    );
};

useGLTF.preload('/models/vue.glb');
