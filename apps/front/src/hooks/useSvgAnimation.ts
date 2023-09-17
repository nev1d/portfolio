import { useCallback, useMemo, useState } from 'react';

import { useRunCycleAnimation } from '@/hooks/useRunCycleAnimation';

type UseSvgPathAnimationProps = {
    overriddenStrokeLength?: number;
    animation?: {
        delay?: number;
        duration?: number;
        animated?: boolean;
    };
};

export const useSvgAnimation = <T = SVGPathElement>({
    animation = {},
    overriddenStrokeLength,
}: UseSvgPathAnimationProps) => {
    const [strokeLength, setStrokeLength] = useState<number>(overriddenStrokeLength || 0);

    const animationSteps = {
        from: {
            strokeDasharray: strokeLength,
            strokeDashoffset: strokeLength,
            fillOpacity: 0,
        },
        to: {
            strokeDasharray: strokeLength,
            strokeDashoffset: 0,
            fillOpacity: 1,
        },
    };

    const animationProps = {
        delay: animation.delay || 0,
        duration: animation.duration || 0.4,
    };

    const animationExitProps = {
        delay: 0,
        duration: 0.4,
    };

    const { scope, runCycle } = useRunCycleAnimation({
        to: animationSteps.to,
        from: animationSteps.from,
        animationTo: animationProps,
        animationFrom: animationProps,
    });

    const ref = useCallback(
        (instance: T) => {
            // @ts-expect-error useAnimate dont get right types
            scope.current = instance;

            if (!instance) return;

            if (instance instanceof SVGPathElement && !overriddenStrokeLength) {
                setStrokeLength(instance.getTotalLength());
            }
        },
        [overriddenStrokeLength],
    );

    const pathProps = useMemo(() => {
        return {
            ref,
            initial: animationSteps.from,
            animate: animationSteps.to,
            exit: { ...animationSteps.from, transition: animationExitProps },
            transition: animationProps,
        };
    }, [ref]);

    return { runCycle, pathProps };
};
