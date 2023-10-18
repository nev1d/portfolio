import React from 'react';

import { AnimatedText } from '@/components/core/AnimatedText';
import { FontSize } from '@/constants/fonts';

import cn from './style.module.css';

export type TagProps = {
    text: string;
};

export const Tag: React.FC<TagProps> = ({ text }) => {
    return (
        <div className={cn.tag}>
            <div className={cn.text}>
                <AnimatedText fontSize={FontSize.SMALL} text={text} fitToText={true} noWrap={true} />
            </div>
        </div>
    );
};
