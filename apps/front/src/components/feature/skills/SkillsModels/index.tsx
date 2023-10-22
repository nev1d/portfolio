'use client';

import React, { useEffect } from 'react';

import { MovingLight } from '@/components/feature/scene/Lights/MovingLight';
import { DevOpsLogo } from '@/components/feature/scene/models/DevOpsLogo';
import { FrontOpsLogo } from '@/components/feature/scene/models/FrontOpsLogo';
import { NodeJSLogo } from '@/components/feature/scene/models/NodeJSLogo';
import { ReactLogo } from '@/components/feature/scene/models/ReactLogo';
import { VueLogo } from '@/components/feature/scene/models/VueLogo';
import { PagesEnum } from '@/constants/pages';
import { SKILLS_CAMERA_LIMITS } from '@/constants/skills';
import { useCurrentPathname } from '@/hooks/useCurrentPathname';
import { useSkillsStore } from '@/store/skills';
import { useFrame } from '@react-three/fiber';

import { animate, useMotionValue } from 'framer-motion';

export const SkillsModels = () => {
    const setCurrentCameraPosition = useSkillsStore((store) => store.setCurrentCameraPosition);
    const currentCameraPosition = useSkillsStore((store) => store.currentCameraPosition);

    const cameraX = useMotionValue(SKILLS_CAMERA_LIMITS[0]);

    const pathname = useCurrentPathname();

    const isSkillsPage = pathname === PagesEnum.SKILLS;

    useEffect(() => {
        animate(cameraX, currentCameraPosition, {
            duration: 0.5,
        });
    }, [currentCameraPosition]);

    useEffect(() => {
        if (!isSkillsPage) return;
        const scrollListener = (event: WheelEvent) => {
            const scroll = event.deltaY / 10;

            const currentScroll = currentCameraPosition + scroll;

            const [MIN, MAX] = SKILLS_CAMERA_LIMITS;

            if (currentScroll >= MIN) {
                setCurrentCameraPosition(MIN);

                return;
            }

            if (currentScroll <= MAX) {
                setCurrentCameraPosition(MAX);

                return;
            }

            setCurrentCameraPosition(currentScroll);
        };

        window.addEventListener('wheel', scrollListener);

        return () => {
            window.removeEventListener('wheel', scrollListener);
        };
    }, [currentCameraPosition, pathname]);

    useFrame((state) => {
        if (isSkillsPage) state.camera.position.x = cameraX.get();
    });

    useEffect(() => {
        if (!isSkillsPage) {
            setCurrentCameraPosition(SKILLS_CAMERA_LIMITS[0]);
            cameraX.set(SKILLS_CAMERA_LIMITS[0]);
        }
    }, [pathname]);

    return (
        <>
            {isSkillsPage && <MovingLight position={[cameraX.get(), 100, 0]} />}
            <ReactLogo />
            <VueLogo />
            <FrontOpsLogo />
            <NodeJSLogo />
            <DevOpsLogo />
        </>
    );
};
