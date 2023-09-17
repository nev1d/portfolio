'use client';

import React from 'react';

import { AnimatedText } from '@/components/core/AnimatedText';

import cn from './style.module.css';

const AboutPage = () => {
    return (
        <div className={cn.wrapper}>
            <div className={cn.content}>
                <div className={cn.text}>
                    <AnimatedText align='end' text='Hi there, I’m Daniil.' fontSize={32} animation={{ duration: 1 }} />
                </div>
                <div className={cn.text}>
                    <AnimatedText
                        align='end'
                        text='Hi there, I’m Daniil.'
                        fontSize={48}
                        animation={{ duration: 2, delay: 0.5 }}
                    />
                </div>
                <div className={cn.text}>
                    <AnimatedText
                        align='end'
                        text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris'
                        fontSize={36}
                        animation={{ duration: 3, delay: 1.5 }}
                    />
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
