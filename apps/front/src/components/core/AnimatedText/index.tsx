import React, { PropsWithChildren, useCallback, useState } from 'react';

import { animated, easings, useSpring } from '@react-spring/web';

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

    const [textStyle] = useSpring(() => {
        return {
            from: { strokeDasharray: 1000, strokeDashoffset: 1000, fillOpacity: 0 },
            to: { strokeDasharray: 1000, strokeDashoffset: 0, fillOpacity: 1 },
            delay: animation.delay || 0,
            pause: !animation.animated,
            config: {
                duration: animation.duration || 400,
                easing: easings.easeInSine,
            },
        };
    }, [animation]);

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
