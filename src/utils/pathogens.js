import vaccines from '../assets/data/vaccines.json';
import pathogens from '../assets/data/pathogens.json';
import manufacturers from '../assets/data/manufacturers.json';
import licensers from '../assets/data/licensers.json';
import { Tooltip } from 'react-tooltip'
import { cutVaccineNameFromURL } from './string';

export const getVaccinesByPathogenId = (id) => {
    const data = vaccines;

    // const result = data.filter((vac) => vac.pathogenId === id);

    let result = data.map((x) => {
        return {
            ...x,
            pathogenId: x.pathogenId.filter((y) => y === id)[0]
        }
    });

    result = result.filter((x) => x.pathogenId === id && x.vaccineType === "single")
    if (result.length > 0) {
        return result;
    }
    return [];
};

export const getAllVaccineByPathogenId = (id) => {
    const data = vaccines;
    let result = data.map((x) => {
        return {
            ...x,
            pathogenId: x.pathogenId.filter((y) => y === id)[0]
        }
    });

    result = result.filter((x) => x.pathogenId === id)

    // const result = data.filter((x) => x.pathogenId.filter((y) => y === id[0]));
    if (result.length > 0) {
        return result;
    }
    return [];
};

export const getAllVaccineByPathogenDetail = (id, diseasesName) => {
    const data = vaccines;
    let result = data.map((x) => {
        if (x.dieases) {
            if (x.dieases === diseasesName) {
                return {
                    ...x,
                    pathogenId: x.pathogenId.filter((y) => y === id)[0]
                }
            } else {
                return {
                    ...x,
                    pathogenId: x.pathogenId.filter((y) => y === id)[0]
                }
            }
        } else {
            return {
                ...x,
                pathogenId: x.pathogenId.filter((y) => y === id)[0],
            }
        };
    });

    // if (diseasesName) {
    //     result = result.filter((x) => x?.dieases && (x?.dieases === diseasesName))
    // } else {
    result = result.filter((x) => x.pathogenId === id)

    result = result.map((x) => {
        if (x.dieases) {
            return {
                ...x
            }
        }
    });
    // }

    if (result.length > 0) {
        return result;
    }
    return [];
};

