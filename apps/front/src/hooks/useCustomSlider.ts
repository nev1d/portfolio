import { RefObject, useEffect, useRef, useState } from 'react';

const useSliderEvents = (
    slider: RefObject<HTMLElement>,
    eventHandlers: Partial<{
        [T in keyof GlobalEventHandlersEventMap]: (e: GlobalEventHandlersEventMap[T]) => void;
    }>,
) => {
    useEffect(() => {
        const domNode = slider.current;

        for (const [event, handler] of Object.entries(eventHandlers)) {
            if (domNode) {
                domNode.addEventListener(event, handler as EventListener, { passive: true });
            }
        }

        return () => {
            for (const [event, handler] of Object.entries(eventHandlers)) {
                if (domNode) {
                    domNode.removeEventListener(event, handler as EventListener);
                }
            }
        };
    }, [eventHandlers]);
};

const applyInertia = (delta: number, callback: (delta: number) => void) => {
    if (delta === 0) return;

    const inertiaFrame = () => {
        if (Math.abs(delta) > 1) {
            callback(delta);
            delta *= 0.9;
            requestAnimationFrame(inertiaFrame);
        }
    };

    requestAnimationFrame(inertiaFrame);
};

type UseCustomSliderProps = Partial<{
    callback: (scrollLeft: number) => void;
}>;

export const useCustomSlider = <Ref extends HTMLElement>({ callback }: UseCustomSliderProps = {}) => {
    const slider = useRef<Ref>(null);
    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState<number | null>(null);
    const [scrollLeft, setScrollLeft] = useState<number | null>(null);
    const inertiaDelta = useRef<number>(0);

    const onMouseDown = (e: MouseEvent) => {
        setIsDown(true);
        setStartX(e.pageX - (slider.current?.offsetLeft || 0));
        setScrollLeft(slider.current?.scrollLeft || 0);
        inertiaDelta.current = 0;
    };

    const onMouseUp = () => {
        setIsDown(false);
        applyInertia(inertiaDelta.current, (delta: number) => {
            if (slider.current) {
                slider.current.scrollLeft -= delta * 0.1;
                callback?.(slider.current.scrollLeft);
            }
        });
    };

    const onMouseMove = (e: MouseEvent) => {
        if (!isDown) return;
        const x = e.pageX - (slider.current?.offsetLeft || 0);
        const walk = x - (startX || 0);

        if (slider.current) {
            slider.current.scrollLeft = (scrollLeft || 0) - walk;
            inertiaDelta.current = walk;
            callback?.(slider.current.scrollLeft);
        }
    };

    const onWheel = (e: WheelEvent) => {
        inertiaDelta.current = e.deltaY;
        applyInertia(inertiaDelta.current, (delta: number) => {
            if (slider.current) {
                slider.current.scrollLeft += delta * 0.1;
                callback?.(slider.current.scrollLeft);
            }
        });
    };

    useSliderEvents(slider, {
        mousedown: onMouseDown,
        mouseup: onMouseUp,
        mousemove: onMouseMove,
        wheel: onWheel,
    });

    return { slider };
};
