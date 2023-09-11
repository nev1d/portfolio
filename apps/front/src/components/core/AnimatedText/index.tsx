import React, { PropsWithChildren, useCallback, useState } from 'react';

import { motion } from 'framer-motion';

import { useSvgAnimation } from '@/hooks/useSvgAnimation';
import { DefaultAnimationProps } from '@/typings/animations/svgPathAnimation';

import cn from './style.module.css';

type AnimatedTextProps = {
    fontSize: number;
    animation?: DefaultAnimationProps;
};
export const AnimatedText: React.FC<PropsWithChildren<AnimatedTextProps>> = ({
    children,
    fontSize,
    animation = {},
}) => {
    const [dimensions, setDimensions] = useState({ height: 0, width: 0 });

    const { pathProps } = useSvgAnimation<SVGTextElement>({ animation, overriddenStrokeLength: 1000 });

    const initializeTextCallback = useCallback((instance: SVGTextElement | null) => {
        if (!instance) return;

        pathProps.ref(instance);

        const { height, width } = instance.getBBox();

        setDimensions({ height, width });
    }, []);

    return (
        <svg
            height={dimensions.height}
            width={dimensions.width}
            xmlns='http://www.w3.org/2000/svg'
            strokeWidth={fontSize / 100}
            className={cn.text}
        >
            <motion.text
                x='0'
                y='80%'
                fontSize={fontSize}
                {...pathProps}
                ref={initializeTextCallback}
                fontWeight='light'
            >
                {children}
            </motion.text>
        </svg>
    );
};
