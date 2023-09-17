import React, { useEffect, useMemo } from 'react';

import { animate, useMotionValue } from 'framer-motion';
import { RequiredDeep } from 'type-fest';

import { PagesEnum } from '@/constants/pages';
import {
    DefaultCameraTransitionDuration,
    PagesCameraPosition,
    PagesCameraPositionValues,
} from '@/constants/pages/camera';
import { useCurrentPathname } from '@/hooks/useCurrentPathname';
import { toSeconds } from '@/utils/math/toSeconds';
import { useFrame } from '@react-three/fiber';

const getCurrentPageValues = (page: PagesEnum): RequiredDeep<PagesCameraPositionValues> => {
    const defaultValues: RequiredDeep<PagesCameraPositionValues> = {
        coords: {
            x: 0,
            y: 0,
            z: 0,
        },
        lookAt: {
            x: 0,
            y: 0,
            z: 0,
        },
        delay: 0,
        duration: toSeconds(DefaultCameraTransitionDuration),
    };

    const { coords, lookAt, ...rest } = Object(PagesCameraPosition[page]);

    return {
        ...defaultValues,
        coords: { ...defaultValues.coords, ...coords },
        lookAt: { ...defaultValues.lookAt, ...lookAt },
        ...rest,
    };
};

export const Camera: React.FC = () => {
    const pathname = useCurrentPathname();

    const currentPageConfig = useMemo(() => {
        return getCurrentPageValues(pathname);
    }, [pathname]);

    const cameraZ = useMotionValue(currentPageConfig.coords.z);
    const cameraLookAtY = useMotionValue(currentPageConfig.lookAt.y);

    useEffect(() => {
        animate(cameraZ, currentPageConfig.coords.z, {
            duration: currentPageConfig.duration,
            delay: currentPageConfig.delay,
        });

        animate(cameraLookAtY, currentPageConfig.lookAt.y, {
            duration: currentPageConfig.duration,
            delay: currentPageConfig.delay,
        });
    }, [pathname]);

    useFrame((state) => {
        state.camera.position.z = cameraZ.get();
        state.camera.lookAt(0, cameraLookAtY.get(), 0);
    });

    return null;
};
