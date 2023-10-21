import React from 'react';

import { TimelineItemCard, TimelineItemCardProps } from '@/components/feature/portfolio/timeline/TimelineItemCard';
import { TimelineItemInfo } from '@/components/feature/portfolio/timeline/TimelineItemInfo';
import { TimelineItemMarker } from '@/components/feature/portfolio/timeline/TimelineItemMarker';

import cn from './style.module.css';

export type TimelineItemProps = {
    date: Record<'from' | 'to', string | number>;
    company: string;
    position: string;
    cards: TimelineItemCardProps[];
};

export const TimelineItem: React.FC<TimelineItemProps> = ({ date, cards, company, position }) => {
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
                    <TimelineItemMarker />
                    <TimelineItemInfo company={company} position={position} date={date} />
                </div>
            </div>
        </div>
    );
};
