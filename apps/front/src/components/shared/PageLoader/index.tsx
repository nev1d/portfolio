import React, { useEffect } from 'react';

import { Logo } from '@/components/core/Logo';
import { useAppStore } from '@/store/app';

import cn from './style.module.css';

import { motion } from 'framer-motion';
export const PageLoader = () => {
    const setAppLoaded = useAppStore((store) => store.setAppLoaded);

    /* After 10 seconds application should be shown */
    useEffect(() => {
        setTimeout(() => {
            setAppLoaded();
        }, 10000);
    }, []);

    return (
        <motion.div className={cn.page} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className={cn.logo}>
                <Logo cycle={true} pointer={false} />
            </div>
        </motion.div>
    );
};
