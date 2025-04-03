import React, { useEffect, useState } from 'react';
import { getAvailableLicensingByVaccineName, getCombinationVaccineByPathogenId, getProductProfileValueByVaccineNameAndType, getVaccinesByPathogenId } from '../../utils/pathogens';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Vaccine from './Vaccine';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { sortArrayAscending } from '../../utils/array';
import tableDragger from 'table-dragger'
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { cutStringMoreThan32 } from '../../utils/string';
import * as _ from 'lodash';
import DraggableIcon from '../../assets/icons/draggable';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '95%',
    height: '95%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 6,
    borderRadius: 4
};


/**
 * Pathogen Component
 *
 * @component
 * @namespace Pathogen
 * @param {Object} props - The component accepts selectedPathogen and italizeScientificNames as props.
 * @param {Object} props.selectedPathogen - The selected pathogen object containing its details.
 * @param {string} props.selectedPathogen.name - The name of the selected pathogen.
 * @param {string} props.selectedMPathogen.description - The description of the selected pathogen.
 * @param {Function} props.italizeScientificNames - Function that converts scientific names in the description to italicized text.
 * @returns {JSX.Element} The Pathogen Information component.
 *
 * @example
 * // Example usage of Pathogen component
 * <Pathogen 
 *    selectedPathogen={{ 
 *        name: 'COVID-19', 
 *        description: 'Severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2) is the virus that causes COVID-19.'
 *    }} 
 *    italizeScientificNames={text => text.replace(/(SARS-CoV-2)/g, '<i>$1</i>')} 
 * />
 */
