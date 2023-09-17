'use client';

import Link from 'next/link';
import React, { PropsWithChildren } from 'react';

import clsx from 'clsx';
import { motion } from 'framer-motion';

import { AnimatedText } from '@/components/core/AnimatedText';
import { Logo } from '@/components/core/Logo';
import { Socials } from '@/components/shared/Socials';
import { PagesEnum } from '@/constants/pages';
import { MenuStatus, useMenuStore } from '@/store/menu/menuStore';

import cn from './style.module.css';

const mail = 'daniil.nikonyuk@gmail.com';

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const menuStatus = useMenuStore((store) => store.menuStatus);
    const hasBeenInitialized = useMenuStore((store) => store.hasBeenInitialized);

    const isPresentationMenuStatus = menuStatus === MenuStatus.PRESENTATION;

    if (!isPresentationMenuStatus && !hasBeenInitialized) return;

    return (
        <motion.div className={cn.wrapper} exit={{ opacity: 0 }}>
            <div className={cn.content}>
                <div className={clsx(cn.block, cn.topLeft, cn.logo)}>
                    <Link href={PagesEnum.MAIN}>
                        <Logo />
                    </Link>
                </div>
                <div className={clsx(cn.block, cn.bottomLeft)}>
                    <a href={`mailto:${mail}`}>
                        <AnimatedText
                            text={`©/${new Date().getFullYear()} ${mail}`}
                            hover={true}
                            fontSize={16}
                            animation={{ duration: 0.6 }}
                        />
                    </a>
                </div>
                <div className={clsx(cn.block, cn.bottomRight)}>
                    <Socials />
                </div>
                <div className={cn.pageContainer}>
                    <div className={cn.page}>{children}</div>
                </div>
            </div>
        </motion.div>
    );
};
