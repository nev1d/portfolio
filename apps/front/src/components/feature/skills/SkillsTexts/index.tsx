import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

import { AnimatedText } from '@/components/core/AnimatedText';
import { TagList } from '@/components/core/tags/TagList';
import { useSkillsStore } from '@/store/skills';
import { capitalizeFirstLetter } from '@/utils/typography/capitalizeFirstLetter';

import cn from './style.module.css';

type SkillsTextsItem = {
    align: 'start' | 'end';
    title: string;
    position: [number, number];
    description: string;
    tags: string[];
};

const skillsTexts: SkillsTextsItem[] = [
    {
        align: 'end',
        title: 'React Ecosystem',
        position: [150, 140],
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        tags: ['React', 'Remix', 'NextJS', 'Redux', 'Redux Toolkit', 'Mobx', 'Effector', 'React Query'],
    },
    {
        align: 'start',
        title: 'Vue Ecosystem',
        position: [140, 120],
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        tags: ['Vue 2', 'Vue 3', 'Vuex', 'Pinia', 'NuxtJS'],
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
            <AnimatePresence>
                {skillsTexts.map((item) => {
                    const isVisible = isCurrentItemVisible(item);

                    if (!isVisible) return;

                    return (
                        <motion.div
                            className={clsx(cn.content, cn[item.align])}
                            {...animationParams[item.align]}
                            key={item.title}
                        >
                            <div className={cn.texts}>
                                <div className={cn.title}>
                                    <AnimatedText
                                        fontSize={26}
                                        text={item.title}
                                        align={item.align}
                                        animation={{ delay: 0.3, duration: 1.3 }}
                                    />
                                </div>
                                <div className={cn.description}>
                                    <AnimatedText
                                        fontSize={22}
                                        text={item.description}
                                        align={item.align}
                                        animation={{ delay: 0.3, duration: 1.3 }}
                                    />
                                </div>
                                <div className={clsx(cn.tags, cn[`tags${capitalizeFirstLetter(item.align)}`])}>
                                    <TagList tags={item.tags.map((text) => ({ text }))} />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
};
