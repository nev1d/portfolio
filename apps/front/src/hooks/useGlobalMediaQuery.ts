import { createContext, useContext } from 'react';

import { useMediaQuery } from '@/hooks/useMediaQuery';

const customQueries = {
    mobileS: '(max-width: 320px)',
    mobileM: '(max-width: 375px)',
    mobileL: '(max-width: 412px)',
    mobile: '(max-width: 599px)',
    tabletM: '(max-width: 768px)',
    tablet: '(max-width: 1023px)',
    desktopM: '(max-width: 1280px)',
    desktopL: '(max-width: 1440px)',
    desktopXL: '(max-width: 1920px)',
};

export type MediaQueries =
    | 'mobileS'
    | 'mobileM'
    | 'mobileL'
    | 'mobile'
    | 'tabletM'
    | 'tablet'
    | 'desktopM'
    | 'desktopL'
    | 'desktopXL';

const defaultContextValue: Record<MediaQueries, boolean> = {
    mobileS: false,
    mobileM: false,
    mobileL: false,
    mobile: false,
    tabletM: false,
    tablet: false,
    desktopM: false,
    desktopL: false,
    desktopXL: true,
};

export const mediaQueriesOrder: MediaQueries[] = [
    'mobileS',
    'mobileM',
    'mobileL',
    'mobile',
    'tabletM',
    'tablet',
    'desktopM',
    'desktopL',
    'desktopXL',
];

export const GlobalMediaQueriesContext = createContext(defaultContextValue);

export const useGlobalMediaQueriesContext = () => useContext(GlobalMediaQueriesContext);

export const useGlobalMediaQueries = () => {
    const isMobileS = useMediaQuery(customQueries.mobileS);
    const isMobileM = useMediaQuery(customQueries.mobileM);
    const isMobileL = useMediaQuery(customQueries.mobileL);
    const isMobile = useMediaQuery(customQueries.mobile);
    const isTabletM = useMediaQuery(customQueries.tabletM);
    const isTablet = useMediaQuery(customQueries.tablet);
    const isDesktopM = useMediaQuery(customQueries.desktopM);
    const isDesktopL = useMediaQuery(customQueries.desktopL);
    const isDesktopXL = useMediaQuery(customQueries.desktopXL);

    return {
        mobileS: isMobileS,
        mobileM: isMobileM,
        mobileL: isMobileL,
        mobile: isMobile,
        tabletM: isTabletM,
        tablet: isTablet,
        desktopM: isDesktopM,
        desktopL: isDesktopL,
        desktopXL: isDesktopXL,
    };
};
