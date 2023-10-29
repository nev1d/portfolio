import React, { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { useHasBeenMounted } from '@/hooks/useHasBeenMounted';
import { useInterval, UseIntervalProps } from '@/hooks/useInterval';
import { nextTick } from '@/utils/react/nextTick';

import { AnimationScope, useAnimate } from 'framer-motion';
import { UnknownRecord } from 'type-fest';

type AnimatedElementProps = {
    visible: boolean;
    animation: UnknownRecord;
    children: (scope: AnimationScope) => ReactNode;
    enablePrerenderIgnore?: boolean;
};

/* AnimatePresence from framer-motion has a bug that did not unmount a component if you change animation too fast.
 * So this is workaround for cases when you will change animation manually back and forward */
export const AnimatedElement: React.FC<AnimatedElementProps> = ({
    visible,
    animation,
    children,
    enablePrerenderIgnore,
}) => {
    const [innerVisible, setInnerVisible] = useState(true);

    const [scope, animate] = useAnimate();
    const defaultOpacitySetted = useRef(false);
    const [animationProgressStatus, setAnimationProgressStatus] = useState<'init' | 'started' | 'finished'>('init');

    const hasBeenMounted = useHasBeenMounted();

    const runAnimation = async (visible: boolean) => {
        setAnimationProgressStatus('started');
        const animationType = visible ? 'in' : 'out';

        const config = {
            in: animation.animate,
            out: animation.exit,
        };

        if (!scope.current) {
            /* Ref will be added on nex tick, so  */
            nextTick(() => runAnimation(visible));

            return;
        }

        const shouldRunAnimation = !(!hasBeenMounted && animationType === 'out' && enablePrerenderIgnore);

        if (shouldRunAnimation) {
            if (animationType === 'in') {
                /* Ad initial styles if presents */
                await animate(scope.current, animation.initial, { duration: 0, delay: 0 });
                /* Reset default opacity */
                scope.current.style.opacity = Object(animation.initial)?.opacity || 1;
            }

            await animate(scope.current, config[animationType], { ease: 'easeInOut' });
        }

        setInnerVisible(visible);
        setAnimationProgressStatus('finished');
    };

    /* Clear animation in desync cases with interval check */
    const intervalCallback: UseIntervalProps['callback'] = async () => {
        if (animationProgressStatus === 'finished') {
            if (visible !== innerVisible) {
                await runAnimation(visible);
            }
            setAnimationProgressStatus('init');
        }
    };

    const { startInterval, pauseInterval } = useInterval({ callback: intervalCallback, intervalTime: 200 });

    useEffect(() => {
        if (animationProgressStatus === 'init') {
            pauseInterval();
        }
    }, [animationProgressStatus]);

    /* */

    useEffect(() => {
        if (visible) setInnerVisible(true);
        nextTick(async () => {
            await runAnimation(visible);
            startInterval();
        });
    }, [visible]);

    useLayoutEffect(() => {
        if (scope.current && !defaultOpacitySetted.current) {
            /* Set default opacity when ref added */
            defaultOpacitySetted.current = true;
            scope.current.style.opacity = 0;
        }
    }, [scope.current]);

    if (!innerVisible) return null;

    return children(scope);
};
