'use client';

import React from 'react';

import { ScrollIcon } from '@/components/core/icons/ScrollIcon';
import { SkillsTexts } from '@/components/feature/skills/SkillsTexts';
import { SKILLS_CAMERA_LIMITS } from '@/constants/skills';
import { useSkillsStore } from '@/store/skills';

import cn from './style.module.css';

const SkillsPage = () => {
    const currentCameraPosition = useSkillsStore((store) => store.currentCameraPosition);

    return (
        <div className={cn.wrapper}>
            <SkillsTexts />
            <div className={cn.scroll}>
                <ScrollIcon
                    showTop={currentCameraPosition !== SKILLS_CAMERA_LIMITS[1]}
                    showBottom={currentCameraPosition !== SKILLS_CAMERA_LIMITS[0]}
                />
            </div>
        </div>
    );
};

export default SkillsPage;
