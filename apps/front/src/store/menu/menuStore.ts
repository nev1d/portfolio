import { create } from 'zustand';

interface MenuStore {
    menuItems: string[];
    isPlatformsVisible: boolean;
    togglePlatforms: (platformsActive: boolean) => void;
}

export const useMenuStore = create<MenuStore>((set) => ({
    menuItems: ['hire me', 'portfolio', 'about', 'who am`i'],
    isPlatformsVisible: true,
    togglePlatforms: (isPlatformsVisible: boolean) => {
        set({ isPlatformsVisible });
    },
}));
