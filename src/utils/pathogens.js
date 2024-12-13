import vaccines from '../assets/data/vaccines.json';
import pathogens from '../assets/data/pathogens.json';

export const getVaccinesByPathogenId = (id) => {
    const data = vaccines;

    const result = data.filter((vac) => vac.pathogenId === id);

    if (result.length > 0) {
        return result;
    }

    return [];
};

export const getPathogenDetailByName = (name) => {
    const data = pathogens;

    const result = data.filter((vac) => vac.name === name);

    if (result.length > 0) {
        return result[0];
    }

    return null;
};
