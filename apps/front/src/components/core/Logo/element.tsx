import React, { useEffect } from 'react';

import { motion } from 'framer-motion';

import { useRunCycleAnimation } from '@/hooks/useRunCycleAnimation';

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
};

export const LogoElement: React.FC<LogoElementProps & { hovered: boolean }> = ({ tag, props, animation, hovered }) => {
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

    const { scope: ref, runCycle } = useRunCycleAnimation(animationSteps);

    const additionalProps = {
        initial: animationSteps.from,
        animate: animationSteps.to,
        transition: animationSteps.animationTo,
    };

    useEffect(() => {
        if (hovered) runCycle();
    }, [hovered]);

    if (tag === 'rect') {
        return <motion.rect {...props} ref={ref} fill='white' {...additionalProps} />;
    }

    return <motion.path {...props} ref={ref} fill='white' {...additionalProps} />;
};
