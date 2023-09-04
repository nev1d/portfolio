import React, { createContext, createRef, PropsWithChildren, useContext, useEffect, useRef, useState } from 'react';
import { FontData, Text3D } from '@react-three/drei';
import { Debug, Triplet, useBox, useHingeConstraint } from '@react-three/cannon';
import { Color, Mesh, Object3D } from 'three';
import myFont from '@assets/fonts/Roboto_Regular.json';
import { LetterBox } from '@/components/feature/main/menu/Letter/box';
import { ThreeEvent } from '@react-three/fiber';

const parent = createContext({
    position: [0, 0, 0] as Triplet,
    ref: createRef<Object3D>(),
});

const TOTAL_MASS = 1;
const MARGIN = 6;
const OFFSET = MARGIN * 1.1;

type LetterProps = {
    text: string;
    length: number;
    pos: number;
    wordPos: number;
    color: {
        from: Color;
        to: Color;
    };
};

export const Letter: React.FC<PropsWithChildren<LetterProps>> = ({ text, children, pos, length, wordPos, color }) => {
    const {
        position: [x],
        ref: parentRef,
    } = useContext(parent);

    const [showPlane, setShowPlane] = useState(false);

    const initPosition = [x + 1, -wordPos * MARGIN - OFFSET, wordPos / 8];

    const initPositionOffset: [number, number, number] = [
        initPosition[0],
        initPosition[1] + (wordPos + 1) * 30 + 30 + pos * 0.1,
        initPosition[2],
    ];

    const planePosition: [number, number, number] = [0, wordPos * MARGIN - OFFSET, 0];

    const progress = pos / (length - 1);

    const currentColor = color.from.clone().lerp(color.to, progress);

    const [ref, api] = useBox(
        () => ({
            angularDamping: 0.999,
            mass: TOTAL_MASS / length,
            position: initPositionOffset,
        }),
        useRef<Mesh>(null),
    );

    const onClickHandler = (event: ThreeEvent<MouseEvent>) => {
        const { intersections } = event;

        const obj = intersections[0];
        const worldPoint = event.point.clone();
        const { object, face } = obj;

        console.log(face);

        const impulse = [face?.normal.x, face?.normal.y, face?.normal.z] as [number, number, number];
        const point = [-worldPoint.x, -worldPoint.y, -worldPoint.z];

        api.applyImpulse(impulse, point);
    };

    useHingeConstraint(parentRef, ref, {
        pivotA: [3, 0, 0],
        pivotB: [0, 0, 0],
        axisB: [0, 1, 0],
        axisA: [0, 1, 0],
        collideConnected: true,
        maxForce: 10,
    });

    useEffect(() => {
        api.position.subscribe((item) => {
            if (item[1] - 10 <= planePosition[1]) {
                setShowPlane(true);
            }
        });
    }, []);

    return (
        <>
            {showPlane && <LetterBox position={planePosition} />}
            <Text3D
                ref={ref}
                font={myFont as unknown as FontData}
                curveSegments={24}
                bevelEnabled={true}
                bevelThickness={0.9}
                bevelSize={0.3}
                bevelOffset={0}
                bevelSegments={10}
                size={3}
                height={0.2}
                onClick={onClickHandler}
            >
                <meshPhongMaterial color={currentColor} />
                {text}
            </Text3D>
            <parent.Provider value={{ position: initPositionOffset, ref }}>{children}</parent.Provider>
        </>
    );
};
