import { useBox } from '@react-three/cannon';
import React, { useRef } from 'react';
import { Mesh } from 'three';

type LetterBoxProps = {
    position: [number, number, number];
};
export const LetterBox: React.FC<LetterBoxProps> = ({ position }) => {
    const [ref] = useBox(
        () => ({
            args: [6000, 6000, 0.6],
            position,
            rotation: [-Math.PI / 2, 0, 0],
        }),
        useRef<Mesh>(null),
    );

    return (
        <mesh ref={ref}>
            <color attach='background' args={['lightblue']} />
            <boxGeometry />
        </mesh>
    );
};
