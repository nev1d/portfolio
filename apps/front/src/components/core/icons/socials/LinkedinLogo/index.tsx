import React from 'react';

import clsx from 'clsx';

import { useSvgPathAnimation } from '@/hooks/useSvgPathAnimation';
import { DefaultAnimationProps } from '@/typings/animations/svgPathAnimation';
import { animated } from '@react-spring/web';

import cn from './style.module.css';

type GithubLogoProps = {
    animation?: DefaultAnimationProps;
    className?: string;
};
export const LinkedinLogo: React.FC<GithubLogoProps> = ({ animation, className }) => {
    const {
        springProps: [pathStyle],
        springAnimationCycle: { startAnimationCycle },
        ref,
    } = useSvgPathAnimation({ animation });

    const onHover = () => {
        startAnimationCycle();
    };

    return (
        <svg
            onMouseEnter={onHover}
            className={clsx(cn.linkedin, className)}
            strokeWidth={2}
            width='255'
            height='255'
            viewBox='0 0 255 255'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <animated.path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M56.9916 84.4536H4.56542V253.082H56.9916V84.4536ZM61.1532 31.0327C61.1532 14.2486 47.5359 0.631348 30.7799 0.631348C13.9845 0.631348 0.406616 14.2486 0.406616 31.0327C0.406616 47.8 13.9845 61.4173 30.7799 61.4173C47.5359 61.4173 61.1532 47.8 61.1532 31.0327ZM142.271 86.1757H92V254.804H144.387V171.395C144.387 149.406 148.548 128.087 175.822 128.087C202.717 128.087 203.057 153.239 203.057 172.8V254.804H255.444V162.318C255.444 116.914 245.648 82 192.576 82C167.086 82 149.984 95.9713 142.987 109.235H142.271V86.1757Z'
                style={pathStyle}
                ref={ref}
            />
        </svg>
    );
};
