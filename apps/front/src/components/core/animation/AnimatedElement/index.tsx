import React, { ReactNode, useEffect, useState } from 'react';

import { AnimationScope, useAnimate } from 'framer-motion';
import { UnknownRecord } from 'type-fest';

import { nextTick } from '@/utils/react/nextTick';

type AnimatedElementProps = {
    visible: boolean;
    animation: UnknownRecord;
    children: (scope: AnimationScope) => ReactNode;
};

/* AnimatePresence from framer-motion has a bug that did not unmount a component if you change animation to fast.
 * So this is workaround for cases when you will change animation manually back and forward */
export const AnimatedElement: React.FC<AnimatedElementProps> = ({ visible, animation, children }) => {
    const [innerVisible, setInnerVisible] = useState(true);

    const [scope, animate] = useAnimate();
    const [isAnimationUnfinished, setIsAnimationUnfinished] = useState(false);
    const runAnimation = async (visible: boolean) => {
        const animationType = visible ? 'in' : 'out';

        const config = {
            in: animation.animate,
            out: animation.exit,
        };

        if (!scope.current) {
            setIsAnimationUnfinished(true);

            return;
        }

        await animate(scope.current, config[animationType]);
        setInnerVisible(visible);
    };

    useEffect(() => {
        if (visible) setInnerVisible(true);
        nextTick(() => runAnimation(visible));
    }, [visible]);

    useEffect(() => {
        runAnimation(visible);
    }, [isAnimationUnfinished]);

    if (!innerVisible) return null;

    return children(scope);
};
