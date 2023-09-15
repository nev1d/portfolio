import { useEffect, useState } from 'react';

export const useThreeHoverPointer = () => {
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto';
    }, [hovered]);
    const onPointerOver = () => {
        setHovered(true);
    };

    const onPointerOut = () => {
        setHovered(false);
    };

    return { onPointerOver, onPointerOut };
};
