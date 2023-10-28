import { PagesEnum } from '@/constants/pages';

import { create } from 'zustand';

type AppStore = {
    currentTransitionItem: PagesEnum;
    loaded: boolean;

    /* Actions */
    setCurrentTransitionItem: (route: PagesEnum) => void;
    setAppLoaded: () => void;
};

export const useAppStore = create<AppStore>((set) => ({
    loaded: false,
    currentTransitionItem: PagesEnum.MAIN,

    /* Actions */
    setCurrentTransitionItem: (route: PagesEnum) => {
        set({ currentTransitionItem: route });
    },
    setAppLoaded: () => {
        set({ loaded: true });
    },
}));