export const getCombinationVaccineByPathogenId = (id) => {
    const data = vaccines;
    // const result = data.filter((vac) => vac.pathogenId === id);
    let result = data.map((x) => {
        return {
            ...x,
            pathogenId: x.pathogenId.filter((y) => y === id)[0]
        }
    });

    result = result.filter((x) => x.pathogenId === id && x?.vaccineType === "combination")

    // const result = data.filter((x) => x.pathogenId.filter((y) => y === id[0]));
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

export const getPathogenVaccinesByArrayName = (name) => {
    const data = vaccines;
    const tempArray = [];

    if (name && name.length > 0) {
        name.map((n) => {
            const result = data.filter((vac) => vac.name === n);
            if (result.length > 0) {
                const data = result[0];
                tempArray.push(data);
            } else {
                return []
            }
        })
    } else {
        return []
    }

    return tempArray.length > 0 ? tempArray : []
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
};

export const getLicenserDetailById = (id) => {
    const data = licensers;
    const result = data.filter((vac) => vac.licenserId === id);
    if (result.length > 0) {
        return result[0];
    };
    return null;
};

export const getPathogenDetailById = (id) => {
    const data = pathogens;
    const result = data.filter((vac) => vac.pathogenId === id);
    if (result.length > 0) {
        return result[0];
    };
    return null;
};

export const getManufactureDetailById = (id) => {
    const data = manufacturers;
    const result = data.filter((vac) => vac.manufacturerId === id);
    if (result.length > 0) {
        return result[0];
    };
    return null;
};


export const getSinglePathogenVaccineArray = (data) => {
    if (data && data.length > 0) {
        const d = data.filter((x) => x.vaccineType === "single");
        return d;
    } else {
        return []
    }
};
export const getAllSinglePathogenArray = () => {
    return pathogens;
};

export const getPathogenVaccineByDieasesName = (name) => {
    const pathogenId = pathogens.filter((x) => x.dieases.includes(name))[0]?.pathogenId;

    const vac = vaccines.filter((x) => x?.dieases && (x?.dieases.includes(name)));

    if (vac.length > 0) {
        return vac
    } else {
        const d = getAllVaccineByPathogenId(pathogenId);

        return d;
    }
};

export const getCombinationVaccineneArray = (data) => {
    if (data && data.length > 0) {
        return data.filter((x) => x.vaccineType === "combination")
    } else {
        return []
    }
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
    if (type && result.length > 0) {
        if (result[0]?.productProfiles && result[0]?.productProfiles.length > 0) {
            const propValue = result[0]?.productProfiles.filter((x) => x.type === type)[0][prop];
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

export const getLicensingDateByVaccineNameAndType = (type, prop, vaccineName) => {
    const data = vaccines;
    const result = data.filter((vac) => vac.name === vaccineName);
    if (type && result.length > 0) {
        if (result[0]?.licensingDates && result[0]?.licensingDates.length > 0) {
            const propValue = result[0]?.licensingDates.filter((x) => x.name === type)
            if (propValue?.length > 0) {
                return prop === "source" ? propValue.map((x) => {
                    return prop === "source" ? <a href={x.source} className='selectable' target="_blank" rel="noopener noreferrer">
                        {x.source}
                        ,{" "}
                    </a> : (x[prop]) || "N/A"
                }) : propValue.map((x) => {
                    return prop === "source" ? <a href={x.source} className='selectable' target="_blank" rel="noopener noreferrer">
                        {x.source}
                    </a> : (x[prop]) || "N/A"
                }).join(', ')
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

export const getLicensingDateByVaccineNameAndTypeV2 = (type, prop, vaccineName) => {
    const data = vaccines;
    const result = data.filter((vac) => vac.name === vaccineName);
    if (type && result.length > 0) {
        if (result[0]?.licensingDates && result[0]?.licensingDates.length > 0) {
            const propValue = result[0]?.licensingDates.filter((x) => x.name === type);
            if (propValue?.length > 0) {
                return prop === "source" ? propValue.map((x, i) => {
                    return prop === "source" ? <a href={x.source} className='selectable' target="_blank" rel="noopener noreferrer">
                        ({i + 1}) {cutVaccineNameFromURL(x.source)} <br />
                    </a> : (x[prop]) || "N/A"
                }) : propValue.map((x, i) => {
                    return prop === "source" ? <a href={x.source} className='selectable' target="_blank" rel="noopener noreferrer">
                        ({i + 1}) {cutVaccineNameFromURL(x.source)} <br />
                    </a> : (x[prop]) || "N/A"
                }).join(', ')
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

export const getLicensedVaccineByManufacturerId = (manufacturerId) => {
    const data = vaccines;
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        for (let x = 0; x < data[i].manufacturers.length; x++) {
            if (data[i]?.manufacturers[x]?.manufacturerId && data[i]?.manufacturers[x]?.manufacturerId === manufacturerId) {
                arr.push(data[i])
            }
        }
    };

    const f = vaccines.filter((x) => x.vaccineType === "combination").map((x) => x.pathogenId.length).reduce((a, b) => a + b, 0);
    return arr;
}


export const getLicensingLinkByVaccineNameAndLicenser = (vaccineName, licenser) => {

};

export const getVaccineByLicenserName = (licenserName, type) => {
    const data = vaccines;
    const result = data.map((x) => {
        return {
            ...x,
            productProfiles: x.productProfiles.filter((y) => y.type === licenserName && y.composition !== "- not licensed yet -")
        }
    });
    const result2 = result.filter((x) => x.productProfiles.length > 0);

    if (!type) {
        return result2;
    }
    if (type === "single") {
        return result2.filter((x) => x.vaccineType === "single")
    } else {
        return result2.filter((x) => x.vaccineType === "combination")
    };
};

export const getAvailableLicensingByVaccineName = (name, licenserArr) => {
    const data = vaccines;
    const result = data.filter((vac) => vac.name === name);
    if (result.length > 0) {
        if (result[0].productProfiles && result[0].productProfiles.length > 0) {
            const typeValues = result[0].productProfiles.filter((x) => x.composition !== "- not licensed yet -");
            if (typeValues.length > 0) {
                const z = typeValues.map((x) => {
                    return {
                        title: x.type,
                        checked: false
                    }
                });
                return z;
            } else {
                return []
            }
        } else {
            return []
        }
    } else {
        return []
    }
};