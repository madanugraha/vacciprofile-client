import vaccines from '../assets/data/vaccines.json';

export const getVaccinesByPathogenId = (id) => {
    const data = vaccines;

    const result = data.filter((vac) => vac.pathogenId === id);

    if (result.length > 0) {
        return result;
    }

    return [];
};