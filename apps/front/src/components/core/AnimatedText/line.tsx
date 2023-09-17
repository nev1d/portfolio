import React, { PropsWithChildren, useEffect } from 'react';

import { motion } from 'framer-motion';

import { useSvgAnimation } from '@/hooks/useSvgAnimation';
import { DefaultAnimationProps } from '@/typings/animations/svgPathAnimation';

type AnimatedTextLine = {
    x: number;
    y: number | string;
    fontSize: number;
    fontWeight: number | string;
    animation?: DefaultAnimationProps;
    hovered?: boolean;
    text?: string;
};
export const AnimatedTextLine: React.FC<PropsWithChildren<AnimatedTextLine>> = ({
    children,
    animation,
    fontSize,
    fontWeight = 'light',
    y,
    hovered,
    x,
}) => {
    const { pathProps, runCycle } = useSvgAnimation<SVGTextElement>({ animation, overriddenStrokeLength: 1000 });

    useEffect(() => {
        if (hovered) {
            runCycle();
        }
    }, [hovered]);

    return (
        <motion.text x={x} y={y} fontSize={fontSize} {...pathProps} fontWeight={fontWeight}>
            {children}
        </motion.text>
    );
};
