import { AnimatedText } from '@/components/core/AnimatedText';
import { AnimatedElement } from '@/components/core/animation/AnimatedElement';
import { ProgressBar } from '@/components/core/ProgressBar';
import { TagList } from '@/components/core/tags/TagList';
import { useSkillsStore } from '@/store/skills';
import { capitalizeFirstLetter } from '@/utils/typography/capitalizeFirstLetter';

import cn from './style.module.css';

import clsx from 'clsx';

type SkillsTextsItem = {
    align: 'start' | 'end';
    title: string;
    position: [number, number];
    description: string;
    tags: string[];
    progress: number;
};

const skillsTexts: SkillsTextsItem[] = [
    {
        align: 'end',
        title: 'React Ecosystem',
        position: [150, 140],
        description:
            'The place where I feel most comfortable. In addition to architecting huge high-load projects, I have experience as a Team Lead for teams ranging from 4 to 10 developers on these projects. I have extensive experience with server-side rendering (SSR) and its custom implementation in every popular framework, as well as building headless CMS. I also have used various tech stacks from React 15 up to the present day',
        tags: ['Typescript', 'React', 'Remix', 'NextJS', 'Redux', 'Redux Toolkit', 'Mobx', 'Effector', 'React Query'],
        progress: 100,
    },
    {
        align: 'start',
        title: 'Vue Ecosystem',
        position: [140, 120],
        description:
            'Vue is also a thing, that i like. Having not gotten along in the first days, I am happy to write projects on Vue today. I caught the transition from Vue 2 to Vue 3 and took part in rewriting it on one large project. In addition to that i have big experience with Nuxt 2 and 3 versions. I built multiple pet-projects by myself and participated in large projects as i mentioned before',
        tags: ['Typescript', 'Vue 2', 'Vue 3', 'Vuex', 'Pinia', 'NuxtJS', 'Vue Query'],
        progress: 90,
    },
    {
        align: 'end',
        title: 'FrontOps',
        position: [120, 100],
        description:
            'The world of FrontOps turned out to be a big discovery for me. I find very relaxing to make a project not only good from visual side, but also work faster, and most important convenient for developers. I think many companies underestimating a part of FrontOps. It is the place, where you can speed up all processes, from developer work time, to deploying. And despite the fact that this work is often invisible to business, I still love learning something new and progress in FrontOps',
        tags: ['ViteJS', 'Webpack', 'Rollup', 'Esbuild', 'Eslint', 'Git Hooks', 'Stylelint', 'Sonar'],
        progress: 100,
    },
    {
        align: 'start',
        title: 'Backend',
        position: [100, 80],
        description:
            'I am not a huge expert of Backend development, but i try my best. I dont have a big experience of writing a huge projects in backend part, but still have some cases, where i did that, mostly using NestJS + Typeorm. I understand how backend works and can give some advices in architecture, but my main task as Frontend developer - make work with backend simple, safe and comfortable for both sides. In additional to that i wrote a backend for my pet-project by myself day by day improving my skills in it',
        tags: ['NestJS', 'Prisma', 'Typeorm', 'Mongoose', 'MongoDB', 'PostgreSQL', 'Redis'],
        progress: 40,
    },
    {
        align: 'end',
        title: 'DevOps',
        position: [80, 60],
        description:
            'DevOps is also a part that i like. I have a big experience with building a high-load applications using k8s/Marathon especially for frontend services. It is not a hard part to make application work in Docker container or deploying thru the GitLab CI or Github Actions. I have room to grow and don’t forget about this important part.',
        tags: ['Docker', 'Docker Compose', 'GitLab CI', 'Jenkins', 'Marathon', 'Mesos', 'Github Actions', 'k8s'],
        progress: 35,
    },
];

const animationParams = {
    start: {
        initial: { x: '-100%', opacity: 0 },
        animate: { x: '0%', opacity: 1 },
        exit: { x: '-100%', opacity: 0 },
    },
    end: {
        initial: { x: '100%', opacity: 0 },
        animate: { x: '0%', opacity: 1 },
        exit: { x: '100%', opacity: 0 },
    },
};

export const SkillsTexts = () => {
    const currentCameraPosition = useSkillsStore((store) => store.currentCameraPosition);

    const isCurrentItemVisible = (item: SkillsTextsItem) => {
        const [from, to] = item.position;

        return currentCameraPosition <= from && currentCameraPosition > to;
    };

    return (
        <div className={cn.wrapper}>
            {skillsTexts.map((item) => {
                const isVisible = isCurrentItemVisible(item);

                return (
                    <AnimatedElement visible={isVisible} animation={animationParams[item.align]} key={item.title}>
                        {(ref) => {
                            return (
                                <div className={clsx(cn.content, cn[item.align])} ref={ref}>
                                    <div className={cn.texts}>
                                        <div className={cn.title}>
                                            <AnimatedText
                                                fontSize={26}
                                                text={item.title}
                                                align={item.align}
                                                animation={{ delay: 0.3, duration: 1.3 }}
                                            />
                                        </div>
                                        <div className={clsx(cn.tags, cn[`tags${capitalizeFirstLetter(item.align)}`])}>
                                            <TagList tags={item.tags.map((text) => ({ text }))} />
                                        </div>
                                        <div className={cn.description}>
                                            <AnimatedText
                                                fontSize={22}
                                                text={item.description}
                                                align={item.align}
                                                animation={{ delay: 0.3, duration: 1.3 }}
                                            />
                                        </div>
                                        <div className={cn.progress}>
                                            <ProgressBar progress={item.progress} />
                                        </div>
                                    </div>
                                </div>
                            );
                        }}
                    </AnimatedElement>
                );
            })}
        </div>
    );
};
