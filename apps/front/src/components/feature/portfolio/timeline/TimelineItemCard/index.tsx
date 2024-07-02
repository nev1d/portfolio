import React from 'react';

import { AnimatedText } from '@/components/core/AnimatedText';
import { useTimelineAnimation } from '@/components/feature/portfolio/timeline/hooks/useTimelineAnimation';
import { FontSize } from '@/constants/fonts';

import cn from './style.module.css';

import { motion } from 'framer-motion';

export type TimelineItemCardProps = {
    title: string;
    description: string[];
};

const animations = {
    initial: {
        opacity: 0,
        y: -320,
    },
    animate: {
        opacity: 1,
        y: 0,
    },
};

export const TimelineItemCard: React.FC<TimelineItemCardProps> = ({ title, description }) => {
    const { ref } = useTimelineAnimation(animations);

    return (
        <motion.div className={cn.card} ref={ref} initial={animations.initial}>
            <div className={cn.title}>
                <AnimatedText text={title} fontSize={FontSize.LARGE} />
            </div>
            <div className={cn.description}>
                {description.map((row) => (
                    <AnimatedText key={row} text={row} fontSize={FontSize.SMALL} />
                ))}
            </div>
        </motion.div>
    );
};
