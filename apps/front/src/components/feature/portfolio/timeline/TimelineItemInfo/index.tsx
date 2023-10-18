import React from 'react';

import { AnimatedText } from '@/components/core/AnimatedText';
import { useTimelineAnimation } from '@/components/feature/portfolio/timeline/hooks/useTimelineAnimation';
import { TimelineItemProps } from '@/components/feature/portfolio/timeline/TimelineItem';
import { FontSize } from '@/constants/fonts';

import cn from './style.module.css';

import { motion } from 'framer-motion';

const animations = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
};

export const TimelineItemInfo: React.FC<Omit<TimelineItemProps, 'cards'>> = ({ date, company, position }) => {
    const dateInterval = `${new Date(date.from).getFullYear()} - ${new Date(date.to).getFullYear()}`;

    const { ref } = useTimelineAnimation(animations);

    return (
        <motion.div className={cn.info} ref={ref} initial={animations.initial}>
            <div className={cn.infoDate}>
                <AnimatedText fontSize={FontSize.MEDIUM} text={dateInterval} align='middle' noWrap={true} />
            </div>
            <div className={cn.infoPosition}>
                <AnimatedText fontSize={FontSize.LARGE} text={position} align='middle' noWrap={true} />
            </div>
            <div className={cn.infoCompany}>
                <AnimatedText fontSize={FontSize.SMALL} text={company} align='middle' noWrap={true} />
            </div>
        </motion.div>
    );
};
