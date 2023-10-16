import React, { useEffect } from 'react';

import { AnimatedText } from '@/components/core/AnimatedText';

import cn from './style.module.css';

import { motion, useAnimate, useInView } from 'framer-motion';

export type TimelineItemCardProps = {
    title: string;
    description: string;
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
    const [ref, animate] = useAnimate();
    const inView = useInView(ref, { margin: '0px -400px 0px 0px', once: true });

    useEffect(() => {
        if (inView) {
            animate(ref.current, animations.animate);
        }
    }, [inView]);

    return (
        <motion.div className={cn.card} ref={ref} initial={animations.initial}>
            <div className={cn.title}>
                <AnimatedText text={title} fontSize={24} />
            </div>
            <div className={cn.description}>
                <AnimatedText text={description} fontSize={16} />
            </div>
        </motion.div>
    );
};
