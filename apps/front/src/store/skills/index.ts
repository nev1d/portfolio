import { create } from 'zustand';

type AppStore = {
    currentCameraPosition: number;

    /* Actions */
    setCurrentCameraPosition: (position: number) => void;
};

export const useSkillsStore = create<AppStore>((set) => ({
    currentCameraPosition: 150,

    /* Actions */
    setCurrentCameraPosition: (position: number) => {
        set({ currentCameraPosition: position });
    },
}));
