'use client';

import React from 'react';

import { PageMetadata } from '@/constants/pages/metadata';
import { useCurrentPathname } from '@/hooks/useCurrentPathname';

export const RootTitle = () => {
    const pathname = useCurrentPathname();

    const title = `Daniil Nikoniuk - ${PageMetadata[pathname].title}`;

    return <title>{title}</title>;
};