const Pathogen = ({ selectedPathogen, italizeScientificNames }) => {
    const [open, setOpen] = useState(false);
    const [selectedVaccine, setSelectedVaccine] = useState({});
    const convertCamelCaseToReadable = string => {
        const formattedString = string === "ceo"
            ? "CEO"
            : string.replace(/([A-Z])/g, ' $1');
        return formattedString.charAt(0).toUpperCase() + formattedString.slice(1);
    };
    const [compareSubmitted, setCompareSubmitted] = useState(false);
    const [compareActive, setCompareActive] = useState(false);
    const tableFields = [
        { title: 'Type', alt: 'type' },
        { title: 'Composition/Platform', alt: 'composition' },
        { title: 'Strain Coverage', alt: 'strainCoverage' },
        { title: 'Indication', alt: 'indication' },
        { title: 'Dosing', alt: 'dosing' },
        { title: 'Contraindication', alt: 'contraindication' },
        { title: 'Immunogenicity', alt: 'immunogenicity' },
        { title: 'Efficacy', alt: 'Efficacy' },
        { title: 'Duration of Protection', alt: 'durationOfProtection' },
        { title: 'Co-Administration', alt: 'coAdministration' },
        { title: 'Reactogenicity', alt: 'reactogenicity' },
        { title: 'Safety', alt: 'safety' },
        { title: 'Vaccination Goal', alt: 'vaccinationGoal' },
        { title: 'Others', alt: 'others' }
    ];
    const licenserFields = [
        {
            title: 'FDA',
            alt: 'fda'
        },
        {
            title: 'EMA',
            alt: 'ema'
        },
        {
            title: 'WHO',
            alt: 'who'
        }
    ];

    const [licenserFieldsVaccine, setLicenserFieldsVaccine] = useState([]);
    const [selectedFilterVaccine, setSelectedFilterVaccine] = useState([]);
    const [selectedFilterLicenser, setSelectedFilterLicenser] = useState([licenserFields[0], licenserFields[1]]);
    const [selectedFilterTableFields, setSelectedFilterTableFields] = useState([tableFields[0], tableFields[1]]);
    const [vaccineFieldsState, setVaccineFieldsState] = useState([]);
    const [secondaryVaccineFields, setSecondaryVaccineFields] = useState([]);

    const handleProceedComparison = () => {
        setCompareSubmitted(true);
    };

    const [duplicateVaccineError, setDuplicateVaccineError] = useState(false);
    const [duplicateTableFieldsError, setDuplicateTableFieldsError] = useState(false);

    const [vaccineErrorMessage, setVaccineErrorMessage] = useState("");
    const [tableFieldsErrorMessage, setTableFieldsErrorMessage] = useState("");
    const [viewSinglePathogenVaccine, setViewSinglePathogenVaccine] = useState(true);

    // custom filters
    const [licensedOnly, setLicensedOnly] = useState(true);
    const [allFactorShows, setAllFactorShows] = useState(false);
    const [showEma, setShowEma] = useState(false);
    const [showFda, setShowFda] = useState(false);
    const [showWho, setShowWho] = useState(false);
    const [vaccineSelectedOnly, setVaccineSelectedOnly] = useState(false);


    const handleSelectLicenserFieldsVaccine = (name, value) => {
        if (name) {
            const n = licenserFieldsVaccine;
            const c = n.some((x) => x.name === name);
            if (c) {
                const f = n.map((x) => {
                    if (x.name === name) {
                        return {
                            ...value
                        }
                    } else {
                        return {
                            ...x
                        }
                    }
                });
                setLicenserFieldsVaccine(f);
                return;
            } else {
                setLicenserFieldsVaccine([...value]);
            }
        }
    };

    const checkForCheckedVaccines = () => {
        const f = vaccineFieldsState.filter((x) => x.checked);
        if (f.length > 6) {
            toast.warn("You can only select max. 6 vaccines");
            return;
        };
        return;
    };

    const handleCheckBox = (vaccine, isSecondary) => {
        let c3 = vaccineFieldsState.some((x) => x.title === vaccine.name);

        if (c3) {
            let f = (vaccineFieldsState).map((x) => {
                if (x.title === vaccine.name) {
                    return {
                        ...x,
                        checked: !x.checked,
                        licenser: x.licenser
                    }
                } else {
                    return {
                        ...x,
                    }
                }
            });
            setVaccineFieldsState(f);
        };
    };


    const handleSecondaryCheckBox = (vaccine) => {
        let f = secondaryVaccineFields.map((data) => {
            return data.map((x) => {
                if (x.title === vaccine.name) {
                    return {
                        ...x,
                        checked: !x.checked,
                        licenser: x.licenser
                    }
                } else {
                    return {
                        ...x,
                    }
                }
            });
        });
        setSecondaryVaccineFields(f);
    };

    useEffect(() => {
        setCompareActive(false);
        setLicenserFieldsVaccine([]);
        setSelectedFilterVaccine([]);
        const vaccineFields = getVaccinesByPathogenId(selectedPathogen.pathogenId) && getVaccinesByPathogenId(selectedPathogen.pathogenId).length > 0 ? getVaccinesByPathogenId(selectedPathogen.pathogenId).map((x) => {
            return {
                ...x,
                title: x.name,
                alt: x.name,
                licenser: [...getAvailableLicensingByVaccineName(x.name, [])],
                hasDuplicate: false,
                errorMessage: "",
                checked: false
            }
        }) : [];
        setVaccineFieldsState(vaccineFields);
    }, [selectedPathogen]);


    useEffect(() => {
        setCompareActive(false);
        setLicenserFieldsVaccine([]);
        setSelectedFilterVaccine([]);
        const vaccineFields = (viewSinglePathogenVaccine ? getVaccinesByPathogenId(selectedPathogen.pathogenId) : getCombinationVaccineByPathogenId(selectedPathogen.pathogenId)) && (viewSinglePathogenVaccine ? getVaccinesByPathogenId(selectedPathogen.pathogenId) : getCombinationVaccineByPathogenId(selectedPathogen.pathogenId)).length > 0 ? (viewSinglePathogenVaccine ? getVaccinesByPathogenId(selectedPathogen.pathogenId) : getCombinationVaccineByPathogenId(selectedPathogen.pathogenId)).map((x) => {
            return {
                ...x,
                title: x.name,
                alt: x.name,
                licenser: [...getAvailableLicensingByVaccineName(x.name, [])],
                hasDuplicate: false,
                errorMessage: "",
                checked: false
            }
        }) : [];
        setVaccineFieldsState(vaccineFields);
    }, [viewSinglePathogenVaccine, selectedPathogen]);

    useEffect(() => {
        if (!open) {
            setLicenserFieldsVaccine([]);
            setSelectedFilterVaccine([]);
            const vaccineFields = getVaccinesByPathogenId(selectedPathogen.pathogenId) && getVaccinesByPathogenId(selectedPathogen.pathogenId).length > 0 ? getVaccinesByPathogenId(selectedPathogen.pathogenId).map((x) => {
                return {
                    ...x,
                    title: x.name,
                    alt: x.name,
                    licenser: [...getAvailableLicensingByVaccineName(x.name, [])],
                    hasDuplicate: false,
                    errorMessage: "",
                    checked: false
                }
            }) : [];
            setVaccineFieldsState(vaccineFields);
            setCompareActive(false);
        };


        var el = document.getElementById('comparison-table');
        if (el) {
            var dragger = tableDragger(el);
            dragger.destroy();
            tableDragger(el);
        }
    }, [open]);

    useEffect(() => {
        var el = document.getElementById('comparison-table');
        if (el) {
            var dragger = tableDragger(el);
            dragger.destroy();
            tableDragger(el);
        };
    }, [secondaryVaccineFields]);

    useEffect(() => {
        var el = document.getElementById('comparison-table');
        if (el) {
            var dragger = tableDragger(el);
            dragger.destroy();
            tableDragger(el);
        }
    }, [selectedFilterTableFields]);


    const printTable = () => {
        var divToPrint = document.getElementById("comparison-table");
        let newWin = window.open("");
        if (divToPrint?.outerHTML) {
            newWin.document.write(divToPrint.outerHTML);
            newWin.print();
            newWin.close();
        }
    };

    const handleCheckboxLicenserByVaccine = (vacineName, licenser, checked, vaccineChecked, isSecondary) => {
        let f = [];
        f = vaccineFieldsState.map((x) => {
            if (x.name === vacineName) {
                return {
                    ...x,
                    licenser: x.licenser.map((y) => {
                        if (y.title === licenser) {
                            return {
                                ...y,
                                checked: checked
                            }
                        } else {
                            return {
                                ...y
                            }
                        }
                    })
                };
            } else {
                return {
                    ...x
                }
            }
        });

        const checkIfLicenserHasSomeChecked = (vaccineFieldsState).filter((x) => x.name === vacineName);
        if (checkIfLicenserHasSomeChecked.length > 0) {
            const d = checkIfLicenserHasSomeChecked[0].licenser.some((x) => x.checked);
            if (!d) {
                if (!vaccineChecked) {
                    f = (vaccineFieldsState).map((x) => {
                        if (x.name === vacineName) {
                            return {
                                ...x,
                                checked: true,
                                licenser: x.licenser.map((y) => {
                                    if (y.title === licenser) {
                                        return {
                                            ...y,
                                            checked: checked
                                        }
                                    } else {
                                        return {
                                            ...y
                                        }
                                    }
                                })
                            };
                        } else {
                            return {
                                ...x
                            }
                        }
                    });
                }
            };
        };


        const licenserData = checkIfLicenserHasSomeChecked[0].licenser.filter((x) => x.checked);
        const lenLicenserData = licenserData.length;

        if (vaccineChecked && !checked && lenLicenserData === 1) {
            f = (vaccineFieldsState).map((x) => {
                if (x.name === vacineName) {
                    return {
                        ...x,
                        checked: false,
                        licenser: x.licenser.map((z) => {
                            return {
                                ...z,
                                checked: false
                            }
                        })
                    };
                } else {
                    return {
                        ...x
                    }
                }
            });
        }
        setVaccineFieldsState(f);
        if (isSecondary) {
            const nf = _.chunk(f, 5);
            setSecondaryVaccineFields(nf);
        }
    };


    const handleSecondaryCheckboxLicenserByVaccine = (vacineName, licenser, checked, vaccineChecked, arrIdx) => {
        let f = [];
        f = secondaryVaccineFields.map((data) => {
            return data.map((x) => {
                if (x.name === vacineName) {
                    return {
                        ...x,
                        licenser: x.licenser.map((y) => {
                            if (y.title === licenser) {
                                return {
                                    ...y,
                                    checked: checked
                                }
                            } else {
                                return {
                                    ...y
                                }
                            }
                        })
                    };
                } else {
                    return {
                        ...x
                    }
                }
            });
        });

        const checkIfLicenserHasSomeChecked = secondaryVaccineFields[arrIdx].filter((x) => x.name === vacineName);
        if (checkIfLicenserHasSomeChecked.length > 0) {
            const d = checkIfLicenserHasSomeChecked[0].licenser.some((x) => x.checked);
            if (!d) {
                if (!vaccineChecked) {
                    f = secondaryVaccineFields.map((data) => {
                        return data.map((x) => {
                            if (x.name === vacineName) {
                                return {
                                    ...x,
                                    checked: true,
                                    licenser: x.licenser.map((y) => {
                                        if (y.title === licenser) {
                                            return {
                                                ...y,
                                                checked: checked
                                            }
                                        } else {
                                            return {
                                                ...y
                                            }
                                        }
                                    })
                                };
                            } else {
                                return {
                                    ...x
                                }
                            }
                        });
                    });
                }
            };
        };


        const licenserData = checkIfLicenserHasSomeChecked[0].licenser.filter((x) => x.checked);
        const lenLicenserData = licenserData.length;

        if (vaccineChecked && !checked && lenLicenserData === 1) {
            f = secondaryVaccineFields.map((data) => {
                return data.map((x) => {
                    console.log('xxxx')
                    if (x.name === vacineName) {
                        return {
                            ...x,
                            checked: false,
                            licenser: x.licenser.map((z) => {
                                return {
                                    ...z,
                                    checked: false
                                }
                            })
                        };
                    } else {
                        return {
                            ...x
                        }
                    }
                });
            })
        };
        setSecondaryVaccineFields(f);
    };

    useEffect(() => {
        const f = vaccineFieldsState.filter((x) => x.checked)
        if (f.length > 0) {
            const nf = _.chunk(f, 5);
            setSecondaryVaccineFields(nf);
        }
        var el = document.getElementById('comparison-table');
        if (el) {
            var dragger = tableDragger(el);
            dragger.destroy();
            tableDragger(el);
        }
    }, [vaccineFieldsState])

    useEffect(() => {
        if (allFactorShows) {
            setSelectedFilterTableFields(tableFields);
        } else {
            setSelectedFilterTableFields([tableFields[0], tableFields[1]])
        }
    }, [showEma, showFda, showWho, allFactorShows, licensedOnly]);

    // useEffect(() => {
    //     // let f = []
    //     // if (vaccineSelectedOnly) {
    //     //     f = vaccineFieldsState.filter((x) => x.checked);
    //     // } else {

    //     // }
    //     // setVaccineFieldsState(f);
    // }, [vaccineSelectedOnly])
    return (
        <>
            <div className="accordion" id="accordianPathogenInfo">
                <div className="accordion-item mb-1">
                    <h2 className="accordion-header" id="accordianPathogen">
                        <button className="accordion-button collapsed bg-sidebar-unselected text-muted py-1 px-2" type="button" data-bs-toggle="collapse" data-bs-target="#accordianPatho" aria-expanded="false" aria-controls="collapseTwo">
                            Pathogen Profile
                        </button>
                    </h2>
                    <div id="accordianPatho" className="accordion-collapse collapse mb-1" aria-labelledby="accordianPathogen" data-bs-parent="#accordianPathogenInfo">
                        <div className="accordion-body pb-1 px-0 pt-0">
                            <div style={{ paddingLeft: 10 }}>
                                <h1 className='heading text-primary pt-2'>{italizeScientificNames(selectedPathogen.name)}</h1>
                                <p className='mb-2'>{italizeScientificNames(selectedPathogen.description)}</p>
                                <div className='mt-4 d-inline-flex'>
                                    {selectedPathogen?.image && (
                                        // eslint-disable-next-line jsx-a11y/alt-text
                                        <img src={selectedPathogen?.image} width={200} height={200} />
                                    )}
                                    <ul>
                                        {selectedPathogen?.bulletpoints ? selectedPathogen?.bulletpoints.split('|').map((bullet) => {
                                            return (
                                                <li key={bullet} className='flex flex-row mb-2'>
                                                    <div className='mt-2' dangerouslySetInnerHTML={{ __html: bullet.replaceAll('|', '').replaceAll(selectedPathogen.name, `<span classname="text-primary" style={{ color: "blue" }}>${selectedPathogen.name}</span>`) }}></div>
                                                </li>
                                            )
                                        }) : (
                                            <li className='flex flex-row mb-2'>
                                                <span className='mt-2'>No Data Found</span>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="accordion" id="accordianCandidateVaccineInfo">
                <div className="accordion-item mb-1">
                    <h2 className="accordion-header" id="accordianCandidateVaccine">
                        <button className="accordion-button collapsed bg-sidebar-unselected text-muted py-1 px-2" type="button" data-bs-toggle="collapse" data-bs-target="#accordianCandVac" aria-expanded="false" aria-controls="collapseTwo">
                            Vaccine Candidates
                        </button>
                    </h2>
                    <div id="accordianCandVac" className="accordion-collapse collapse mb-1" aria-labelledby="accordianCandidateVaccine" data-bs-parent="#accordianCandidateVaccineInfo">
                        <div className="accordion-body pb-1 px-0 pt-0">
                            <div>
                                <div className='mt-4' style={{ paddingLeft: 10 }}>
                                    <div className='mt-4'>
                                        <div className='flex flex-row mb-2'>
                                            &#8226;{" "}
                                            <span className='mt-2'>No Data Found</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='cursor-pointer' style={{ width: 150, height: 30, borderRadius: 8, flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: -10 }}>
                <p className='mb-0 mt-4 bg-primary' style={{ padding: 4, borderRadius: 8, alignSelf: 'center', textAlign: 'center', alignItems: 'center', justifyContent: 'center', marginTop: 4 }}><a className='read-more' style={{ textAlign: 'center', color: 'white', alignSelf: 'center', fontWeight: 'bold' }} target="_blank" rel="noopener noreferrer" href={selectedPathogen.link}>Find out more</a></p>
            </div>
        </>
    )
}
export default Pathogen;