'use client';

import React, { useEffect } from 'react';

import { AnimatedText } from '@/components/core/AnimatedText';
import { Logo } from '@/components/core/Logo';
import { useAppStore } from '@/store/app';

import cn from './style.module.css';

import { motion } from 'framer-motion';
export const SoonPlaceholder = () => {
    const setAppLoaded = useAppStore((store) => store.setAppLoaded);

    /* After 10 seconds application should be shown */
    useEffect(() => {
        setAppLoaded();
    }, []);

    return (
        <motion.div className={cn.page} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className={cn.logo}>
                <Logo pointer={false} />
            </div>
            <div className={cn.text}>
                <AnimatedText
                    animation={{ duration: 2 }}
                    fontSize={18}
                    fitToText={true}
                    text='Mobile version will be soon...'
                />
            </div>
        </motion.div>
    );
};
