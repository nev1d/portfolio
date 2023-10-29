import { PagesEnum } from '@/constants/pages/index';
import { CoordsRecordPartial } from '@/typings/coords';

export type PagesCameraPositionValues = Partial<{
    coords: CoordsRecordPartial;
    lookAt: CoordsRecordPartial;
    delay: number;
    duration: number;
}>;

export const DefaultCameraTransitionDuration = 800;
export const PagesCameraPosition: Record<PagesEnum, PagesCameraPositionValues> = {
    [PagesEnum.MAIN]: {
        coords: {
            z: 55,
            y: 15,
        },
        lookAt: {
            y: 0,
        },
        delay: 0.5,
    },
    [PagesEnum.ABOUT]: {
        coords: {
            z: 150,
            y: 15,
        },
        lookAt: {
            y: 120,
        },
        delay: 0.5,
    },
    [PagesEnum.SKILLS]: {
        coords: {
            x: 150,
        },
        lookAt: {
            y: -120,
        },
        delay: 0.5,
    },
    [PagesEnum.PORTFOLIO]: {
        coords: {
            z: -40,
            y: 15,
        },
        lookAt: {
            z: -120,
        },
        delay: 1,
    },
    [PagesEnum.CONTACT]: {
        coords: {
            x: -150,
        },
        lookAt: {
            z: -120,
        },
        delay: 1,
    },
};
