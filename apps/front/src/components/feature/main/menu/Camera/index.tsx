import React, { useEffect } from 'react';

import { animate, useMotionValue } from 'framer-motion';

import { MENU_CLICK_DELAY, MENU_CLICK_DURATION } from '@/constants/menu';
import { MenuStatus, useMenuStore } from '@/store/menu/menuStore';
import { toSeconds } from '@/utils/math/toSeconds';
import { useFrame } from '@react-three/fiber';

export const MenuCamera: React.FC = () => {
    const menuStatus = useMenuStore((store) => store.menuStatus);

    const cameraX = useMotionValue(menuStatus === MenuStatus.OPEN ? 150 : 55);

    useEffect(() => {
        const isMenuOpen = menuStatus === MenuStatus.OPEN;

        animate(cameraX, isMenuOpen ? 150 : 55, {
            duration: toSeconds(MENU_CLICK_DURATION),
            delay: isMenuOpen ? toSeconds(MENU_CLICK_DELAY) : 0,
        });
    }, [menuStatus]);

    useFrame((state) => {
        state.camera.position.z = cameraX.get();
    });

    return null;
};
