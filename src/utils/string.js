export const cutStringMoreThan32 = (str) => {
    return str.length <= 32 ? str : str.slice(0, 29) + " ..."
};

export const cutVaccineNameFromURL = (str) => {
    const base = str.split('/')

    if (base.length > 0) {
        return str.split("/")[base.length - 1]
    }

    return null
};

// export const replaceSpecialCharsSuperScript = (str) => {
//     if (str) {
//         if (str.includes('plus-minus')) {
//             const str1 = str.split("plus-minus")
//             return document.getElementById('sample-inserting').innerHTML = `${str1[0] + "<span class='align-super text-xs'>±</span>" + str1[1]}`
//         } else {
//             return str;
//         }
//     }
// }


export const turnFirstLetterOfWordUpperCase = (str) => {
    if (str) {
        return str.toLowerCase()
            .replace((/(?<=\b)\p{L}/gu), match => match.toUpperCase())
    };
    return str;
};