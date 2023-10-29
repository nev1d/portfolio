'use client';

import Link from 'next/link';
import React, { PropsWithChildren } from 'react';

import { AnimatedText } from '@/components/core/AnimatedText';
import { MenuIcon } from '@/components/core/icons/MenuIcon';
import { Logo } from '@/components/core/Logo';
import { Socials } from '@/components/shared/Socials';
import { Contacts } from '@/constants/contacts';
import { FontSize } from '@/constants/fonts';
import { PagesEnum } from '@/constants/pages';
import { useCurrentPathname } from '@/hooks/useCurrentPathname';
import { MenuStatus, useMenuStore } from '@/store/menu/menuStore';

import cn from './style.module.css';

import clsx from 'clsx';
import { motion } from 'framer-motion';

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const menuStatus = useMenuStore((store) => store.menuStatus);
    const hasBeenInitialized = useMenuStore((store) => store.hasBeenInitialized);

    const pathname = useCurrentPathname();

    const isPresentationMenuStatus = menuStatus === MenuStatus.PRESENTATION;
    const isMainPage = pathname === PagesEnum.MAIN;

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
                    <a href={`mailto:${Contacts.MAIL}`}>
                        <AnimatedText
                            text={`©/${new Date().getFullYear()} ${Contacts.MAIL}`}
                            hover={true}
                            fontSize={FontSize.SMALL}
                            animation={{ duration: 0.6 }}
                        />
                    </a>
                </div>
                <div className={clsx(cn.block, cn.bottomRight)}>
                    <Socials />
                </div>
                {!isMainPage && (
                    <div className={clsx(cn.block, cn.topRight)}>
                        <Link href={PagesEnum.MAIN}>
                            <MenuIcon />
                        </Link>
                    </div>
                )}
                <div className={cn.pageContainer}>
                    <div className={cn.page}>{children}</div>
                </div>
            </div>
        </motion.div>
    );
};
