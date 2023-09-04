import React from 'react';
import { Letter } from '@/components/feature/main/menu/Letter';
import { Center } from '@react-three/drei';
import { Color } from 'three';

type WordProps = {
    text: string;
    pos: number;
};

const color = {
    from: new Color('#56ccf2'),
    to: new Color('#2f80ed'),
};

export const Word: React.FC<WordProps> = ({ text, pos }) => {
    return (
        <Center disableY={true} disableZ={true}>
            {Array.from(text).reduceRight(
                (acc, item, index) => {
                    return (
                        <Letter color={color} text={item} length={text.length} pos={index} wordPos={pos}>
                            {acc}
                        </Letter>
                    );
                },
                <></>,
            )}
        </Center>
    );
};
