import React, { useEffect } from 'react';

import { animate, useMotionValue } from 'framer-motion';

import { MENU_CLICK_DELAY, MENU_CLICK_DURATION } from '@/constants/menu';
import { MenuStatus, useMenuStore } from '@/store/menu/menuStore';
import { toSeconds } from '@/utils/math/toSeconds';
import { useFrame } from '@react-three/fiber';

const cameraXCoords = [55, 150];
const cameraLookAtYCoords = [0, -100];

export const MenuCamera: React.FC = () => {
    const menuStatus = useMenuStore((store) => store.menuStatus);

    const cameraX = useMotionValue(menuStatus === MenuStatus.OPEN ? cameraXCoords[1] : cameraXCoords[0]);
    const cameraLookAtY = useMotionValue(
        menuStatus === MenuStatus.OPEN ? cameraLookAtYCoords[1] : cameraLookAtYCoords[0],
    );

    useEffect(() => {
        const isMenuOpen = menuStatus === MenuStatus.OPEN;

        animate(cameraX, isMenuOpen ? cameraXCoords[1] : cameraXCoords[0], {
            duration: toSeconds(MENU_CLICK_DURATION),
            delay: isMenuOpen ? toSeconds(MENU_CLICK_DELAY) : 0,
        });

        animate(cameraLookAtY, isMenuOpen ? cameraLookAtYCoords[1] : cameraLookAtYCoords[0], {
            duration: toSeconds(MENU_CLICK_DURATION),
            delay: isMenuOpen ? toSeconds(MENU_CLICK_DELAY) : 0,
        });
    }, [menuStatus]);

    useFrame((state) => {
        state.camera.position.z = cameraX.get();
        state.camera.lookAt(0, cameraLookAtY.get(), 0);
    });

    return null;
};
