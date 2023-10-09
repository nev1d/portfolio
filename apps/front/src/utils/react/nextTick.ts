// eslint-disable-next-line @typescript-eslint/ban-types
export const nextTick = (callback: Function) => {
    setTimeout(callback, 0);
};
