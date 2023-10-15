import { useEffect, useRef, useState } from 'react';

export const useCustomSlider = () => {
    const slider = useRef<HTMLDivElement>(null);
    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState<number>(null);
    const [scrollLeft, setScrollLeft] = useState<number>(null);

    const onMouseDown = (e: MouseEvent) => {
        setIsDown(true);
        setStartX(e.pageX - slider.current.offsetLeft);
        setScrollLeft(slider.current.scrollLeft);
    };

    const onMouseUp = (e: MouseEvent) => {
        setIsDown(false);
    };

    const onMouseMove = (e: MouseEvent) => {
        if (!isDown) return;
        const x = e.pageX - slider.current.offsetLeft;
        const walk = x - startX;

        slider.current.scrollLeft = scrollLeft - walk;
    };

    useEffect(() => {
        const domNode = slider.current;

        domNode.addEventListener('mousedown', onMouseDown);

        return () => {
            domNode.removeEventListener('mousedown', onMouseDown);
        };
    }, [scrollLeft, isDown]);

    useEffect(() => {
        document.addEventListener('mouseup', onMouseUp);

        return () => {
            document.removeEventListener('mouseup', onMouseUp);
        };
    }, [scrollLeft, isDown]);

    useEffect(() => {
        if (!isDown) return;

        document.addEventListener('mousemove', onMouseMove);

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
        };
    }, [scrollLeft, isDown]);

    return { slider };
};
