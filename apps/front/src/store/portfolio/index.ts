import { Maybe } from '@/typings/utils/maybe';

import { create } from 'zustand';

type PortfolioStore = {
    currentCameraPosition: number;
    cameraLimits: [number, Maybe<number>];

    /* Actions */
    setCurrentCameraPosition: (position: number) => void;
    setCameraLimits: (limitsTuple: PortfolioStore['cameraLimits']) => void;
};

export const usePortfolioStore = create<PortfolioStore>((set) => ({
    currentCameraPosition: 0,
    cameraLimits: [0, null],

    /* Actions */
    setCurrentCameraPosition: (position: number) => {
        set({ currentCameraPosition: position });
    },
    setCameraLimits: (limitsTuple: PortfolioStore['cameraLimits']) => {
        set({ cameraLimits: limitsTuple });
    },
}));
