import { create } from 'zustand';

interface MenuStore {
    menuItems: string[];
}

export const useMenuStore = create<MenuStore>((set) => ({
    menuItems: ['hire me', 'portfolio', 'about', 'who am`i'],
}));
