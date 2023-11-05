import React, { createContext, createRef, PropsWithChildren, useContext, useMemo, useRef, useState } from 'react';

import { IMPULSE_MULTIPLIER, MARGIN, OFFSET, PLATFORM_ACTIVATE_OFFSET, TOTAL_MASS } from '@/constants/menu';
import { MenuStatus, useMenuStore } from '@/store/menu/menuStore';
import { clamp } from '@/utils/math/clamp';
import { multipleArray } from '@/utils/math/multiple';
import { toDecimals } from '@/utils/math/toDecimals';
import myFont from '@assets/fonts/Comfortaa_Regular.json';
import { Triplet, useBox, useHingeConstraint } from '@react-three/cannon';
import { FontData, Text3D } from '@react-three/drei';
import { ThreeEvent, useThree } from '@react-three/fiber';

import { useIsomorphicLayoutEffect } from 'framer-motion';
import { Color, Mesh, Object3D } from 'three';

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

const useLetterDimensions = () => {
    const {
        size: { width, height },
    } = useThree();

    return useMemo(() => {
        const currentSize = (width / height) * 5;

        const letterSpacing = (width / height) * 0.8;

        return {
            size: clamp(isNaN(currentSize) ? 5 : currentSize, 1.5, 5),
            letterSpacing: clamp(isNaN(letterSpacing) ? 1 : letterSpacing, 0.2, 1),
        };
    }, [width, height]);
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
    const setMenuStatus = useMenuStore((store) => store.setMenuStatus);
    const menuItems = useMenuStore((store) => store.menuItems);
    const setHasBeenInitialized = useMenuStore((store) => store.setHasBeenInitialized);
    const hasBeenInitialized = useMenuStore((store) => store.hasBeenInitialized);

    const { size, letterSpacing } = useLetterDimensions();

    const {
        position: [x],
        ref: parentRef,
        parentLetterWidth,
    } = useContext(ParentContext);

    const [letterWidth, setLetterWidth] = useState(0);

    const initPositionOffset = useMemo(() => {
        const xCoordinate = pos ? letterWidth + x + letterSpacing : x;

        const initPosition: Triplet = [xCoordinate, toDecimals(-wordPos * MARGIN - OFFSET), -(wordPos * 2)];

        const initPositionOffset: Triplet = [
            initPosition[0],
            hasBeenInitialized
                ? planePosition[1] + 4
                : toDecimals(initPosition[1] + (wordPos + 1) * 30 + 30 + pos * 0.1),
            initPosition[2],
        ];

        return initPositionOffset;
    }, [letterWidth, pos, letterSpacing]);

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
    };

    useHingeConstraint(
        parentRef,
        ref,
        {
            pivotA: [parentLetterWidth + letterSpacing, 0, 0],
            pivotB: [0, 0, 0],
            axisB: [0, 1, 0],
            axisA: [0, 1, 0],
            maxForce: 10,
        },
        [parentLetterWidth, letterSpacing],
    );

    useIsomorphicLayoutEffect(() => {
        if (ref.current) {
            ref.current.geometry.computeBoundingBox();

            const value =
                (ref.current.geometry.boundingBox?.max.x as number) -
                (ref.current.geometry.boundingBox?.min.x as number);

            setLetterWidth(isFinite(value) ? value : letterSpacing);
        }

        const unsubscribe = api.position.subscribe((item) => {
            /* If falling letters close to platform => activate */
            if (item[1] - PLATFORM_ACTIVATE_OFFSET <= planePosition[1]) {
                toggleCurrentPlatform(true);
                if (wordPos === menuItems.length - 1) {
                    setMenuStatus(MenuStatus.PRESENTATION);
                    setHasBeenInitialized();
                }
                unsubscribe();
            }
        });
    }, [ref.current, letterSpacing]);

    return (
        <>
            <Text3D
                ref={ref}
                font={myFont as unknown as FontData}
                bevelEnabled={true}
                bevelThickness={0.9}
                bevelSize={0.3}
                bevelOffset={0}
                bevelSegments={10}
                size={size}
                height={0.7}
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
