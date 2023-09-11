'use client';

import React, { PropsWithChildren } from 'react';

import clsx from 'clsx';

import { AnimatedText } from '@/components/core/AnimatedText';
import { Logo } from '@/components/core/Logo';
import { Socials } from '@/components/feature/main/Socials';
import { MenuStatus, useMenuStore } from '@/store/menu/menuStore';

import cn from './style.module.css';

export const MainPageLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const menuStatus = useMenuStore((store) => store.menuStatus);

    const isPresentationMenuStatus = menuStatus === MenuStatus.PRESENTATION;

    if (!isPresentationMenuStatus) return;

    return (
        <div className={cn.wrapper}>
            <div className={cn.content}>
                <div className={clsx(cn.block, cn.topLeft, cn.logo)}>
                    <Logo />
                </div>
                <div className={clsx(cn.block, cn.bottomLeft)}>
                    <a href='mailto:'>
                        <AnimatedText fontSize={16} animation={{ duration: 1 }}>
                            ©/2023 daniil.nikonyuk@gmail.com
                        </AnimatedText>
                    </a>
                </div>
                <div className={clsx(cn.block, cn.bottomRight)}>
                    <Socials />
                </div>
                {children}
            </div>
        </div>
    );
};
