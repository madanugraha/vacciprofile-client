export const cutStringMoreThan32 = (str) => {
    return str.length <= 32 ? str : str.slice(0, 29) + " ..."
};

export const cutVaccineNameFromURL = (str) => {
    const base = str.split('/')

    if (base.length > 0) {
        return str.split("/")[base.length - 1]
    }

    return null
}