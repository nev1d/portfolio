export const getCssVariable = (variable: string) => {
    return getComputedStyle(document.documentElement).getPropertyValue(variable);
};
