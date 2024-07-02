import { AnimatedText } from '@/components/core/AnimatedText';
import { AnimatedElement } from '@/components/core/animation/AnimatedElement';
import { ProgressBar } from '@/components/core/ProgressBar';
import { TagList } from '@/components/core/tags/TagList';
import { FontSize } from '@/constants/fonts';
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
            'This is where I thrive. Beyond architecting large-scale, high-load projects, I specialize in server-side rendering (SSR) with custom implementations across major frameworks and building headless CMS solutions. I bring extensive experience across the React ecosystem, adept with various tech stacks from React 15 to the latest advancements.',
        tags: ['Typescript', 'React', 'Remix', 'NextJS', 'Redux', 'Redux Toolkit', 'Mobx', 'Effector', 'React Query'],
        progress: 100,
    },
    {
        align: 'start',
        title: 'Vue Ecosystem',
        position: [140, 120],
        description:
            "Vue has become a passion of mine. Though we didn't click right away, today I thoroughly enjoy developing projects with Vue. I actively participated in the transition from Vue 2 to Vue 3, playing a key role in rewriting a significant project. I have extensive experience with both Nuxt 2 and 3 versions, having built numerous pet-projects independently and contributed to large-scale projects, as mentioned earlier.",
        tags: ['Typescript', 'Vue 2', 'Vue 3', 'Vuex', 'Pinia', 'NuxtJS', 'Vue Query'],
        progress: 100,
    },
    {
        align: 'end',
        title: 'FrontOps',
        position: [120, 100],
        description:
            "Discovering FrontOps has been a revelation for me. I find immense satisfaction in optimizing projects not only for visual appeal but also for enhanced speed and developer convenience. FrontOps, often overlooked by many companies, accelerates processes—from developer efficiency to deployment speed. Despite its behind-the-scenes nature in business, I'm passionate about continual learning and advancing in FrontOps.",
        tags: ['ViteJS', 'Webpack', 'Rollup', 'Esbuild', 'Eslint', 'Git Hooks', 'Stylelint', 'Sonar'],
        progress: 100,
    },
    {
        align: 'start',
        title: 'Backend',
        position: [100, 80],
        description:
            "While my expertise lies primarily in Frontend development, I also venture into Backend with dedication and enthusiasm. Although I haven't accumulated extensive experience in large-scale Backend projects, I've successfully tackled several using NestJS and TypeORM. My understanding of Backend architecture allows me to provide valuable insights and advice. As a Frontend developer, my goal is to streamline and enhance the interaction between Frontend and Backend systems, ensuring simplicity, security, and seamless functionality. I continuously hone my Backend skills by independently developing and refining a backend for my pet project.",
        tags: ['NestJS', 'Prisma', 'Typeorm', 'Mongoose', 'MongoDB', 'PostgreSQL', 'Redis'],
        progress: 40,
    },
    {
        align: 'end',
        title: 'DevOps',
        position: [80, 60],
        description:
            "I also have a strong affinity for DevOps. My experience includes building high-load applications using Kubernetes and Marathon, particularly for frontend services. I'm adept at containerizing applications with Docker and deploying them efficiently through GitLab CI or GitHub Actions. While I've achieved proficiency in these areas, I remain committed to continuous improvement and expanding my expertise in DevOps.",
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
            {skillsTexts.map((item, index) => {
                const isVisible = isCurrentItemVisible(item);

                return (
                    <AnimatedElement
                        visible={isVisible}
                        animation={animationParams[item.align]}
                        key={item.title}
                        enablePrerenderIgnore={!!index}
                    >
                        {(ref) => {
                            return (
                                <div className={clsx(cn.content, cn[item.align])} ref={ref}>
                                    <div className={cn.texts}>
                                        <div className={cn.title}>
                                            <AnimatedText
                                                fontSize={FontSize.MEDIUM}
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
                                                fontSize={FontSize.SMALL}
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
