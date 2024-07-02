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
                description: [
                    '- Developed various projects, both personal and client-based, ranging from small to large-scale applications.',
                    '- Specialized in the frontend development using technologies such as jQuery, ReactJS, and vanilla JavaScript.',
                    '- Experimented with the development of browser extensions, enhancing user experience and browser functionality.',
                    '- Collaborated on Continuous Integration (CI) processes to streamline and automate development workflows.',
                ],
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
                description: [
                    '- Provided support and development for a variety of projects, addressing both simple and complex tasks.',
                    '- Handled a high volume of tasks daily, which helped identify and improve upon weak points in skills and knowledge.',
                    '- Dedicated 10-12 hours a day to work, facilitating rapid growth and extensive learning.',
                    '- Enhanced problem-solving abilities and technical expertise through consistent practice and application.',
                    '- Contributed to the improvement and maintenance of web applications, ensuring functionality and user satisfaction.',
                ],
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
                description: [
                    '- Focused on the development of large-scale projects, assuming a key developer role within the company.',
                    '- Led the development of the PochtaBank website, successfully managing and delivering the project within an incredibly tight timeframe.',
                    '- Promoted to Team Lead due to outstanding performance, continuing to oversee and close various projects.',
                    '- Applied expertise in modern frontend technologies to drive project success, including React.js, TypeScript, Kubernetes, Next.js, Docker, GitLab, and more.',
                ],
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
                description: [
                    "- Led the development of one of the company's flagship products, overseeing both maintenance of the existing project and the creation of a complete new version.",
                    '- Took on the role of project architect, using technologies such as React.js, TypeScript, Redux.js, Redux Toolkit, and Effector to design and implement scalable and efficient solutions.',
                    '- Acted as Team Lead for a team of several developers, demonstrating strong team leadership and management skills.',
                    '- Trained and mentored new developers, reviewing their test tasks and facilitating their integration into the team.',
                ],
            },
            {
                title: 'Meetups',
                description: [
                    '- Organized and participated in local meetups (A?.Frontend), gathering over 200 participants to share knowledge and insights.',
                    '- Recorded video courses on frontend development, helping learners to deepen their understanding and skills.',
                ],
            },
        ],
    },
    {
        date: {
            from: '03.24.2023',
            to: Number.POSITIVE_INFINITY,
        },
        company: 'NDA',
        position: 'Lead/Senior Front-End Developer',
        cards: [
            {
                title: 'Core Team',
                description: [
                    '- Part of the core team, responsible for architecture and product development in a high-load project.',
                    '- Handled a variety of unique tasks primarily focused on frontops, including builders, optimization, linters, and Kubernetes (k8s) integrations.',
                    '- Played a key role in transitioning the project from Vue 2 to Vue 3, ensuring a smooth and efficient upgrade process.',
                    '- Conducted regular code reviews to maintain code quality and consistency across the team.',
                    '- Participated in interviews with new candidates, contributing to the hiring and onboarding process.',
                ],
            },
            {
                title: 'Feature Lead',
                description: [
                    '- Leading one of the development directions in the Frontend part, setting the vision and strategy for development and architecture.',
                    '- Responsible for creating an SDK, a set of tools designed for seamless integration with any modern framework.',
                    '- Conducting multiple interviews for Senior and Middle positions, ensuring the selection of highly qualified candidates.',
                    '- Overseeing the onboarding process for new hires, facilitating their smooth integration into the team.',
                ],
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
