import React from 'react';

import { GithubLogo } from '@/components/core/icons/socials/GithubLogo';
import { LinkedinLogo } from '@/components/core/icons/socials/LinkedinLogo';
import { Telegram } from '@/components/core/icons/socials/TelegramLogo';
import { Contacts } from '@/constants/contacts';

import cn from './style.module.css';

const animation = { duration: 0.6 };

export const Socials: React.FC = () => {
    return (
        <div className={cn.socials}>
            <a className={cn.social} target='_blank' href={Contacts.GITHUB}>
                <GithubLogo animation={animation} />
            </a>
            <a className={cn.social} target='_blank' href={Contacts.TELEGRAM}>
                <Telegram animation={animation} />
            </a>
            <a className={cn.social} target='_blank' href={Contacts.LINKEDIN}>
                <LinkedinLogo animation={animation} />
            </a>
        </div>
    );
};
