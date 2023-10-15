import React from 'react';

import { AnimatedText } from '@/components/core/AnimatedText';
import { Marker } from '@/components/core/icons/Marker';
import { TimelineItemCard, TimelineItemCardProps } from '@/components/feature/portfolio/TimelineItemCard';

import cn from './style.module.css';

export type TimelineItemProps = {
    date: Record<'from' | 'to', string>;
    company: string;
    position: string;
    cards: TimelineItemCardProps[];
};

export const TimelineItem: React.FC<TimelineItemProps> = ({ date, cards, company, position }) => {
    const dateInterval = `${new Date(date.from).getFullYear()} - ${new Date(date.to).getFullYear()}`;

    return (
        <div className={cn.item}>
            <div className={cn.cards}>
                {cards.map((card, index) => {
                    return (
                        <div className={cn.card} key={card.title + index}>
                            <TimelineItemCard {...card} />
                        </div>
                    );
                })}
            </div>
            <div className={cn.marker}>
                <div className={cn.markerContainer}>
                    <Marker />
                    <div className={cn.info}>
                        <div className={cn.infoDate}>
                            <AnimatedText fontSize={20} text={dateInterval} align='middle' noWrap={true} />
                        </div>
                        <div className={cn.infoPosition}>
                            <AnimatedText fontSize={24} text={position} align='middle' noWrap={true} />
                        </div>
                        <div className={cn.infoCompany}>
                            <AnimatedText fontSize={16} text={company} align='middle' noWrap={true} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
