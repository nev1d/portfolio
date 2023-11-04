import { PagesEnum } from '@/constants/pages';
import { DefaultCameraTransitionDuration, PagesCameraPosition } from '@/constants/pages/camera';
import { useAppStore } from '@/store/app';
import { toSeconds } from '@/utils/math/toSeconds';

import { create } from 'zustand';

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
    inProgress: boolean;

    /* Actions */
    setMenuStatus: (menuStatus: MenuStatus) => void;
    chooseMenuItem: (route: PagesEnum, callback: () => void) => void;
    setHasBeenInitialized: () => void;
};

export const useMenuStore = create<MenuStore>((set, getState) => ({
    menuItems: [
        { label: 'who am i', route: PagesEnum.ABOUT },
        { label: 'portfolio', route: PagesEnum.PORTFOLIO },
        { label: 'skills', route: PagesEnum.SKILLS },
        { label: 'contact', route: PagesEnum.CONTACT },
    ],
    menuStatus: MenuStatus.INITIAL,
    hasBeenInitialized: false,
    inProgress: false,

    /* Actions */
    setMenuStatus: (menuStatus: MenuStatus) => {
        set({ menuStatus });
    },
    chooseMenuItem: (route: PagesEnum, callback: () => void) => {
        if (getState().inProgress) return;

        set({ menuStatus: MenuStatus.OPEN, inProgress: true });

        const { duration = toSeconds(DefaultCameraTransitionDuration), delay = 0 } = Object(PagesCameraPosition[route]);

        const appStore = useAppStore.getState();

        appStore.setCurrentTransitionItem(route);

        setTimeout(
            () => {
                callback();
                set({ inProgress: false });
            },
            (duration + delay) * 1000,
        );
    },
    setHasBeenInitialized: () => {
        set({ hasBeenInitialized: true });
    },
}));
