import React, { useCallback, useEffect, useRef } from 'react';

import { TimelineItem, TimelineItemProps } from '@/components/feature/portfolio/timeline/TimelineItem';
import { PagesEnum } from '@/constants/pages';
import { useCustomSlider } from '@/hooks/useCustomSlider';
import { useCameraPositionStore } from '@/store/camera';
import { usePortfolioStore } from '@/store/portfolio';

import cn from './style.module.css';

import { motion } from 'framer-motion';

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
                title: 'Getting experience',
                description:
                    'Engaged in the development of projects for myself and to order. Tried myself in the development of browser extensions. Made a lot of different kinds of projects from small to large using Jquery, ReactJS, vanila. Mainly dealt with the frontend part, but also helped with CI integrations.',
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
                    'Engaged in support and development of various kinds of projects. Basically, I had to solve trivial tasks, but in a very large number, which helped to find my weak points and fix them. Thanks to the work of 10-12 hours a day, I managed to grow quickly and learn a lot at that moment.',
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
    {
        date: {
            from: '03.24.2023',
            to: Number.POSITIVE_INFINITY,
        },
        company: 'NDA',
        position: 'Senior Front-End Developer',
        cards: [
            {
                title: 'Core Team',
                description:
                    'Part of a core-team, responsible for architecture and product development. High load project with a different types of unique tasks (mainly frontops: builders, optimization, linters, k8s integrations etc). Also was a part of transition from Vue 2 to 3. Regular code reviews of current co-workers and interviews with new candidates.',
            },
            {
                title: 'Feature Lead',
                description:
                    'Leading one of the development direction in Frontend part. Responsible for the vision of the development as well as the architectural part. Creating a SDK, a set of tools for integration with any modern framework. Multiple interviews for Senior/Middle positions and onboardings following it.',
            },
        ],
    },
];

const lineAnimation = {
    initial: {
        opacity: 0,
        x: 300,
    },
    animate: {
        opacity: 1,
        x: 0,
    },
    exit: {
        opacity: 0,
        x: 300,
    },
};

export const Timeline: React.FC = () => {
    const setCameraLimits = usePortfolioStore((store) => store.setCameraLimits);
    const setCurrentCameraPosition = usePortfolioStore((store) => store.setCurrentCameraPosition);
    const cameraLimits = usePortfolioStore((store) => store.cameraLimits);

    const cameraPositionsConfig = useCameraPositionStore((store) => store.cameraPositionsConfig);
    const setCameraPositionsConfig = useCameraPositionStore((store) => store.setCameraPositionsConfig);
    const setCameraPositionsConfigLookAt = useCameraPositionStore((store) => store.setCameraPositionsConfigLookAt);

    const scrollPosition = useRef(cameraPositionsConfig[PagesEnum.PORTFOLIO].coords?.x || 0);

    const scrollCallback = useCallback(
        (scrollLeft: number) => {
            const position = scrollLeft / 100;

            if (scrollPosition.current === position) return;

            scrollPosition.current = position;

            setCurrentCameraPosition(position);

            setCameraPositionsConfig(PagesEnum.PORTFOLIO, { x: position });
            setCameraPositionsConfigLookAt(PagesEnum.PORTFOLIO, {
                x: position,
            });
        },
        [cameraLimits],
    );

    const { slider, manualScroll } = useCustomSlider<HTMLDivElement>({ callback: scrollCallback });

    useEffect(() => {
        manualScroll(scrollPosition.current * 100);
    }, []);

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
                    <motion.div className={cn.line} {...lineAnimation} />
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
