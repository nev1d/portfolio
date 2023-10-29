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
        Plane: THREE.Mesh;
    };
    materials: {
        Material: THREE.MeshStandardMaterial;
    };
};

export const TelegramLogo = (props: JSX.IntrinsicElements['group']) => {
    const pointerProps = useThreeHoverPointer();

    const { ref: rotationRef } = useObjectRotation({
        rotationSide: 'y',
        autoRotation: true,
    });

    const { nodes, materials } = useGLTF('/models/telegram.glb') as GLTFResult;

    return (
        <group
            ref={rotationRef}
            {...props}
            dispose={null}
            scale={10}
            position={[-122.5, 5, -22.5]}
            rotation={[0, -0.8960553845713439, 0]}
            onClick={() => {
                linkTo(Contacts.TELEGRAM);
                pointerProps.onPointerOut();
            }}
            {...pointerProps}
        >
            <mesh
                geometry={nodes.Plane.geometry}
                material={materials.Material}
                position={[0.064, 0, 0]}
                rotation={[0.449, 1.165, -2.785]}
                scale={1.1}
            />
        </group>
    );
};

useGLTF.preload('/models/telegram.glb');
