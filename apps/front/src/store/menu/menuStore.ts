import { create } from 'zustand';

interface MenuStore {
    menuItems: string[];
    isPlatformsVisible: boolean;
    togglePlatforms: (platformsActive: boolean) => void;
}

export const useMenuStore = create<MenuStore>((set) => ({
    menuItems: ['who am i', 'projects', 'contact', 'resume'],
    isPlatformsVisible: true,
    togglePlatforms: (isPlatformsVisible: boolean) => {
        set({ isPlatformsVisible });
    },
}));
