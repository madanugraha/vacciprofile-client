export const removeDuplicatesFromArray = (arr, prop) => {
    if (arr && arr.length > 0) {
        return arr.reduce((accumulator, current) => {
            if (!accumulator.find((item) => item[prop] === current[prop])) {
                accumulator.push(current);
            }
            return accumulator;
        }, [])
    };
    return [];
}