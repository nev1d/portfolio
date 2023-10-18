import React from 'react';

import { AnimatedText } from '@/components/core/AnimatedText';
import { FontSize } from '@/constants/fonts';

import cn from './style.module.css';

import { motion } from 'framer-motion';

type ProgressBarProps = {
    progress: number;
};

const progressBarAnimationParams = {
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

const grades = ['Junior', 'Middle', 'Senior', 'Senior+'];

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    const animationParams = {
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
        <div className={cn.wrapper}>
            <motion.div className={cn.progressBar} {...progressBarAnimationParams}>
                <motion.div className={cn.progressBarInner} {...animationParams} />
            </motion.div>
            <div className={cn.grades}>
                {grades.map((grade, index) => (
                    <div key={grade} className={cn.grade}>
                        <AnimatedText
                            text={grade}
                            fontSize={FontSize.SMALL}
                            fitToText={true}
                            animation={{ delay: index * 0.3, duration: 1 }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
