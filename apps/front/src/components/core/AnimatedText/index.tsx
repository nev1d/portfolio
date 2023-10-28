'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import { AnimatedTextLine } from '@/components/core/AnimatedText/line';
import { useWindowSize } from '@/hooks/useWindowSize';
import { DefaultAnimationProps } from '@/typings/animations/svgPathAnimation';

import cn from './style.module.css';

export type AnimatedTextProps = {
    fontSize: number;
    fontWeight?: string | number;
    animation?: DefaultAnimationProps;
    hover?: boolean;
    text?: string;
    fitToText?: boolean;
    align?: 'start' | 'middle' | 'end';
    noWrap?: boolean;
};
const measureTextWidth = (text: string, element: HTMLElement, fontSize: number): number => {
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
const getLineXPos = (align: AnimatedTextProps['align'], width: number, parentWidth: number) => {
    if (align === 'end') return parentWidth - width;
    if (align === 'middle') return (parentWidth - width) / 2;

    return 0;
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
    fontSize,
    fontWeight = 'light',
    animation = {},
    hover,
    text = '',
    fitToText = false,
    align = 'start',
    noWrap = false,
}) => {
    const ref = useRef<SVGSVGElement>(null);

    const [isHovered, setIsHovered] = useState(false);
    const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
    const [lines, setLines] = useState<{ text: string; xPosition: number }[]>([]);

    const [width] = useWindowSize();

    const onHover = () => {
        if (!hover) return;
        setIsHovered(true);
    };

    const onMouseLeave = () => {
        if (!hover) return;
        setIsHovered(false);
    };

    const calculateTextInfo = useCallback(() => {
        if (!ref.current) return { lines: [], maxWidth: 0 };

        const currentParent = ref.current?.parentElement as HTMLElement;

        const parentWidth = currentParent?.clientWidth || 0;

        const lines: { text: string; xPosition: number; width: number }[] = [];

        const words = text.split(' ');

        const startWidth = measureTextWidth(words[0], currentParent, fontSize);

        let currentLine = {
            text: words[0],
            xPosition: getLineXPos(align, startWidth, parentWidth),
            width: startWidth,
        };

        const getMaxWidth = () => {
            if (fitToText) {
                if (lines.length > 1) return parentWidth;

                return currentLine.width;
            }

            return parentWidth;
        };

        if (noWrap) {
            const width = measureTextWidth(text, currentParent, fontSize);

            currentLine = {
                text,
                xPosition: getLineXPos(align, width, parentWidth),
                width,
            };

            lines.push(currentLine);

            return { lines, maxWidth: getMaxWidth() };
        }

        /* Using 'for' cycle for better performance */
        for (let i = 1; i < words.length; i++) {
            const testLine = `${currentLine.text} ${words[i]}`;
            const testWidth = measureTextWidth(testLine, currentParent, fontSize);

            if (testWidth <= parentWidth) {
                currentLine = {
                    text: testLine,
                    xPosition: getLineXPos(align, testWidth, parentWidth),
                    width: testWidth,
                };

                continue;
            }

            lines.push(currentLine);

            const width = measureTextWidth(words[i], currentParent, fontSize);

            currentLine = {
                text: words[i],
                xPosition: getLineXPos(align, width, parentWidth),
                width,
            };
        }

        lines.push(currentLine);

        return { lines, maxWidth: getMaxWidth() };
    }, [text, ref, fontSize]);

    useEffect(() => {
        const { lines, maxWidth } = calculateTextInfo();

        setDimensions({ height: lines.length * fontSize * 1.2, width: maxWidth });
        setLines(lines);
    }, [fitToText, fontSize, width, ref]);

    /* Sometimes animations is unfinished, so we need recalculate a text size. It will not be recalculated if size is not changed */
    useEffect(() => {
        window.dispatchEvent(new Event('resize'));
    }, []);

    return (
        <svg
            height={dimensions.height}
            width={fitToText ? dimensions.width || '100%' : '100%'}
            xmlns='http://www.w3.org/2000/svg'
            strokeWidth={fontSize / 100}
            className={cn.text}
            onMouseEnter={onHover}
            onMouseLeave={onMouseLeave}
            ref={ref}
        >
            {lines.map((line, index) => (
                <AnimatedTextLine
                    key={index}
                    x={line.xPosition}
                    y={`${index * fontSize * 1.2 + fontSize}px`}
                    fontSize={fontSize}
                    fontWeight={fontWeight}
                    animation={animation}
                    hovered={isHovered}
                >
                    {line.text}
                </AnimatedTextLine>
            ))}
        </svg>
    );
};
