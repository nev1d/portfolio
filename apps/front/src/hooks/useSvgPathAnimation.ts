import { useSpringAnimationCycle } from '@/hooks/useSpringAnimationCycle';
import { easings, useSpring } from '@react-spring/web';

type UseSvgPathAnimationProps = {
    strokeLength: number;
    animation?: {
        delay?: number;
        duration?: number;
        animated?: boolean;
    };
};

export const useSvgPathAnimation = ({ animation = {}, strokeLength }: UseSvgPathAnimationProps) => {
    const springAnimationCycle = useSpringAnimationCycle({
        totalAnimatedParts: 1,
    });

    const { animationCycleStatus, onResolve } = springAnimationCycle;

    const springProps = useSpring(() => {
        const isFirstHalf = animationCycleStatus === 'firstHalf';

        const toStrokeLength = strokeLength - 100;

        return {
            from: {
                strokeDasharray: strokeLength,
                strokeDashoffset: isFirstHalf ? toStrokeLength : strokeLength,
                fillOpacity: isFirstHalf ? 1 : 0,
            },
            to: {
                strokeDasharray: strokeLength,
                strokeDashoffset: isFirstHalf ? strokeLength : toStrokeLength,
                fillOpacity: isFirstHalf ? 0 : 1,
            },
            delay: animation.delay || 0,
            pause: !animation.animated,
            config: {
                duration: animation.duration || 400,
                easing: easings.easeInSine,
            },
            reset: isFirstHalf,
            onResolve,
        };
    }, [animation, strokeLength, animationCycleStatus]);

    return { springProps, springAnimationCycle };
};
