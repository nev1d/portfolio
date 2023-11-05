'use client';

import React, { PropsWithChildren } from 'react';

import { usePageUtils } from '@/hooks/usePageUtils';

export const WithPageUtils: React.FC<PropsWithChildren> = ({ children }) => {
    usePageUtils();

    return children;
};
