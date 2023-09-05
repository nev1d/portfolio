import React, { useRef } from 'react';

import { Mesh } from 'three';

import { useBox } from '@react-three/cannon';

type LetterBoxProps = {
    position: [number, number, number];
};
export const LetterPlatform: React.FC<LetterBoxProps> = ({ position }) => {
    const [ref] = useBox(
        () => ({
            args: [6000, 6000, 1],
            position,
            rotation: [Math.PI / 2, 0, 0],
            mass: 0,
        }),
        useRef<Mesh>(null),
    );

    return (
        <mesh ref={ref} visible={false}>
            <boxGeometry />
        </mesh>
    );
};
