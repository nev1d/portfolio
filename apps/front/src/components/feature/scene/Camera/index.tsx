import React, { useEffect, useMemo } from 'react';

import { PagesEnum } from '@/constants/pages';
import {
    DefaultCameraTransitionDuration,
    PagesCameraPosition,
    PagesCameraPositionValues,
} from '@/constants/pages/camera';
import { useCurrentPathname } from '@/hooks/useCurrentPathname';
import { useHasBeenMounted } from '@/hooks/useHasBeenMounted';
import { useAppStore } from '@/store/app';
import { toSeconds } from '@/utils/math/toSeconds';
import { useFrame } from '@react-three/fiber';

import { animate, MotionValue, useMotionValue } from 'framer-motion';
import { RequiredDeep } from 'type-fest';

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

const useAnimateCamera = (
    {
        property,
        target,
        config,
    }: { property: MotionValue<number>; target: number; config: RequiredDeep<PagesCameraPositionValues> },
    deps: React.DependencyList,
) => {
    useEffect(() => {
        animate(property, target, {
            duration: config.duration,
            delay: config.delay,
            ease: 'easeInOut',
        });
    }, deps);
};

export const Camera: React.FC = () => {
    const setCurrentTransitionItem = useAppStore((store) => store.setCurrentTransitionItem);
    const currentTransitionItem = useAppStore((store) => store.currentTransitionItem);

    const pathname = useCurrentPathname();

    const hasBeenMounted = useHasBeenMounted();

    const currentPageConfig = useMemo(() => {
        if (!hasBeenMounted) return getCurrentPageValues(pathname);

        return getCurrentPageValues(currentTransitionItem);
    }, [currentTransitionItem]);

    const cameraZ = useMotionValue(currentPageConfig.coords.z);
    const cameraY = useMotionValue(currentPageConfig.coords.y);
    const cameraX = useMotionValue(currentPageConfig.coords.x);
    const cameraLookAtY = useMotionValue(currentPageConfig.lookAt.y);
    const cameraLookAtX = useMotionValue(currentPageConfig.lookAt.x);
    const cameraLookAtZ = useMotionValue(currentPageConfig.lookAt.z);

    useEffect(() => {
        setCurrentTransitionItem(pathname);
    }, [pathname]);

    useAnimateCamera({ property: cameraZ, target: currentPageConfig.coords.z, config: currentPageConfig }, [
        currentTransitionItem,
    ]);
    useAnimateCamera({ property: cameraY, target: currentPageConfig.coords.y, config: currentPageConfig }, [
        currentTransitionItem,
    ]);
    useAnimateCamera({ property: cameraX, target: currentPageConfig.coords.x, config: currentPageConfig }, [
        currentTransitionItem,
    ]);

    useAnimateCamera({ property: cameraLookAtY, target: currentPageConfig.lookAt.y, config: currentPageConfig }, [
        currentTransitionItem,
    ]);
    useAnimateCamera({ property: cameraLookAtX, target: currentPageConfig.lookAt.x, config: currentPageConfig }, [
        currentTransitionItem,
    ]);
    useAnimateCamera({ property: cameraLookAtZ, target: currentPageConfig.lookAt.z, config: currentPageConfig }, [
        currentTransitionItem,
    ]);

    useFrame((state) => {
        state.camera.position.z = cameraZ.get();
        state.camera.position.y = cameraY.get();
        state.camera.position.x = cameraX.get();
        state.camera.lookAt(cameraLookAtX.get(), cameraLookAtY.get(), cameraLookAtZ.get());
    });

    return null;
};
