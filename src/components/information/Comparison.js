import React, { useEffect, useState } from 'react';
import { getAllVaccineByPathogenId, getAvailableLicensingByVaccineName, getCombinationVaccineByPathogenId, getLicensingDateByVaccineNameAndType, getPathogenVaccineByDieasesName, getProductProfileValueByVaccineNameAndType, getVaccinesByPathogenId } from '../../utils/pathogens';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { checkIfPathogenCandidate, sortArrayAscending } from '../../utils/array';
import tableDragger from 'table-dragger'
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { cutStringMoreThan32 } from '../../utils/string';
import * as _ from 'lodash';
import DraggableIcon from '../../assets/icons/draggable';
import ExcelJS from 'exceljs';
import { ListItemText } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';


const workbook = new ExcelJS.Workbook();
workbook.creator = 'Me';
workbook.lastModifiedBy = 'Her';
workbook.created = new Date(1985, 8, 30);
workbook.modified = new Date();
workbook.lastPrinted = new Date(2016, 9, 27);
// Set workbook dates to 1904 date system
workbook.properties.date1904 = true;


// Create worksheets with headers and footers
const sheet = workbook.addWorksheet('Comparison Result');



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
        { title: 'Type', alt: 'type', no: 1 },
        { title: 'Composition/Platform', alt: 'composition', no: 2 },
        { title: 'Strain Coverage', alt: 'strainCoverage', no: 3 },
        { title: 'Indication', alt: 'indication', no: 4 },
        { title: 'Dosing', alt: 'dosing', no: 5 },
        { title: 'Contraindication', alt: 'contraindication', no: 6 },
        { title: 'Immunogenicity', alt: 'immunogenicity', no: 7 },
        { title: 'Efficacy', alt: 'Efficacy', no: 8 },
        { title: 'Duration of Protection', alt: 'durationOfProtection', no: 9 },
        { title: 'Co-Administration', alt: 'coAdministration', no: 10 },
        { title: 'Reactogenicity', alt: 'reactogenicity', no: 11 },
        { title: 'Safety', alt: 'safety', no: 12 },
        { title: 'Vaccination Goal', alt: 'vaccinationGoal', no: 13 },
        { title: 'Others', alt: 'others', no: 14 },
        { title: 'Approval Date', alt: 'approvalDate', no: 15 },
        { title: 'Last Updated', alt: 'lastUpdated', no: 16 },
        { title: 'Licensing Authorities', alt: 'source', no: 17 },
    ];

    const vaccineLabelDefinition = [
        { title: 'Type', definition: 'The classification of the vaccine based on how it stimulates immunity.' },
        { title: 'Composition/Platform', definition: 'The ingredients or biological components and the technology platform used to create the vaccine.' },
        { title: 'Strain Coverage', definition: 'The specific strains or variants of a virus that the vaccine protects against.' },
        { title: 'Indication', definition: 'The official, approved use of the vaccine (what it prevents, and in whom).' },
        { title: 'Dosing', definition: 'The number and timing of doses required for optimal immunity.' },
        { title: 'Contraindication', definition: 'Conditions or factors that serve as reasons to withhold the vaccine.' },
        { title: 'Immunogenicity', definition: 'The ability of the vaccine to induce an immune response (e.g., antibody titers, T-cell response).' },
        { title: 'Efficacy', definition: 'The percentage reduction in disease among vaccinated versus unvaccinated individuals under trial conditions.' },
        { title: 'Duration of Protection', definition: 'How long the vaccine continues to offer protective immunity.' },
        { title: 'Co-Administration', definition: 'The ability to give the vaccine with other vaccines at the same time.' },
        { title: 'Reactogenicity', definition: 'The physical manifestation of the body’s inflammatory response to the vaccine.' },
        { title: 'Safety', definition: 'The overall assessment of risk, including serious adverse events.' },
        { title: 'Vaccination Goal', definition: 'The broader public health purpose of the vaccine.' },
        { title: 'Others', definition: 'Miscellaneous or additional relevant info not captured by other categories.' },
        { title: 'Approval Date', definition: 'The date the vaccine received formal approval from a licensing authority.' },
        { title: 'Last Updated', definition: 'The most recent date of label, indication, or technical update.' },
        { title: 'Licensing Authorities', definition: 'The national or international agencies responsible for evaluating and approving vaccines.' }
    ]

    const getDefinitionOfVaccineLabel = (title) => {
        const f = vaccineLabelDefinition.filter((x) => x.title === title);
        if (f.length > 0) {
            return f[0].definition
        } else {
            return "-"
        };
    }

    const exceptionalFields = [
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
        { title: 'Approval Date', alt: 'approvalDate', no: 15 },
        { title: 'Last Updated', alt: 'lastUpdated', no: 16 },
        { title: 'Licensing Authorities', alt: 'source', no: 17 },
    ];

    const checkIfExceptionFields = (name) => {
        const f = exceptionalFields.some((xx) => xx.title.includes(name));
        if (f) {
            return true;
        } else {
            return false;
        };
    };

    const [licenserFieldsVaccine, setLicenserFieldsVaccine] = useState([]);
    const [selectedFilterVaccine, setSelectedFilterVaccine] = useState([]);
    // const [selectedFilterTableFields, setSelectedFilterTableFields] = useState([tableFields[0], tableFields[1], tableFields[14], tableFields[15], tableFields[16]]); 
    const [selectedFilterTableFields, setSelectedFilterTableFields] = useState([tableFields]);
    const [vaccineFieldsState, setVaccineFieldsState] = useState([]);
    const [secondaryVaccineFields, setSecondaryVaccineFields] = useState([]);
    const [selectedModalFilter, setSelectedModalFilter] = useState(tableFields.map((x) => x.title));
    const [newSelectedModalFilter, setNewSelectedModalFilter] = useState([]);


    useEffect(() => {
        const getOrderNoByTitle = (title) => {

            const f = tableFields.filter((x) => x.title === title);
            if (f.length > 0) {
                return f[0].no
            } else {
                return 0
            }
        }
        const sortedSelectedModalFilter = () => {
            let a = [];
            selectedModalFilter.map((x) => {
                const q = getOrderNoByTitle(x);
                a.push({
                    title: x,
                    no: q
                })
            });
            return a;
        };
        const p = sortedSelectedModalFilter();
        setNewSelectedModalFilter(p);
    }, [selectedModalFilter])

    const newA = selectedFilterTableFields && selectedModalFilter.length > 0 ? selectedModalFilter?.map((x) => {
        let altName = tableFields.filter((z) => z.title === x)[0].alt
        const result1 = secondaryVaccineFields[0]?.map((y) => `${y?.licenser?.filter((yl) => yl.checked)[0]?.title} - ${y.name}`);
        const result3 = secondaryVaccineFields[0]?.map((y) => `${y?.licenser?.filter((yl) => yl.checked)?.map((licenser) => y?.licensingDates?.filter((ld) => ld?.name === licenser?.title)?.map((ld) => ld?.approvalDate))}`);
        const result4 = secondaryVaccineFields[0]?.map((y) => `${y?.licenser?.filter((yl) => yl.checked)?.map((licenser) => y?.licensingDates?.filter((ld) => ld?.name === licenser?.title)?.map((ld) => ld?.lastUpdated))}`);
        const result5 = secondaryVaccineFields[0]?.map((y) => `${y?.licenser?.filter((yl) => yl.checked)?.map((licenser) => y?.licensingDates?.filter((ld) => ld?.name === licenser?.title)?.map((ld) => ld?.source))}`);


        const result2 = secondaryVaccineFields[0]?.map((y) => {
            return `${y?.licenser?.filter((yl) => yl.checked)?.map((titleLicenser) => y?.productProfiles?.filter((yp) => yp?.type === titleLicenser?.title)?.map((productProfile) => productProfile[altName]))}`
        })

        // if (result3 && result3.length > 0) {
        //     return [x, ...result3]
        // };
        // if (result4 && result4.length > 0) {
        //     return [x, ...result4]
        // };
        // if (result5 && result5.length > 0) {
        //     return [x, ...result5]
        // };

        if (result2 && result1) {
            return [x, (checkIfExceptionFields(x) ? result2[0] : result1[0])];
        } else {
            return [x, ""];
        }
    }) : [];


    const arrayToGenerate = newA || [];

    const handleProceedComparison = () => {
        setCompareSubmitted(true);
    };

    const [duplicateTableFieldsError, setDuplicateTableFieldsError] = useState(false);

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


    const autoWidth = (worksheet, minimalWidth = 10) => {
        worksheet.columns.forEach((column) => {
            let maxColumnLength = 0;
            column.eachCell({ includeEmpty: true }, (cell) => {
                maxColumnLength = Math.max(
                    maxColumnLength,
                    minimalWidth,
                    cell.value ? cell.value.toString().length : 0
                );
            });
            column.width = maxColumnLength + 2;
        });
    };

    const handleDownloadComparison = () => {

        sheet.columns = [arrayToGenerate[0][0], arrayToGenerate[0][1]].map((x) => {
            return {
                header: x, key: x, width: 10
            }
        });

        const p = arrayToGenerate.slice(1).map((x) => {
            if (typeof x[1] === "string") {
                return x
            } else {
                return [x[0], ...x.slice(1)[0]]
            }
        });

        p.map((x) => {
            return sheet.addRow(x);
        });

        autoWidth(sheet);

        workbook.xlsx.writeBuffer().then(function (data) {
            const blob = new Blob([data],
                { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = 'vacciprofile-comparison-result.xlsx';
            anchor.click();
            window.URL.revokeObjectURL(url);
        });
    };

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
        };
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



    const handleChangeSelectedModalFilter = (event) => {
        const {
            target: { value },
        } = event;

        const c = selectedModalFilter.some((x) => x.includes(value));

        if (c) {
            const f = selectedModalFilter.filter((x) => x !== value);
            setSelectedModalFilter(f);
        } else {
            setSelectedModalFilter([...selectedModalFilter, value]);
        }
        // setSelectedModalFilter(
        //     // On autofill we get a stringified value.
        //     typeof value === 'string' ? value.split(',') : value,
        // );
        // console.log('xxasdasdasd  >> ', value);
        // if (!value.includes("Type")) {
        //     return
        // } else {
        //     setSelectedModalFilter(
        //         // On autofill we get a stringified value.
        //         typeof value === 'string' ? value.split(',') : value,
        //     );
        // }
    };

    const getAltNameByTitleName = (name) => {
        return tableFields.filter((x) => x.title === name).length > 0 ? tableFields.filter((x) => x.title === name)[0]?.alt : ""
    };

    useEffect(() => {
        if (!open) {
            setLicenserFieldsVaccine([]);
            setSelectedFilterVaccine([]);
            // setSelectedModalFilter([]);

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

    const handleAllCheckBoxLicenserByVaccine = (vaccineName, checked, vaccineChecked, isSecondary) => {
        let f = [];

        f = vaccineFieldsState.map((x) => {
            if (x.name === vaccineName) {
                return {
                    ...x,
                    licenser: x.licenser.map((y) => {
                        return {
                            ...y,
                            checked: true
                        }
                    })
                };
            } else {
                return {
                    ...x
                }
            }
        });

        const checkIfLicenserHasSomeChecked = (vaccineFieldsState).filter((x) => x.name === vaccineName);
        if (checkIfLicenserHasSomeChecked.length > 0) {
            const d = checkIfLicenserHasSomeChecked[0].licenser.some((x) => x.checked);
            if (!d) {
                if (!vaccineChecked) {
                    f = (vaccineFieldsState).map((x) => {
                        if (x.name === vaccineName) {
                            return {
                                ...x,
                                checked: true,
                                licenser: x.licenser.map((y) => {
                                    return {
                                        ...y,
                                        checked: checked
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

        if (vaccineChecked) {
            f = (vaccineFieldsState).map((x) => {
                if (x.name === vaccineName) {
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
            setSelectedModalFilter(tableFields.map((x) => x.title));
        } else {
            setSelectedModalFilter(tableFields.map((x) => x.title));
            // setSelectedFilterTableFields([tableFields[0], tableFields[1], tableFields[14], tableFields[15], tableFields[16]])
        }
    }, [showEma, showFda, showWho, allFactorShows, licensedOnly]);


    const HtmlTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 220,
            fontSize: theme.typography.pxToRem(12),
            border: '1px solid #dadde9',
        },
    }));

    return !checkIfPathogenCandidate(selectedPathogen) ? (
        <>
            {
                selectedPathogen === "Pathogen A" || selectedPathogen === "Pathogen B" ? null : (
                    <div className="accordion" id="accordianVaccineInfo">
                        <div className="accordion-item mb-1">
                            <h2 className="accordion-header" id="accordianVaccine">
                                <button className="accordion-button bg-sidebar-unselected text-muted py-1 px-2" type="button" data-bs-toggle="collapse" data-bs-target="#accordianVac" aria-expanded="true" aria-controls="collapseTwo">
                                    Licensed Vaccines
                                </button>
                            </h2>
                            <div id="accordianVac" className="accordion-collapse collapse show mb-1" aria-labelledby="accordianVaccine" data-bs-parent="#accordianVaccineInfo">
                                <div className="accordion-body pb-1 px-0 pt-0">
                                    <div>
                                        <div className='mt-4' style={{ paddingLeft: 10 }}>
                                            <div className='d-inline-flex' style={{ alignItems: 'center' }}>
                                                <Checkbox style={{ color: '#d17728' }} checked={viewAllVaccines} onChange={((e, checked) => {
                                                    setViewAllVaccines(true);
                                                    setViewSinglePathogenVaccine(false);
                                                    setViewCombinationVaccine(false);
                                                })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>${"View Single & Combination Vaccines"}</span>` }}></div>
                                            </div>
                                            <div className='d-inline-flex justify-content-between w-100' style={{ marginBottom: 50 }}>
                                                <div className='d-inline-flex w-100'>
                                                    <div className='d-inline-flex' style={{ alignItems: 'center' }}>
                                                        <Checkbox style={{ color: '#d17728' }} checked={viewSinglePathogenVaccine} onChange={((e, checked) => {
                                                            setViewSinglePathogenVaccine(true);
                                                            setViewAllVaccines(false);
                                                            setViewCombinationVaccine(false);
                                                        })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>${"View Single Pathogen Vaccines"}</span>` }}></div>
                                                    </div>
                                                    <div className='d-inline-flex' style={{ alignItems: 'center', marginLeft: 20 }}>
                                                        <Checkbox style={{ color: '#d17728' }} checked={viewCombinationVaccine} onChange={((e, checked) => {
                                                            setViewCombinationVaccine(true)
                                                            setViewAllVaccines(false);
                                                            setViewSinglePathogenVaccine(false);
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
                                                                                    <Checkbox style={{ color: '#d17728' }} checked={vaccine.checked} onChange={((e, checked) => {
                                                                                        handleCheckBox(vaccine, false);
                                                                                        handleAllCheckBoxLicenserByVaccine(vaccine.name, checked, vaccine.checked, false);
                                                                                        // for (let licenserIdx = 0; licenserIdx < vaccine?.licenser?.length; licenserIdx++) {
                                                                                        //     handleCheckboxLicenserByVaccine(vaccine.name, vaccine?.licenser[licenserIdx]?.title, checked, vaccine.checked, false);
                                                                                        // }
                                                                                    })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>${vaccine.name}</span>` }}></div>
                                                                                </div>
                                                                            </li>
                                                                        </td>
                                                                        <td style={{ fontWeight: 'bold' }}>{vaccine.vaccineType === "single" ? "Single Pathogen Vaccine" : "Combination Vaccine"}</td>
                                                                        <td colSpan={3}>
                                                                            {vaccine.licenser.length > 0 && vaccine.licenser.map((licenser) => {
                                                                                return (

                                                                                    <div className='d-inline-flex' style={{ alignItems: 'center' }}>
                                                                                        <Checkbox style={{ color: '#d17728' }} checked={licenser.checked} onChange={((e, checked) => {
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
                                                            {(vaccineSelectedOnly ? vaccineFieldsState.filter((x) => x.checked) : vaccineFieldsState).length > 0 ? sortArrayAscending((vaccineSelectedOnly ? vaccineFieldsState.filter((x) => x.checked) : vaccineFieldsState), "name").map((vaccine) => {
                                                                return (
                                                                    <tr>
                                                                        <td>
                                                                            <li key={Math.random() * 999} onClick={() => { }} className='' style={{ marginTop: 15, maxWidth: 400, minWidth: 400, alignItems: 'center', display: 'flex', marginBottom: 5 }}>
                                                                                <div className='d-inline-flex' style={{ alignItems: 'center' }}>
                                                                                    <Checkbox style={{ color: '#d17728' }} checked={vaccine.checked} onChange={((e, checked) => {
                                                                                        handleCheckBox(vaccine, false);
                                                                                        handleAllCheckBoxLicenserByVaccine(vaccine.name, checked, vaccine.checked, false);
                                                                                    })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>${vaccine.name}</span>` }}></div>
                                                                                </div>
                                                                            </li>
                                                                        </td>
                                                                        <td colSpan={4}>
                                                                            {vaccine.licenser.length > 0 && vaccine.licenser.map((licenser) => {
                                                                                return (

                                                                                    <div className='d-inline-flex' style={{ alignItems: 'center' }}>
                                                                                        <Checkbox style={{ color: '#d17728' }} checked={licenser.checked} onChange={((e, checked) => {
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
                                                                                    <Checkbox style={{ color: '#d17728' }} checked={vaccine.checked} onChange={((e, checked) => {
                                                                                        handleCheckBox(vaccine, false);
                                                                                        handleAllCheckBoxLicenserByVaccine(vaccine.name, checked, vaccine.checked, false);
                                                                                    })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>${vaccine.name}</span>` }}></div>
                                                                                </div>
                                                                            </li>
                                                                        </td>
                                                                        <td colSpan={4}>
                                                                            {vaccine.licenser.length > 0 && vaccine.licenser.map((licenser) => {
                                                                                return (

                                                                                    <div className='d-inline-flex' style={{ alignItems: 'center', marginRight: 5 }}>
                                                                                        <Checkbox style={{ color: '#d17728' }} checked={licenser.checked} onChange={((e, checked) => {
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
                                                    <Button style={{ marginLeft: 10, background: (!vaccineFieldsState.some((z) => z.checked) ? "grey" : "#d17728"), fontSize: 'bold', color: 'white' }} disabled={!vaccineFieldsState.some((z) => z.checked)} variant="contained" onClick={() => {
                                                        setCompareActive(true);
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
                                                        setOpen(true);
                                                        handleProceedComparison();
                                                    }}>Compare Vaccines {vaccineFieldsState.filter((x) => x.checked).length >= 1 ? `(${vaccineFieldsState.filter((x) => x.checked).length})` : null}</Button>
                                                    <div style={{ marginRight: 0 }}>
                                                        <div className='d-inline-flex' style={{ alignItems: 'center' }}>
                                                            <Checkbox style={{ color: '#d17728' }} checked={vaccineSelectedOnly} onChange={((e, checked) => {
                                                                setVaccineSelectedOnly(checked);
                                                            })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>Show Selected Vaccines only</span>` }}></div>
                                                        </div>
                                                    </div>
                                                    {/* {
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
                                                                                    const checkForSource = newValue.some((item) => item.alt === "source");
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
                                                                                        setTableFieldsErrorMessage("Licensing Authorities cannot be removed")
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
                                                                            <Checkbox style={{ color: '#d17728' }} checked={allFactorShows} onChange={((e, checked) => {
                                                                                setAllFactorShows(checked);
                                                                            })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>Set All Items to be shown</span>` }}></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <p onClick={() => {
                                                                    setOpen(true);
                                                                    handleProceedComparison();
                                                                }} className='fw-bold cursor-pointer compare-color-text' style={{ marginTop: 20, color: '#d17728' }}>&#8226;{" "}Proceed Comparison</p>
                                                            </>
                                                        )
                                                    } */}
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
                        <button className="accordion-button collapsed bg-sidebar-unselected text-muted py-1 px-2" type="button" data-bs-toggle="collapse" data-bs-target="#accordianPatho" aria-expanded="false" aria-controls="collapseTwo">
                            Pathogen Profile
                        </button>
                    </h2>
                    <div id="accordianPatho" className="accordion-collapse collapse mb-1" aria-labelledby="accordianPathogen" data-bs-parent="#accordianPathogenInfo">
                        <div className="accordion-body pb-1 px-0 pt-0">
                            <div style={{ paddingLeft: 10 }}>
                                <h1 className='heading text-primary pt-2'>{italizeScientificNames(selectedPathogen.name || "-")}</h1>
                                <p className='mb-2'>{italizeScientificNames(selectedPathogen.description || "-")}</p>
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
                        {/* <div style={{ position: 'absolute', right: 10, top: -20, width: 300 }}>
                            <button type='button' onClick={() => handleDownloadComparison()} className='btn' style={{ background: 'red', color: 'white', fontSize: 'bold' }}>Download</button>
                        </div> */}
                        <div style={{ position: 'absolute', right: -35, top: -20, width: 75 }}>
                            <button type='button' onClick={() => setOpen(false)} className='btn' style={{ background: '#c1121f', color: 'white', fontSize: 'bold', textAlign: 'center' }}>X</button>
                        </div>
                        <div className='d-inline-flex' style={{ marginTop: 30, marginBottom: 20, overflow: 'scroll', maxWidth: '165vh' }}>
                            <div>
                                <div style={{ marginTop: 0 }}>
                                    <div className='d-flex border border-secondary rounded' style={{ alignItems: 'center', marginBottom: 5, marginTop: 10 }}>
                                        <div style={{ marginLeft: 10, marginRight: 40, alignSelf: 'center', display: 'flex', flexDirection: 'column' }}>
                                            {
                                                tableFields.filter((x, i) => i > 0 && i <= 4).map((x) => {
                                                    return (
                                                        <div style={{ marginBottom: 5, height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                            <Checkbox onChange={handleChangeSelectedModalFilter} value={x.title} checked={selectedModalFilter.includes(x.title)} />

                                                            <HtmlTooltip
                                                                title={
                                                                    <>
                                                                        <Typography color="inherit">{getDefinitionOfVaccineLabel(x.title)}</Typography>
                                                                        {/* {getLicensingDateByVaccineNameAndTypeV2("WHO", "source", vaccine.name)} */}
                                                                    </>
                                                                }
                                                            >
                                                                <div>
                                                                    <ListItemText primary={x.title} />
                                                                    {/* <span className='selectable'>{"WHO"}</span> */}
                                                                </div>
                                                            </HtmlTooltip>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div style={{ marginLeft: 10, marginRight: 40, alignSelf: 'center', display: 'flex', flexDirection: 'column' }}>
                                            {
                                                tableFields.filter((x, i) => i > 4 && i <= 8).map((x) => {
                                                    return (
                                                        <div style={{ marginBottom: 5, height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                            <Checkbox onChange={handleChangeSelectedModalFilter} value={x.title} checked={selectedModalFilter.includes(x.title)} />
                                                            <HtmlTooltip
                                                                title={
                                                                    <>
                                                                        <Typography color="inherit">{getDefinitionOfVaccineLabel(x.title)}</Typography>
                                                                        {/* {getLicensingDateByVaccineNameAndTypeV2("WHO", "source", vaccine.name)} */}
                                                                    </>
                                                                }
                                                            >
                                                                <div>
                                                                    <ListItemText primary={x.title} />
                                                                    {/* <span className='selectable'>{"WHO"}</span> */}
                                                                </div>
                                                            </HtmlTooltip>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div style={{ marginLeft: 10, marginRight: 40, alignSelf: 'center', display: 'flex', flexDirection: 'column' }}>
                                            {
                                                tableFields.filter((x, i) => i > 8 && i <= 12).map((x) => {
                                                    return (
                                                        <div style={{ marginBottom: 5, height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                            <Checkbox onChange={handleChangeSelectedModalFilter} value={x.title} checked={selectedModalFilter.includes(x.title)} />
                                                            <HtmlTooltip
                                                                title={
                                                                    <>
                                                                        <Typography color="inherit">{getDefinitionOfVaccineLabel(x.title)}</Typography>
                                                                        {/* {getLicensingDateByVaccineNameAndTypeV2("WHO", "source", vaccine.name)} */}
                                                                    </>
                                                                }
                                                            >
                                                                <div>
                                                                    <ListItemText primary={x.title} />
                                                                    {/* <span className='selectable'>{"WHO"}</span> */}
                                                                </div>
                                                            </HtmlTooltip>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div style={{ marginLeft: 10, marginRight: 40, alignSelf: 'center', display: 'flex', flexDirection: 'column' }}>
                                            {
                                                tableFields.filter((x, i) => i > 12 && i <= 16).map((x) => {
                                                    return (
                                                        <div style={{ marginBottom: 5, height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                            <Checkbox onChange={handleChangeSelectedModalFilter} value={x.title} checked={selectedModalFilter.includes(x.title)} />
                                                            <HtmlTooltip
                                                                title={
                                                                    <>
                                                                        <Typography color="inherit">{getDefinitionOfVaccineLabel(x.title)}</Typography>
                                                                        {/* {getLicensingDateByVaccineNameAndTypeV2("WHO", "source", vaccine.name)} */}
                                                                    </>
                                                                }
                                                            >
                                                                <div>
                                                                    <ListItemText primary={x.title} />
                                                                    {/* <span className='selectable'>{"WHO"}</span> */}
                                                                </div>
                                                            </HtmlTooltip>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div>
                                <div style={{ marginTop: 0 }}>
                                    <FormControl sx={{ m: 1, width: 250 }}>
                                        <InputLabel id="demo-multiple-checkbox-label">Filter</InputLabel>
                                        <Select
                                            labelId="demo-multiple-checkbox-label"
                                            id="demo-multiple-checkbox"
                                            multiple
                                            value={selectedModalFilter}
                                            onChange={handleChangeSelectedModalFilter}
                                            input={<OutlinedInput label="Filter" />}
                                            renderValue={(selected) => selected.join(', ')}
                                            MenuProps={{
                                                PaperProps: {
                                                    style: {
                                                        maxHeight: 48 * 4.5 + 8,
                                                        width: 250,
                                                    },
                                                },
                                            }}
                                        >
                                            {tableFields.map((x) => x.title).map((name) => (
                                                <MenuItem key={name} value={name}>
                                                    {name === "Type" ? null : <Checkbox checked={selectedModalFilter.includes(name)} />}
                                                    <ListItemText primary={name} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                            </div> */}
                            {secondaryVaccineFields.length > 0 ? secondaryVaccineFields.map((data, secondaryIdx) => {
                                return (
                                    <div style={{ marginLeft: 10, marginRight: 40, alignItems: 'center', marginTop: 10 }}>
                                        {
                                            data.length >= 1 ? data.map((vaccine) => {
                                                return (
                                                    <div className='d-flex border border-secondary rounded' style={{ alignItems: 'center', marginBottom: 5 }}>
                                                        <div className='d-inline-flex' style={{ alignItems: 'center' }}>
                                                            <li key={Math.random() * 999} onClick={() => {
                                                            }} className='' style={{ maxWidth: 200, minWidth: 200, alignItems: 'center', display: 'flex' }}>
                                                                <div className='d-inline-flex' style={{ alignItems: 'center' }}>
                                                                    <Checkbox style={{ color: '#d17728' }} checked={vaccine.checked} onChange={((e, checked) => {
                                                                        handleSecondaryCheckBox(vaccine);
                                                                    })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>${cutStringMoreThan32(vaccine.name)}</span>` }}></div>
                                                                </div>
                                                            </li>
                                                            {vaccine.licenser.length > 0 && vaccine.licenser.map((licenser) => {
                                                                return (
                                                                    <div className='d-inline-flex' style={{ alignItems: 'center', marginRight: 5 }}>
                                                                        <Checkbox style={{ color: '#d17728' }} checked={licenser.checked} onChange={((e, checked) => {
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
                                            {newSelectedModalFilter.sort((a, b) => a.no - b.no).map((x) => x.title).map((field, idx) => {
                                                const key = getAltNameByTitleName(field);
                                                return key === "name" ? null : (
                                                    <>
                                                        <tr key={Math.random() * 999}>
                                                            <td key={convertCamelCaseToReadable(key)} width={700} style={{ fontWeight: 'bold', height: '100%', alignContent: 'baseline', pointerEvents: idx === 0 ? 'none' : 'all' }} className={`sticky-col ${idx === 0 ? "fix-first justify-content-between" : ""} first-col ${key === "composition" ? `text-black bg-sidebar-unselected` : ``}`}>{key === "source" ? `Licensing Authorities` : key === "composition" ? `Composition/Platform` : key === "coAdministration" ? `Co-Administration` : convertCamelCaseToReadable(key)}</td>
                                                            {/** TEST */}
                                                            {
                                                                secondaryVaccineFields.length > 0 && secondaryVaccineFields.map((data) => {
                                                                    return data.filter((x) => x.checked).map((vaccine) => {
                                                                        return vaccine?.licenser && vaccine?.licenser.filter((x) => x.checked).length > 0 ? vaccine.licenser.filter((x) => x.checked).map((licenser, licenserIdx) => {
                                                                            const conditionedFirstRow = idx === 0 ? {
                                                                                background: "#C7EAE4",
                                                                                color: "black"
                                                                            } : {};
                                                                            return (
                                                                                <td width={700} data-sortable="true" key={Math.random() * 111} style={{ fontWeight: key === "type" ? "bold" : "normal", ...conditionedFirstRow }} className={`main-col ${idx === 0 ? "fix-first justify-content-between" : ""} ${key === "composition" ? `text-black bg-sidebar-unselected` : `text-black bg-sidebar-unselected`} comparison-table-handler`}>
                                                                                    <div className='d-inline-flex justify-content-between w-100'>
                                                                                        <span> {key === "type" ? `${licenser.title} - ${vaccine?.isDoubleName ? italizeScientificNames(getProductProfileValueByVaccineNameAndType(licenser.title, "name", vaccine.name) || "-") : vaccine.name}` : key === "approvalDate" || key === "lastUpdated" || key === "source" ? getLicensingDateByVaccineNameAndType(licenser.title, key, vaccine.name) : italizeScientificNames(getProductProfileValueByVaccineNameAndType(licenser.title, key, vaccine.name) || "-")}</span>
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
                        <div style={{ width: 300, marginTop: -7, justifySelf: 'center', marginLeft: 150 }}>
                            <button type='button' onClick={() => handleDownloadComparison()} className='btn' style={{ background: 'red', color: 'white', fontSize: 'bold' }}>Download</button>
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
                                <button className="accordion-button bg-sidebar-unselected text-muted py-1 px-2" type="button" data-bs-toggle="collapse" data-bs-target="#accordianVac" aria-expanded="true" aria-controls="collapseTwo">
                                    Licensed Vaccines
                                </button>
                            </h2>
                            <div id="accordianVac" className="accordion-collapse collapse show mb-1" aria-labelledby="accordianVaccine" data-bs-parent="#accordianVaccineInfo">
                                <div className="accordion-body pb-1 px-0 pt-0">
                                    <div>
                                        <div className='mt-4' style={{ paddingLeft: 10 }}>
                                            <div className='d-inline-flex' style={{ alignItems: 'center' }}>
                                                <Checkbox style={{ color: '#d17728' }} checked={viewAllVaccines} onChange={((e, checked) => {
                                                    setViewAllVaccines(true);
                                                    setViewSinglePathogenVaccine(false);
                                                    setViewCombinationVaccine(false);
                                                })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>${"View Single & Combination Vaccines"}</span>` }}></div>
                                            </div>
                                            <div className='d-inline-flex justify-content-between w-100' style={{ marginBottom: 50 }}>
                                                <div className='d-inline-flex w-100'>
                                                    <div className='d-inline-flex' style={{ alignItems: 'center' }}>
                                                        <Checkbox style={{ color: '#d17728' }} checked={viewSinglePathogenVaccine} onChange={((e, checked) => {
                                                            setViewSinglePathogenVaccine(true);
                                                            setViewAllVaccines(false);
                                                            setViewCombinationVaccine(false);
                                                        })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>${"View Single Pathogen Vaccines"}</span>` }}></div>
                                                    </div>
                                                    <div className='d-inline-flex' style={{ alignItems: 'center', marginLeft: 20 }}>
                                                        <Checkbox style={{ color: '#d17728' }} checked={viewCombinationVaccine} onChange={((e, checked) => {
                                                            setViewCombinationVaccine(true)
                                                            setViewAllVaccines(false);
                                                            setViewSinglePathogenVaccine(false);
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
                                                                                    <Checkbox style={{ color: '#d17728' }} checked={vaccine.checked} onChange={((e, checked) => {
                                                                                        handleCheckBox(vaccine, false);
                                                                                        handleAllCheckBoxLicenserByVaccine(vaccine.name, checked, vaccine.checked, false);
                                                                                    })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>${vaccine.name}</span>` }}></div>
                                                                                </div>
                                                                            </li>
                                                                        </td>
                                                                        <td style={{ fontWeight: 'bold' }}>{vaccine.vaccineType === "single" ? "Single Pathogen Vaccine" : "Combination Vaccine"}</td>
                                                                        <td colSpan={3}>
                                                                            {vaccine.licenser.length > 0 && vaccine.licenser.map((licenser) => {
                                                                                return (

                                                                                    <div className='d-inline-flex' style={{ alignItems: 'center' }}>
                                                                                        <Checkbox style={{ color: '#d17728' }} checked={licenser.checked} onChange={((e, checked) => {
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
                                                            {(vaccineSelectedOnly ? vaccineFieldsState.filter((x) => x.checked) : vaccineFieldsState).length > 0 ? sortArrayAscending((vaccineSelectedOnly ? vaccineFieldsState.filter((x) => x.checked) : vaccineFieldsState), "name").map((vaccine) => {
                                                                return (
                                                                    <tr>
                                                                        <td>
                                                                            <li key={Math.random() * 999} onClick={() => {
                                                                                // setSelectedVaccine(vaccine)
                                                                                // setOpen(true)
                                                                            }} className='' style={{ marginTop: 15, maxWidth: 400, minWidth: 400, alignItems: 'center', display: 'flex', marginBottom: 5 }}>
                                                                                <div className='d-inline-flex' style={{ alignItems: 'center' }}>
                                                                                    <Checkbox style={{ color: '#d17728' }} checked={vaccine.checked} onChange={((e, checked) => {
                                                                                        handleCheckBox(vaccine, false);
                                                                                        handleAllCheckBoxLicenserByVaccine(vaccine.name, checked, vaccine.checked, false);
                                                                                    })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>${vaccine.name}</span>` }}></div>
                                                                                </div>
                                                                            </li>
                                                                        </td>
                                                                        <td colSpan={4}>
                                                                            {vaccine.licenser.length > 0 && vaccine.licenser.map((licenser) => {
                                                                                return (

                                                                                    <div className='d-inline-flex' style={{ alignItems: 'center' }}>
                                                                                        <Checkbox style={{ color: '#d17728' }} checked={licenser.checked} onChange={((e, checked) => {
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
                                                                                    <Checkbox style={{ color: '#d17728' }} checked={vaccine.checked} onChange={((e, checked) => {
                                                                                        handleCheckBox(vaccine, false);
                                                                                        handleAllCheckBoxLicenserByVaccine(vaccine.name, checked, vaccine.checked, false);
                                                                                    })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>${vaccine.name}</span>` }}></div>
                                                                                </div>
                                                                            </li>
                                                                        </td>
                                                                        <td colSpan={4}>
                                                                            {vaccine.licenser.length > 0 && vaccine.licenser.map((licenser) => {
                                                                                return (

                                                                                    <div className='d-inline-flex' style={{ alignItems: 'center', marginRight: 5 }}>
                                                                                        <Checkbox style={{ color: '#d17728' }} checked={licenser.checked} onChange={((e, checked) => {
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
                                                    <Button style={{ marginLeft: 10, background: (!vaccineFieldsState.some((z) => z.checked) ? "grey" : "#d17728"), fontSize: 'bold', color: 'white' }} disabled={!vaccineFieldsState.some((z) => z.checked)} variant="contained" onClick={() => {
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
                                                            <Checkbox style={{ color: '#d17728' }} checked={vaccineSelectedOnly} onChange={((e, checked) => {
                                                                setVaccineSelectedOnly(checked);
                                                            })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>Show Selected Vaccines only</span>` }}></div>
                                                        </div>
                                                    </div>
                                                    {/* {
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
                                                                                    const checkForSource = newValue.some((item) => item.alt === "source");
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
                                                                                        setTableFieldsErrorMessage("Licensing Authorities cannot be removed")
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
                                                                            <Checkbox style={{ color: '#d17728' }} checked={allFactorShows} onChange={((e, checked) => {
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
                                                    } */}
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
                        <button className="accordion-button collapsed bg-sidebar-unselected text-muted py-1 px-2" type="button" data-bs-toggle="collapse" data-bs-target="#accordianPatho" aria-expanded="false" aria-controls="collapseTwo">
                            Pathogen Profile
                        </button>
                    </h2>
                    <div id="accordianPatho" className="accordion-collapse collapse mb-1" aria-labelledby="accordianPathogen" data-bs-parent="#accordianPathogenInfo">
                        <div className="accordion-body pb-1 px-0 pt-0">
                            <div style={{ paddingLeft: 10 }}>
                                <h1 className='heading text-primary pt-2'>{italizeScientificNames(selectedPathogen.name || "-")}</h1>
                                <p className='mb-2'>{italizeScientificNames(selectedPathogen.description || "-")}</p>
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
                        <div style={{ position: 'absolute', right: 10, top: -20, width: 300 }}>
                            <button type='button' onClick={() => handleDownloadComparison()} className='btn' style={{ background: 'red', color: 'white', fontSize: 'bold' }}>Download</button>
                        </div>
                        <div style={{ position: 'absolute', right: -150, top: -20, width: 300 }}>
                            <button type='button' onClick={() => setOpen(false)} className='btn' style={{ background: '#c1121f', color: 'white', fontSize: 'bold' }}>Close</button>
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
                                                    setTableFieldsErrorMessage("Licensing Authorities cannot be removed")
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
                                                                    <Checkbox style={{ color: '#d17728' }} checked={vaccine.checked} onChange={((e, checked) => {
                                                                        handleSecondaryCheckBox(vaccine);
                                                                    })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>${cutStringMoreThan32(vaccine.name)}</span>` }}></div>
                                                                </div>
                                                            </li>
                                                            {vaccine.licenser.length > 0 && vaccine.licenser.map((licenser) => {
                                                                return (
                                                                    <div className='d-inline-flex' style={{ alignItems: 'center', marginRight: 5 }}>
                                                                        <Checkbox style={{ color: '#d17728' }} checked={licenser.checked} onChange={((e, checked) => {
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
                                                            <td key={convertCamelCaseToReadable(key)} width={700} style={{ color: 'white', fontWeight: 'bold', height: '100%', alignContent: 'baseline', pointerEvents: idx === 0 ? 'none' : 'all' }} className={`sticky-col ${idx === 0 ? "fix-first justify-content-between" : ""} first-col ${key === "composition" ? `text-black bg-sidebar-unselected` : ``}`}>{key === "source" ? "Licensing Authoritiies" : key === "Efficacy" ? "Efficacy (VEy)/ Effectiveness (VEs)" : key === "composition" ? `Composition/Platform` : key === "coAdministration" ? `Co-Administration` : convertCamelCaseToReadable(key)}</td>
                                                            {
                                                                secondaryVaccineFields.length > 0 && secondaryVaccineFields.map((data) => {
                                                                    return data.filter((x) => x.checked).map((vaccine) => {
                                                                        return vaccine?.licenser && vaccine?.licenser.filter((x) => x.checked).length > 0 ? vaccine.licenser.filter((x) => x.checked).map((licenser, licenserIdx) => {
                                                                            const conditionedFirstRow = idx === 0 ? {
                                                                                background: "black",
                                                                                color: "white"
                                                                            } : {};
                                                                            return (
                                                                                <td width={700} data-sortable="true" key={Math.random() * 111} style={{ fontWeight: key === "type" ? "bold" : "normal", ...conditionedFirstRow }} className={`main-col ${idx === 0 ? "fix-first justify-content-between" : ""} ${key === "composition" ? `text-black bg-sidebar-unselected` : `text-black bg-sidebar-unselected`} comparison-table-handler`}>
                                                                                    <div className='d-inline-flex justify-content-between w-100'>
                                                                                        <span style={{ color: 'black' }}> {key === "type" ? `${licenser.title} - ${vaccine?.isDoubleName ? italizeScientificNames(getProductProfileValueByVaccineNameAndType(licenser.title, "name", vaccine.name) || "-") : vaccine.name}` : key === "approvalDate" || key === "lastUpdated" || key === "source" ? getLicensingDateByVaccineNameAndType(licenser.title, key, vaccine.name) : italizeScientificNames(getProductProfileValueByVaccineNameAndType(licenser.title, key, vaccine.name) || "-")}</span>
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