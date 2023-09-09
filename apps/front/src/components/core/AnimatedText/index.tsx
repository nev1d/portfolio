import React, { PropsWithChildren, useCallback, useState } from 'react';

import { useSvgPathAnimation } from '@/hooks/useSvgPathAnimation';
import { animated } from '@react-spring/web';

import cn from './style.module.css';

type AnimatedTextProps = {
    fontSize: number;
    animation?: {
        delay?: number;
        duration?: number;
        animated?: boolean;
    };
};
export const AnimatedText: React.FC<PropsWithChildren<AnimatedTextProps>> = ({
    children,
    fontSize,
    animation = {},
}) => {
    const [dimensions, setDimensions] = useState({ height: 0, width: 0 });

    const {
        springProps: [textStyle],
    } = useSvgPathAnimation({ animation, strokeLength: 1000 });

    const initializeTextCallback = useCallback((instance: SVGTextElement | null) => {
        if (!instance) return;

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
            <animated.text
                x='0'
                y='80%'
                fontSize={fontSize}
                ref={initializeTextCallback}
                style={textStyle}
                fontWeight='light'
            >
                {children}
            </animated.text>
        </svg>
    );
};
