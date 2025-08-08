import React, { useState } from 'react';
import { getLicenserVaccinesByCountryName, removeDuplicatesFromArray, sortArrayAscending } from '../../utils/array';
import { getManufactureDetailById, getPathogenDetailById, getVaccineByLicenserName } from '../../utils/pathogens';
import Checkbox from '@mui/material/Checkbox';
import { Box, Modal } from '@mui/material';
import Vaccine from './Vaccine';

/**
 * Licenser Component
 *
 * @component
 * @namespace Licenser
 * @param {Object} props - The component accepts handleSelectVaccine, selectedLicenser, and getVaccinesByLicenser as props.
 * @param {Function} props.handleSelectVaccine - Function that gets triggered once a vaccine is selected.
 * @param {string} props.selectedLicenser - The licenser that is selected.
 * @param {Function} props.getVaccinesByLicenser - Function that gets a list of vaccines for a specific licenser.
 * @returns {JSX.Element} The Licenser Information component.
 *
 * @example
 * // Render the Licenser component with dummy data and functions
 * <Licenser 
 *   handleSelectVaccine={vaccineName => console.log('Selected vaccine:', vaccineName)}
 *   selectedLicenser="FDA"
 *   getVaccinesByLicenser={() => [
 *     { name: 'Vaccine A', vaccineType: 'Type 1', comments: 'Effective', revenue: '$1M' },
 *     { name: 'Vaccine B', vaccineType: 'Type 2', comments: 'Moderate', revenue: '$500K' }
 *   ]}
 * />
 */



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
    overflow: 'scroll',
    borderRadius: 4
};

