import vaccines from '../assets/data/vaccines.json';
import pathogens from '../assets/data/pathogens.json';
import manufacturers from '../assets/data/manufacturers.json';
import licensers from '../assets/data/licensers.json';

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


export const getVaccineDetailByName = (name) => {
    const data = vaccines;

    const result = data.filter((vac) => vac.name === name);

    if (result.length > 0) {
        return result[0];
    }

    return null;
};

export const getManufactureDetailByName = (name) => {
    const data = manufacturers;

    const result = data.filter((vac) => vac.name === name);

    if (result.length > 0) {
        return result[0];
    }

    return null;
};


export const getVaccineDetailById = (id) => {
    const data = vaccines;

    const result = data.filter((vac) => vac.vaccineId === id);

    if (result.length > 0) {
        return result[0];
    }

    return null;
};

export const getLicenserDetailById = (id) => {
    const data = licensers;
    const result = data.filter((vac) => vac.licenserId === id);
    if (result.length > 0) {
        return result[0];
    }
    return null;
};

export const getPathogenDetailById = (id) => {
    const data = pathogens;
    const result = data.filter((vac) => vac.pathogenId === id);
    if (result.length > 0) {
        return result[0];
    }
    return null;
};