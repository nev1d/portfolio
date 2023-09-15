import Link from 'next/link';
import React from 'react';

import { GithubLogo } from '@/components/core/icons/socials/GithubLogo';
import { LinkedinLogo } from '@/components/core/icons/socials/LinkedinLogo';
import { Telegram } from '@/components/core/icons/socials/TelegramLogo';

import cn from './style.module.css';

const animation = { duration: 0.6 };

export const Socials: React.FC = () => {
    return (
        <div className={cn.socials}>
            <Link className={cn.social} href='/about'>
                <GithubLogo animation={animation} />
            </Link>
            <Link className={cn.social} href='/test'>
                <Telegram animation={animation} />
            </Link>
            <Link className={cn.social} href='/test'>
                <LinkedinLogo animation={animation} />
            </Link>
        </div>
    );
};
