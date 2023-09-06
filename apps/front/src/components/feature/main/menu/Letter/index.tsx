import React, {
    createContext,
    createRef,
    PropsWithChildren,
    useContext,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import { Color, Mesh, Object3D } from 'three';

import {
    IMPULSE_MULTIPLIER,
    LETTER_CLICK_DELAY,
    LETTER_SPACING,
    MARGIN,
    OFFSET,
    PLATFORM_ACTIVATE_OFFSET,
    TOTAL_MASS,
} from '@/constants/menu';
import { useMenuStore } from '@/store/menu/menuStore';
import { multipleArray } from '@/utils/math/multiple';
import { toDecimals } from '@/utils/math/toDecimals';
import myFont from '@assets/fonts/Comfortaa_Regular.json';
import { Triplet, useBox, useHingeConstraint } from '@react-three/cannon';
import { FontData, Text3D } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';

const ParentContext = createContext({
    position: [0, 0, 0] as Triplet,
    ref: createRef<Object3D>(),
    parentLetterWidth: 0,
});

type LetterProps = {
    text: string;
    length: number;
    pos: number;
    wordPos: number;
    color: {
        from: Color;
        to: Color;
    };
    toggleCurrentPlatform: (value: boolean) => void;
    planePosition: Triplet;
};

export const Letter: React.FC<PropsWithChildren<LetterProps>> = ({
    text,
    children,
    pos,
    length,
    wordPos,
    color,
    toggleCurrentPlatform,
    planePosition,
}) => {
    const {
        position: [x],
        ref: parentRef,
        parentLetterWidth,
    } = useContext(ParentContext);

    const togglePlatforms = useMenuStore((state) => state.togglePlatforms);

    const [letterWidth, setLetterWidth] = useState(0);

    const initPositionOffset = useMemo(() => {
        const xCoordinate = pos ? letterWidth + x + LETTER_SPACING : x;

        const initPosition: Triplet = [xCoordinate, toDecimals(-wordPos * MARGIN - OFFSET), -(wordPos * 2)];

        const initPositionOffset: Triplet = [
            initPosition[0],
            toDecimals(initPosition[1] + (wordPos + 1) * 30 + 30 + pos * 0.1),
            initPosition[2],
        ];

        return initPositionOffset;
    }, [letterWidth, pos]);

    const currentColor = useMemo(() => {
        const progress = pos / (length - 1);

        return color.from.clone().lerp(color.to, progress);
    }, [pos, length, color]);

    const [ref, api] = useBox(
        () => ({
            angularDamping: 0.999,
            mass: TOTAL_MASS / length,
            position: initPositionOffset,
        }),
        useRef<Mesh>(null),
        [initPositionOffset],
    );

    const onClickHandler = (event: ThreeEvent<MouseEvent>) => {
        const { intersections } = event;

        const { face } = intersections[0];

        const point = [face?.normal.x, face?.normal.y, face?.normal.z] as Triplet;
        const impulse = multipleArray(point, -IMPULSE_MULTIPLIER) as Triplet;

        api.applyImpulse(impulse, point);

        toggleCurrentPlatform(false);

        setTimeout(() => {
            togglePlatforms(false);
        }, LETTER_CLICK_DELAY);
    };

    useHingeConstraint(
        parentRef,
        ref,
        {
            pivotA: [parentLetterWidth + LETTER_SPACING, 0, 0],
            pivotB: [0, 0, 0],
            axisB: [0, 1, 0],
            axisA: [0, 1, 0],
            maxForce: 10,
        },
        [parentLetterWidth],
    );

    useLayoutEffect(() => {
        if (ref.current) {
            ref.current.geometry.computeBoundingBox();

            const value =
                (ref.current.geometry.boundingBox?.max.x as number) -
                (ref.current.geometry.boundingBox?.min.x as number);

            setLetterWidth(isFinite(value) ? value : LETTER_SPACING);
        }

        return api.position.subscribe((item) => {
            /* If falling letters close to platform => activate */
            if (item[1] - PLATFORM_ACTIVATE_OFFSET <= planePosition[1]) {
                toggleCurrentPlatform(true);
            }
        });
    }, [ref.current]);

    return (
        <>
            <Text3D
                ref={ref}
                font={myFont as unknown as FontData}
                curveSegments={24}
                bevelEnabled={true}
                bevelThickness={0.9}
                bevelSize={0.3}
                bevelOffset={0}
                bevelSegments={10}
                size={5}
                height={0.2}
                onClick={onClickHandler}
            >
                <meshPhongMaterial color={currentColor} />
                {text}
            </Text3D>
            <ParentContext.Provider value={{ position: initPositionOffset, ref, parentLetterWidth: letterWidth }}>
                {children}
            </ParentContext.Provider>
        </>
    );
};
