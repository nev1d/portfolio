import { useEffect, useState } from 'react';

export const useWindowSize = (): [number, number] => {
    const [windowSize, setWindowSize] = useState<Record<string, number>>({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return [windowSize.width, windowSize.height];
};
