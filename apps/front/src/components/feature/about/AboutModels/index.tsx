import React from 'react';

import { MovingLight } from '@/components/feature/scene/Lights/MovingLight';
import { Face } from '@/components/feature/scene/models/Face';
import { PagesEnum } from '@/constants/pages';
import { useCurrentPathname } from '@/hooks/useCurrentPathname';

export const AboutModels: React.FC = () => {
    const pathname = useCurrentPathname();

    const isAboutPage = pathname === PagesEnum.ABOUT;

    return (
        <>
            <Face />
            {isAboutPage && <MovingLight />}
        </>
    );
};
