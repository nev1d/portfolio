import { useReducer } from 'react';

export const useForceUpdate = () => {
    const [count, forceUpdate] = useReducer((x) => x + 1, 0);

    return [count, forceUpdate];
};
