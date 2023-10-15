'use client';

import React from 'react';

import { ScrollIcon } from '@/components/core/icons/ScrollIcon';
import { Timeline } from '@/components/feature/portfolio/Timeline';
import { usePortfolioStore } from '@/store/portfolio';

import cn from '@/app/skills/style.module.css';

const PortfolioPage = () => {
    const currentCameraPosition = usePortfolioStore((store) => store.currentCameraPosition);
    const [limitsFrom, limitsTo] = usePortfolioStore((store) => store.cameraLimits);

    return (
        <div className={cn.wrapper}>
            <Timeline />
            <div className={cn.scroll}>
                <ScrollIcon
                    showTop={currentCameraPosition !== limitsFrom}
                    showBottom={currentCameraPosition !== limitsTo}
                />
            </div>
        </div>
    );
};

export default PortfolioPage;