const Licenser = ({
    handleSelectVaccine,
    selectedLicenser,
    getVaccinesByLicenser,
    activeTab,
    handleSelectPathogen,
    selectedPathogen,
    selectedVaccine,
    italizeScientificNames,
    convertCamelCaseToReadable
}) => {

    const [open, setOpen] = useState(false);
    const [secSelectedVaccine, setSecSelectedVaccine] = useState();
    const [viewSinglePathogenVaccine, setViewSinglePathogenVaccine] = useState(true);
    return <div className='slide-left'>

        <div className="accordion" id="accordianLicenserInfo">
            <div className="accordion-item mb-1">
                <h2 className="accordion-header" id="accordianLicenser">
                    <button className="accordion-button collapsed bg-sidebar-unselected text-muted py-1 px-2" type="button" data-bs-toggle="collapse" data-bs-target="#accordianLicense" aria-expanded="false" aria-controls="collapseTwo">
                        {selectedLicenser.fullName} Profile
                    </button>
                </h2>
                <div id="accordianLicense" className="accordion-collapse collapse mb-1" aria-labelledby="accordianLicenser" data-bs-parent="#accordianLicenserInfo">
                    <div className="accordion-body pb-1 px-0 pt-0">
                        <div style={{ paddingLeft: 10 }}>
                            <a className='heading text-primary pt-2' href={selectedLicenser.website || "#"} onClick={() => {
                                if (!selectedLicenser.website) {
                                    window.alert(`No available website link for ${selectedLicenser.country}, ${selectedLicenser.fullName}`)
                                }
                            }} target='_blank' rel='noreferrer'>{selectedLicenser.fullName}{selectedLicenser.country && ` (${selectedLicenser.country})`}</a>
                            <p>{selectedLicenser.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="accordion" id="accordianVaccineInfo">
            <div className="accordion-item mb-1">
                <h2 className="accordion-header" id="accordianVaccine">
                    <button className="accordion-button collapsed show bg-sidebar-unselected text-muted py-1 px-2" type="button" data-bs-toggle="collapse" data-bs-target="#accordianVac" aria-expanded="false" aria-controls="collapseTwo">
                        {selectedLicenser.acronym === "WHO" ? "Prequalified Vaccines" : "Licensed Vaccines"}
                    </button>
                </h2>
                {
                    !selectedLicenser?.country && (
                        <div id="accordianVac" className="accordion-collapse collapse show mb-1" aria-labelledby="accordianVaccine" data-bs-parent="#accordianVaccineInfo">
                            <div className="accordion-body pb-1 px-0 pt-0">
                                <div className='main-header table-responsive m-0'>
                                    <table className='table w-100 m-0'>
                                        <thead>
                                            <tr>
                                                <th className='text-center'>Vaccine Brand Name</th>
                                                <th className='text-center'>Single or Combination Vaccine</th>
                                                <th className='text-center'>Pathogen</th>
                                                <th className='text-center'>Manufacturer</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sortArrayAscending(removeDuplicatesFromArray(getVaccineByLicenserName(selectedLicenser.acronym === "FDA (USA)" ? "FDA" : selectedLicenser.acronym), "name"), "name").length > 0 ? sortArrayAscending(removeDuplicatesFromArray(getVaccineByLicenserName(selectedLicenser.acronym === "FDA (USA)" ? "FDA" : selectedLicenser.acronym), "name"), "name").map((vaccine, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td className='vaccine-cell'>
                                                            <span
                                                                className={`${activeTab === "Licensed Vaccines" && selectedVaccine.name === vaccine.name ? `selected` : `selectable`}`}
                                                                onClick={() => {
                                                                    setSecSelectedVaccine(vaccine);
                                                                    setOpen(true);
                                                                }}>
                                                                {vaccine.name}
                                                            </span>
                                                        </td>
                                                        <td className='vaccine-cell'>
                                                            <span
                                                                className={`selected`}>
                                                                {vaccine.vaccineType === "single" ? "Single Pathogen Vaccine" : "Combination Vaccine"}
                                                            </span>
                                                        </td>
                                                        <td className='status-cell'>
                                                            <div className='d-inline-flex align-items-center'>
                                                                {vaccine?.pathogenId && vaccine?.pathogenId.length > 0 && vaccine?.pathogenId.map((pathogen, index) => {
                                                                    return (
                                                                        <span
                                                                            className={`${activeTab === "Licensed Vaccines" && selectedPathogen === pathogen ? `selected` : `selectable`}`}
                                                                            onClick={() => { handleSelectPathogen(getPathogenDetailById(pathogen)) }}>
                                                                            {getPathogenDetailById(pathogen)?.name ? italizeScientificNames(getPathogenDetailById(pathogen)?.name) : "-"}
                                                                            {index < vaccine?.pathogenId.length - 1 ? <span className='text-decoration-none'>,&nbsp;</span> : ``}
                                                                        </span>
                                                                    )
                                                                })}
                                                            </div>
                                                        </td>
                                                        <td className='licenser-cell'>
                                                            <a href={getManufactureDetailById(vaccine?.manufacturers[0]?.manufacturerId)?.details?.website} target='_blank' className='selectable'>{getManufactureDetailById(vaccine?.manufacturers[0]?.manufacturerId)?.name || "-"}</a>
                                                        </td>
                                                    </tr>
                                                )
                                            }) : (
                                                <tr>
                                                    <td colSpan={4}>
                                                        <div className='flex flex-row mb-2 text-center'>
                                                            &#8226;{" "}
                                                            <span className='mt-2'>No Data Found</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <Modal
                                    keepMounted
                                    open={open}
                                    onClose={() => setOpen(false)}
                                    aria-labelledby="keep-mounted-modal-title"
                                    aria-describedby="keep-mounted-modal-description"
                                >
                                    <Box sx={style}>
                                        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                                            <div style={{ position: 'absolute', right: -150, top: -20, width: 300 }}>
                                                <button type='button' onClick={() => setOpen(false)} className='btn' style={{ background: '#c1121f', color: 'white', fontSize: 'bold' }}>Close</button>
                                            </div>
                                            {secSelectedVaccine && (
                                                <Vaccine selectedVaccine={secSelectedVaccine} italizeScientificNames={italizeScientificNames} convertCamelCaseToReadable={convertCamelCaseToReadable} />
                                            )}
                                        </div>
                                    </Box>
                                </Modal>
                            </div>
                        </div>
                    )
                }


                {
                    selectedLicenser?.country && (
                        <div id="accordianVac" className="accordion-collapse collapse show mb-1" aria-labelledby="accordianVaccine" data-bs-parent="#accordianVaccineInfo">
                            <div className="accordion-body pb-1 px-0 pt-0">
                                <div className='main-header table-responsive m-0'>
                                    <table className='table w-100 m-0'>
                                        <thead>
                                            <tr>
                                                <th className='text-center'>Approval No.</th>
                                                <th className='text-center'>Generic Name</th>
                                                <th className='text-center'>Dosage Form</th>
                                                <th className='text-center'>Strength</th>
                                                <th className='text-center'>Marketer</th>
                                                <th className='text-center'>Manufacturer</th>
                                                <th className='text-center'>Valid Until</th>
                                                <th className='text-center'>Approval Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sortArrayAscending(removeDuplicatesFromArray(getLicenserVaccinesByCountryName(selectedLicenser?.country), "name"), "name").length > 0 ? sortArrayAscending(removeDuplicatesFromArray(getLicenserVaccinesByCountryName(selectedLicenser?.country), "name"), "name").map((vaccine, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td className='vaccine-cell text-center'>
                                                            <span>
                                                                {vaccine.approvalNo}
                                                            </span>
                                                        </td>
                                                        <td className='vaccine-cell'>
                                                            <span>
                                                                {vaccine.name}
                                                            </span>
                                                        </td>
                                                        <td className='vaccine-cell'>
                                                            <span>
                                                                {vaccine.dosage}
                                                            </span>
                                                        </td>
                                                        <td className='vaccine-cell'>
                                                            <span>
                                                                {vaccine.strength}
                                                            </span>
                                                        </td>
                                                        <td className='vaccine-cell'>
                                                            <span>
                                                                {vaccine.marketer}
                                                            </span>
                                                        </td>
                                                        <td className='vaccine-cell'>
                                                            <span>
                                                                {vaccine.manufacturer}
                                                            </span>
                                                        </td>
                                                        <td className='vaccine-cell'>
                                                            <span>
                                                                {vaccine.valid}
                                                            </span>
                                                        </td>
                                                        <td className='vaccine-cell'>
                                                            <span>
                                                                {vaccine.approval}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                )
                                            }) : (
                                                <tr>
                                                    <td colSpan={8}>
                                                        <div className='flex flex-row mb-2 text-center'>
                                                            <span className='mt-2 text-center'>No Data Found</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <Modal
                                    keepMounted
                                    open={open}
                                    onClose={() => setOpen(false)}
                                    aria-labelledby="keep-mounted-modal-title"
                                    aria-describedby="keep-mounted-modal-description"
                                >
                                    <Box sx={style}>
                                        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                                            <div style={{ position: 'absolute', right: -150, top: -20, width: 300 }}>
                                                <button type='button' onClick={() => setOpen(false)} className='btn' style={{ background: '#c1121f', color: 'white', fontSize: 'bold' }}>Close</button>
                                            </div>
                                            {secSelectedVaccine && (
                                                <Vaccine selectedVaccine={secSelectedVaccine} italizeScientificNames={italizeScientificNames} convertCamelCaseToReadable={convertCamelCaseToReadable} />
                                            )}
                                        </div>
                                    </Box>
                                </Modal>
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    </div >
}

export default Licenser;