'use client';

import React, { useState } from 'react';

import { LogoElement, LogoElementProps } from '@/components/core/Logo/element';

import cn from './style.module.css';

import clsx from 'clsx';

const animationOptions: Omit<LogoElementProps, 'cycle'>[] = [
    {
        tag: 'rect',
        props: {
            width: '20',
            height: '445',
        },
        animation: {
            property: 'height',
            value: [0, 445],
            delay: {
                reverse: 0.6,
            },
        },
    },
    {
        tag: 'rect',
        props: {
            x: '36',
            width: '26',
            height: '445',
        },
        animation: {
            property: 'height',
            value: [0, 445],
            delay: {
                reverse: 0.6,
            },
        },
    },
    {
        tag: 'rect',
        props: {
            x: '332',
            y: '43',
            width: '26',
            height: '402',
        },
        animation: {
            property: 'height',
            value: [0, 402],
            delay: {
                reverse: 0.6,
            },
        },
    },
    {
        tag: 'rect',
        props: {
            x: '358',
            y: '43',
            width: '26',
            height: '177',
            transform: 'rotate(90 358 43)',
        },
        animation: {
            property: 'height',
            value: [0, 177],
            delay: {
                reverse: 0.6,
            },
        },
    },
    {
        tag: 'rect',
        props: {
            x: '394',
            width: '26',
            height: '213',
            transform: 'rotate(90 394 0)',
        },
        animation: {
            property: 'height',
            value: [0, 213],
            delay: {
                reverse: 0.6,
            },
        },
    },
    {
        tag: 'rect',
        props: {
            x: '374',
            width: '20',
            height: '445',
        },
        animation: {
            property: 'height',
            value: [0, 445],
            delay: {
                reverse: 0.6,
            },
        },
    },
    {
        tag: 'path',
        props: {
            d: 'M72.043 0H36.0209V30.0184H59.3364L322.195 445.275L322.198 445.272H358.218V415.254H334.9L72.043 0Z',
        },
        animation: {
            property: 'fillOpacity',
            value: [0, 1],
            delay: {
                forward: 0.6,
            },
        },
    },
];

type LogoProps = {
    cycle?: boolean;
    pointer?: boolean;
};

export const Logo: React.FC<LogoProps> = ({ cycle = false, pointer = true }) => {
    const [hovered, setHovered] = useState(false);

    const onHover = () => {
        setHovered(true);
    };

    const onLeave = () => {
        setHovered(false);
    };

    return (
        <svg
            width='394'
            height='446'
            viewBox='0 0 394 446'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            className={clsx(cn.logo, pointer && cn.pointer)}
        >
            {animationOptions.map((item, index) => {
                return <LogoElement {...item} cycle={cycle} hovered={hovered} key={index} />;
            })}
        </svg>
    );
};
