'use client';

import React, { PropsWithChildren } from 'react';

import clsx from 'clsx';

import { AnimatedText } from '@/components/core/AnimatedText';
import { Logo } from '@/components/core/Logo';
import { MenuStatus, useMenuStore } from '@/store/menu/menuStore';

import cn from './style.module.css';

export const MainPageLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const menuStatus = useMenuStore((store) => store.menuStatus);

    const isPresentationMenuStatus = menuStatus === MenuStatus.PRESENTATION;

    return (
        <div className={cn.wrapper}>
            <div className={cn.content}>
                <div className={clsx(cn.block, cn.topLeft, cn.logo)}>
                    <Logo animated={isPresentationMenuStatus} />
                </div>
                <div className={clsx(cn.block, cn.bottomLeft)}>
                    <AnimatedText fontSize={16} animation={{ animated: isPresentationMenuStatus, duration: 1000 }}>
                        ©/2023 daniil.nikonyuk@gmail.com
                    </AnimatedText>
                </div>
                {children}
            </div>
        </div>
    );
};
