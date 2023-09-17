import { create } from 'zustand';

import { PagesEnum } from '@/constants/pages';
import { DefaultCameraTransitionDuration, PagesCameraPosition } from '@/constants/pages/camera';
import { toSeconds } from '@/utils/math/toSeconds';

export enum MenuStatus {
    INITIAL = 'initial',
    PRESENTATION = 'presentation',
    OPEN = 'clicked',
}

export type MenuStoreItem = {
    label: string;
    route: PagesEnum;
};

type MenuStore = {
    menuItems: MenuStoreItem[];
    menuStatus: MenuStatus;
    hasBeenInitialized: boolean;
    currentTransitionItem: PagesEnum;

    /* Actions */
    setCurrentTransitionItem: (route: PagesEnum) => void;
    setMenuStatus: (menuStatus: MenuStatus) => void;
    chooseMenuItem: (route: PagesEnum, callback: () => void) => void;
    setHasBeenInitialized: () => void;
};

export const useMenuStore = create<MenuStore>((set) => ({
    menuItems: [
        { label: 'who am i', route: PagesEnum.ABOUT },
        { label: 'who am i2', route: PagesEnum.ABOUT },
        { label: 'who am i3', route: PagesEnum.ABOUT },
    ],
    currentTransitionItem: PagesEnum.MAIN,
    menuStatus: MenuStatus.INITIAL,
    hasBeenInitialized: false,

    /* Actions */
    setMenuStatus: (menuStatus: MenuStatus) => {
        set({ menuStatus });
    },
    chooseMenuItem: (route: PagesEnum, callback: () => void) => {
        set({ menuStatus: MenuStatus.OPEN });

        const { duration = toSeconds(DefaultCameraTransitionDuration), delay = 0 } = Object(PagesCameraPosition[route]);

        set({ currentTransitionItem: route });

        setTimeout(
            () => {
                callback();
            },
            (duration + delay) * 1000,
        );
    },
    setCurrentTransitionItem: (route: PagesEnum) => {
        set({ currentTransitionItem: route });
    },
    setHasBeenInitialized: () => {
        set({ hasBeenInitialized: true });
    },
}));
