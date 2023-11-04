import React, { useEffect, useRef } from 'react';

import { useRunCycleAnimation } from '@/hooks/useRunCycleAnimation';

import { motion } from 'framer-motion';

export type LogoElementProps = {
    tag: string;
    props: Record<string, unknown>;
    animation: {
        property: string;
        value: [number, number];
        delay: Partial<{
            forward: number;
            reverse: number;
        }>;
    };
    cycle: boolean;
};

export const LogoElement: React.FC<LogoElementProps & { hovered: boolean }> = ({
    tag,
    props,
    animation,
    hovered,
    cycle,
}) => {
    const timeout = useRef<ReturnType<typeof setTimeout> | undefined>();

    const animationSteps = {
        from: {
            [animation.property]: animation.value[0],
        },
        to: {
            [animation.property]: animation.value[1],
        },
        animationTo: {
            delay: animation?.delay?.forward,
        },
        animationFrom: {
            delay: animation?.delay?.reverse,
        },
    };

    const { scope: ref, runCycle } = useRunCycleAnimation<SVGRectElement>(animationSteps);

    const additionalProps = {
        initial: animationSteps.from,
        animate: animationSteps.to,
        transition: animationSteps.animationTo,
    };

    useEffect(() => {
        if (hovered && !cycle) runCycle();
    }, [hovered]);

    useEffect(() => {
        if (!cycle) {
            clearTimeout(timeout.current);

            return;
        }

        const infiniteCycle = () => {
            runCycle();

            timeout.current = setTimeout(() => {
                infiniteCycle();
            }, 2000);
        };

        infiniteCycle();

        return () => clearTimeout(timeout.current as ReturnType<typeof setInterval>);
    }, [cycle]);

    if (tag === 'rect') {
        return <motion.rect {...props} ref={ref} fill='#d1d1d1' {...additionalProps} />;
    }

    return <motion.path {...props} ref={ref} fill='#d1d1d1' {...additionalProps} />;
};
