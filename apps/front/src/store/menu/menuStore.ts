import { create } from 'zustand';

import { MENU_CLICK_DURATION } from '@/constants/menu';
import { PagesEnum } from '@/constants/pages';

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
    isPlatformsVisible: boolean;
    hasBeenInitialized: boolean;

    /* Actions */
    togglePlatforms: (platformsActive: boolean) => void;
    setMenuStatus: (menuStatus: MenuStatus) => void;
    chooseMenuItem: (callback: () => void) => void;
    setHasBeenInitialized: () => void;
};

export const useMenuStore = create<MenuStore>((set) => ({
    menuItems: [
        { label: 'who am i', route: PagesEnum.ABOUT },
        { label: 'who am i2', route: PagesEnum.ABOUT },
        { label: 'who am i3', route: PagesEnum.ABOUT },
    ],
    menuStatus: MenuStatus.INITIAL,
    isPlatformsVisible: true,
    hasBeenInitialized: false,

    /* Actions */
    togglePlatforms: (isPlatformsVisible: boolean) => {
        set({ isPlatformsVisible });
    },
    setMenuStatus: (menuStatus: MenuStatus) => {
        set({ menuStatus });
    },
    chooseMenuItem: (callback: () => void) => {
        set({ menuStatus: MenuStatus.OPEN });

        setTimeout(() => {
            callback();
        }, MENU_CLICK_DURATION + MENU_CLICK_DURATION);
    },
    setHasBeenInitialized: () => {
        set({ hasBeenInitialized: true });
    },
}));
