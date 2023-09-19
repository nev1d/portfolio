import React from 'react';

import { GithubLogo } from '@/components/core/icons/socials/GithubLogo';
import { LinkedinLogo } from '@/components/core/icons/socials/LinkedinLogo';
import { Telegram } from '@/components/core/icons/socials/TelegramLogo';

import cn from './style.module.css';

const animation = { duration: 0.6 };

export const Socials: React.FC = () => {
    return (
        <div className={cn.socials}>
            <a className={cn.social} target='_blank' href='https://github.com/nev1d'>
                <GithubLogo animation={animation} />
            </a>
            <a className={cn.social} target='_blank' href='https://t.me/nev1d'>
                <Telegram animation={animation} />
            </a>
            <a className={cn.social} target='_blank' href='https://www.linkedin.com/in/nev1d/'>
                <LinkedinLogo animation={animation} />
            </a>
        </div>
    );
};
