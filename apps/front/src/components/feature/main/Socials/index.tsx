import React from 'react';

import { Telegram } from '@/components/core/icons/socials/TelegramLogo';
import { MenuStatus, useMenuStore } from '@/store/menu/menuStore';

import { GithubLogo } from '../../../core/icons/socials/GithubLogo';

import cn from './style.module.css';
export const Socials: React.FC = () => {
    const menuStatus = useMenuStore((store) => store.menuStatus);

    const isPresentationMenuStatus = menuStatus === MenuStatus.PRESENTATION;

    const animation = { animated: isPresentationMenuStatus, duration: 1000 };

    return (
        <div className={cn.socials}>
            <a className={cn.social}>
                <GithubLogo animation={animation} />
            </a>
            <a className={cn.social}>
                <Telegram animation={animation} />
            </a>
        </div>
    );
};
