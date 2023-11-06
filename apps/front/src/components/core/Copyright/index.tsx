import React from 'react';

import { AnimatedText } from '@/components/core/AnimatedText';
import { Contacts } from '@/constants/contacts';
import { FontSize } from '@/constants/fonts';
import { useDynamicFontSize } from '@/hooks/useDynamicFontSize';

import cn from './style.module.css';
export const Copyright = () => {
    const fontSize = useDynamicFontSize({ default: FontSize.SMALL, mobile: FontSize.XSMALL });

    return (
        <a href={`mailto:${Contacts.MAIL}`} className={cn.link}>
            <span className={cn.text}>
                <AnimatedText
                    text={`©/${new Date().getFullYear()}`}
                    hover={true}
                    fontSize={fontSize}
                    animation={{ duration: 0.6 }}
                    fitToText={true}
                />
            </span>
            <span className={cn.text}>
                <AnimatedText
                    text={`${Contacts.MAIL}`}
                    hover={true}
                    fontSize={fontSize}
                    animation={{ duration: 0.6 }}
                    fitToText={true}
                />
            </span>
        </a>
    );
};
