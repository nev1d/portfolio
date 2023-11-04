import { useEffect } from 'react';

import { useAppStore } from '@/store/app';
import Logger from '@/utils/logger';

export const CanvasLoader = () => {
    const setAppLoaded = useAppStore((store) => store.setAppLoaded);

    useEffect(() => {
        Logger.success('Canvas loading');

        return () => {
            Logger.success('Canvas loaded successfully');

            setAppLoaded();
        };
    }, []);

    return null;
};
