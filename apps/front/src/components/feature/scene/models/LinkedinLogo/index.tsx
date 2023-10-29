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
        Curve: THREE.Mesh;
        Curve001: THREE.Mesh;
        Curve002: THREE.Mesh;
    };
    materials: {
        ['Material.001']: THREE.MeshStandardMaterial;
    };
};

export const LinkedinLogo = (props: JSX.IntrinsicElements['group']) => {
    const pointerProps = useThreeHoverPointer();

    const { ref: rotationRef } = useObjectRotation({
        rotationSide: 'y',
        autoRotation: true,
    });

    const { nodes, materials } = useGLTF('/models/linkedin.glb') as GLTFResult;

    return (
        <group
            {...props}
            dispose={null}
            scale={10}
            position={[-115, 5, -15]}
            rotation={[0, -0.8960553845713439, 0]}
            ref={rotationRef}
            onClick={() => {
                linkTo(Contacts.LINKEDIN);
                pointerProps.onPointerOut();
            }}
            {...pointerProps}
        >
            <mesh
                geometry={nodes.Curve.geometry}
                material={materials['Material.001']}
                position={[-0.182, 0.231, -0.003]}
                rotation={[Math.PI / 2, 0, 0]}
                scale={100}
            />
            <mesh
                geometry={nodes.Curve001.geometry}
                material={materials['Material.001']}
                position={[-0.182, -0.082, -0.003]}
                rotation={[Math.PI / 2, 0, 0]}
                scale={100}
            />
            <mesh
                geometry={nodes.Curve002.geometry}
                material={materials['Material.001']}
                position={[0.145, -0.048, -0.003]}
                rotation={[Math.PI / 2, 0, 0]}
                scale={100}
            />
        </group>
    );
};

useGLTF.preload('/models/linkedin.glb');
