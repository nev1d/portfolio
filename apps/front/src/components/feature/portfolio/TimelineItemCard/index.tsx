import React from 'react';

import { AnimatedText } from '@/components/core/AnimatedText';

import cn from './style.module.css';

export type TimelineItemCardProps = {
    title: string;
    description: string;
};

export const TimelineItemCard: React.FC<TimelineItemCardProps> = ({ title, description }) => {
    return (
        <div className={cn.card}>
            <div className={cn.title}>
                <AnimatedText text={title} fontSize={24} />
            </div>
            <div className={cn.description}>
                <AnimatedText text={description} fontSize={16} />
            </div>
        </div>
    );
};
