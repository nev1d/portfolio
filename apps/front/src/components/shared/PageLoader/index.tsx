import React from 'react';

import { motion } from 'framer-motion';

import { Logo } from '@/components/core/Logo';

import cn from './style.module.css';
export const PageLoader = () => {
    return (
        <motion.div className={cn.page} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className={cn.logo}>
                <Logo cycle={true} />
            </div>
        </motion.div>
    );
};
