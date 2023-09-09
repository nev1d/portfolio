import { SetStateAction, useEffect, useState } from 'react';

export const useSpringAnimationCycle = ({ totalAnimatedParts = 0 }: { totalAnimatedParts: number }) => {
    const [animatedPartsCount, setAnimatedPartsCount] = useState(0);
    const [hasBeenAnimatedInitial, setHasBeenAnimatedInitial] = useState(false);
    const [animationCycleStatus, setAnimationCycleStatus] = useState<'finished' | 'firstHalf' | 'secondHalf'>(
        'finished',
    );

    useEffect(() => {
        if (animatedPartsCount < totalAnimatedParts) return;

        setAnimatedPartsCount(0);

        if (animationCycleStatus === 'finished') return;

        if (animationCycleStatus === 'secondHalf') {
            setAnimationCycleStatus('finished');

            return;
        }

        setAnimationCycleStatus('secondHalf');
    }, [animatedPartsCount]);

    useEffect(() => {
        if (!hasBeenAnimatedInitial) setHasBeenAnimatedInitial(true);
    }, [animatedPartsCount]);

    const startAnimationCycle = () => {
        if (!hasBeenAnimatedInitial) return;

        if (animationCycleStatus !== 'finished') return;

        setAnimationCycleStatus('firstHalf');
    };

    const setAnimationProgress = (callback: SetStateAction<number>) => {
        if (animationCycleStatus === 'finished') return;

        setAnimatedPartsCount(callback);
    };

    const onResolve = () => {
        setAnimationProgress((parts: number) => parts + 1);
    };

    return {
        animatedPartsCount,
        animationCycleStatus,
        startAnimationCycle,
        setAnimationProgress,
        hasBeenAnimatedInitial,
        onResolve,
    };
};
