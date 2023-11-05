'use client';

import React, { PropsWithChildren, useEffect, useRef } from 'react';

import isMobile from 'is-mobile';

export const WithResizeSubscriber: React.FC<PropsWithChildren> = ({ children }) => {
    const isMobileInitial = useRef(isMobile());

    useEffect(() => {
        const resizeCallback = () => {
            return;
            if (isMobileInitial.current !== isMobile()) {
                window.location.reload();
            }
        };

        window.addEventListener('resize', resizeCallback);

        return () => {
            window.removeEventListener('resize', resizeCallback);
        };
    }, []);

    return children;
};
