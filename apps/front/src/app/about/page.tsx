'use client';

import React from 'react';

import { AnimatedText } from '@/components/core/AnimatedText';

import cn from '@/components/shared/layouts/MainLayout/style.module.css';

const AboutPage = () => {
    return (
        <div className={cn.pageContainer}>
            <div className={cn.page}>
                <AnimatedText fontSize={100} animation={{ duration: 0.6 }}>
                    Hello! My name is Daniil.
                </AnimatedText>
            </div>
        </div>
    );
};

export default AboutPage;
