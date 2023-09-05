import React, { useEffect } from 'react';

import { Color } from 'three';

import { Letter } from '@/components/feature/main/menu/Letter';
import { useForceUpdate } from '@/hooks/useForceUpdate';
import { Center } from '@react-three/drei';

type WordProps = {
    text: string;
    pos: number;
};

const color = {
    from: new Color('#0099CC'),
    to: new Color('#0066CC'),
};

export const Word: React.FC<WordProps> = ({ text, pos }) => {
    /* Updating center after positioning change in Letter component's*/
    const [cacheKey, forceUpdate] = useForceUpdate();

    useEffect(() => {
        forceUpdate();
    }, []);

    return (
        <Center disableY={true} disableZ={true} cacheKey={cacheKey}>
            {Array.from(text).reduceRight(
                (acc, item, index) => {
                    return (
                        <Letter key={item} color={color} text={item} length={text.length} pos={index} wordPos={pos}>
                            {acc}
                        </Letter>
                    );
                },
                <></>,
            )}
        </Center>
    );
};
