'use client';

import React, { PropsWithChildren } from 'react';

import clsx from 'clsx';

import { AnimatedText } from '@/components/core/AnimatedText';
import { Logo } from '@/components/core/Logo';
import { Socials } from '@/components/feature/main/Socials';
import { MenuStatus, useMenuStore } from '@/store/menu/menuStore';

import cn from './style.module.css';

const mail = 'daniil.nikonyuk@gmail.com';

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
                    <a href={`mailto:${mail}`}>
                        <AnimatedText hover={true} fontSize={16} animation={{ duration: 0.6 }}>
                            ©/2023 {mail}
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
