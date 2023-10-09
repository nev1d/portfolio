import React from 'react';

import { motion } from 'framer-motion';

import cn from './style.module.css';

type ProgressBarProps = {
    progress: number;
};

const progressBarAnimatio = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
    transition: {
        duration: 1.5,
    },
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    const animationProps = {
        initial: {
            x: '-100%',
        },
        animate: {
            x: `-${100 - progress}%`,
        },
        transition: {
            duration: 1.5,
        },
    };

    return (
        <motion.div className={cn.progressBar} {...progressBarAnimatio}>
            <motion.div className={cn.progressBarInner} {...animationProps} />
        </motion.div>
    );
};
