import { PagesEnum } from '@/constants/pages';
import { PagesCameraPosition, PagesCameraPositionValues } from '@/constants/pages/camera';

import { create } from 'zustand';

type CameraPositionStore = {
    cameraPosition: Pick<PagesCameraPositionValues, 'coords' | 'lookAt'>;
    cameraPositionsConfig: Record<PagesEnum, PagesCameraPositionValues>;

    /* Actions */
    resetCameraPositionsConfig: () => void;
    setCameraPosition: (cameraPositions: CameraPositionStore['cameraPosition']) => void;
    setCameraPositionsConfig: (page: PagesEnum, values: PagesCameraPositionValues['coords']) => void;
    setCameraPositionsConfigLookAt: (page: PagesEnum, values: PagesCameraPositionValues['lookAt']) => void;
};

export const useCameraPositionStore = create<CameraPositionStore>((set) => ({
    /* Move Result and Portfolio store here */
    cameraPosition: { ...PagesCameraPosition[PagesEnum.MAIN] },
    cameraPositionsConfig: { ...PagesCameraPosition },

    resetCameraPositionsConfig: () => set({ cameraPositionsConfig: { ...PagesCameraPosition } }),

    setCameraPosition: (cameraPosition: CameraPositionStore['cameraPosition']) => {
        set({ cameraPosition });
    },

    setCameraPositionsConfig: (page: PagesEnum, values: PagesCameraPositionValues['coords']) =>
        set((state) => ({
            cameraPositionsConfig: {
                ...state.cameraPositionsConfig,
                [page]: {
                    ...state.cameraPositionsConfig[page],
                    coords: {
                        ...state.cameraPositionsConfig[page].coords,
                        ...values,
                    },
                },
            },
        })),

    setCameraPositionsConfigLookAt: (page: PagesEnum, values: PagesCameraPositionValues['lookAt']) =>
        set((state) => ({
            cameraPositionsConfig: {
                ...state.cameraPositionsConfig,
                [page]: {
                    ...state.cameraPositionsConfig[page],
                    lookAt: {
                        ...state.cameraPositionsConfig[page].lookAt,
                        ...values,
                    },
                },
            },
        })),
}));
