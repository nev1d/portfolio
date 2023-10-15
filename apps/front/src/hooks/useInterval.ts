import { useRef } from 'react';

import { useIsomorphicLayoutEffect } from 'framer-motion';

export type UseIntervalProps = {
    callback: ({ pauseInterval }: { pauseInterval: () => void }) => Promise<void>;
    intervalTime: number;
};
export const useInterval = ({ callback, intervalTime }: UseIntervalProps) => {
    const savedCallback = useRef(callback);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useIsomorphicLayoutEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    const pauseInterval = () => {
        clearInterval(intervalRef.current as ReturnType<typeof setInterval>);
    };

    const startInterval = () => {
        intervalRef.current = setInterval(async () => {
            await savedCallback.current?.({ pauseInterval });
        }, intervalTime);
    };

    const restartInterval = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            startInterval();
        }
    };

    return { startInterval, pauseInterval, restartInterval };
};
