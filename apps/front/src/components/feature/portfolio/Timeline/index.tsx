import React from 'react';

import { TimelineItem, TimelineItemProps } from '@/components/feature/portfolio/TimelineItem';
import { useCustomSlider } from '@/hooks/useCustomSlider';

import cn from './style.module.css';

const timelineItems: TimelineItemProps[] = [
    {
        date: {
            from: '10.10.2019',
            to: '10.09.2020',
        },
        company: 'Test',
        position: 'Junior Front-End Developer',
        cards: [
            {
                title: 'Test',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
            },
            {
                title: 'Test',
                description:
                    'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
            },
        ],
    },
    {
        date: {
            from: '10.10.2019',
            to: '10.09.2020',
        },
        company: 'Test',
        position: 'Junior Front-End Developer',
        cards: [
            {
                title: 'Test',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
            },
            {
                title: 'Test',
                description:
                    'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
            },
        ],
    },
    {
        date: {
            from: '10.10.2019',
            to: '10.09.2020',
        },
        company: 'Test',
        position: 'Junior Front-End Developer',
        cards: [
            {
                title: 'Test',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
            },
            {
                title: 'Test',
                description:
                    'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
            },
        ],
    },
];

export const Timeline: React.FC = () => {
    const { slider } = useCustomSlider();

    return (
        <div className={cn.timeline} ref={slider}>
            <div className={cn.wrapper}>
                <div className={cn.inner}>
                    <div className={cn.line} />
                    <div className={cn.content}>
                        {timelineItems.map((item) => {
                            return (
                                <div className={cn.item} key={item.company + item.position}>
                                    <TimelineItem {...item} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
