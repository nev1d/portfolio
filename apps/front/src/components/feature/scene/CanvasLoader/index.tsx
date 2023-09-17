import { useEffect } from 'react';

import { useAppStore } from '@/store/app';

export const CanvasLoader = () => {
    const setAppLoaded = useAppStore((store) => store.setAppLoaded);

    useEffect(() => {
        return () => {
            setAppLoaded();
        };
    }, []);

    return null;
};
