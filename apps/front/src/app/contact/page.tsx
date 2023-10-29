'use client';

import Link from 'next/link';
import React, { useMemo } from 'react';

import { AnimatedText } from '@/components/core/AnimatedText';
import { Contacts } from '@/constants/contacts';
import { useWindowSize } from '@/hooks/useWindowSize';

import cn from './style.module.css';

const contactItems = [
    { name: 'Github', href: Contacts.GITHUB },
    { name: 'Telegram', href: Contacts.TELEGRAM },
    { name: 'LinkedIn', href: Contacts.LINKEDIN },
];

const ContactPage = () => {
    const [width, height] = useWindowSize();

    const calculatedMargin = useMemo(() => {
        return { positive: `0 calc(12vw * ${height / width})`, negative: `0 calc(12vw * ${width / height} * -1)` };
    }, [width, height]);

    return (
        <div className={cn.wrapper}>
            <div className={cn.content}>
                <div className={cn.items} style={{ margin: calculatedMargin.negative }}>
                    {contactItems.map((contact) => {
                        return (
                            <div className={cn.item} key={contact.name} style={{ margin: calculatedMargin.positive }}>
                                <Link href={contact.href} target='_blank'>
                                    <AnimatedText
                                        fontSize={24}
                                        text={contact.name}
                                        align='middle'
                                        fitToText={true}
                                        hover={true}
                                    />
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
