import React from 'react';

import { AnimatedText } from '@/components/core/AnimatedText';
import { Contacts } from '@/constants/contacts';
import { FontSize } from '@/constants/fonts';
import { useMediaQuery } from '@/hooks/useMediaQuery';

import cn from './style.module.css';
export const Copyright = () => {
    const isMobile = useMediaQuery('(max-width: 599px)');

    const fontSize = isMobile ? FontSize.XSMALL : FontSize.SMALL;

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
