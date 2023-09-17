import { PagesEnum } from '@/constants/pages/index';

export const PageMetadata: Record<PagesEnum, { title: string }> = {
    [PagesEnum.ABOUT]: {
        title: 'About',
    },
    [PagesEnum.MAIN]: {
        title: 'Home',
    },
};
