import React, { useEffect, useState } from 'react';

import { Color } from 'three';

import { Letter } from '@/components/feature/main/menu/Letter';
import { WordPlatform } from '@/components/feature/main/menu/Word/platform';
import { MARGIN, OFFSET, PLATFORM_DISABLE_DELAY } from '@/constants/menu';
import { useForceUpdate } from '@/hooks/useForceUpdate';
import { useMenuStore } from '@/store/menu/menuStore';
import { toDecimals } from '@/utils/math/toDecimals';
import { Triplet } from '@react-three/cannon';
import { Center } from '@react-three/drei';

type WordProps = {
    text: string;
    pos: number;
};

const color = {
    from: new Color('#ffffff'),
    to: new Color('#ffffff'),
};

export const Word: React.FC<WordProps> = ({ text, pos }) => {
    const isPlatformsVisible = useMenuStore((state) => state.isPlatformsVisible);

    const [isPlatformActivated, setIsPlatformActivated] = useState(false);
    const [shouldShowPlatform, setShouldShowPlatform] = useState(false);

    /* Updating center after positioning change in Letter component's*/
    const [cacheKey, forceUpdate] = useForceUpdate();

    useEffect(() => {
        forceUpdate();
    }, []);

    const planePosition: Triplet = [0, toDecimals(pos * MARGIN - OFFSET), 100];

    useEffect(() => {
        setTimeout(() => {
            setShouldShowPlatform(isPlatformActivated && isPlatformsVisible);
        }, PLATFORM_DISABLE_DELAY * pos);
    }, [isPlatformsVisible]);

    useEffect(() => {
        setShouldShowPlatform(isPlatformActivated && isPlatformsVisible);
    }, [isPlatformActivated]);

    return (
        <Center disableY={true} disableZ={true} cacheKey={cacheKey}>
            {Array.from(text).reduceRight(
                (acc, item, index) => {
                    return (
                        <Letter
                            key={item}
                            color={color}
                            text={item}
                            length={text.length}
                            pos={index}
                            wordPos={pos}
                            toggleCurrentPlatform={setIsPlatformActivated}
                            planePosition={planePosition}
                        >
                            {acc}
                        </Letter>
                    );
                },
                <></>,
            )}
            {shouldShowPlatform && <WordPlatform position={planePosition} />}
        </Center>
    );
};
