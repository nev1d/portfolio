import React from 'react';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useObjectRotation } from '@/hooks/useObjectRotation';
import { clamp } from '@/utils/math/clamp';
import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
    nodes: {
        Object_10: THREE.Mesh;
        Object_11: THREE.Mesh;
        Object_12: THREE.Mesh;
        Object_13: THREE.Mesh;
        Object_14: THREE.Mesh;
        Object_15: THREE.Mesh;
        Object_17: THREE.Mesh;
        Object_18: THREE.Mesh;
        Object_19: THREE.Mesh;
        Object_20: THREE.Mesh;
        Object_21: THREE.Mesh;
        Object_22: THREE.Mesh;
        Mesh004: THREE.Mesh;
        Mesh004_1: THREE.Mesh;
        brooch: THREE.Mesh;
        ['brooch-back']: THREE.Mesh;
        Mesh007: THREE.Mesh;
        Mesh007_1: THREE.Mesh;
        Mesh006: THREE.Mesh;
        Mesh006_1: THREE.Mesh;
        Mesh001: THREE.Mesh;
        Mesh001_1: THREE.Mesh;
        stitch: THREE.Mesh;
        visor: THREE.Mesh;
        FBHead: THREE.Mesh;
        Glasses: THREE.Mesh;
    };
    materials: {
        ['Material.001']: THREE.MeshStandardMaterial;
        ['Material.001']: THREE.MeshStandardMaterial;
    };
};

const coefficient = 120;
const maxScale = 11;
const minScale = 8;

export const Face = (props: JSX.IntrinsicElements['group']) => {
    const {
        size: { width, height },
    } = useThree();

    const { nodes, materials } = useGLTF('/models/face.glb') as GLTFResult;

    const isTablet = useMediaQuery('(max-width: 1023px)');

    const { ref: rotationRef } = useObjectRotation({
        rotationSide: 'y',
        autoRotation: true,
    });

    const coefficient = isTablet ? 0 : 120;
    const scale = height / coefficient;
    const correctScale = clamp(scale, maxScale, minScale);
    const topEqPart = width * -coefficient;
    const bottomEqPart = (height * correctScale) / 0.9;
    const topPosition = isTablet ? 65 : 50;

    return (
        <group
            {...props}
            ref={rotationRef}
            dispose={null}
            scale={correctScale}
            position={[topEqPart / bottomEqPart, topPosition, 100]}
            rotation={[0.6107259643892086, 0, 0]}
        >
            <group rotation={[Math.PI / 2, 0, 0]}>
                <group position={[0.756, 0.08, 0.088]} rotation={[-0.032, -0.199, -3.004]} scale={0.084}>
                    <mesh geometry={nodes.Object_10.geometry} material={nodes.Object_10.material} />
                    <mesh geometry={nodes.Object_11.geometry} material={materials['Material.001']} />
                    <mesh geometry={nodes.Object_12.geometry} material={nodes.Object_12.material} />
                    <mesh geometry={nodes.Object_13.geometry} material={nodes.Object_13.material} />
                    <mesh geometry={nodes.Object_14.geometry} material={nodes.Object_14.material} />
                    <mesh geometry={nodes.Object_15.geometry} material={nodes.Object_15.material} />
                </group>
                <group position={[-0.212, 0.186, 0.116]} rotation={[-0.182, 0.146, -3.054]} scale={0.088}>
                    <mesh geometry={nodes.Object_17.geometry} material={nodes.Object_17.material} />
                    <mesh geometry={nodes.Object_18.geometry} material={materials['Material.001']} />
                    <mesh geometry={nodes.Object_19.geometry} material={nodes.Object_19.material} />
                    <mesh geometry={nodes.Object_20.geometry} material={nodes.Object_20.material} />
                    <mesh geometry={nodes.Object_21.geometry} material={nodes.Object_21.material} />
                    <mesh geometry={nodes.Object_22.geometry} material={nodes.Object_22.material} />
                </group>
            </group>
            <group position={[0.255, 0.532, 0.46]} rotation={[1.495, -0.011, 0.004]} scale={0.07}>
                <mesh geometry={nodes.brooch.geometry} material={materials['Material.001']} />
                <mesh geometry={nodes['brooch-back'].geometry} material={materials['Material.001']} />
                <mesh geometry={nodes.stitch.geometry} material={nodes.stitch.material} />
                <mesh geometry={nodes.visor.geometry} material={materials['Material.001']} />
                <mesh geometry={nodes.Mesh004.geometry} material={nodes.Mesh004.material} />
                <mesh geometry={nodes.Mesh004_1.geometry} material={nodes.Mesh004_1.material} />
                <mesh geometry={nodes.Mesh007.geometry} material={materials['Material.001']} />
                <mesh geometry={nodes.Mesh007_1.geometry} material={nodes.Mesh007_1.material} />
                <mesh geometry={nodes.Mesh006.geometry} material={nodes.Mesh006.material} />
                <mesh geometry={nodes.Mesh006_1.geometry} material={nodes.Mesh006_1.material} />
                <mesh geometry={nodes.Mesh001.geometry} material={nodes.Mesh001.material} />
                <mesh geometry={nodes.Mesh001_1.geometry} material={nodes.Mesh001_1.material} />
            </group>
            <mesh
                geometry={nodes.FBHead.geometry}
                material={materials['Material.001']}
                position={[0.277, 0.071, -0.075]}
            />
            <mesh
                geometry={nodes.Glasses.geometry}
                material={materials['Material.001']}
                position={[0.268, 0.293, 0.567]}
                rotation={[Math.PI / 2, 0, 0]}
                scale={0.868}
            />
        </group>
    );
};

useGLTF.preload('/models/face.glb');
