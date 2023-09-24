import React from 'react';

import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';

import { Tag, TagProps } from '@/components/core/tags/Tag';

import cn from './style.module.css';

type TagListProps = {
    tags: TagProps[];
};

const animationParams = {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: '0%', opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
};

export const TagList: React.FC<TagListProps> = ({ tags }) => {
    return (
        <div className={cn.list}>
            <AnimatePresence>
                {tags.map((tag, index) => {
                    return (
                        <motion.div
                            {...animationParams}
                            transition={{ delay: index / 10 }}
                            className={cn.tag}
                            key={tag.text}
                        >
                            <Tag {...tag} />
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
};
