import { useEffect } from 'react';

import { PagesEnum } from '@/constants/pages';
import { useCurrentPathname } from '@/hooks/useCurrentPathname';
import { usePortfolioStore } from '@/store/portfolio';
import { useFrame } from '@react-three/fiber';

export const PortfolioModels = () => {
    const setCurrentCameraPosition = usePortfolioStore((store) => store.setCurrentCameraPosition);
    const currentCameraPosition = usePortfolioStore((store) => store.currentCameraPosition);
    const cameraLimits = usePortfolioStore((store) => store.cameraLimits);

    const pathname = useCurrentPathname();

    useFrame((state) => {
        if (pathname === PagesEnum.PORTFOLIO) state.camera.position.x = currentCameraPosition;
    });

    useEffect(() => {
        if (pathname !== PagesEnum.PORTFOLIO) {
            setCurrentCameraPosition(cameraLimits[0]);
        }
    }, [pathname]);

    return null;
};
