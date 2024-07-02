'use client';

import React from 'react';

import { AnimatedText } from '@/components/core/AnimatedText';
import { FontSize } from '@/constants/fonts';

import cn from './style.module.css';

const AboutPage = () => {
    return (
        <div className={cn.wrapper}>
            <div className={cn.content}>
                <div className={cn.text}>
                    <AnimatedText
                        align='end'
                        text='Hi there, I’m Daniil'
                        fontSize={FontSize.MEDIUM}
                        animation={{ duration: 1.5 }}
                    />
                </div>
                <div className={cn.text}>
                    <AnimatedText
                        align='end'
                        text='22 y.o. Frontend Developer'
                        fontSize={FontSize.XLARGE}
                        animation={{ duration: 1.5, delay: 0.2 }}
                    />
                </div>
                <div className={cn.text}>
                    <AnimatedText
                        align='end'
                        text='With 4 years of experience, I have contributed to significant projects in finance and entertainment, often taking the lead with teams of 4 to 10 developers. I enjoy tackling complex challenges that demand creative solutions. My passion lies in pushing the boundaries of frontend development to create impactful and user-centric solutions.'
                        fontSize={FontSize.LARGE}
                        animation={{ duration: 1.5, delay: 0.3 }}
                    />
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
