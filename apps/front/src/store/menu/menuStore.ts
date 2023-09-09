import { create } from 'zustand';

export enum MenuStatus {
    INITIAL = 'initial',
    PRESENTATION = 'presentation',
    CLICKED = 'clicked',
    ENDED = 'ended',
}

interface MenuStore {
    menuItems: string[];
    menuStatus: MenuStatus;
    isPlatformsVisible: boolean;

    /* Actions */
    togglePlatforms: (platformsActive: boolean) => void;
    setMenuStatus: (menuStatus: MenuStatus) => void;
}

export const useMenuStore = create<MenuStore>((set) => ({
    menuItems: ['who am i', 'projects', 'contact', 'resume'],
    menuStatus: MenuStatus.INITIAL,
    isPlatformsVisible: true,
    togglePlatforms: (isPlatformsVisible: boolean) => {
        set({ isPlatformsVisible });
    },
    setMenuStatus: (menuStatus: MenuStatus) => {
        set({ menuStatus });
    },
}));
