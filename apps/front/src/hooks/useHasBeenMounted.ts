import { useEffect, useState } from 'react';

export const useHasBeenMounted = () => {
    const [hasBeenMounted, setHasBeenMounted] = useState(false);

    useEffect(() => {
        setHasBeenMounted(true);
    }, []);

    return hasBeenMounted;
};
