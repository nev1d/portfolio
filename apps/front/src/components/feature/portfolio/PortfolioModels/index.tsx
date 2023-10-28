import { useCurrentPathname } from '@/hooks/useCurrentPathname';
import { usePortfolioStore } from '@/store/portfolio';

export const PortfolioModels = () => {
    const setCurrentCameraPosition = usePortfolioStore((store) => store.setCurrentCameraPosition);
    const currentCameraPosition = usePortfolioStore((store) => store.currentCameraPosition);
    const cameraLimits = usePortfolioStore((store) => store.cameraLimits);

    const pathname = useCurrentPathname();

    return null;
};
