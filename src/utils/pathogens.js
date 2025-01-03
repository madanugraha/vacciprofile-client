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

export const getPathogenVaccinesByName = (name) => {
    const data = pathogens;
    const result = data.filter((vac) => vac.name === name)
    if (result.length > 0) {
        const data = result[0];
        const vaccines = getVaccineListByPathogenId(data.pathogenId).sort((a, b) => a.name.localeCompare(b.name));
        if (vaccines && vaccines.length > 0) {
            return vaccines;
        } else {
            return []
        }
    } else {
        return [];
    }
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
    };
    return null;
};

export const getVaccineListByPathogenId = (id) => {
    const data = vaccines;
    const result = data.filter((vac) => vac.pathogenId === id);
    if (result.length > 0) {
        return result;
    };
    return null;
}

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

export const getProductProfileValueByVaccineName = (prop, vaccineName) => {
    const data = vaccines;

    const result = data.filter((vac) => vac.name === vaccineName);
    if (result.length > 0) {
        if (result[0].productProfiles.length > 0) {
            const propValue = result[0].productProfiles[0][prop];
            if (propValue) {
                return propValue
            } else {
                return "-"
            }
        } else {
            return "-"
        }
    } else {
        return "-"
    }
};

export const getProductProfileValueByVaccineNameAndType = (type, prop, vaccineName) => {
    const data = vaccines;
    const result = data.filter((vac) => vac.name === vaccineName);
    if (result.length > 0) {
        if (result[0]?.productProfiles && result[0]?.productProfiles.length > 0) {
            const propValue = result[0].productProfiles.filter((x) => x.type === type)[0][prop];
            if (propValue) {
                return propValue
            } else {
                return "-"
            }
        } else {
            return "-"
        }
    } else {
        return "-"
    }
};

export const getProductProfileTypeByVaccineName = (vaccineName) => {
    const data = vaccines;
    const result = data.filter((vac) => vac.name === vaccineName);
    if (result.length > 0) {
        if (result[0].productProfiles.length > 0) {
            const typeValues = result[0].productProfiles.map((x) => x.type);
            return typeValues;
        } else {
            return []
        }
    } else {
        return []
    }
}