import React from 'react';

import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

import { useObjectRotation } from '@/hooks/useObjectRotation';
import { useGLTF } from '@react-three/drei';

type GLTFResult = GLTF & {
    nodes: {
        Roundcube: THREE.Mesh;
        Cylinder: THREE.Mesh;
        Cylinder001: THREE.Mesh;
        Cylinder002: THREE.Mesh;
        Cylinder003: THREE.Mesh;
        Cylinder004: THREE.Mesh;
        Cube003: THREE.Mesh;
        Cube001: THREE.Mesh;
        Cube004: THREE.Mesh;
    };
    materials: {
        A5: THREE.MeshStandardMaterial;
        A8: THREE.MeshStandardMaterial;
        ['Material.001']: THREE.MeshStandardMaterial;
    };
};

export const FrontOpsLogo: React.FC<JSX.IntrinsicElements['group']> = (props) => {
    const { ref: rotationRef } = useObjectRotation({
        rotationSide: 'y',
        autoRotation: true,
    });

    const { nodes, materials } = useGLTF('/models/frontops.glb') as GLTFResult;

    return (
        <group {...props} dispose={null}>
            <group ref={rotationRef} rotation={[0, 1.5707963267948966, 0]} position={[100, -8, 6]}>
                <mesh
                    geometry={nodes.Cube004.geometry}
                    material={materials['Material.001']}
                    position={[0.169, -0.096, 0.08]}
                    rotation={[0.803, -0.594, 0.316]}
                    scale={1.776}
                />
            </group>
        </group>
    );
};

useGLTF.preload('/models/frontops.glb');
