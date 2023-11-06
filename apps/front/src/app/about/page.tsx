'use client';

import React from 'react';

import { AnimatedText } from '@/components/core/AnimatedText';
import { FontSize } from '@/constants/fonts';
import { useDynamicFontSize } from '@/hooks/useDynamicFontSize';

import cn from './style.module.css';

const AboutPage = () => {
    const titleFontSize = useDynamicFontSize({ default: FontSize.MEDIUM, tablet: FontSize.SMALL });
    const descriptionFontSize = useDynamicFontSize({
        default: FontSize.XLARGE,
        tablet: FontSize.LARGE,
        mobile: FontSize.MEDIUM,
    });
    const infoFontSize = useDynamicFontSize({
        default: FontSize.LARGE,
        tablet: FontSize.MEDIUM,
        mobile: FontSize.XSMALL,
    });

    return (
        <div className={cn.wrapper}>
            <div className={cn.content}>
                <div className={cn.text}>
                    <AnimatedText
                        align='end'
                        text='Hi there, I’m Daniil'
                        fontSize={titleFontSize}
                        animation={{ duration: 1.5 }}
                    />
                </div>
                <div className={cn.text}>
                    <AnimatedText
                        align='end'
                        text='21 y.o. Frontend Developer based in Belgrad, Serbia'
                        fontSize={descriptionFontSize}
                        animation={{ duration: 1.5, delay: 0.2 }}
                    />
                </div>
                <div className={cn.text}>
                    <AnimatedText
                        align='end'
                        text='Started working very early and has already managed to work on major financial and entertainment projects for 4 years. I was a team lead on some of them with a team of 4 to 10 frontend developers. I like complex tasks that require a non-standard approach.'
                        fontSize={infoFontSize}
                        animation={{ duration: 1.5, delay: 0.3 }}
                    />
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
