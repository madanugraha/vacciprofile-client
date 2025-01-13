import React, { useState } from 'react';
import { getProductProfileValueByVaccineNameAndType, getVaccinesByPathogenId } from '../../utils/pathogens';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Vaccine from './Vaccine';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';


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



    const platforms = [
        "type",
        "name",
        "composition",
        "strainCoverage",
        "indication",
        "dosing",
        "contraindication",
        "immunogenicity",
        // "efficacyEndpointsPhase3",
        // "efficacyData",
        "Efficacy(VEy vs virologically confirmed dengue (VCD))",
        "durationOfProtection",
        "coAdministration",
        "reactogenicity",
        "safety",
        "vaccinationGoal",
        "others"
    ];

    const [compareActive, setCompareActive] = useState(false);

    const tableFields = [
        { title: 'Type', alt: 'type' },
        { title: 'Composition/Platform', alt: 'composition' },
        { title: 'Strain Coverage', alt: 'strainCoverage' },
        { title: 'Indication', alt: 'indication' },
        { title: 'Dosing', alt: 'dosing' },
        { title: 'Contraindication', alt: 'contraindication' },
        { title: 'Immunogenicity', alt: 'immunogenicity' },
        { title: 'Efficacy(VEy vs virologically confirmed dengue (VCD))', alt: 'Efficacy(VEy vs virologically confirmed dengue (VCD))' },
        { title: 'Duration of Protection', alt: 'durationOfProtection' },
        { title: 'Co-Administration', alt: 'coAdministration' },
        { title: 'Reactogenicity', alt: 'reactogenicity' },
        { title: 'Safety', alt: 'safety' },
        { title: 'Vaccination Goal', alt: 'vaccinationGoal' },
        { title: 'Others', alt: 'others' }
    ];

    const vaccineFields = getVaccinesByPathogenId(selectedPathogen.pathogenId) && getVaccinesByPathogenId(selectedPathogen.pathogenId).length > 0 ? getVaccinesByPathogenId(selectedPathogen.pathogenId).map((x) => {
        return {
            ...x,
            title: x.name,
            alt: x.name
        }
    }) : []
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

    const [selectedFilterVaccine, setSelectedFilterVaccine] = useState([vaccineFields[0]]);
    const [selectedFilterLicenser, setSelectedFilterLicenser] = useState([licenserFields[0], licenserFields[1]]);
    const [selectedFilterTableFields, setSelectedFilterTableFields] = useState([tableFields[0], tableFields[1]]);

    const handleProceedComparison = () => {
        setCompareSubmitted(true);
    };

    const [duplicateVaccineError, setDuplicateVaccineError] = useState(false);
    const [dupicateLicenserError, setDuplicateLicenserError] = useState(false);
    const [duplicateTableFieldsError, setDuplicateTableFieldsError] = useState(false);

    const [vaccineErrorMessage, setVaccineErrorMessage] = useState("");
    const [licenserErrorMessage, setLicenserErrorMessage] = useState("");
    const [tableFieldsErrorMessage, setTableFieldsErrorMessage] = useState("");

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
                                                <li className='flex flex-row mb-2'>
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
                                    <span className='mt-2 fw-bold text-primary'>&#8226;{" "}Single Pathogen Vaccine</span>
                                    {getVaccinesByPathogenId(selectedPathogen.pathogenId).length > 0 ? getVaccinesByPathogenId(selectedPathogen.pathogenId).map((vaccine) => {
                                        return (
                                            <div onClick={() => {
                                                // setSelectedVaccine(vaccine)
                                                // setOpen(true)
                                            }} className='flex flex-row' style={{ marginLeft: 12, marginTop: 5 }}>
                                                <span className='mt-2 fw-semibold'>&#8226;{" "}{vaccine.name}</span>
                                            </div>
                                        )
                                    }) : (
                                        <div className='flex flex-row mb-2'>
                                            &#8226;{" "}
                                            <span className='mt-2'>No Data Found</span>
                                        </div>
                                    )}
                                    <span onClick={() => setCompareActive(!compareActive)} className='fw-bold cursor-pointer compare-color-text' style={{ marginTop: 20 }}>&#8226;{" "}Compare Vaccines</span>

                                    {
                                        compareActive && (
                                            <>
                                                <div style={{ marginTop: 20, zIndex: 99999 }}>
                                                    <Stack spacing={3} sx={{ width: 500 }}>
                                                        <Autocomplete
                                                            multiple
                                                            id="tags-standard"
                                                            options={vaccineFields.map((data) => {
                                                                return data
                                                            })}
                                                            value={selectedFilterVaccine}
                                                            getOptionLabel={(option) => option.title}
                                                            defaultValue={[vaccineFields[0]]}
                                                            isOptionEqualToValue={(option, value) => false}
                                                            onChange={(event, newValue) => {
                                                                if (event.target?.textContent &&
                                                                    selectedFilterVaccine.some((item) => item.title === (event.target)?.textContent)
                                                                ) {
                                                                    setVaccineErrorMessage(`${(event.target)?.textContent} cannot have more than one`);
                                                                    setDuplicateVaccineError(true);
                                                                    return;
                                                                }
                                                                if (newValue.length > 2) {
                                                                    setVaccineErrorMessage(`Vaccine selection limited by 2.`);
                                                                    setDuplicateVaccineError(true);
                                                                    return
                                                                }

                                                                setDuplicateVaccineError(false);
                                                                setSelectedFilterVaccine(newValue);
                                                            }}
                                                            // onKeyUp={(event) => {
                                                            //     if (event.target?.textContent &&
                                                            //         selectedFilterVaccine.some((item) => item.title === (event.target)?.textContent)
                                                            //     ) {
                                                            //         setDuplicateVaccineError(true);
                                                            //         return;
                                                            //     }
                                                            //     if (selectedFilterVaccine.length > 2) {
                                                            //         setVaccineErrorMessage(`Vaccine selection limited by 2.`);
                                                            //         setDuplicateVaccineError(true);
                                                            //         return
                                                            //     }
                                                            //     setDuplicateVaccineError(false);
                                                            // }}
                                                            autoComplete
                                                            freeSolo
                                                            limitTags={3}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    variant="standard"
                                                                    label="Select Vaccines (Max. 2)"
                                                                    placeholder=""
                                                                    error={duplicateVaccineError}
                                                                    helperText={duplicateVaccineError ? vaccineErrorMessage : null}
                                                                />
                                                            )}
                                                        />
                                                    </Stack>
                                                    <div style={{ marginTop: 10 }}>
                                                        <Stack spacing={3} sx={{ width: 500 }}>
                                                            <Autocomplete
                                                                multiple
                                                                id="tags-standard"
                                                                options={licenserFields}
                                                                value={selectedFilterLicenser}
                                                                getOptionLabel={(option) => option.title}
                                                                defaultValue={[licenserFields[0]]}
                                                                autoComplete
                                                                freeSolo
                                                                limitTags={3}
                                                                onChange={(event, newValue) => {
                                                                    if (event.target?.textContent &&
                                                                        selectedFilterLicenser.some((item) => item.title === (event.target)?.textContent)
                                                                    ) {
                                                                        setLicenserErrorMessage(`${(event.target)?.textContent} cannot have more than one`)
                                                                        setDuplicateLicenserError(true);
                                                                        return;
                                                                    }

                                                                    // if (newValue.length > 2) {
                                                                    //     setLicenserErrorMessage(`Licensing Authorities selection limited by 2.`);
                                                                    //     setDuplicateLicenserError(true);
                                                                    //     return
                                                                    // };
                                                                    setDuplicateLicenserError(false);
                                                                    setSelectedFilterLicenser(newValue);
                                                                }}
                                                                // onKeyUp={(event) => {
                                                                //     if (event.target?.textContent &&
                                                                //         selectedFilterLicenser.some((item) => item.title === (event.target)?.textContent)
                                                                //     ) {
                                                                //         setLicenserErrorMessage(`${(event.target)?.textContent} cannot have more than one`)
                                                                //         setDuplicateLicenserError(true);
                                                                //         return;
                                                                //     };

                                                                //     if (selectedFilterLicenser.length > 2) {
                                                                //         setLicenserErrorMessage(`Licensing Authorities selection limited by 2.`);
                                                                //         setDuplicateLicenserError(true);
                                                                //         return
                                                                //     };
                                                                //     setDuplicateLicenserError(false);
                                                                // }}
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        variant="standard"
                                                                        label="Select Licensing Authorities"
                                                                        placeholder=""
                                                                        error={dupicateLicenserError}
                                                                        helperText={dupicateLicenserError ? licenserErrorMessage : null}
                                                                    />
                                                                )}
                                                            />
                                                        </Stack>
                                                    </div>
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
                                                                        setTableFieldsErrorMessage(`${(event.target)?.textContent} cannot have more than one`)
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
                                    {/* {
                                        compareSubmitted && (
                                            <div className='outer'>
                                                <div className="d-inline-flex w-100 inner">
                                                    {selectedFilterVaccine.length > 0 ? selectedFilterVaccine.map((vaccine, vaccineIdx) => {
                                                        return vaccine?.productProfiles && (
                                                            <table style={{ marginLeft: vaccineIdx === 0 ? 400 : 0, overflow: 'hidden' }} className='table-fixed' key={vaccine.description}>
                                                                <tbody>
                                                                    {selectedFilterTableFields.map((field) => {
                                                                        const key = field.alt;
                                                                        return key === "name" ? null : (
                                                                            <>
                                                                                <tr key={Math.random() * 999}>
                                                                                    {vaccineIdx === 0 && (
                                                                                        <td style={{ color: 'white', fontWeight: 'bold', height: '100%' }} className={`align-middle ${vaccineIdx === 0 && 'fix'} ${key === "composition" ? `text-white bg-black` : ``}`}>{key === "composition" ? `Composition/Platform` : key === "coAdministration" ? `Co-Administration` : convertCamelCaseToReadable(key)}</td>
                                                                                    )}
                                                                                    {
                                                                                        selectedFilterLicenser.some((x) => x.title === "EMA") && (
                                                                                            <td width={500} style={{ fontWeight: key === "type" ? "bold" : "normal" }} className={`align-middle ${key === "composition" ? `text-white bg-black` : ``}`}>{key === "type" ? `EMA - ${vaccine.name}` : getProductProfileValueByVaccineNameAndType("EMA", key, vaccine.name)}</td>
                                                                                        )
                                                                                    }
                                                                                    {
                                                                                        selectedFilterLicenser.some((x) => x.title === "FDA") && (
                                                                                            <td width={500} style={{ fontWeight: key === "type" ? "bold" : "normal" }} className={`align-middle ${key === "composition" ? `text-white bg-black` : ``}`}>{key === "type" ? `FDA - ${vaccine.name}` : getProductProfileValueByVaccineNameAndType("FDA", key, vaccine.name)}</td>
                                                                                        )
                                                                                    }
                                                                                    {
                                                                                        selectedFilterLicenser.some((x) => x.title === 'WHO') && (
                                                                                            <td width={300} style={{ fontWeight: key === "type" ? "bold" : "normal" }} className={`align-middle ${key === "composition" ? `text-white bg-black` : ``}`}>{key === "type" ? `WHO - ${vaccine.name}` : getProductProfileValueByVaccineNameAndType("WHO", key, vaccine.name)}</td>
                                                                                        )
                                                                                    }
                                                                                </tr>
                                                                            </>
                                                                        )
                                                                    })}
                                                                </tbody>
                                                            </table>
                                                        )
                                                    }) : null}
                                                </div>
                                            </div>
                                        )
                                    } */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="accordion" id="accordianCandidateVaccineInfo">
                <div className="accordion-item mb-1">
                    <h2 className="accordion-header" id="accordianCandidateVaccine">
                        <button className="accordion-button collapsed bg-accordian text-muted py-1 px-2" type="button" data-bs-toggle="collapse" data-bs-target="#accordianCandVac" aria-expanded="false" aria-controls="collapseTwo">
                            Vaccines Candidate
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
                    {/* <div className='outer'>
                        <div className="d-inline-flex w-100 inner">
                            <table style={{ marginLeft: 180, overflow: 'hidden' }} className='table-fixed'>
                                <tbody>
                                    {selectedFilterVaccine.length > 0 ? selectedFilterVaccine.map((vaccine, vaccineIdx) => {
                                        return vaccine.productProfiles ? (
                                            <>
                                                {selectedFilterTableFields.map((field) => {
                                                    const tdWidthLogic = selectedFilterLicenser.length === 1 ? 202 : selectedFilterLicenser.length === 2 ? 202 * 2 : 270
                                                    const key = field.alt;
                                                    return key === "name" ? null : (
                                                        <>
                                                            <tr key={vaccine.description}>
                                                                {vaccineIdx === 0 && (
                                                                    <td style={{ color: 'white', fontWeight: 'bold', height: '100%' }} className={`align-middle ${vaccineIdx === 0 && 'fix'} ${key === "composition" ? `text-white bg-black` : ``}`}>{key === "composition" ? `Composition/Platform` : key === "coAdministration" ? `Co-Administration` : convertCamelCaseToReadable(key)}</td>
                                                                )}
                                                                {
                                                                    selectedFilterLicenser.some((x) => x.title === "EMA") && (
                                                                        <td width={tdWidthLogic} height={30} style={{ fontWeight: key === "type" ? "bold" : "normal" }} className={`align-middle ${key === "composition" ? `text-white bg-black` : ``}`}>{key === "type" ? `EMA - ${vaccine.name}` : getProductProfileValueByVaccineNameAndType("EMA", key, vaccine.name)}</td>
                                                                    )
                                                                }
                                                                {
                                                                    selectedFilterLicenser.some((x) => x.title === "FDA") && (
                                                                        <td width={tdWidthLogic} style={{ fontWeight: key === "type" ? "bold" : "normal" }} className={`align-middle ${key === "composition" ? `text-white bg-black` : ``}`}>{key === "type" ? `FDA - ${vaccine.name}` : getProductProfileValueByVaccineNameAndType("FDA", key, vaccine.name)}</td>
                                                                    )
                                                                }
                                                                {
                                                                    selectedFilterLicenser.some((x) => x.title === 'WHO') && (
                                                                        <td width={tdWidthLogic} style={{ fontWeight: key === "type" ? "bold" : "normal" }} className={`align-middle ${key === "composition" ? `text-white bg-black` : ``}`}>{key === "type" ? `WHO - ${vaccine.name}` : getProductProfileValueByVaccineNameAndType("WHO", key, vaccine.name)}</td>
                                                                    )
                                                                }
                                                            </tr >
                                                        </>
                                                    )
                                                })}
                                            </>
                                        ) : null
                                    }) : null}
                                </tbody>
                            </table>
                        </div>
                    </div> */}
                    <div className='outer'>
                        <div className="d-inline-flex w-100 inner">
                            {selectedFilterVaccine.length >= 1 ? (
                                <table style={{ marginLeft: 240, overflow: 'hidden' }} className='w-100'>
                                    <tbody>
                                        {selectedFilterTableFields.map((field) => {
                                            const key = field.alt;
                                            const vaccineOne = selectedFilterVaccine[0];
                                            const vaccineTwo = selectedFilterVaccine[1];
                                            const vaccineThree = selectedFilterVaccine[2];

                                            const licenserOne = selectedFilterLicenser[0];
                                            const licenserTwo = selectedFilterLicenser[1];
                                            const licenserThree = selectedFilterLicenser[2];
                                            return key === "name" ? null : (
                                                <>
                                                    <tr key={Math.random() * 999}>
                                                        {/* {vaccineIdx === 0 && ( */}
                                                        <td width={700} style={{ color: 'white', fontWeight: 'bold', height: '100%' }} className={`align-middle fix ${key === "composition" ? `text-white bg-black` : ``}`}>{key === "composition" ? `Composition/Platform` : key === "coAdministration" ? `Co-Administration` : convertCamelCaseToReadable(key)}</td>
                                                        {/* // )} */}
                                                        {
                                                            selectedFilterLicenser.some((x) => x.title === "EMA") && (
                                                                <>
                                                                    {
                                                                        vaccineOne && (
                                                                            <td width={9999} style={{ fontWeight: key === "type" ? "bold" : "normal" }} className={`align-middle ${key === "composition" ? `text-white bg-black` : ``}`}>{key === "type" ? `EMA - ${vaccineOne.name}` : getProductProfileValueByVaccineNameAndType("EMA", key, vaccineOne.name)}</td>
                                                                        )
                                                                    }
                                                                    {
                                                                        vaccineTwo && (
                                                                            <td width={9999} style={{ fontWeight: key === "type" ? "bold" : "normal" }} className={`align-middle ${key === "composition" ? `text-white bg-black` : ``}`}>{key === "type" ? `EMA - ${vaccineTwo.name}` : getProductProfileValueByVaccineNameAndType("EMA", key, vaccineTwo.name)}</td>
                                                                        )
                                                                    }
                                                                    {
                                                                        vaccineThree && (
                                                                            <td width={9999} style={{ fontWeight: key === "type" ? "bold" : "normal" }} className={`align-middle ${key === "composition" ? `text-white bg-black` : ``}`}>{key === "type" ? `EMA - ${vaccineThree.name}` : getProductProfileValueByVaccineNameAndType("EMA", key, vaccineThree.name)}</td>
                                                                        )
                                                                    }
                                                                </>
                                                            )
                                                        }
                                                        {
                                                            selectedFilterLicenser.some((x) => x.title === "FDA") && (
                                                                <>
                                                                    {
                                                                        vaccineOne && (
                                                                            <td width={9999} style={{ fontWeight: key === "type" ? "bold" : "normal" }} className={`align-middle ${key === "composition" ? `text-white bg-black` : ``}`}>{key === "type" ? `FDA - ${vaccineOne.name}` : getProductProfileValueByVaccineNameAndType("FDA", key, vaccineOne.name)}</td>
                                                                        )
                                                                    }
                                                                    {
                                                                        vaccineTwo && (
                                                                            <td width={9999} style={{ fontWeight: key === "type" ? "bold" : "normal" }} className={`align-middle ${key === "composition" ? `text-white bg-black` : ``}`}>{key === "type" ? `FDA - ${vaccineTwo.name}` : getProductProfileValueByVaccineNameAndType("FDA", key, vaccineTwo.name)}</td>
                                                                        )
                                                                    }
                                                                    {
                                                                        vaccineThree && (
                                                                            <td width={9999} style={{ fontWeight: key === "type" ? "bold" : "normal" }} className={`align-middle ${key === "composition" ? `text-white bg-black` : ``}`}>{key === "type" ? `FDA - ${vaccineThree.name}` : getProductProfileValueByVaccineNameAndType("FDA", key, vaccineThree.name)}</td>
                                                                        )
                                                                    }
                                                                </>
                                                            )
                                                        }
                                                        {
                                                            selectedFilterLicenser.some((x) => x.title === "WHO") && (
                                                                <>
                                                                    {
                                                                        vaccineOne && (
                                                                            <td width={9999} style={{ fontWeight: key === "type" ? "bold" : "normal" }} className={`align-middle ${key === "composition" ? `text-white bg-black` : ``}`}>{key === "type" ? `WHO - ${vaccineOne.name}` : getProductProfileValueByVaccineNameAndType("WHO", key, vaccineOne.name)}</td>
                                                                        )
                                                                    }
                                                                    {
                                                                        vaccineTwo && (
                                                                            <td width={9999} style={{ fontWeight: key === "type" ? "bold" : "normal" }} className={`align-middle ${key === "composition" ? `text-white bg-black` : ``}`}>{key === "type" ? `WHO - ${vaccineTwo.name}` : getProductProfileValueByVaccineNameAndType("WHO", key, vaccineTwo.name)}</td>
                                                                        )
                                                                    }
                                                                    {
                                                                        vaccineThree && (
                                                                            <td width={9999} style={{ fontWeight: key === "type" ? "bold" : "normal" }} className={`align-middle ${key === "composition" ? `text-white bg-black` : ``}`}>{key === "type" ? `WHO - ${vaccineThree.name}` : getProductProfileValueByVaccineNameAndType("WHO", key, vaccineThree.name)}</td>
                                                                        )
                                                                    }
                                                                </>
                                                            )
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
                </Box>
            </Modal >
        </>
    )
}
export default Pathogen;