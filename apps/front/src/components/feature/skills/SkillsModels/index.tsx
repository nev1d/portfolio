'use client';

import React, { useEffect } from 'react';

import { MovingLight } from '@/components/feature/scene/Lights/MovingLight';
import { DevOpsLogo } from '@/components/feature/scene/models/DevOpsLogo';
import { FrontOpsLogo } from '@/components/feature/scene/models/FrontOpsLogo';
import { NodeJSLogo } from '@/components/feature/scene/models/NodeJSLogo';
import { ReactLogo } from '@/components/feature/scene/models/ReactLogo';
import { VueLogo } from '@/components/feature/scene/models/VueLogo';
import { PagesEnum } from '@/constants/pages';
import { PagesCameraPosition } from '@/constants/pages/camera';
import { SKILLS_CAMERA_LIMITS } from '@/constants/skills';
import { useCurrentPathname } from '@/hooks/useCurrentPathname';
import { useCameraPositionStore } from '@/store/camera';
import { useSkillsStore } from '@/store/skills';
import { clamp } from '@/utils/math/clamp';

import { animate, useMotionValue } from 'framer-motion';

export const SkillsModels = () => {
    const setCurrentCameraPosition = useSkillsStore((store) => store.setCurrentCameraPosition);
    const currentCameraPosition = useSkillsStore((store) => store.currentCameraPosition);
    const setCameraPositionsConfig = useCameraPositionStore((store) => store.setCameraPositionsConfig);
    const setCameraPositionsConfigLookAt = useCameraPositionStore((store) => store.setCameraPositionsConfigLookAt);

    const cameraX = useMotionValue(currentCameraPosition);

    const pathname = useCurrentPathname();

    const isSkillsPage = pathname === PagesEnum.SKILLS;

    useEffect(() => {
        animate(cameraX, currentCameraPosition, {
            duration: 0.5,
            onUpdate: (x) => {
                setCameraPositionsConfig(PagesEnum.SKILLS, { x });
                setCameraPositionsConfigLookAt(PagesEnum.SKILLS, {
                    x: x - Number(PagesCameraPosition[PagesEnum.SKILLS].coords?.x),
                });
            },
        });
    }, [currentCameraPosition]);

    useEffect(() => {
        if (!isSkillsPage) return;
        const scrollListener = (event: WheelEvent) => {
            const scroll = event.deltaY / 10;

            const currentScroll = currentCameraPosition + scroll;

            const [MIN, MAX] = SKILLS_CAMERA_LIMITS;

            setCurrentCameraPosition(clamp(currentScroll, MAX, MIN));
        };

        window.addEventListener('wheel', scrollListener);

        return () => {
            window.removeEventListener('wheel', scrollListener);
        };
    }, [currentCameraPosition, pathname]);

    return (
        <>
            <MovingLight enable={isSkillsPage} position={[cameraX.get(), 100, 0]} />
            <ReactLogo />
            <VueLogo />
            <FrontOpsLogo />
            <NodeJSLogo />
            <DevOpsLogo />
        </>
    );
};
