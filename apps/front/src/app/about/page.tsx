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
                        text='With a strong track record in the finance and entertainment sectors, I’ve had the privilege of leading teams of 4 to 10 developers on projects that push the envelope. I’m passionate about turning complex challenges into elegant solutions and constantly strive to elevate the user experience. For me, frontend development isn’t just about code; it’s about crafting interfaces that resonate and create lasting impact.'
                        fontSize={FontSize.LARGE}
                        animation={{ duration: 1.5, delay: 0.3 }}
                    />
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
