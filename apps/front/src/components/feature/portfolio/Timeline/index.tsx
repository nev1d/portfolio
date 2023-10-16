import React, { useCallback, useEffect, useRef } from 'react';

import { TimelineItem, TimelineItemProps } from '@/components/feature/portfolio/TimelineItem';
import { useCustomSlider } from '@/hooks/useCustomSlider';
import { usePortfolioStore } from '@/store/portfolio';

import cn from './style.module.css';

const timelineItems: TimelineItemProps[] = [
    {
        date: {
            from: '10.10.2019',
            to: '10.09.2020',
        },
        company: 'Freelance',
        position: 'Junior Frontend Developer',
        cards: [
            {
                title: 'Experience',
                description:
                    'Tried myself in the development of browser extensions - successfully. Made a lot of different kinds of projects from small to large. Engaged in the development of projects for myself and to order. Mainly dealt with the frontend part, but also helped with setting up servers and deployment to the best of my knowledge at that time.',
            },
            {
                title: 'Studying',
                description:
                    'I was finishing school and looking for a full-time job. I decided not to get a higher education, but to completely engage in self-study, which I still don’t regret.',
            },
        ],
    },
    {
        date: {
            from: '06.14.2020',
            to: '10.15.2021',
        },
        company: 'Webpractik',
        position: 'Junior Front-End Developer',
        cards: [
            {
                title: 'Dive in',
                description:
                    'The first true full-time position. Engaged in support and development of various kinds of projects. Basically, I had to solve trivial tasks, but in a very large number, which helped to find my weak points and fix them. Thanks to the work of 10-12 hours a day, I managed to grow quickly and learn a lot at that moment.',
            },
        ],
    },
    {
        date: {
            from: '10.15.2021',
            to: '04.21.2022',
        },
        company: 'Webpractik',
        position: 'Middle Front-End Developer',
        cards: [
            {
                title: 'Team Leading',
                description:
                    'Engaged in the development of only large projects. Was one of the main developers in the company, thanks to which managed to break into the teamlead in the development of one of the biggest local banks website. We successfully close the project in an incredibly tight timeframe, thanks to which I remain in the teamlead role in this company and continue to close various kinds of projects as well.',
            },
            {
                title: 'Mentoring',
                description:
                    'In addition to my main job, I’m starting to help newly arrived colleagues dive into the frontend. I am involved in compiling and checking homework assignments, as well as conducting assessments.',
            },
        ],
    },
    {
        date: {
            from: '10.15.2022',
            to: '03.24.2023',
        },
        company: 'Alfa-Bank',
        position: 'Senior Front-End Developer',
        cards: [
            {
                title: 'Team Leading',
                description:
                    "Lead developer of one of the company's flagship product. Involved in both maintaining the old project and writing its complete new version, where I tried myself as a project architect. Also was a teamlead in a team of several developers.",
            },
            {
                title: 'Meetups',
                description:
                    "In addition, also involved in training new developers and checking their test tasks. I also participated and still continue to organize local meetups, where we gather 200 people at the sites. Also i don't forget about recording video courses for the peoples and help them take a dive into frontend.",
            },
        ],
    },
];

export const Timeline: React.FC = () => {
    const setCameraLimits = usePortfolioStore((store) => store.setCameraLimits);
    const setCurrentCameraPosition = usePortfolioStore((store) => store.setCurrentCameraPosition);
    const cameraLimits = usePortfolioStore((store) => store.cameraLimits);

    const scrollPosition = useRef(0);

    const scrollCallback = useCallback(
        (scrollLeft: number) => {
            const position = scrollLeft / 100;

            if (scrollPosition.current === position) return;

            scrollPosition.current = position;

            setCurrentCameraPosition(position);
        },
        [cameraLimits],
    );

    const { slider } = useCustomSlider<HTMLDivElement>({ callback: scrollCallback });

    useEffect(() => {
        if (slider.current) {
            const scrollOffset = (slider.current.scrollWidth - slider.current.offsetWidth) / 100;

            setCameraLimits([cameraLimits[0], cameraLimits[0] + scrollOffset]);
        }
    }, [slider.current]);

    return (
        <div className={cn.timeline} ref={slider}>
            <div className={cn.wrapper}>
                <div className={cn.inner}>
                    <div className={cn.line} />
                    <div className={cn.content}>
                        {timelineItems.map((item, index) => {
                            return (
                                <div className={cn.item} key={item.company + item.position + index}>
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
