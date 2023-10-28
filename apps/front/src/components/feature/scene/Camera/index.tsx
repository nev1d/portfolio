import React, { useEffect, useMemo } from 'react';

import { PagesEnum } from '@/constants/pages';
import { DefaultCameraTransitionDuration, PagesCameraPositionValues } from '@/constants/pages/camera';
import { useCurrentPathname } from '@/hooks/useCurrentPathname';
import { useHasBeenMounted } from '@/hooks/useHasBeenMounted';
import { usePreviousValue } from '@/hooks/usePreviousValue';
import { useAppStore } from '@/store/app';
import { useCameraPositionStore } from '@/store/camera';
import { toSeconds } from '@/utils/math/toSeconds';
import { useFrame } from '@react-three/fiber';

import { animate, MotionValue, useMotionValue } from 'framer-motion';
import { isEqual } from 'lodash';
import { RequiredDeep } from 'type-fest';

const getCurrentPageValues = (
    page: PagesEnum,
    cameraPositions: Record<PagesEnum, PagesCameraPositionValues>,
): RequiredDeep<PagesCameraPositionValues> => {
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

    const { coords, lookAt, ...rest } = Object(cameraPositions[page]);

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
        instant,
    }: {
        property: MotionValue<number>;
        target: number;
        config: RequiredDeep<PagesCameraPositionValues>;
        instant?: boolean;
    },
    deps: React.DependencyList,
) => {
    useEffect(() => {
        animate(property, target, {
            duration: instant ? 0 : config.duration,
            delay: instant ? 0 : config.delay,
            ease: 'easeInOut',
        });
    }, deps);
};

export const Camera: React.FC = () => {
    const setCurrentTransitionItem = useAppStore((store) => store.setCurrentTransitionItem);
    const currentTransitionItem = useAppStore((store) => store.currentTransitionItem);

    const cameraPositionsConfig = useCameraPositionStore((store) => store.cameraPositionsConfig);

    const setCameraPosition = useCameraPositionStore((store) => store.setCameraPosition);

    const previousTransitionItem = usePreviousValue(currentTransitionItem);

    const pathname = useCurrentPathname();

    const hasBeenMounted = useHasBeenMounted();

    const currentPageConfig = useMemo(() => {
        if (!hasBeenMounted) return getCurrentPageValues(pathname, cameraPositionsConfig);

        return getCurrentPageValues(currentTransitionItem, cameraPositionsConfig);
    }, [currentTransitionItem, cameraPositionsConfig]);

    const cameraZ = useMotionValue(currentPageConfig.coords.z);
    const cameraY = useMotionValue(currentPageConfig.coords.y);
    const cameraX = useMotionValue(currentPageConfig.coords.x);
    const cameraLookAtY = useMotionValue(currentPageConfig.lookAt.y);
    const cameraLookAtX = useMotionValue(currentPageConfig.lookAt.x);
    const cameraLookAtZ = useMotionValue(currentPageConfig.lookAt.z);

    useEffect(() => {
        setCurrentTransitionItem(pathname);
    }, [pathname]);

    useAnimateCamera(
        {
            property: cameraZ,
            target: currentPageConfig.coords.z,
            config: currentPageConfig,
            instant: isEqual(previousTransitionItem, currentTransitionItem),
        },
        [currentTransitionItem, currentPageConfig.coords.z],
    );
    useAnimateCamera(
        {
            property: cameraY,
            target: currentPageConfig.coords.y,
            config: currentPageConfig,
            instant: isEqual(previousTransitionItem, currentTransitionItem),
        },
        [currentTransitionItem, currentPageConfig.coords.y],
    );
    useAnimateCamera(
        {
            property: cameraX,
            target: currentPageConfig.coords.x,
            config: currentPageConfig,
            instant: isEqual(previousTransitionItem, currentTransitionItem),
        },
        [currentTransitionItem, currentPageConfig.coords.x],
    );

    useAnimateCamera(
        {
            property: cameraLookAtY,
            target: currentPageConfig.lookAt.y,
            config: currentPageConfig,
            instant: isEqual(previousTransitionItem, currentTransitionItem),
        },
        [currentTransitionItem, currentPageConfig.lookAt.y],
    );
    useAnimateCamera(
        {
            property: cameraLookAtX,
            target: currentPageConfig.lookAt.x,
            config: currentPageConfig,
            instant: isEqual(previousTransitionItem, currentTransitionItem),
        },
        [currentTransitionItem, currentPageConfig.lookAt.x],
    );
    useAnimateCamera(
        {
            property: cameraLookAtZ,
            target: currentPageConfig.lookAt.z,
            config: currentPageConfig,
            instant: isEqual(previousTransitionItem, currentTransitionItem),
        },
        [currentTransitionItem, currentPageConfig.lookAt.z],
    );

    useFrame((state) => {
        state.camera.position.z = cameraZ.get();
        state.camera.position.y = cameraY.get();
        state.camera.position.x = cameraX.get();
        state.camera.lookAt(cameraLookAtX.get(), cameraLookAtY.get(), cameraLookAtZ.get());

        setCameraPosition({
            lookAt: {
                x: cameraLookAtX.get(),
                y: cameraLookAtY.get(),
                z: cameraLookAtZ.get(),
            },
            coords: {
                x: cameraX.get(),
                y: cameraY.get(),
                z: cameraZ.get(),
            },
        });
    });

    return null;
};
