'use client';

import React, { useEffect, useState } from 'react';

import { useSpringAnimationCycle } from '@/hooks/useSpringAnimationCycle';
import { animated as animatedComponent, useSprings } from '@react-spring/web';

import cn from './style.module.css';

export type LogoProps = {
    animated?: boolean;
    animationDelay?: number;
};

const animationOptions = [
    {
        tag: 'rect',
        props: {
            width: '20',
            height: '445',
        },
        animation: {
            property: 'height',
            value: [0, 445],
            delay: {
                reverse: 600,
            },
        },
    },
    {
        tag: 'rect',
        props: {
            x: '36',
            width: '26',
            height: '445',
        },
        animation: {
            property: 'height',
            value: [0, 445],
            delay: {
                reverse: 600,
            },
        },
    },
    {
        tag: 'rect',
        props: {
            x: '332',
            y: '43',
            width: '26',
            height: '402',
        },
        animation: {
            property: 'height',
            value: [0, 402],
            delay: {
                reverse: 600,
            },
        },
    },
    {
        tag: 'rect',
        props: {
            x: '358',
            y: '43',
            width: '26',
            height: '177',
            transform: 'rotate(90 358 43)',
        },
        animation: {
            property: 'height',
            value: [0, 177],
            delay: {
                reverse: 600,
            },
        },
    },
    {
        tag: 'rect',
        props: {
            x: '394',
            width: '26',
            height: '213',
            transform: 'rotate(90 394 0)',
        },
        animation: {
            property: 'height',
            value: [0, 213],
            delay: {
                reverse: 600,
            },
        },
    },
    {
        tag: 'rect',
        props: {
            x: '374',
            width: '20',
            height: '445',
        },
        animation: {
            property: 'height',
            value: [0, 445],
            delay: {
                reverse: 600,
            },
        },
    },
    {
        tag: 'path',
        props: {
            d: 'M72.043 0H36.0209V30.0184H59.3364L322.195 445.275L322.198 445.272H358.218V415.254H334.9L72.043 0Z',
        },
        animation: {
            property: 'fillOpacity',
            value: [0, 1],
            delay: {
                forward: 600,
            },
        },
    },
];

export const Logo: React.FC<LogoProps> = ({ animated = true, animationDelay = 0 }) => {
    const { setAnimationProgress, animationCycleStatus, startAnimationCycle, animatedPartsCount } =
        useSpringAnimationCycle({
            totalAnimatedParts: animationOptions.length,
        });

    const [hasBeenAnimatedInitial, setHasBeenAnimatedInitial] = useState(false);

    /* Cycle animation on logo */
    const [springs] = useSprings(
        animationOptions.length,
        (index) => {
            const options = animationOptions[index];
            const [start, finish] = options.animation.value;
            const isFirstHalf = animationCycleStatus === 'firstHalf';
            const getDelay = () => {
                if (isFirstHalf) return options.animation.delay.reverse || 0;

                return options.animation.delay.forward || 0;
            };

            return {
                from: { [options.animation.property]: isFirstHalf ? finish : start },
                to: { [options.animation.property]: isFirstHalf ? start : finish },
                pause: !animated,
                delay: hasBeenAnimatedInitial ? getDelay() : animationDelay + getDelay(),
                reset: isFirstHalf,
                onResolve: () => {
                    setAnimationProgress((parts: number) => parts + 1);
                },
            };
        },
        [hasBeenAnimatedInitial, animationCycleStatus],
    );

    useEffect(() => {
        if (!hasBeenAnimatedInitial) setHasBeenAnimatedInitial(true);
    }, [animatedPartsCount]);

    const onHover = () => {
        if (!hasBeenAnimatedInitial) return;

        startAnimationCycle();
    };

    return (
        <svg
            width='394'
            height='446'
            viewBox='0 0 394 446'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            onMouseEnter={onHover}
            className={cn.logo}
        >
            {springs.map((style, index) => {
                const currentOptions = animationOptions[index];

                const tag = currentOptions.tag;

                if (tag === 'rect') {
                    return <animatedComponent.rect {...currentOptions.props} fill='white' key={index} style={style} />;
                }

                return <animatedComponent.path {...currentOptions.props} fill='white' key={index} style={style} />;
            })}
        </svg>
    );
};
