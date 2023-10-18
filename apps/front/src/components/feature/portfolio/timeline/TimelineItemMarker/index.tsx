import React from 'react';

import { Marker } from '@/components/core/icons/Marker';
import { useTimelineAnimation } from '@/components/feature/portfolio/timeline/hooks/useTimelineAnimation';

import cn from './style.module.css';

import { motion } from 'framer-motion';

const animations = {
    initial: {
        opacity: 0,
        scale: 0,
    },
    animate: {
        opacity: 1,
        scale: 1,
    },
};

export const TimelineItemMarker = () => {
    const { ref } = useTimelineAnimation(animations);

    return (
        <motion.div className={cn.marker} ref={ref} initial={animations.initial}>
            <Marker />
        </motion.div>
    );
};
