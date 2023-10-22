import React from 'react';

import cn from './style.module.css';

import { motion } from 'framer-motion';

const animations = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
    exit: {
        opacity: 0,
    },
};

export const MenuIcon: React.FC = () => {
    return (
        <motion.div className={cn.menu} {...animations}>
            <span className={cn.menuLine} />
        </motion.div>
    );
};
