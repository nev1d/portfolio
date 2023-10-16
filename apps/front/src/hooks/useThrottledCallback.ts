import { useCallback, useEffect, useState } from 'react';

export const useThrottledCallback = (callback: (...args: any[]) => void, delay: number) => {
    const [lastCall, setLastCall] = useState(0);

    const throttledCallback = useCallback(
        (...args: unknown[]) => {
            const now = Date.now();

            if (now - lastCall >= delay) {
                callback(...args);
                setLastCall(now);
            }
        },
        [callback, delay, lastCall],
    );

    useEffect(() => {
        return () => {
            setLastCall(0);
        };
    }, []);

    return throttledCallback;
};
