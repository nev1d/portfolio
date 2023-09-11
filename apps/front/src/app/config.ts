import React from 'react';

import MainPage from '@/app/page';
import TestPage from '@/app/test/page';
import { PagesEnum } from '@/constants/pages';

export const PageConfig: Record<PagesEnum, () => React.JSX.Element> = {
    [PagesEnum.MAIN]: MainPage,
    [PagesEnum.TEST]: TestPage,
};

export const PageAnimationConfig: Record<PagesEnum, Record<'initial' | 'animate' | 'exit', Record<string, unknown>>> = {
    [PagesEnum.MAIN]: { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0.5 } },
    [PagesEnum.TEST]: { initial: { scale: 0 }, animate: { scale: 1 }, exit: { scale: 0.5 } },
};
