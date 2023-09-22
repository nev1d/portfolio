import React from 'react';

import AboutPage from '@/app/about/page';
import MainPage from '@/app/page';
import SkillsPage from '@/app/skills/page';
import { PagesEnum } from '@/constants/pages';

export const PageConfig: Record<PagesEnum, () => React.JSX.Element> = {
    [PagesEnum.MAIN]: MainPage,
    [PagesEnum.ABOUT]: AboutPage,
    [PagesEnum.SKILLS]: SkillsPage,
};

export const PageAnimationConfig: Record<PagesEnum, Record<'initial' | 'animate' | 'exit', Record<string, unknown>>> = {
    [PagesEnum.MAIN]: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    },
    [PagesEnum.ABOUT]: {
        initial: { x: '100%' },
        animate: { x: '0%' },
        exit: { scale: 1 },
    },
    [PagesEnum.SKILLS]: {
        initial: { x: '100%' },
        animate: { x: '0%' },
        exit: { scale: 1 },
    },
};
