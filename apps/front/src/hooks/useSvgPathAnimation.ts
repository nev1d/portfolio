import { useCallback, useState } from 'react';

import { useSpringAnimationCycle } from '@/hooks/useSpringAnimationCycle';
import { easings, useSpring } from '@react-spring/web';

type UseSvgPathAnimationProps = {
    overriddenStrokeLength?: number;
    animation?: {
        delay?: number;
        duration?: number;
        animated?: boolean;
    };
};

export const useSvgPathAnimation = ({ animation = {}, overriddenStrokeLength }: UseSvgPathAnimationProps) => {
    const springAnimationCycle = useSpringAnimationCycle({
        totalAnimatedParts: 1,
    });

    const { animationCycleStatus, onResolve } = springAnimationCycle;

    const [strokeLength, setStrokeLength] = useState<number>(overriddenStrokeLength || 0);

    const springProps = useSpring(() => {
        const isFirstHalf = animationCycleStatus === 'firstHalf';

        return {
            from: {
                strokeDasharray: strokeLength,
                strokeDashoffset: isFirstHalf ? 0 : strokeLength,
                fillOpacity: isFirstHalf ? 1 : 0,
            },
            to: {
                strokeDasharray: strokeLength,
                strokeDashoffset: isFirstHalf ? strokeLength : 0,
                fillOpacity: isFirstHalf ? 0 : 1,
            },
            delay: animation.delay || 0,
            pause: !animation.animated,
            config: {
                duration: animation.duration || 400,
                easing: easings.easeInSine,
            },
            reset: isFirstHalf,
            onResolve,
        };
    }, [animation, strokeLength, animationCycleStatus]);

    const ref = useCallback(
        (instance: SVGPathElement) => {
            if (instance && !overriddenStrokeLength) {
                setStrokeLength(instance.getTotalLength());
            }
        },
        [overriddenStrokeLength],
    );

    return { springProps, springAnimationCycle, ref };
};
