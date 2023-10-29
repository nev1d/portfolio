import { useEffect } from 'react';

import { useWindowSize } from '@/hooks/useWindowSize';

import { useAnimate, useInView } from 'framer-motion';

export const useTimelineAnimation = (animation: Partial<Record<'animate' | 'transition', unknown>>) => {
    const [ref, animate] = useAnimate();

    const [, height] = useWindowSize();

    const inView = useInView(ref, { margin: '0px -400px 0px 0px', once: true });

    useEffect(() => {
        if (inView || (height && height < 1000)) {
            animate(ref.current, animation.animate, Object(animation?.transition));
        }
    }, [inView, height]);

    return { ref };
};
