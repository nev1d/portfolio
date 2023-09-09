import { SetStateAction, useEffect, useState } from 'react';

export const useSpringAnimationCycle = ({ totalAnimatedParts = 0 }: { totalAnimatedParts: number }) => {
    const [animatedPartsCount, setAnimatedPartsCount] = useState(0);
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

    const startAnimationCycle = () => {
        if (animationCycleStatus !== 'finished') return;

        setAnimationCycleStatus('firstHalf');
    };

    const setAnimationProgress = (callback: SetStateAction<number>) => {
        if (animationCycleStatus === 'finished') return;

        setAnimatedPartsCount(callback);
    };

    return {
        animatedPartsCount,
        animationCycleStatus,
        startAnimationCycle,
        setAnimationProgress,
    };
};
