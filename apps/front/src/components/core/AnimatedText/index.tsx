import React, { useCallback, useEffect, useRef, useState } from 'react';

import { motion } from 'framer-motion';

import { useSvgAnimation } from '@/hooks/useSvgAnimation';
import { useWindowSize } from '@/hooks/useWindowSize';
import { DefaultAnimationProps } from '@/typings/animations/svgPathAnimation';

import cn from './style.module.css';

type AnimatedTextProps = {
    fontSize: number;
    animation?: DefaultAnimationProps;
    hover?: boolean;
    text?: string;
    fitToText?: boolean;
    align?: 'start' | 'middle' | 'end';
};

const getLineXPos = (align: AnimatedTextProps['align'], width: number, parentWidth: number) => {
    if (align === 'end') return parentWidth - width;
    if (align === 'middle') return (parentWidth - width) / 2;

    return 0;
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
    fontSize,
    animation = {},
    hover,
    text = '',
    fitToText = true,
    align = 'start',
}) => {
    const ref = useRef<SVGSVGElement>(null);
    const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
    const [lines, setLines] = useState<{ text: string; xPosition: number }[]>([]);
    const { pathProps, runCycle } = useSvgAnimation<SVGTextElement>({ animation, overriddenStrokeLength: 1000 });
    const [width] = useWindowSize();

    const measureTextWidth = (text: string, element: HTMLElement): number => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (context) {
            const computedStyle = window.getComputedStyle(element);
            const font = computedStyle.font;

            context.font = `${fontSize}px ${font.split(' ').slice(1).join(' ')}`;

            const metrics = context.measureText(text);

            return metrics.width;
        }

        return 0;
    };

    const calculateTextInfo = useCallback(() => {
        if (!ref.current) return { lines: [], maxWidth: 0 };

        const parentWidth = ref.current?.parentElement?.clientWidth || 0;

        const words = text.split(' ');

        const lines: { text: string; xPosition: number }[] = [];
        let currentLine = { text: words[0], xPosition: 0 };

        for (let i = 1; i < words.length; i++) {
            const testLine = `${currentLine.text} ${words[i]}`;
            const testWidth = measureTextWidth(testLine, ref.current?.parentElement as HTMLElement);

            if (testWidth <= parentWidth) {
                currentLine = { text: testLine, xPosition: getLineXPos(align, testWidth, parentWidth) };
            } else {
                lines.push(currentLine);
                currentLine = {
                    text: words[i],
                    xPosition: getLineXPos(
                        align,
                        measureTextWidth(words[i], ref.current?.parentElement as HTMLElement),
                        parentWidth,
                    ),
                };
            }
        }

        return { lines, maxWidth: parentWidth };
    }, [text, ref, fontSize]);

    useEffect(() => {
        const { lines, maxWidth } = calculateTextInfo();
        const svgWidth = fitToText ? maxWidth : dimensions.width;

        setDimensions({ height: lines.length * fontSize * 1.2, width: svgWidth });
        setLines(lines);
    }, [fitToText, fontSize, width, ref]);

    const onHover = () => {
        if (!hover) return;
        runCycle();
    };

    return (
        <svg
            height={dimensions.height}
            width='100%'
            xmlns='http://www.w3.org/2000/svg'
            strokeWidth={fontSize / 100}
            className={cn.text}
            onMouseEnter={onHover}
            ref={ref}
        >
            {lines.map((line, index) => (
                <motion.text
                    key={index}
                    x={line.xPosition}
                    y={`${index * fontSize * 1.2 + fontSize}px`}
                    fontSize={fontSize}
                    {...pathProps}
                    ref={index === 0 ? (instance) => instance && pathProps.ref(instance) : undefined}
                    fontWeight='light'
                >
                    {line.text}
                </motion.text>
            ))}
        </svg>
    );
};
