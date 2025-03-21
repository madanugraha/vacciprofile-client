import React, { useEffect, useState } from 'react';
import { getAllVaccineByPathogenId, getAvailableLicensingByVaccineName, getCombinationVaccineByPathogenId, getLicensingDateByVaccineNameAndType, getPathogenVaccineByDieasesName, getProductProfileValueByVaccineNameAndType, getVaccinesByPathogenId } from '../../utils/pathogens';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Vaccine from './Vaccine';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { checkIfPathogenCandidate, getCandidateVaccinesByPathogenName, getVaccineCandidatePlatformsUniqueByPathogenName, removeDuplicatesFromArray, sortArrayAscending } from '../../utils/array';
import tableDragger from 'table-dragger'
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { cutStringMoreThan32 } from '../../utils/string';
import * as _ from 'lodash';
import DraggableIcon from '../../assets/icons/draggable';
import { vaccineDeases } from '../../assets/data/dieases';

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
const Comparison = ({ selectedPathogen, italizeScientificNames }) => {
    console.log(selectedPathogen);
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
        { title: 'Others', alt: 'others' },
        { title: 'Approval Date', alt: 'approvalDate' },
        { title: 'Last Updated', alt: 'lastUpdated' },
        { title: 'Source', alt: 'source' },
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
    const [selectedFilterLicenser, setSelectedFilterLicenser] = useState([licenserFields[0], licenserFields[1], tableFields[14], tableFields[15], tableFields[16]]);
    const [selectedFilterTableFields, setSelectedFilterTableFields] = useState([tableFields[0], tableFields[1], tableFields[14], tableFields[15], tableFields[16]]);
    const [vaccineFieldsState, setVaccineFieldsState] = useState([]);
    const [secondaryVaccineFields, setSecondaryVaccineFields] = useState([]);

    const handleProceedComparison = () => {
        setCompareSubmitted(true);
    };

    const [duplicateVaccineError, setDuplicateVaccineError] = useState(false);
    const [duplicateTableFieldsError, setDuplicateTableFieldsError] = useState(false);

    const [vaccineErrorMessage, setVaccineErrorMessage] = useState("");
    const [tableFieldsErrorMessage, setTableFieldsErrorMessage] = useState("");
    const [viewAllVaccines, setViewAllVaccines] = useState(true);
    const [viewSinglePathogenVaccine, setViewSinglePathogenVaccine] = useState(false);
    const [viewCombinationVaccine, setViewCombinationVaccine] = useState(false);


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
        const vaccineFields = getAllVaccineByPathogenId(selectedPathogen.pathogenId) && getAllVaccineByPathogenId(selectedPathogen.pathogenId).length > 0 ? getAllVaccineByPathogenId(selectedPathogen.pathogenId).map((x) => {
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
        console.log(vaccineFields);
        setVaccineFieldsState(vaccineFields);
    }, [selectedPathogen]);


    const vaccineByDeases = getPathogenVaccineByDieasesName(selectedPathogen?.name);

    useEffect(() => {
        setCompareActive(false);
        setLicenserFieldsVaccine([]);
        setSelectedFilterVaccine([]);
        if (!checkIfPathogenCandidate(selectedPathogen)) {
            if (viewAllVaccines) {
                if (getAllVaccineByPathogenId(selectedPathogen.pathogenId) && getAllVaccineByPathogenId(selectedPathogen.pathogenId).length > 0) {
                    const f = getAllVaccineByPathogenId(selectedPathogen.pathogenId).map((x) => {
                        return {
                            ...x,
                            title: x.name,
                            alt: x.name,
                            licenser: [...getAvailableLicensingByVaccineName(x.name, [])],
                            hasDuplicate: false,
                            errorMessage: "",
                            checked: x.checked
                        }
                    })
                    setVaccineFieldsState(f);
                } else {
                    setVaccineFieldsState([])
                }
            };

            if (viewSinglePathogenVaccine) {
                if (getVaccinesByPathogenId(selectedPathogen.pathogenId) && getVaccinesByPathogenId(selectedPathogen.pathogenId).length > 0) {
                    const f = getVaccinesByPathogenId(selectedPathogen.pathogenId).map((x) => {
                        return {
                            ...x,
                            title: x.name,
                            alt: x.name,
                            licenser: [...getAvailableLicensingByVaccineName(x.name, [])],
                            hasDuplicate: false,
                            errorMessage: "",
                            checked: x.checked
                        }
                    });
                    setVaccineFieldsState(f);
                } else {
                    setVaccineFieldsState([])
                }
            }

            if (viewCombinationVaccine) {
                if (getCombinationVaccineByPathogenId(selectedPathogen.pathogenId) && getCombinationVaccineByPathogenId(selectedPathogen.pathogenId).length > 0) {
                    const f = getCombinationVaccineByPathogenId(selectedPathogen.pathogenId).map((x) => {
                        return {
                            ...x,
                            title: x.name,
                            alt: x.name,
                            licenser: [...getAvailableLicensingByVaccineName(x.name, [])],
                            hasDuplicate: false,
                            errorMessage: "",
                            checked: x.checked
                        }
                    })
                    setVaccineFieldsState(f);
                } else {
                    setVaccineFieldsState([])
                }
            }
        } else {
            if (viewAllVaccines) {
                if (vaccineByDeases && vaccineByDeases.length > 0) {
                    const f = vaccineByDeases.map((x) => {
                        return {
                            ...x,
                            title: x.name,
                            alt: x.name,
                            licenser: [...getAvailableLicensingByVaccineName(x.name, [])],
                            hasDuplicate: false,
                            errorMessage: "",
                            checked: x.checked
                        }
                    })
                    setVaccineFieldsState(f);
                } else {
                    setVaccineFieldsState([])
                }
            };

            if (viewSinglePathogenVaccine) {
                if (vaccineByDeases && vaccineByDeases.length > 0) {
                    const f = vaccineByDeases.filter((x) => x.vaccineType === "single").map((x) => {
                        return {
                            ...x,
                            title: x.name,
                            alt: x.name,
                            licenser: [...getAvailableLicensingByVaccineName(x.name, [])],
                            hasDuplicate: false,
                            errorMessage: "",
                            checked: x.checked
                        }
                    });
                    setVaccineFieldsState(f);
                } else {
                    setVaccineFieldsState([])
                }
            }

            if (viewCombinationVaccine) {
                if (vaccineByDeases && vaccineByDeases.length > 0) {
                    const f = vaccineByDeases.filter((x) => x.vaccineType === "combination").map((x) => {
                        return {
                            ...x,
                            title: x.name,
                            alt: x.name,
                            licenser: [...getAvailableLicensingByVaccineName(x.name, [])],
                            hasDuplicate: false,
                            errorMessage: "",
                            checked: x.checked
                        }
                    })
                    setVaccineFieldsState(f);
                } else {
                    setVaccineFieldsState([])
                }
            }
        }

    }, [viewSinglePathogenVaccine, viewCombinationVaccine, viewAllVaccines, selectedPathogen]);

    useEffect(() => {
        if (!open) {
            setLicenserFieldsVaccine([]);
            setSelectedFilterVaccine([]);

            if (!checkIfPathogenCandidate(selectedPathogen)) {
                const vaccineFields = getAllVaccineByPathogenId(selectedPathogen.pathogenId) && getAllVaccineByPathogenId(selectedPathogen.pathogenId).length > 0 ? getAllVaccineByPathogenId(selectedPathogen.pathogenId).map((x) => {
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
            } else {
                const vaccineFields = vaccineByDeases && vaccineByDeases.length > 0 ? vaccineByDeases.map((x) => {
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
            setSelectedFilterTableFields([tableFields[0], tableFields[1], tableFields[14], tableFields[15], tableFields[16]])
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



    return !checkIfPathogenCandidate(selectedPathogen) ? (
        <>
            {
                selectedPathogen === "Pathogen A" || selectedPathogen === "Pathogen B" ? null : (
                    <div className="accordion" id="accordianVaccineInfo">
                        <div className="accordion-item mb-1">
                            <h2 className="accordion-header" id="accordianVaccine">
                                <button className="accordion-button bg-accordian text-muted py-1 px-2" type="button" data-bs-toggle="collapse" data-bs-target="#accordianVac" aria-expanded="true" aria-controls="collapseTwo">
                                    Licensed Vaccines
                                </button>
                            </h2>
                            <div id="accordianVac" className="accordion-collapse collapse show mb-1" aria-labelledby="accordianVaccine" data-bs-parent="#accordianVaccineInfo">
                                <div className="accordion-body pb-1 px-0 pt-0">
                                    <div>
                                        <div className='mt-4' style={{ paddingLeft: 10 }}>
                                            <div className='d-inline-flex' style={{ alignItems: 'center' }}>
                                                <Checkbox checked={viewAllVaccines} onChange={((e, checked) => {
                                                    setViewAllVaccines(true);
                                                    setViewSinglePathogenVaccine(false);
                                                    setViewCombinationVaccine(false);
                                                    // handleCheckboxLicenserByVaccine(vaccine.name, licenser.title, checked, vaccine.checked, false);
                                                })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>${"View Single & Combination Vaccine"}</span>` }}></div>
                                            </div>
                                            <div className='d-inline-flex justify-content-between w-100' style={{ marginBottom: 50 }}>
                                                <div className='d-inline-flex w-100'>
                                                    <div className='d-inline-flex' style={{ alignItems: 'center' }}>
                                                        <Checkbox checked={viewSinglePathogenVaccine} onChange={((e, checked) => {
                                                            setViewSinglePathogenVaccine(true);
                                                            setViewAllVaccines(false);
                                                            setViewCombinationVaccine(false);
                                                            // handleCheckboxLicenserByVaccine(vaccine.name, licenser.title, checked, vaccine.checked, false);
                                                        })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>${"View Single Pathogen Vaccines"}</span>` }}></div>
                                                    </div>
                                                    <div className='d-inline-flex' style={{ alignItems: 'center', marginLeft: 20 }}>
                                                        <Checkbox checked={viewCombinationVaccine} onChange={((e, checked) => {
                                                            setViewCombinationVaccine(true)
                                                            setViewAllVaccines(false);
                                                            setViewSinglePathogenVaccine(false);
                                                            // handleCheckboxLicenserByVaccine(vaccine.name, licenser.title, checked, vaccine.checked, false);
                                                        })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>${"View Combination Vaccines"}</span>` }}></div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='d-inline-flex justify-content-between w-100'>
                                                {
                                                    viewAllVaccines ? (
                                                        <table>
                                                            <tr>
                                                                <td colSpan={4} style={{ fontWeight: 'bold' }}>Single Pathogen & Combination Vaccines</td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ fontWeight: 'bold' }}>Vaccine Name</td>
                                                                <td style={{ fontWeight: 'bold' }}>Single or Combination Vaccine</td>
                                                                <td style={{ fontWeight: 'bold' }} colSpan={3}>Licensing Authority</td>
                                                            </tr>
                                                            {(vaccineSelectedOnly ? vaccineFieldsState.filter((x) => x.checked) : vaccineFieldsState).length > 0 ? sortArrayAscending((vaccineSelectedOnly ? vaccineFieldsState.filter((x) => x.checked) : vaccineFieldsState), "name").map((vaccine) => {
                                                                return (
                                                                    <tr>
                                                                        <td>
                                                                            <li key={Math.random() * 999} onClick={() => {
                                                                                // setSelectedVaccine(vaccine)
                                                                                // setOpen(true)
                                                                            }} className='' style={{ marginTop: 15, maxWidth: 400, minWidth: 400, alignItems: 'center', display: 'flex', marginBottom: 5 }}>
                                                                                <div className='d-inline-flex' style={{ alignItems: 'center' }}>
                                                                                    <Checkbox checked={vaccine.checked} onChange={((e, checked) => {
                                                                                        handleCheckBox(vaccine, false);
                                                                                    })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>${vaccine.name}</span>` }}></div>
                                                                                </div>
                                                                            </li>
                                                                        </td>
                                                                        <td style={{ fontWeight: 'bold' }}>{vaccine.vaccineType === "single" ? "Single Pathogen Vaccine" : "Combination Vaccine"}</td>
                                                                        <td colSpan={3}>
                                                                            {vaccine.licenser.length > 0 && vaccine.licenser.map((licenser) => {
                                                                                return (

                                                                                    <div className='d-inline-flex' style={{ alignItems: 'center' }}>
                                                                                        <Checkbox checked={licenser.checked} onChange={((e, checked) => {
                                                                                            handleCheckboxLicenserByVaccine(vaccine.name, licenser.title, checked, vaccine.checked, false);
                                                                                        })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>${licenser.title}</span>` }}></div>
                                                                                    </div>

                                                                                )
                                                                            })}
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            }) : (
                                                                <tr>
                                                                    <td colSpan={4}>
                                                                        <div className='flex flex-row mb-2'>
                                                                            &#8226;{" "}
                                                                            <span className='mt-2'>No Data Found</span>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </table>
                                                    ) : null
                                                }
                                                {
                                                    viewSinglePathogenVaccine ? (
                                                        <table>
                                                            <tr>
                                                                <td colSpan={4} style={{ fontWeight: 'bold' }}>Single Pathogen Vaccines</td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ fontWeight: 'bold' }}>Vaccine Name</td>
                                                                <td style={{ fontWeight: 'bold' }} colSpan={4}>Licensing Authority</td>
                                                            </tr>
                                                            {/* <span className='mt-2 fw-bold text-primary'>&#8226;{" "}Single Pathogen Vaccine</span> */}
                                                            {(vaccineSelectedOnly ? vaccineFieldsState.filter((x) => x.checked) : vaccineFieldsState).length > 0 ? sortArrayAscending((vaccineSelectedOnly ? vaccineFieldsState.filter((x) => x.checked) : vaccineFieldsState), "name").map((vaccine) => {
                                                                return (
                                                                    <tr>
                                                                        <td>
                                                                            <li key={Math.random() * 999} onClick={() => {
                                                                                // setSelectedVaccine(vaccine)
                                                                                // setOpen(true)
                                                                            }} className='' style={{ marginTop: 15, maxWidth: 400, minWidth: 400, alignItems: 'center', display: 'flex', marginBottom: 5 }}>
                                                                                <div className='d-inline-flex' style={{ alignItems: 'center' }}>
                                                                                    <Checkbox checked={vaccine.checked} onChange={((e, checked) => {
                                                                                        handleCheckBox(vaccine, false);
                                                                                    })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>${vaccine.name}</span>` }}></div>
                                                                                </div>
                                                                            </li>
                                                                        </td>
                                                                        <td colSpan={4}>
                                                                            {vaccine.licenser.length > 0 && vaccine.licenser.map((licenser) => {
                                                                                return (

                                                                                    <div className='d-inline-flex' style={{ alignItems: 'center' }}>
                                                                                        <Checkbox checked={licenser.checked} onChange={((e, checked) => {
                                                                                            handleCheckboxLicenserByVaccine(vaccine.name, licenser.title, checked, vaccine.checked, false);
                                                                                        })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>${licenser.title}</span>` }}></div>
                                                                                    </div>

                                                                                )
                                                                            })}
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            }) : (
                                                                <tr>
                                                                    <td colSpan={4}>
                                                                        <div className='flex flex-row mb-2'>
                                                                            &#8226;{" "}
                                                                            <span className='mt-2'>No Data Found</span>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </table>
                                                    ) : null
                                                }

                                                {
                                                    viewCombinationVaccine ? (
                                                        <table>
                                                            <tr>
                                                                <td colSpan={4} style={{ fontWeight: 'bold' }}>Combination Vaccines</td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ fontWeight: 'bold' }}>Vaccine Name</td>
                                                                <td style={{ fontWeight: 'bold' }} colSpan={4}>Licensing Authority</td>
                                                            </tr>
                                                            {(vaccineSelectedOnly ? vaccineFieldsState.filter((x) => x.checked) : vaccineFieldsState).length > 0 ? sortArrayAscending((vaccineSelectedOnly ? vaccineFieldsState.filter((x) => x.checked) : vaccineFieldsState), "name").map((vaccine) => {
                                                                return (
                                                                    <tr>
                                                                        <td>
                                                                            <li key={Math.random() * 999} onClick={() => {
                                                                                // setSelectedVaccine(vaccine)
                                                                                // setOpen(true)
                                                                            }} className='' style={{ marginTop: 15, maxWidth: 400, minWidth: 400, alignItems: 'center', display: 'flex', marginBottom: 5 }}>
                                                                                <div className='d-inline-flex' style={{ alignItems: 'center' }}>
                                                                                    <Checkbox checked={vaccine.checked} onChange={((e, checked) => {
                                                                                        handleCheckBox(vaccine, false);
                                                                                    })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>${vaccine.name}</span>` }}></div>
                                                                                </div>
                                                                            </li>
                                                                        </td>
                                                                        <td colSpan={4}>
                                                                            {vaccine.licenser.length > 0 && vaccine.licenser.map((licenser) => {
                                                                                return (

                                                                                    <div className='d-inline-flex' style={{ alignItems: 'center', marginRight: 5 }}>
                                                                                        <Checkbox checked={licenser.checked} onChange={((e, checked) => {
                                                                                            handleCheckboxLicenserByVaccine(vaccine.name, licenser.title, checked, vaccine.checked, false);
                                                                                        })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>${licenser.title}</span>` }}></div>
                                                                                    </div>
                                                                                )
                                                                            })}
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            }) : (
                                                                <tr>
                                                                    <td colSpan={4}>
                                                                        <div className='flex flex-row mb-2'>
                                                                            &#8226;{" "}
                                                                            <span className='mt-2'>No Data Found</span>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </table>
                                                    ) : null
                                                }
                                                <div style={{ marginRight: 10 }}>
                                                    <Button style={{ marginLeft: 10 }} disabled={!vaccineFieldsState.some((z) => z.checked)} variant="contained" onClick={() => {
                                                        const check = vaccineFieldsState.filter((x) => x.checked).map((x) => {
                                                            return {
                                                                ...x,
                                                                hasLicenserChecked: x.licenser.some((y) => y.checked)
                                                            }
                                                        });
                                                        if (check.length > 0) {
                                                            let ctx = 0;
                                                            check.map((x) => {
                                                                if (!x.hasLicenserChecked) {
                                                                    ctx += 1;
                                                                    const msg = `Vaccine: ${x.name} should have atleast one Licenser selected`
                                                                    return toast.error(msg);
                                                                }
                                                            })
                                                            if (ctx === 0) {
                                                                setCompareActive(!compareActive)
                                                            }
                                                        }

                                                    }}>Compare Vaccines {vaccineFieldsState.filter((x) => x.checked).length >= 1 ? `(${vaccineFieldsState.filter((x) => x.checked).length})` : null}</Button>
                                                    <div style={{ marginRight: 0 }}>
                                                        <div className='d-inline-flex' style={{ alignItems: 'center' }}>
                                                            <Checkbox checked={vaccineSelectedOnly} onChange={((e, checked) => {
                                                                setVaccineSelectedOnly(checked);
                                                            })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>Show Selected Vaccines only</span>` }}></div>
                                                        </div>
                                                    </div>
                                                    {/* <span onClick={() => } className='fw-bold cursor-pointer compare-color-text' style={{}}>&#8226;{" "}Compare Vaccines</span> */}
                                                    {
                                                        compareActive && (
                                                            <>
                                                                <div style={{ marginTop: 20 }}>
                                                                    <div style={{ marginTop: 10 }}>
                                                                        <Stack spacing={3} sx={{ width: 500 }}>
                                                                            <Autocomplete
                                                                                multiple
                                                                                id="tags-standard"
                                                                                options={tableFields}
                                                                                value={selectedFilterTableFields}
                                                                                getOptionLabel={(option) => option.title}
                                                                                defaultValue={[tableFields[0], tableFields[1], tableFields[14], tableFields[15], tableFields[16]]}
                                                                                autoComplete
                                                                                freeSolo
                                                                                onChange={(event, newValue) => {
                                                                                    if (event.target?.textContent &&
                                                                                        selectedFilterTableFields.some((item) => item.title === (event.target)?.textContent)
                                                                                    ) {
                                                                                        setTableFieldsErrorMessage(`${(event.target)?.textContent} cannot be duplicated`)
                                                                                        setDuplicateTableFieldsError(true);
                                                                                        return;
                                                                                    }
                                                                                    const checkForType = newValue.some((item) => item.title === "Type");
                                                                                    const checkForComposition = newValue.some((item) => item.title === "Composition/Platform");
                                                                                    const checkForApprovalDate = newValue.some((item) => item.title === "Approval Date");
                                                                                    const checkForLastUpdated = newValue.some((item) => item.title === "Last Updated");
                                                                                    const checkForSource = newValue.some((item) => item.title === "Source");
                                                                                    if (!checkForType) {
                                                                                        setTableFieldsErrorMessage("Type cannot be removed")
                                                                                        setDuplicateTableFieldsError(true);
                                                                                        return;
                                                                                    }
                                                                                    if (!checkForComposition) {
                                                                                        setTableFieldsErrorMessage("Composition/Platform cannot be removed")
                                                                                        setDuplicateTableFieldsError(true);
                                                                                        return;
                                                                                    }
                                                                                    if (!checkForApprovalDate) {
                                                                                        setTableFieldsErrorMessage("Approval Date cannot be removed")
                                                                                        setDuplicateTableFieldsError(true);
                                                                                        return;
                                                                                    }
                                                                                    if (!checkForLastUpdated) {
                                                                                        setTableFieldsErrorMessage("Last Updated cannot be removed")
                                                                                        setDuplicateTableFieldsError(true);
                                                                                        return;
                                                                                    }
                                                                                    if (!checkForSource) {
                                                                                        setTableFieldsErrorMessage("Source cannot be removed")
                                                                                        setDuplicateTableFieldsError(true);
                                                                                        return;
                                                                                    }
                                                                                    setDuplicateTableFieldsError(false);
                                                                                    setSelectedFilterTableFields(newValue);
                                                                                }}
                                                                                onKeyUp={(event) => {
                                                                                    if (event.target?.textContent &&
                                                                                        selectedFilterTableFields.some((item) => item.title === (event.target)?.textContent)
                                                                                    ) {
                                                                                        setTableFieldsErrorMessage(`${(event.target)?.textContent} cannot be duplicated`)
                                                                                        setDuplicateTableFieldsError(true);
                                                                                        return;
                                                                                    } else {
                                                                                        setDuplicateTableFieldsError(false);
                                                                                    }
                                                                                }}
                                                                                renderInput={(params) => (
                                                                                    <TextField
                                                                                        {...params}
                                                                                        variant="standard"
                                                                                        label={<span style={{ color: 'black' }}>Select items need to be shown</span>}
                                                                                        placeholder=""
                                                                                        error={duplicateTableFieldsError}
                                                                                        helperText={duplicateTableFieldsError ? tableFieldsErrorMessage : null}
                                                                                    />
                                                                                )}
                                                                            />
                                                                        </Stack>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div>
                                                                        <div className='d-inline-flex' style={{ alignItems: 'center' }}>
                                                                            <Checkbox checked={allFactorShows} onChange={((e, checked) => {
                                                                                setAllFactorShows(checked);
                                                                            })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>Set All Items to be shown</span>` }}></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <p onClick={() => {
                                                                    setOpen(true);
                                                                    handleProceedComparison();
                                                                }} className='fw-bold cursor-pointer compare-color-text' style={{ marginTop: 20 }}>&#8226;{" "}Proceed Comparison</p>
                                                            </>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            <div className="accordion" id="accordianPathogenInfo">
                <div className="accordion-item mb-1">
                    <h2 className="accordion-header" id="accordianPathogen">
                        <button className="accordion-button collapsed bg-accordian text-muted py-1 px-2" type="button" data-bs-toggle="collapse" data-bs-target="#accordianPatho" aria-expanded="false" aria-controls="collapseTwo">
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
            <div className='cursor-pointer' style={{ width: 150, height: 30, borderRadius: 8, flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: -10 }}>
                <p className='mb-0 mt-4 bg-primary' style={{ padding: 4, borderRadius: 8, alignSelf: 'center', textAlign: 'center', alignItems: 'center', justifyContent: 'center', marginTop: 4 }}><a className='read-more' style={{ textAlign: 'center', color: 'white', alignSelf: 'center', fontWeight: 'bold' }} target="_blank" rel="noopener noreferrer" href={selectedPathogen.link}>Find out more</a></p>
            </div>
            <Modal
                keepMounted
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
                        <div style={{ position: 'absolute', right: -10, top: -20 }}>
                            <button type='button' onClick={() => printTable()} className='btn btn-primary'>Print Document</button>
                        </div>
                        <div className='d-inline-flex' style={{ marginTop: 30, marginBottom: 20, overflow: 'scroll', maxWidth: '165vh' }}>
                            <div>
                                <div style={{ marginTop: 10 }}>
                                    <Stack spacing={3} sx={{ width: 500 }}>
                                        <Autocomplete
                                            multiple
                                            id="tags-standard"
                                            options={tableFields}
                                            value={selectedFilterTableFields}
                                            getOptionLabel={(option) => option.title}
                                            defaultValue={[tableFields[0], tableFields[1]]}
                                            autoComplete
                                            freeSolo
                                            onChange={(event, newValue) => {
                                                if (event.target?.textContent &&
                                                    selectedFilterTableFields.some((item) => item.title === (event.target)?.textContent)
                                                ) {
                                                    setTableFieldsErrorMessage(`${(event.target)?.textContent} cannot be duplicated`)
                                                    setDuplicateTableFieldsError(true);
                                                    return;
                                                }
                                                const checkForType = newValue.some((item) => item.title === "Type");
                                                const checkForComposition = newValue.some((item) => item.title === "Composition/Platform");
                                                const checkForApprovalDate = newValue.some((item) => item.title === "Approval Date");
                                                const checkForLastUpdated = newValue.some((item) => item.title === "Last Updated");
                                                const checkForSource = newValue.some((item) => item.title === "Source");
                                                if (!checkForType) {
                                                    setTableFieldsErrorMessage("Type cannot be removed")
                                                    setDuplicateTableFieldsError(true);
                                                    return;
                                                }
                                                if (!checkForComposition) {
                                                    setTableFieldsErrorMessage("Composition/Platform cannot be removed")
                                                    setDuplicateTableFieldsError(true);
                                                    return;
                                                }
                                                if (!checkForApprovalDate) {
                                                    setTableFieldsErrorMessage("Approval Date cannot be removed")
                                                    setDuplicateTableFieldsError(true);
                                                    return;
                                                }
                                                if (!checkForLastUpdated) {
                                                    setTableFieldsErrorMessage("Last Updated cannot be removed")
                                                    setDuplicateTableFieldsError(true);
                                                    return;
                                                }
                                                if (!checkForSource) {
                                                    setTableFieldsErrorMessage("Source cannot be removed")
                                                    setDuplicateTableFieldsError(true);
                                                    return;
                                                }
                                                setDuplicateTableFieldsError(false);
                                                setSelectedFilterTableFields(newValue);
                                            }}
                                            onKeyUp={(event) => {
                                                if (event.target?.textContent &&
                                                    selectedFilterTableFields.some((item) => item.title === (event.target)?.textContent)
                                                ) {
                                                    setTableFieldsErrorMessage(`${(event.target)?.textContent} cannot be duplicated`)
                                                    setDuplicateTableFieldsError(true);
                                                    return;
                                                } else {
                                                    setDuplicateTableFieldsError(false);
                                                }
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="standard"
                                                    label={<span style={{ color: 'black' }}>Filter items</span>}
                                                    placeholder=""
                                                    error={duplicateTableFieldsError}
                                                    helperText={duplicateTableFieldsError ? tableFieldsErrorMessage : null}
                                                />
                                            )}
                                        />
                                    </Stack>
                                </div>
                            </div>
                            {secondaryVaccineFields.length > 0 ? secondaryVaccineFields.map((data, secondaryIdx) => {
                                return (
                                    <div style={{ marginLeft: 10, marginRight: 40, alignItems: 'center' }}>
                                        {
                                            data.length >= 1 ? data.map((vaccine) => {
                                                return (
                                                    <div className='d-flex border border-secondary rounded' style={{ alignItems: 'center', marginBottom: 5 }}>
                                                        <div className='d-inline-flex' style={{ alignItems: 'center' }}>
                                                            <li key={Math.random() * 999} onClick={() => {
                                                            }} className='' style={{ maxWidth: 200, minWidth: 200, alignItems: 'center', display: 'flex' }}>
                                                                <div className='d-inline-flex' style={{ alignItems: 'center' }}>
                                                                    <Checkbox checked={vaccine.checked} onChange={((e, checked) => {
                                                                        handleSecondaryCheckBox(vaccine);
                                                                    })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>${cutStringMoreThan32(vaccine.name)}</span>` }}></div>
                                                                </div>
                                                            </li>
                                                            {vaccine.licenser.length > 0 && vaccine.licenser.map((licenser) => {
                                                                return (
                                                                    <div className='d-inline-flex' style={{ alignItems: 'center', marginRight: 5 }}>
                                                                        <Checkbox checked={licenser.checked} onChange={((e, checked) => {
                                                                            handleSecondaryCheckboxLicenserByVaccine(vaccine.name, licenser.title, checked, vaccine.checked, secondaryIdx);
                                                                        })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>${licenser.title}</span>` }}></div>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                )
                                            }) : null
                                        }
                                        {/* <div className='vertical-divider' style={{ width: 20, height: '100%', borderWidth: 1 }} /> */}
                                    </div>
                                )
                            }) : null}
                        </div>
                        <div className='view' style={{ overflow: 'scroll' }}>
                            <div style={{ overflowY: 'scroll' }} className="max-h-table-comparison d-inline-flex w-100 wrapper">
                                {secondaryVaccineFields.length >= 1 ? (
                                    <table className='' id="comparison-table" border={1}
                                        data-toolbar=".toolbar"
                                        data-show-columns="true"
                                        data-search="true"
                                        data-show-toggle="true"
                                        data-pagination="true"
                                        data-reorderable-columns="true">
                                        <tbody>
                                            {selectedFilterTableFields.map((field, idx) => {
                                                const key = field.alt;
                                                return key === "name" ? null : (
                                                    <>
                                                        <tr key={Math.random() * 999}>
                                                            <td key={convertCamelCaseToReadable(key)} width={700} style={{ color: 'white', fontWeight: 'bold', height: '100%', alignContent: 'baseline', pointerEvents: idx === 0 ? 'none' : 'all' }} className={`sticky-col ${idx === 0 ? "fix-first justify-content-between" : ""} first-col ${key === "composition" ? `text-white bg-black` : ``}`}>{key === "composition" ? `Composition/Platform` : key === "coAdministration" ? `Co-Administration` : convertCamelCaseToReadable(key)}</td>
                                                            {/** TEST */}
                                                            {
                                                                secondaryVaccineFields.length > 0 && secondaryVaccineFields.map((data) => {
                                                                    return data.filter((x) => x.checked).map((vaccine) => {
                                                                        return vaccine?.licenser && vaccine?.licenser.filter((x) => x.checked).length > 0 ? vaccine.licenser.filter((x) => x.checked).map((licenser, licenserIdx) => {
                                                                            const conditionedFirstRow = idx === 0 ? {
                                                                                background: "black",
                                                                                color: "white"
                                                                            } : {};
                                                                            return (
                                                                                <td width={700} data-sortable="true" key={Math.random() * 111} style={{ fontWeight: key === "type" ? "bold" : "normal", ...conditionedFirstRow }} className={`main-col ${idx === 0 ? "fix-first justify-content-between" : ""} ${key === "composition" ? `text-white bg-black` : ``} comparison-table-handler`}>
                                                                                    <div className='d-inline-flex justify-content-between w-100'>
                                                                                        <span> {key === "type" ? `${licenser.title} - ${vaccine?.isDoubleName ? getProductProfileValueByVaccineNameAndType(licenser.title, "name", vaccine.name) : vaccine.name}` : key === "approvalDate" || key === "lastUpdated" || key === "source" ? getLicensingDateByVaccineNameAndType(licenser.title, key, vaccine.name) : getProductProfileValueByVaccineNameAndType(licenser.title, key, vaccine.name)}</span>
                                                                                        <span>  {idx === 0 && <DraggableIcon />}</span>
                                                                                    </div>
                                                                                </td>
                                                                            )
                                                                        }) : null
                                                                    })
                                                                })
                                                            }
                                                        </tr>
                                                    </>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    ) : (
        <>
            {
                selectedPathogen === "Pathogen A" || selectedPathogen === "Pathogen B" ? null : (
                    <div className="accordion" id="accordianVaccineInfo">
                        <div className="accordion-item mb-1">
                            <h2 className="accordion-header" id="accordianVaccine">
                                <button className="accordion-button bg-accordian text-muted py-1 px-2" type="button" data-bs-toggle="collapse" data-bs-target="#accordianVac" aria-expanded="true" aria-controls="collapseTwo">
                                    Licensed Vaccines
                                </button>
                            </h2>
                            <div id="accordianVac" className="accordion-collapse collapse show mb-1" aria-labelledby="accordianVaccine" data-bs-parent="#accordianVaccineInfo">
                                <div className="accordion-body pb-1 px-0 pt-0">
                                    <div>
                                        <div className='mt-4' style={{ paddingLeft: 10 }}>
                                            <div className='d-inline-flex' style={{ alignItems: 'center' }}>
                                                <Checkbox checked={viewAllVaccines} onChange={((e, checked) => {
                                                    setViewAllVaccines(true);
                                                    setViewSinglePathogenVaccine(false);
                                                    setViewCombinationVaccine(false);
                                                    // handleCheckboxLicenserByVaccine(vaccine.name, licenser.title, checked, vaccine.checked, false);
                                                })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>${"View Single & Combination Vaccine"}</span>` }}></div>
                                            </div>
                                            <div className='d-inline-flex justify-content-between w-100' style={{ marginBottom: 50 }}>
                                                <div className='d-inline-flex w-100'>
                                                    <div className='d-inline-flex' style={{ alignItems: 'center' }}>
                                                        <Checkbox checked={viewSinglePathogenVaccine} onChange={((e, checked) => {
                                                            setViewSinglePathogenVaccine(true);
                                                            setViewAllVaccines(false);
                                                            setViewCombinationVaccine(false);
                                                            // handleCheckboxLicenserByVaccine(vaccine.name, licenser.title, checked, vaccine.checked, false);
                                                        })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>${"View Single Pathogen Vaccines"}</span>` }}></div>
                                                    </div>
                                                    <div className='d-inline-flex' style={{ alignItems: 'center', marginLeft: 20 }}>
                                                        <Checkbox checked={viewCombinationVaccine} onChange={((e, checked) => {
                                                            setViewCombinationVaccine(true)
                                                            setViewAllVaccines(false);
                                                            setViewSinglePathogenVaccine(false);
                                                            // handleCheckboxLicenserByVaccine(vaccine.name, licenser.title, checked, vaccine.checked, false);
                                                        })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>${"View Combination Vaccines"}</span>` }}></div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='d-inline-flex justify-content-between w-100'>
                                                {
                                                    viewAllVaccines ? (
                                                        <table>
                                                            <tr>
                                                                <td colSpan={4} style={{ fontWeight: 'bold' }}>Single Pathogen & Combination Vaccines</td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ fontWeight: 'bold' }}>Vaccine Name</td>
                                                                <td style={{ fontWeight: 'bold' }}>Single or Combination Vaccine</td>
                                                                <td style={{ fontWeight: 'bold' }} colSpan={3}>Licensing Authority</td>
                                                            </tr>
                                                            {(vaccineSelectedOnly ? vaccineFieldsState.filter((x) => x.checked) : vaccineFieldsState).length > 0 ? sortArrayAscending((vaccineSelectedOnly ? vaccineFieldsState.filter((x) => x.checked) : vaccineFieldsState), "name").map((vaccine) => {
                                                                return (
                                                                    <tr>
                                                                        <td>
                                                                            <li key={Math.random() * 999} onClick={() => {
                                                                                // setSelectedVaccine(vaccine)
                                                                                // setOpen(true)
                                                                            }} className='' style={{ marginTop: 15, maxWidth: 400, minWidth: 400, alignItems: 'center', display: 'flex', marginBottom: 5 }}>
                                                                                <div className='d-inline-flex' style={{ alignItems: 'center' }}>
                                                                                    <Checkbox checked={vaccine.checked} onChange={((e, checked) => {
                                                                                        handleCheckBox(vaccine, false);
                                                                                    })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>${vaccine.name}</span>` }}></div>
                                                                                </div>
                                                                            </li>
                                                                        </td>
                                                                        <td style={{ fontWeight: 'bold' }}>{vaccine.vaccineType === "single" ? "Single Pathogen Vaccine" : "Combination Vaccine"}</td>
                                                                        <td colSpan={3}>
                                                                            {vaccine.licenser.length > 0 && vaccine.licenser.map((licenser) => {
                                                                                return (

                                                                                    <div className='d-inline-flex' style={{ alignItems: 'center' }}>
                                                                                        <Checkbox checked={licenser.checked} onChange={((e, checked) => {
                                                                                            handleCheckboxLicenserByVaccine(vaccine.name, licenser.title, checked, vaccine.checked, false);
                                                                                        })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>${licenser.title}</span>` }}></div>
                                                                                    </div>

                                                                                )
                                                                            })}
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            }) : (
                                                                <tr>
                                                                    <td colSpan={4}>
                                                                        <div className='flex flex-row mb-2'>
                                                                            &#8226;{" "}
                                                                            <span className='mt-2'>No Data Found</span>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </table>
                                                    ) : null
                                                }
                                                {
                                                    viewSinglePathogenVaccine ? (
                                                        <table>
                                                            <tr>
                                                                <td colSpan={4} style={{ fontWeight: 'bold' }}>Single Pathogen Vaccines</td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ fontWeight: 'bold' }}>Vaccine Name</td>
                                                                <td style={{ fontWeight: 'bold' }} colSpan={4}>Licensing Authority</td>
                                                            </tr>
                                                            {/* <span className='mt-2 fw-bold text-primary'>&#8226;{" "}Single Pathogen Vaccine</span> */}
                                                            {(vaccineSelectedOnly ? vaccineFieldsState.filter((x) => x.checked) : vaccineFieldsState).length > 0 ? sortArrayAscending((vaccineSelectedOnly ? vaccineFieldsState.filter((x) => x.checked) : vaccineFieldsState), "name").map((vaccine) => {
                                                                return (
                                                                    <tr>
                                                                        <td>
                                                                            <li key={Math.random() * 999} onClick={() => {
                                                                                // setSelectedVaccine(vaccine)
                                                                                // setOpen(true)
                                                                            }} className='' style={{ marginTop: 15, maxWidth: 400, minWidth: 400, alignItems: 'center', display: 'flex', marginBottom: 5 }}>
                                                                                <div className='d-inline-flex' style={{ alignItems: 'center' }}>
                                                                                    <Checkbox checked={vaccine.checked} onChange={((e, checked) => {
                                                                                        handleCheckBox(vaccine, false);
                                                                                    })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>${vaccine.name}</span>` }}></div>
                                                                                </div>
                                                                            </li>
                                                                        </td>
                                                                        <td colSpan={4}>
                                                                            {vaccine.licenser.length > 0 && vaccine.licenser.map((licenser) => {
                                                                                return (

                                                                                    <div className='d-inline-flex' style={{ alignItems: 'center' }}>
                                                                                        <Checkbox checked={licenser.checked} onChange={((e, checked) => {
                                                                                            handleCheckboxLicenserByVaccine(vaccine.name, licenser.title, checked, vaccine.checked, false);
                                                                                        })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>${licenser.title}</span>` }}></div>
                                                                                    </div>

                                                                                )
                                                                            })}
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            }) : (
                                                                <tr>
                                                                    <td colSpan={4}>
                                                                        <div className='flex flex-row mb-2'>
                                                                            &#8226;{" "}
                                                                            <span className='mt-2'>No Data Found</span>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </table>
                                                    ) : null
                                                }

                                                {
                                                    viewCombinationVaccine ? (
                                                        <table>
                                                            <tr>
                                                                <td colSpan={4} style={{ fontWeight: 'bold' }}>Combination Vaccines</td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ fontWeight: 'bold' }}>Vaccine Name</td>
                                                                <td style={{ fontWeight: 'bold' }} colSpan={4}>Licensing Authority</td>
                                                            </tr>
                                                            {(vaccineSelectedOnly ? vaccineFieldsState.filter((x) => x.checked) : vaccineFieldsState).length > 0 ? sortArrayAscending((vaccineSelectedOnly ? vaccineFieldsState.filter((x) => x.checked) : vaccineFieldsState), "name").map((vaccine) => {
                                                                return (
                                                                    <tr>
                                                                        <td>
                                                                            <li key={Math.random() * 999} onClick={() => {
                                                                                // setSelectedVaccine(vaccine)
                                                                                // setOpen(true)
                                                                            }} className='' style={{ marginTop: 15, maxWidth: 400, minWidth: 400, alignItems: 'center', display: 'flex', marginBottom: 5 }}>
                                                                                <div className='d-inline-flex' style={{ alignItems: 'center' }}>
                                                                                    <Checkbox checked={vaccine.checked} onChange={((e, checked) => {
                                                                                        handleCheckBox(vaccine, false);
                                                                                    })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>${vaccine.name}</span>` }}></div>
                                                                                </div>
                                                                            </li>
                                                                        </td>
                                                                        <td colSpan={4}>
                                                                            {vaccine.licenser.length > 0 && vaccine.licenser.map((licenser) => {
                                                                                return (

                                                                                    <div className='d-inline-flex' style={{ alignItems: 'center', marginRight: 5 }}>
                                                                                        <Checkbox checked={licenser.checked} onChange={((e, checked) => {
                                                                                            handleCheckboxLicenserByVaccine(vaccine.name, licenser.title, checked, vaccine.checked, false);
                                                                                        })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>${licenser.title}</span>` }}></div>
                                                                                    </div>
                                                                                )
                                                                            })}
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            }) : (
                                                                <tr>
                                                                    <td colSpan={4}>
                                                                        <div className='flex flex-row mb-2'>
                                                                            &#8226;{" "}
                                                                            <span className='mt-2'>No Data Found</span>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </table>
                                                    ) : null
                                                }
                                                <div style={{ marginRight: 10 }}>
                                                    <Button style={{ marginLeft: 10 }} disabled={!vaccineFieldsState.some((z) => z.checked)} variant="contained" onClick={() => {
                                                        const check = vaccineFieldsState.filter((x) => x.checked).map((x) => {
                                                            return {
                                                                ...x,
                                                                hasLicenserChecked: x.licenser.some((y) => y.checked)
                                                            }
                                                        });
                                                        if (check.length > 0) {
                                                            let ctx = 0;
                                                            check.map((x) => {
                                                                if (!x.hasLicenserChecked) {
                                                                    ctx += 1;
                                                                    const msg = `Vaccine: ${x.name} should have atleast one Licenser selected`
                                                                    return toast.error(msg);
                                                                }
                                                            })
                                                            if (ctx === 0) {
                                                                setCompareActive(!compareActive)
                                                            }
                                                        }

                                                    }}>Compare Vaccines {vaccineFieldsState.filter((x) => x.checked).length >= 1 ? `(${vaccineFieldsState.filter((x) => x.checked).length})` : null}</Button>
                                                    <div style={{ marginRight: 0 }}>
                                                        <div className='d-inline-flex' style={{ alignItems: 'center' }}>
                                                            <Checkbox checked={vaccineSelectedOnly} onChange={((e, checked) => {
                                                                setVaccineSelectedOnly(checked);
                                                            })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>Show Selected Vaccines only</span>` }}></div>
                                                        </div>
                                                    </div>
                                                    {/* <span onClick={() => } className='fw-bold cursor-pointer compare-color-text' style={{}}>&#8226;{" "}Compare Vaccines</span> */}
                                                    {
                                                        compareActive && (
                                                            <>
                                                                <div style={{ marginTop: 20 }}>
                                                                    <div style={{ marginTop: 10 }}>
                                                                        <Stack spacing={3} sx={{ width: 500 }}>
                                                                            <Autocomplete
                                                                                multiple
                                                                                id="tags-standard"
                                                                                options={tableFields}
                                                                                value={selectedFilterTableFields}
                                                                                getOptionLabel={(option) => option.title}
                                                                                defaultValue={[tableFields[0], tableFields[1], tableFields[14], tableFields[15], tableFields[16]]}
                                                                                autoComplete
                                                                                freeSolo
                                                                                onChange={(event, newValue) => {
                                                                                    if (event.target?.textContent &&
                                                                                        selectedFilterTableFields.some((item) => item.title === (event.target)?.textContent)
                                                                                    ) {
                                                                                        setTableFieldsErrorMessage(`${(event.target)?.textContent} cannot be duplicated`)
                                                                                        setDuplicateTableFieldsError(true);
                                                                                        return;
                                                                                    }
                                                                                    const checkForType = newValue.some((item) => item.title === "Type");
                                                                                    const checkForComposition = newValue.some((item) => item.title === "Composition/Platform");
                                                                                    const checkForApprovalDate = newValue.some((item) => item.title === "Approval Date");
                                                                                    const checkForLastUpdated = newValue.some((item) => item.title === "Last Updated");
                                                                                    const checkForSource = newValue.some((item) => item.title === "Source");
                                                                                    if (!checkForType) {
                                                                                        setTableFieldsErrorMessage("Type cannot be removed")
                                                                                        setDuplicateTableFieldsError(true);
                                                                                        return;
                                                                                    }
                                                                                    if (!checkForComposition) {
                                                                                        setTableFieldsErrorMessage("Composition/Platform cannot be removed")
                                                                                        setDuplicateTableFieldsError(true);
                                                                                        return;
                                                                                    }
                                                                                    if (!checkForApprovalDate) {
                                                                                        setTableFieldsErrorMessage("Approval Date cannot be removed")
                                                                                        setDuplicateTableFieldsError(true);
                                                                                        return;
                                                                                    }
                                                                                    if (!checkForLastUpdated) {
                                                                                        setTableFieldsErrorMessage("Last Updated cannot be removed")
                                                                                        setDuplicateTableFieldsError(true);
                                                                                        return;
                                                                                    }
                                                                                    if (!checkForSource) {
                                                                                        setTableFieldsErrorMessage("Source cannot be removed")
                                                                                        setDuplicateTableFieldsError(true);
                                                                                        return;
                                                                                    }
                                                                                    setDuplicateTableFieldsError(false);
                                                                                    setSelectedFilterTableFields(newValue);
                                                                                }}
                                                                                onKeyUp={(event) => {
                                                                                    if (event.target?.textContent &&
                                                                                        selectedFilterTableFields.some((item) => item.title === (event.target)?.textContent)
                                                                                    ) {
                                                                                        setTableFieldsErrorMessage(`${(event.target)?.textContent} cannot be duplicated`)
                                                                                        setDuplicateTableFieldsError(true);
                                                                                        return;
                                                                                    } else {
                                                                                        setDuplicateTableFieldsError(false);
                                                                                    }
                                                                                }}
                                                                                renderInput={(params) => (
                                                                                    <TextField
                                                                                        {...params}
                                                                                        variant="standard"
                                                                                        label={<span style={{ color: 'black' }}>Select items need to be shown</span>}
                                                                                        placeholder=""
                                                                                        error={duplicateTableFieldsError}
                                                                                        helperText={duplicateTableFieldsError ? tableFieldsErrorMessage : null}
                                                                                    />
                                                                                )}
                                                                            />
                                                                        </Stack>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div>
                                                                        <div className='d-inline-flex' style={{ alignItems: 'center' }}>
                                                                            <Checkbox checked={allFactorShows} onChange={((e, checked) => {
                                                                                setAllFactorShows(checked);
                                                                            })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>Set All Items to be shown</span>` }}></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <p onClick={() => {
                                                                    setOpen(true);
                                                                    handleProceedComparison();
                                                                }} className='fw-bold cursor-pointer compare-color-text' style={{ marginTop: 20 }}>&#8226;{" "}Proceed Comparison</p>
                                                            </>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            <div className="accordion" id="accordianPathogenInfo">
                <div className="accordion-item mb-1">
                    <h2 className="accordion-header" id="accordianPathogen">
                        <button className="accordion-button collapsed bg-accordian text-muted py-1 px-2" type="button" data-bs-toggle="collapse" data-bs-target="#accordianPatho" aria-expanded="false" aria-controls="collapseTwo">
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
            <div className='cursor-pointer' style={{ width: 150, height: 30, borderRadius: 8, flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: -10 }}>
                <p className='mb-0 mt-4 bg-primary' style={{ padding: 4, borderRadius: 8, alignSelf: 'center', textAlign: 'center', alignItems: 'center', justifyContent: 'center', marginTop: 4 }}><a className='read-more' style={{ textAlign: 'center', color: 'white', alignSelf: 'center', fontWeight: 'bold' }} target="_blank" rel="noopener noreferrer" href={selectedPathogen.link}>Find out more</a></p>
            </div>
            <Modal
                keepMounted
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
                        <div style={{ position: 'absolute', right: -10, top: -20 }}>
                            <button type='button' onClick={() => printTable()} className='btn btn-primary'>Print Document</button>
                        </div>
                        <div className='d-inline-flex' style={{ marginTop: 30, marginBottom: 20, overflow: 'scroll', maxWidth: '165vh' }}>
                            <div>
                                <div style={{ marginTop: 10 }}>
                                    <Stack spacing={3} sx={{ width: 500 }}>
                                        <Autocomplete
                                            multiple
                                            id="tags-standard"
                                            options={tableFields}
                                            value={selectedFilterTableFields}
                                            getOptionLabel={(option) => option.title}
                                            defaultValue={[tableFields[0], tableFields[1]]}
                                            autoComplete
                                            freeSolo
                                            onChange={(event, newValue) => {
                                                if (event.target?.textContent &&
                                                    selectedFilterTableFields.some((item) => item.title === (event.target)?.textContent)
                                                ) {
                                                    setTableFieldsErrorMessage(`${(event.target)?.textContent} cannot be duplicated`)
                                                    setDuplicateTableFieldsError(true);
                                                    return;
                                                }
                                                const checkForType = newValue.some((item) => item.title === "Type");
                                                const checkForComposition = newValue.some((item) => item.title === "Composition/Platform");
                                                const checkForApprovalDate = newValue.some((item) => item.title === "Approval Date");
                                                const checkForLastUpdated = newValue.some((item) => item.title === "Last Updated");
                                                const checkForSource = newValue.some((item) => item.title === "Source");
                                                if (!checkForType) {
                                                    setTableFieldsErrorMessage("Type cannot be removed")
                                                    setDuplicateTableFieldsError(true);
                                                    return;
                                                }
                                                if (!checkForComposition) {
                                                    setTableFieldsErrorMessage("Composition/Platform cannot be removed")
                                                    setDuplicateTableFieldsError(true);
                                                    return;
                                                }
                                                if (!checkForApprovalDate) {
                                                    setTableFieldsErrorMessage("Approval Date cannot be removed")
                                                    setDuplicateTableFieldsError(true);
                                                    return;
                                                }
                                                if (!checkForLastUpdated) {
                                                    setTableFieldsErrorMessage("Last Updated cannot be removed")
                                                    setDuplicateTableFieldsError(true);
                                                    return;
                                                }
                                                if (!checkForSource) {
                                                    setTableFieldsErrorMessage("Source cannot be removed")
                                                    setDuplicateTableFieldsError(true);
                                                    return;
                                                }
                                                setDuplicateTableFieldsError(false);
                                                setSelectedFilterTableFields(newValue);
                                            }}
                                            onKeyUp={(event) => {
                                                if (event.target?.textContent &&
                                                    selectedFilterTableFields.some((item) => item.title === (event.target)?.textContent)
                                                ) {
                                                    setTableFieldsErrorMessage(`${(event.target)?.textContent} cannot be duplicated`)
                                                    setDuplicateTableFieldsError(true);
                                                    return;
                                                } else {
                                                    setDuplicateTableFieldsError(false);
                                                }
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="standard"
                                                    label={<span style={{ color: 'black' }}>Filter items</span>}
                                                    placeholder=""
                                                    error={duplicateTableFieldsError}
                                                    helperText={duplicateTableFieldsError ? tableFieldsErrorMessage : null}
                                                />
                                            )}
                                        />
                                    </Stack>
                                </div>
                            </div>
                            {secondaryVaccineFields.length > 0 ? secondaryVaccineFields.map((data, secondaryIdx) => {
                                return (
                                    <div style={{ marginLeft: 10, marginRight: 40, alignItems: 'center' }}>
                                        {
                                            data.length >= 1 ? data.map((vaccine) => {
                                                return (
                                                    <div className='d-flex border border-secondary rounded' style={{ alignItems: 'center', marginBottom: 5 }}>
                                                        <div className='d-inline-flex' style={{ alignItems: 'center' }}>
                                                            <li key={Math.random() * 999} onClick={() => {
                                                            }} className='' style={{ maxWidth: 200, minWidth: 200, alignItems: 'center', display: 'flex' }}>
                                                                <div className='d-inline-flex' style={{ alignItems: 'center' }}>
                                                                    <Checkbox checked={vaccine.checked} onChange={((e, checked) => {
                                                                        handleSecondaryCheckBox(vaccine);
                                                                    })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>${cutStringMoreThan32(vaccine.name)}</span>` }}></div>
                                                                </div>
                                                            </li>
                                                            {vaccine.licenser.length > 0 && vaccine.licenser.map((licenser) => {
                                                                return (
                                                                    <div className='d-inline-flex' style={{ alignItems: 'center', marginRight: 5 }}>
                                                                        <Checkbox checked={licenser.checked} onChange={((e, checked) => {
                                                                            handleSecondaryCheckboxLicenserByVaccine(vaccine.name, licenser.title, checked, vaccine.checked, secondaryIdx);
                                                                        })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>${licenser.title}</span>` }}></div>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                )
                                            }) : null
                                        }
                                        {/* <div className='vertical-divider' style={{ width: 20, height: '100%', borderWidth: 1 }} /> */}
                                    </div>
                                )
                            }) : null}
                        </div>
                        <div className='view' style={{ overflow: 'scroll' }}>
                            <div style={{ overflowY: 'scroll' }} className="max-h-table-comparison d-inline-flex w-100 wrapper">
                                {secondaryVaccineFields.length >= 1 ? (
                                    <table className='' id="comparison-table" border={1}
                                        data-toolbar=".toolbar"
                                        data-show-columns="true"
                                        data-search="true"
                                        data-show-toggle="true"
                                        data-pagination="true"
                                        data-reorderable-columns="true">
                                        <tbody>
                                            {selectedFilterTableFields.map((field, idx) => {
                                                const key = field.alt;
                                                return key === "name" ? null : (
                                                    <>
                                                        <tr key={Math.random() * 999}>
                                                            <td key={convertCamelCaseToReadable(key)} width={700} style={{ color: 'white', fontWeight: 'bold', height: '100%', alignContent: 'baseline', pointerEvents: idx === 0 ? 'none' : 'all' }} className={`sticky-col ${idx === 0 ? "fix-first justify-content-between" : ""} first-col ${key === "composition" ? `text-white bg-black` : ``}`}>{key === "composition" ? `Composition/Platform` : key === "coAdministration" ? `Co-Administration` : convertCamelCaseToReadable(key)}</td>
                                                            {/** TEST */}
                                                            {
                                                                secondaryVaccineFields.length > 0 && secondaryVaccineFields.map((data) => {
                                                                    return data.filter((x) => x.checked).map((vaccine) => {
                                                                        return vaccine?.licenser && vaccine?.licenser.filter((x) => x.checked).length > 0 ? vaccine.licenser.filter((x) => x.checked).map((licenser, licenserIdx) => {
                                                                            const conditionedFirstRow = idx === 0 ? {
                                                                                background: "black",
                                                                                color: "white"
                                                                            } : {};
                                                                            return (
                                                                                <td width={700} data-sortable="true" key={Math.random() * 111} style={{ fontWeight: key === "type" ? "bold" : "normal", ...conditionedFirstRow }} className={`main-col ${idx === 0 ? "fix-first justify-content-between" : ""} ${key === "composition" ? `text-white bg-black` : ``} comparison-table-handler`}>
                                                                                    <div className='d-inline-flex justify-content-between w-100'>
                                                                                        <span> {key === "type" ? `${licenser.title} - ${vaccine?.isDoubleName ? getProductProfileValueByVaccineNameAndType(licenser.title, "name", vaccine.name) : vaccine.name}` : key === "approvalDate" || key === "lastUpdated" || key === "source" ? getLicensingDateByVaccineNameAndType(licenser.title, key, vaccine.name) : getProductProfileValueByVaccineNameAndType(licenser.title, key, vaccine.name)}</span>
                                                                                        <span>  {idx === 0 && <DraggableIcon />}</span>
                                                                                    </div>
                                                                                </td>
                                                                            )
                                                                        }) : null
                                                                    })
                                                                })
                                                            }
                                                        </tr>
                                                    </>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    )
}
export default Comparison;