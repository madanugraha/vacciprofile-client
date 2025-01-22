import React, { useEffect, useState } from 'react';
import { getProductProfileValueByVaccineNameAndType, getVaccinesByPathogenId } from '../../utils/pathogens';
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

    const handleProceedComparison = () => {
        setCompareSubmitted(true);
    };

    const [duplicateVaccineError, setDuplicateVaccineError] = useState(false);
    const [duplicateTableFieldsError, setDuplicateTableFieldsError] = useState(false);

    const [vaccineErrorMessage, setVaccineErrorMessage] = useState("");
    const [tableFieldsErrorMessage, setTableFieldsErrorMessage] = useState("");


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

    const handleCheckBox = (vaccine) => {
        const c3 = vaccineFieldsState.some((x) => x.title === vaccine.name);
        if (c3) {
            const f = vaccineFieldsState.map((x) => {
                if (x.title === vaccine.name) {
                    return {
                        ...x,
                        checked: !x.checked
                    }
                } else {
                    return {
                        ...x,
                    }
                }
            });
            const f2 = selectedFilterVaccine.filter((x) => x.title === vaccine.name);

            if (f2.length > 0) {
                const excl = selectedFilterVaccine.filter((x) => x.title !== vaccine.name);
                setLicenserFieldsVaccine(excl);
                setSelectedFilterVaccine(excl);
            } else {
                setSelectedFilterVaccine([...selectedFilterVaccine, vaccine]);
                setLicenserFieldsVaccine([...licenserFieldsVaccine, vaccine]);
            };
            setVaccineFieldsState(f);
        };
    };

    // useEffect(() => {
    //     checkForCheckedVaccines();
    // }, [vaccineFieldsState])
    const handleOnSelectVaccineDeletedCheckBox = (name) => {
        const f = vaccineFieldsState.map((x) => {
            if (x.name === name) {
                return {
                    ...x,
                    checked: false
                }
            } else {
                return {
                    ...x,
                    checked: x.checked
                }
            }
        });
        setVaccineFieldsState(f);
    };

    const handleOnSelectVaccineAddedCheckBox = (name) => {
        const f = vaccineFieldsState.map((x) => {
            if (x.name === name) {
                return {
                    ...x,
                    checked: true
                }
            } else {
                return {
                    ...x,
                    checked: x.checked
                }
            }
        });
        setVaccineFieldsState(f);
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
                licenser: [licenserFields[0], licenserFields[1], licenserFields[2]],
                hasDuplicate: false,
                errorMessage: "",
                checked: false
            }
        }) : [];
        setVaccineFieldsState(vaccineFields);
    }, [selectedPathogen]);

    useEffect(() => {
        if (!open) {
            setLicenserFieldsVaccine([]);
            setSelectedFilterVaccine([]);
            const vaccineFields = getVaccinesByPathogenId(selectedPathogen.pathogenId) && getVaccinesByPathogenId(selectedPathogen.pathogenId).length > 0 ? getVaccinesByPathogenId(selectedPathogen.pathogenId).map((x) => {
                return {
                    ...x,
                    title: x.name,
                    alt: x.name,
                    licenser: [licenserFields[0], licenserFields[1], licenserFields[2]],
                    hasDuplicate: false,
                    errorMessage: "",
                    checked: false
                }
            }) : [];
            setVaccineFieldsState(vaccineFields);
        };

        var el = document.getElementById('comparison-table');
        if (el) {
            var dragger = tableDragger(el);
            dragger.destroy();
            tableDragger(el);
        }
    }, [open]);
    return (
        <>
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
            {
                selectedPathogen === "Pathogen A" || selectedPathogen === "Pathogen B" ? null : (
                    <div className="accordion" id="accordianVaccineInfo">
                        <div className="accordion-item mb-1">
                            <h2 className="accordion-header" id="accordianVaccine">
                                <button className="accordion-button collapsed bg-accordian text-muted py-1 px-2" type="button" data-bs-toggle="collapse" data-bs-target="#accordianVac" aria-expanded="false" aria-controls="collapseTwo">
                                    Licensed Vaccines
                                </button>
                            </h2>
                            <div id="accordianVac" className="accordion-collapse collapse mb-1" aria-labelledby="accordianVaccine" data-bs-parent="#accordianVaccineInfo">
                                <div className="accordion-body pb-1 px-0 pt-0">
                                    <div>
                                        <div className='mt-4' style={{ paddingLeft: 10 }}>
                                            <div style={{ position: 'relative', width: '100%' }} className='d-inline-flex'>
                                                <div>
                                                    <span className='mt-2 fw-bold text-primary'>&#8226;{" "}Single Pathogen Vaccine</span>
                                                    {vaccineFieldsState.length > 0 ? sortArrayAscending(vaccineFieldsState, "name").map((vaccine) => {
                                                        return (
                                                            <li key={Math.random() * 999} onClick={() => {
                                                                // setSelectedVaccine(vaccine)
                                                                // setOpen(true)
                                                            }} className='' style={{ marginTop: 15, maxWidth: 400, alignItems: 'center', display: 'flex', marginBottom: 5 }}>
                                                                <div className='d-inline-flex' style={{ alignItems: 'center' }}>
                                                                    <Checkbox checked={vaccine.checked} onChange={(() => handleCheckBox(vaccine))} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>${vaccine.name}</span>` }}></div>
                                                                </div>
                                                            </li>
                                                        )
                                                    }) : (
                                                        <div className='flex flex-row mb-2'>
                                                            &#8226;{" "}
                                                            <span className='mt-2'>No Data Found</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div style={{ position: 'absolute', right: 10, top: 0 }}>
                                                    <Button disabled={licenserFieldsVaccine.length <= 0} variant="contained" onClick={() => setCompareActive(!compareActive)}>Compare Vaccines {licenserFieldsVaccine.length >= 1 ? `(${licenserFieldsVaccine.length})` : null}</Button>
                                                    {/* <span onClick={() => } className='fw-bold cursor-pointer compare-color-text' style={{}}>&#8226;{" "}Compare Vaccines</span> */}
                                                    {
                                                        compareActive && (
                                                            <>
                                                                <div style={{ marginTop: 20, zIndex: 99999 }}>
                                                                    <Stack spacing={3} sx={{ width: 500 }}>
                                                                        <Autocomplete
                                                                            multiple
                                                                            id="tags-standard"
                                                                            options={sortArrayAscending(vaccineFieldsState, "name").map((data) => {
                                                                                return data
                                                                            })}
                                                                            value={selectedFilterVaccine}
                                                                            getOptionLabel={(option) => option.title}
                                                                            defaultValue={[vaccineFieldsState[0]]}
                                                                            isOptionEqualToValue={(option, value) => false}
                                                                            onChange={(event, newValue, reason, detail) => {
                                                                                if (event.target?.textContent &&
                                                                                    selectedFilterVaccine.some((item) => item.title === (event.target)?.textContent)
                                                                                ) {
                                                                                    setVaccineErrorMessage(`${(event.target)?.textContent} cannot be duplicated`);
                                                                                    setDuplicateVaccineError(true);
                                                                                    return;
                                                                                }
                                                                                // if (newValue.length > 6) {
                                                                                //     setVaccineErrorMessage(`Vaccine selection limited by 6.`);
                                                                                //     setDuplicateVaccineError(true);
                                                                                //     return
                                                                                // }

                                                                                setDuplicateVaccineError(false);
                                                                                setSelectedFilterVaccine(newValue);
                                                                                setLicenserFieldsVaccine(newValue);

                                                                                if (reason === "selectOption") {
                                                                                    const added = detail.option;
                                                                                    if (added?.alt) {
                                                                                        handleOnSelectVaccineAddedCheckBox(added.title);
                                                                                    }
                                                                                }
                                                                                if (reason === 'removeOption') {
                                                                                    const deleted = detail.option;
                                                                                    if (deleted?.alt) {
                                                                                        handleOnSelectVaccineDeletedCheckBox(deleted.title);
                                                                                    }
                                                                                };
                                                                            }}
                                                                            autoComplete
                                                                            freeSolo
                                                                            limitTags={3}
                                                                            renderInput={(params) => (
                                                                                <TextField
                                                                                    {...params}
                                                                                    variant="standard"
                                                                                    label="Select Vaccines"
                                                                                    placeholder=""
                                                                                    error={duplicateVaccineError}
                                                                                    helperText={duplicateVaccineError ? vaccineErrorMessage : null}
                                                                                />
                                                                            )}
                                                                        />
                                                                    </Stack>
                                                                    {
                                                                        selectedFilterVaccine.length > 0 && (
                                                                            selectedFilterVaccine.map((vaccine) => {
                                                                                return (
                                                                                    <div key={vaccine.name} style={{ marginTop: 10 }}>
                                                                                        <Stack spacing={3} sx={{ width: 500 }}>
                                                                                            <Autocomplete
                                                                                                multiple
                                                                                                id="tags-standard"
                                                                                                options={licenserFields}
                                                                                                value={[...vaccine.licenser]}
                                                                                                getOptionLabel={(option) => option.title}
                                                                                                defaultValue={[licenserFields[0]]}
                                                                                                autoComplete
                                                                                                freeSolo
                                                                                                limitTags={3}
                                                                                                onChange={(event, newValue) => {
                                                                                                    if (event.target?.textContent &&
                                                                                                        vaccine.licenser.some((item) => item.title === (event.target)?.textContent)
                                                                                                    ) {
                                                                                                        vaccine.errorMessage = `${vaccine.name}: ${(event.target)?.textContent} cannot be duplicated`
                                                                                                        vaccine.hasDuplicate = true;
                                                                                                        return;
                                                                                                    }
                                                                                                    vaccine.hasDuplicate = false;
                                                                                                    vaccine.licenser = newValue;
                                                                                                    handleSelectLicenserFieldsVaccine(vaccine.name, vaccine)
                                                                                                    // setLicenserFieldsVaccine([...licenserFieldsVaccine, vaccine]);
                                                                                                }}
                                                                                                renderInput={(params) => (
                                                                                                    <TextField
                                                                                                        {...params}
                                                                                                        variant="standard"
                                                                                                        label={`Select Licensing Authorities for: ${vaccine.name}`}
                                                                                                        placeholder=""
                                                                                                        error={vaccine.hasDuplicate}
                                                                                                        helperText={vaccine.hasDuplicate ? vaccine.errorMessage : null}
                                                                                                    />
                                                                                                )}
                                                                                            />
                                                                                        </Stack>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        )
                                                                    }
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
                                                                                        label="Select items need to be shown"
                                                                                        placeholder=""
                                                                                        error={duplicateTableFieldsError}
                                                                                        helperText={duplicateTableFieldsError ? tableFieldsErrorMessage : null}
                                                                                    />
                                                                                )}
                                                                            />
                                                                        </Stack>
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
            <div className="accordion" id="accordianCandidateVaccineInfo">
                <div className="accordion-item mb-1">
                    <h2 className="accordion-header" id="accordianCandidateVaccine">
                        <button className="accordion-button collapsed bg-accordian text-muted py-1 px-2" type="button" data-bs-toggle="collapse" data-bs-target="#accordianCandVac" aria-expanded="false" aria-controls="collapseTwo">
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
            <Modal
                keepMounted
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <div style={{ height: '100%', width: '100%' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {
                                licenserFieldsVaccine.length >= 1 && selectedFilterTableFields && selectedFilterTableFields.length > 0 && selectedFilterTableFields.map((x, idx) => {
                                    return (
                                        <span>Row {idx + 1}: {x.title}</span>
                                    )
                                })
                            }
                        </div>
                        <div style={{ overflow: 'scroll' }}>
                            <div style={{ overflowY: 'scroll', maxHeight: '60vh' }} className="d-inline-flex w-100 horizontal-scroll-except-first-column">
                                {licenserFieldsVaccine.length >= 1 ? (
                                    <table className='w-100'>
                                        <tbody>
                                            {selectedFilterTableFields.map((field, idx) => {
                                                const key = field.alt;
                                                const vaccineOne = licenserFieldsVaccine[0];
                                                const vaccineTwo = licenserFieldsVaccine[1];
                                                const vaccineThree = licenserFieldsVaccine[2];
                                                const vaccineFour = licenserFieldsVaccine[3];
                                                const vaccineFive = licenserFieldsVaccine[4];
                                                const vaccineSix = licenserFieldsVaccine[5];

                                                return key === "name" ? null : (
                                                    <>
                                                        <tr key={Math.random() * 999} style={{ position: 'relative' }}>
                                                            <td width={700} style={{ color: 'white', fontWeight: 'bold', height: '100%' }} className={`baseline ${key === "composition" ? `text-white bg-black` : ``}`}>{key === "composition" ? `Composition/Platform` : key === "coAdministration" ? `Co-Administration` : convertCamelCaseToReadable(key)}</td>
                                                            {/** ONE */}
                                                            {
                                                                vaccineOne && vaccineOne.licenser.length > 0 && vaccineOne.licenser.map((licenser, idx) => {
                                                                    return (
                                                                        <td width={9999} style={{ fontWeight: key === "type" ? "bold" : "normal" }} className={`baseline ${key === "composition" ? `text-white bg-black` : ``} comparison-table-handler`}>{key === "type" ? `${licenser.title} - ${vaccineOne.name}` : getProductProfileValueByVaccineNameAndType(licenser.title, key, vaccineOne.name)}</td>
                                                                    )
                                                                })
                                                            }

                                                            {/** TWO */}
                                                            {
                                                                vaccineTwo && vaccineTwo.licenser.length > 0 && vaccineTwo.licenser.map((licenser, idx) => {
                                                                    return (
                                                                        <td width={9999} style={{ fontWeight: key === "type" ? "bold" : "normal" }} className={`baseline ${key === "composition" ? `text-white bg-black` : ``} comparison-table-handler`}>{key === "type" ? `${licenser.title} - ${vaccineTwo.name}` : getProductProfileValueByVaccineNameAndType(licenser.title, key, vaccineTwo.name)}</td>
                                                                    )
                                                                })
                                                            }

                                                            {/** THREE */}
                                                            {
                                                                vaccineThree && vaccineThree.licenser.length > 0 && vaccineThree.licenser.map((licenser, idx) => {
                                                                    return (
                                                                        <td width={9999} style={{ fontWeight: key === "type" ? "bold" : "normal" }} className={`baseline ${key === "composition" ? `text-white bg-black` : ``} comparison-table-handler`}>{key === "type" ? `${licenser.title} - ${vaccineThree.name}` : getProductProfileValueByVaccineNameAndType(licenser.title, key, vaccineThree.name)}</td>
                                                                    )
                                                                })
                                                            }

                                                            {/** FOUR */}
                                                            {
                                                                vaccineFour && vaccineFour.licenser.length > 0 && vaccineFour.licenser.map((licenser, idx) => {
                                                                    return (
                                                                        <td width={9999} style={{ fontWeight: key === "type" ? "bold" : "normal" }} className={`baseline ${key === "composition" ? `text-white bg-black` : ``} comparison-table-handler`}>{key === "type" ? `${licenser.title} - ${vaccineFour.name}` : getProductProfileValueByVaccineNameAndType(licenser.title, key, vaccineFour.name)}</td>
                                                                    )
                                                                })
                                                            }

                                                            {/** FIVE */}
                                                            {
                                                                vaccineFive && vaccineFive.licenser.length > 0 && vaccineFive.licenser.map((licenser, idx) => {
                                                                    return (
                                                                        <td width={9999} style={{ fontWeight: key === "type" ? "bold" : "normal" }} className={`baseline ${key === "composition" ? `text-white bg-black` : ``} comparison-table-handler`}>{key === "type" ? `${licenser.title} - ${vaccineFive.name}` : getProductProfileValueByVaccineNameAndType(licenser.title, key, vaccineFive.name)}</td>
                                                                    )
                                                                })
                                                            }

                                                            {/** SIX */}
                                                            {
                                                                vaccineSix && vaccineSix.licenser.length > 0 && vaccineSix.licenser.map((licenser, idx) => {
                                                                    return (
                                                                        <td width={9999} style={{ fontWeight: key === "type" ? "bold" : "normal" }} className={`baseline ${key === "composition" ? `text-white bg-black` : ``} comparison-table-handler`}>{key === "type" ? `${licenser.title} - ${vaccineSix.name}` : getProductProfileValueByVaccineNameAndType(licenser.title, key, vaccineSix.name)}</td>
                                                                    )
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
            </Modal >
        </>
    )
}
export default Pathogen;