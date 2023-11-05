import { useEffect } from 'react';

import { useForceUpdate } from '@/hooks/useForceUpdate';
import { useWindowSize } from '@/hooks/useWindowSize';

export const useUpdateOnResize = () => {
    const [key, updateCallback] = useForceUpdate();

    const [width, height] = useWindowSize();

    useEffect(() => {
        updateCallback();
    }, [width, height]);

    return key;
};
