'use client';

import React, { PropsWithChildren } from 'react';

import { GlobalMediaQueriesContext, useGlobalMediaQueries } from '@/hooks/useGlobalMediaQuery';

export const WithMediaQueries: React.FC<PropsWithChildren> = ({ children }) => {
    const mediaQueries = useGlobalMediaQueries();

    return <GlobalMediaQueriesContext.Provider value={mediaQueries}>{children}</GlobalMediaQueriesContext.Provider>;
};
