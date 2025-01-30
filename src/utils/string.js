export const cutStringMoreThan32 = (str) => {
    return str.length <= 32 ? str : str.slice(0, 29) + " ..."
};