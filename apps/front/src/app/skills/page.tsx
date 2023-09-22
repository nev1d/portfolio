'use client';

import React from 'react';

import { ScrollIcon } from '@/components/core/icons/ScrollIcon';

import cn from './style.module.css';

const SkillsPage = () => {
    return (
        <div className={cn.wrapper}>
            <div className={cn.scroll}>
                <ScrollIcon />
            </div>
        </div>
    );
};

export default SkillsPage;
