'use client';

import React, { PropsWithChildren } from 'react';

import { Logo } from '@/components/core/Logo';
import { animated, useSpring } from '@react-spring/web';

import cn from './style.module.css';

const ANIMATION_DELAY = 4500;
const BORDER_DURATION = 400;

export const MainPageLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const [props] = useSpring(
        () => ({
            from: { opacity: 0 },
            to: { opacity: 1 },
            delay: ANIMATION_DELAY,
            config: {
                duration: BORDER_DURATION,
            },
        }),
        [],
    );

    return (
        <div className={cn.wrapper}>
            <animated.div style={props} className={cn.border}>
                <div className={cn.content}>
                    <div className={cn.logo}>
                        <Logo animationDelay={ANIMATION_DELAY + BORDER_DURATION} />
                    </div>
                    {children}
                </div>
            </animated.div>
        </div>
    );
};
