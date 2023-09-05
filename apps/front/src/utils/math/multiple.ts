export const multipleArray = <T extends number[]>(array: T, multiplier: number) => {
    return array.map((item) => item * multiplier);
};
