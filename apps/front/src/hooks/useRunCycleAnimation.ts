import { At, DOMKeyframesDefinition, DynamicAnimationOptions, useAnimate } from 'framer-motion';

type UseRunCycleAnimation = Record<'to' | 'from', DOMKeyframesDefinition> &
    Record<'animationTo' | 'animationFrom', DynamicAnimationOptions & At>;
export const useRunCycleAnimation = <T extends Element = HTMLElement>({
    to,
    from,
    animationTo,
    animationFrom,
}: UseRunCycleAnimation) => {
    const [scope, animate] = useAnimate<T>();

    const runCycle = () => {
        animate([
            [scope.current, to, animationTo],
            [scope.current, from, animationFrom],
            [scope.current, to, animationTo],
        ]);
    };

    return { scope, runCycle };
};
