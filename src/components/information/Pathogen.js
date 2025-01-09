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
    width: '80%',
    height: '80%',
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
        { title: 'Name', alt: 'name' },
        { title: 'Composition/Platform', alt: 'composition' },
        { title: 'Strain Coverage', alt: 'strainCoverage' },
        { title: 'Indication', alt: 'indication' },
        { title: 'Dosing', alt: 'dosing' },
        { title: 'Contraindication', alt: 'contraindication' },
        { title: 'Immunogenicity', alt: 'immunogenicity' },
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
    const [selectedFilterTableFields, setSelectedFilterTableFields] = useState([tableFields[0]]);

    const handleProceedComparison = () => {
        console.log(selectedFilterVaccine, selectedFilterLicenser, selectedFilterTableFields)
        setCompareSubmitted(true);
    };

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
                                                            options={vaccineFields}
                                                            getOptionLabel={(option) => option.title}
                                                            defaultValue={[vaccineFields[0]]}
                                                            onChange={(event, newValue) => {
                                                                setSelectedFilterVaccine(newValue);
                                                            }}
                                                            limitTags={3}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    variant="standard"
                                                                    label="Select Vaccines (Max. 3)"
                                                                    placeholder=""
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
                                                                getOptionLabel={(option) => option.title}
                                                                defaultValue={[licenserFields[0], licenserFields[1]]}
                                                                onChange={(event, newValue) => {
                                                                    setSelectedFilterLicenser(newValue);
                                                                }}
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        variant="standard"
                                                                        label="Select Licensing Authorities"
                                                                        placeholder=""
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
                                                                getOptionLabel={(option) => option.title}
                                                                defaultValue={[tableFields[0]]}
                                                                onChange={(event, newValue) => {
                                                                    setSelectedFilterTableFields(newValue);
                                                                }}
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        variant="standard"
                                                                        label="Select items need to be shown"
                                                                        placeholder=""
                                                                    />
                                                                )}
                                                            />
                                                        </Stack>
                                                    </div>
                                                </div>
                                                <p onClick={() => {
                                                    handleProceedComparison();
                                                }} className='fw-bold cursor-pointer compare-color-text' style={{ marginTop: 20 }}>&#8226;{" "}Proceed Comparison</p>
                                            </>
                                        )
                                    }
                                    {
                                        compareSubmitted && (
                                            <div className='outer'>
                                                <div className="d-inline-flex w-100 inner">
                                                    {selectedFilterVaccine.length > 0 ? selectedFilterVaccine.map((vaccine, vaccineIdx) => {
                                                        return vaccine?.productProfiles && (
                                                            <table style={{ marginLeft: vaccineIdx === 0 ? 400 : 0, overflow: 'hidden' }} className='table-fixed' key={vaccine.description} border={1}>
                                                                <tbody>
                                                                    {selectedFilterTableFields.map((field) => {
                                                                        const key = field.alt;
                                                                        return key === "name" ? null : (
                                                                            <>
                                                                                <tr key={Math.random() * 999}>
                                                                                    {vaccineIdx === 0 && (
                                                                                        <td colSpan={1} style={{ color: 'white', fontWeight: 'bold', height: '100%' }} className={`align-middle ${vaccineIdx === 0 && 'fix'} ${key === "composition" ? `text-white bg-black` : ``}`}>{key === "composition" ? `Composition/Platform` : key === "coAdministration" ? `Co-Administration` : convertCamelCaseToReadable(key)}</td>
                                                                                    )}
                                                                                    {
                                                                                        selectedFilterLicenser.some((x) => x.title === "EMA") && (
                                                                                            <td width={400 * 1} style={{ fontWeight: key === "type" ? "bold" : "normal" }} className={`align-middle ${key === "composition" ? `text-white bg-black` : ``}`}>{key === "type" ? `EMA - ${vaccine.name}` : getProductProfileValueByVaccineNameAndType("EMA", key, vaccine.name)}</td>
                                                                                        )
                                                                                    }
                                                                                    {
                                                                                        selectedFilterLicenser.some((x) => x.title === "FDA") && (
                                                                                            <td width={400 * 1} style={{ fontWeight: key === "type" ? "bold" : "normal" }} className={`align-middle ${key === "composition" ? `text-white bg-black` : ``}`}>{key === "type" ? `FDA - ${vaccine.name}` : getProductProfileValueByVaccineNameAndType("FDA", key, vaccine.name)}</td>
                                                                                        )
                                                                                    }
                                                                                    {
                                                                                        selectedFilterLicenser.some((x) => x.title === 'WHO') && (
                                                                                            <td width={400 * 1} style={{ fontWeight: key === "type" ? "bold" : "normal" }} className={`align-middle ${key === "composition" ? `text-white bg-black` : ``}`}>{key === "type" ? `WHO - ${vaccine.name}` : getProductProfileValueByVaccineNameAndType("WHO", key, vaccine.name)}</td>
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
                                    }
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
                    <Vaccine selectedVaccine={selectedVaccine} convertCamelCaseToReadable={convertCamelCaseToReadable} />
                </Box>
            </Modal>
        </>
    )
}
export default Pathogen;