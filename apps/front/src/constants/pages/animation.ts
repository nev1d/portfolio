import React from 'react';

import AboutPage from '@/app/about/page';
import ContactPage from '@/app/contact/page';
import MainPage from '@/app/page';
import PortfolioPage from '@/app/portfolio/page';
import SkillsPage from '@/app/skills/page';
import { PagesEnum } from '@/constants/pages';

import { UnknownRecord } from 'type-fest';

export const PageConfig: Record<PagesEnum, () => React.JSX.Element> = {
    [PagesEnum.MAIN]: MainPage,
    [PagesEnum.ABOUT]: AboutPage,
    [PagesEnum.SKILLS]: SkillsPage,
    [PagesEnum.PORTFOLIO]: PortfolioPage,
    [PagesEnum.CONTACT]: ContactPage,
};

export const PageAnimationConfig: Record<PagesEnum, Record<'initial' | 'animate' | 'exit', UnknownRecord>> = {
    [PagesEnum.MAIN]: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    },
    [PagesEnum.ABOUT]: {
        initial: { x: '100%' },
        animate: { x: '0%' },
        exit: { x: '100%', opacity: 0 },
    },
    [PagesEnum.SKILLS]: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { y: '100%', opacity: 0 },
    },
    [PagesEnum.PORTFOLIO]: {
        initial: { y: '-100%' },
        animate: { y: '0%' },
        exit: { opacity: 0 },
    },
    [PagesEnum.CONTACT]: {
        initial: { y: '100%' },
        animate: { y: '0%' },
        exit: { y: '100%' },
    },
};
