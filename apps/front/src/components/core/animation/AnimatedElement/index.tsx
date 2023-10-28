import React, { ReactNode, useEffect, useState } from 'react';

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
    const [waitingForRef, setWaitingForRef] = useState(false);
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
            setWaitingForRef(true);
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            startInterval();

            return;
        }

        const shouldRunAnimation = !(!hasBeenMounted && animationType === 'out' && enablePrerenderIgnore);

        if (shouldRunAnimation) await animate(scope.current, config[animationType], { ease: 'easeInOut' });

        setInnerVisible(visible);
        setAnimationProgressStatus('finished');
        setWaitingForRef(false);
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

    if (!innerVisible) return null;

    return children(scope);
};
