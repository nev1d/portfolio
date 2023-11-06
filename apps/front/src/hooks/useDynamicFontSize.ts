import { useMemo } from 'react';

import { FontSize } from '@/constants/fonts';
import { MediaQueries, mediaQueriesOrder, useGlobalMediaQueriesContext } from '@/hooks/useGlobalMediaQuery';

type SizeCfg = {
    default: FontSize;
} & Partial<Record<MediaQueries, FontSize>>;

export const useDynamicFontSize = (sizes: SizeCfg) => {
    const mediaQueries = useGlobalMediaQueriesContext();

    const activeSize = useMemo(() => {
        const query = mediaQueriesOrder.find((item) => item in sizes && mediaQueries[item]);

        if (query) return sizes[query];

        return sizes.default;
    }, [sizes, mediaQueries]);

    return activeSize as FontSize;
};
