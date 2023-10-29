import React from 'react';

import { Contacts } from '@/constants/contacts';
import { useObjectRotation } from '@/hooks/useObjectRotation';
import { useThreeHoverPointer } from '@/hooks/useThreeHoverPointer';
import { linkTo } from '@/utils/other/linkTo';
import { useGLTF } from '@react-three/drei';

import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
    nodes: {
        Curve002: THREE.Mesh;
        Cylinder: THREE.Mesh;
        Vert: THREE.Mesh;
    };
    materials: {
        ['Material.001']: THREE.MeshStandardMaterial;
    };
};

export const GithubLogo = (props: JSX.IntrinsicElements['group']) => {
    const pointerProps = useThreeHoverPointer();

    const { ref: rotationRef } = useObjectRotation({
        rotationSide: 'y',
        autoRotation: true,
    });

    const { nodes, materials } = useGLTF('/models/github.glb') as GLTFResult;

    return (
        <group
            ref={rotationRef}
            {...props}
            dispose={null}
            scale={10}
            position={[-130, 5, -30]}
            rotation={[0, -0.8960553845713439, 0]}
            onClick={() => {
                linkTo(Contacts.GITHUB);
                pointerProps.onPointerOut();
            }}
            {...pointerProps}
        >
            <mesh
                geometry={nodes.Curve002.geometry}
                material={materials['Material.001']}
                position={[0.002, 0.27, 0.008]}
                rotation={[Math.PI / 2, 0, 0]}
                scale={100}
            />
            <mesh
                geometry={nodes.Cylinder.geometry}
                material={materials['Material.001']}
                position={[0.009, 0.078, 0.01]}
                scale={[0.238, 0.016, 0.178]}
            />
            <mesh
                geometry={nodes.Vert.geometry}
                material={materials['Material.001']}
                position={[0.009, 0.092, -0.092]}
            />
        </group>
    );
};

useGLTF.preload('/models/github.glb');
