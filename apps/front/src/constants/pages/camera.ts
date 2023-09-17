import { PagesEnum } from '@/constants/pages/index';

export type PagesCameraPositionValues = Partial<{
    coords: Partial<Record<'y' | 'x' | 'z', number>>;
    lookAt: Partial<Record<'y' | 'x' | 'z', number>>;
    delay: number;
    duration: number;
}>;

export const DefaultCameraTransitionDuration = 400;
export const PagesCameraPosition: Record<PagesEnum, PagesCameraPositionValues> = {
    [PagesEnum.MAIN]: {
        coords: {
            z: 55,
        },
        lookAt: {
            y: 0,
        },
    },
    [PagesEnum.ABOUT]: {
        coords: {
            z: 150,
        },
        lookAt: {
            y: 120,
        },
        delay: 0.5,
    },
};
