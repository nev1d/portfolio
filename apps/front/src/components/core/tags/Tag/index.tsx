import React from 'react';

import { AnimatedText } from '@/components/core/AnimatedText';

import cn from './style.module.css';

export type TagProps = {
    text: string;
};

export const Tag: React.FC<TagProps> = ({ text }) => {
    return (
        <div className={cn.tag}>
            <div className={cn.text}>
                <AnimatedText fontSize={16} text={text} fitToText={true} noWrap={true} />
            </div>
        </div>
    );
};
