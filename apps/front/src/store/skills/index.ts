import { create } from 'zustand';

type SkillsStore = {
    currentCameraPosition: number;

    /* Actions */
    setCurrentCameraPosition: (position: number) => void;
};

export const useSkillsStore = create<SkillsStore>((set) => ({
    currentCameraPosition: 150,

    /* Actions */
    setCurrentCameraPosition: (position: number) => {
        set({ currentCameraPosition: position });
    },
}));
