import React, { useState } from 'react';
import { removeDuplicatesFromArray, sortArrayAscending } from '../../utils/array';
import { getManufactureDetailById, getPathogenDetailById, getVaccineByLicenserName } from '../../utils/pathogens';
import Checkbox from '@mui/material/Checkbox';

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

const Licenser = ({
    handleSelectVaccine,
    selectedLicenser,
    getVaccinesByLicenser
}) => {

    const [viewSinglePathogenVaccine, setViewSinglePathogenVaccine] = useState(true);
    return <div className='slide-left'>

        <div className="accordion" id="accordianLicenserInfo">
            <div className="accordion-item mb-1">
                <h2 className="accordion-header" id="accordianLicenser">
                    <button className="accordion-button collapsed bg-accordian text-muted py-1 px-2" type="button" data-bs-toggle="collapse" data-bs-target="#accordianLicense" aria-expanded="false" aria-controls="collapseTwo">
                        {selectedLicenser.fullName} Profile
                    </button>
                </h2>
                <div id="accordianLicense" className="accordion-collapse collapse mb-1" aria-labelledby="accordianLicenser" data-bs-parent="#accordianLicenserInfo">
                    <div className="accordion-body pb-1 px-0 pt-0">
                        <div style={{ paddingLeft: 10 }}>
                            <a className='heading text-primary pt-2' href={selectedLicenser.website} target='_blank' rel='noreferrer'>{selectedLicenser.fullName}{selectedLicenser.country && ` (${selectedLicenser.country})`}</a>
                            <p>{selectedLicenser.description}</p>
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
                        <div className='main-header table-responsive m-0'>
                            <table className='table w-100 m-0'>
                                <thead>
                                    <tr>
                                        <th className='text-center'>Vaccine Brand Name</th>
                                        <th className='text-center'>Vaccine Type</th>
                                        <th className='text-center'>Pathogen</th>
                                        <th className='text-center'>Manufacturer</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortArrayAscending(removeDuplicatesFromArray(getVaccineByLicenserName(selectedLicenser.acronym), "name"), "name").length > 0 ? sortArrayAscending(removeDuplicatesFromArray(getVaccineByLicenserName(selectedLicenser.acronym), "name"), "name").map((vaccine, key) => {
                                        return (
                                            <tr key={key}>
                                                <td className='vaccine-cell'>
                                                    <span
                                                        // className={`${activeTab === "Vaccine" && selectedVaccine.name === vaccine.name ? `selected` : `disabled`}`}
                                                        onClick={() => {
                                                            // TODO Pipeline Vaccine
                                                            // handleSelectVaccine(vaccine)
                                                        }}>
                                                        {vaccine.name}
                                                    </span>
                                                </td>
                                                <td className='pathogen-cell d-flex flex-row'>
                                                    <span>{vaccine.vaccineType}</span>
                                                </td>
                                                <td className='status-cell'>
                                                    <div className='d-inline-flex align-items-center'>
                                                        {vaccine?.pathogenId && vaccine?.pathogenId.length > 0 && vaccine?.pathogenId.map((pathogen, index) => {
                                                            return (
                                                                <span
                                                                    className={`selectable`}
                                                                >
                                                                    {getPathogenDetailById(pathogen)?.name ? (getPathogenDetailById(pathogen)?.name) : "-"}
                                                                    {index < vaccine?.pathogenId.length - 1 ? <span className='text-decoration-none'>,&nbsp;</span> : ``}
                                                                </span>
                                                            )
                                                        })}
                                                    </div>
                                                </td>
                                                <td className='licenser-cell'>
                                                    {getManufactureDetailById(vaccine?.manufacturers[0]?.manufacturerId)?.name || "-"}
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
                                </tbody>
                            </table>
                        </div>
                        {/* <div className='d-inline-flex justify-content-between w-100' style={{ marginBottom: 20 }}>
                            <div className='d-inline-flex w-100'>
                                <div className='d-inline-flex' style={{ alignItems: 'center' }}>
                                    <Checkbox checked={viewSinglePathogenVaccine === true} onChange={((e, checked) => {
                                        setViewSinglePathogenVaccine(true)
                                        // handleCheckboxLicenserByVaccine(vaccine.name, licenser.title, checked, vaccine.checked, false);
                                    })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>${"View Single Pathogen Vaccines"}</span>` }}></div>
                                </div>
                                <div className='d-inline-flex' style={{ alignItems: 'center', marginLeft: 20 }}>
                                    <Checkbox checked={!viewSinglePathogenVaccine} onChange={((e, checked) => {
                                        setViewSinglePathogenVaccine(false)
                                        // handleCheckboxLicenserByVaccine(vaccine.name, licenser.title, checked, vaccine.checked, false);
                                    })} /><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>${"View Combination Vaccines"}</span>` }}></div>
                                </div>
                            </div>
                        </div>
                        <div style={{ marginLeft: 10 }}>
                            {
                                viewSinglePathogenVaccine ? (
                                    <table>
                                        <tr>
                                            <td colSpan={4} style={{ fontWeight: 'bold' }}>Single Pathogen Vaccines</td>
                                        </tr>
                                        <tr>
                                            <td style={{ fontWeight: 'bold' }}>Vaccine Name</td>
                                        </tr>
                                        {removeDuplicatesFromArray(getVaccineByLicenserName(selectedLicenser.acronym, "single"), "name").length > 0 ? removeDuplicatesFromArray(getVaccineByLicenserName(selectedLicenser.acronym, "single"), "name").map((vaccine) => {
                                            return (
                                                <tr>
                                                    <td>
                                                        <li key={Math.random() * 999} onClick={() => {
                                                            // setSelectedVaccine(vaccine)
                                                            // setOpen(true)
                                                        }} className='' style={{ marginTop: 15, maxWidth: 400, minWidth: 400, alignItems: 'center', display: 'flex', marginBottom: 5 }}>
                                                            <div className='d-inline-flex' style={{ alignItems: 'center' }}>
                                                                <div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>${vaccine.name}</span>` }}></div>
                                                            </div>
                                                        </li>
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
                                ) : (
                                    <table>
                                        <tr>
                                            <td colSpan={4} style={{ fontWeight: 'bold' }}>Combination Vaccines</td>
                                        </tr>
                                        <tr>
                                            <td style={{ fontWeight: 'bold' }}>Vaccine Name</td>
                                        </tr>
                                        {removeDuplicatesFromArray(getVaccineByLicenserName(selectedLicenser.acronym, "combination"), "name").length > 0 ? removeDuplicatesFromArray(getVaccineByLicenserName(selectedLicenser.acronym, "combination"), "name").map((vaccine) => {
                                            return (
                                                <tr>
                                                    <td>
                                                        <li key={Math.random() * 999} onClick={() => {
                                                            // setSelectedVaccine(vaccine)
                                                            // setOpen(true)
                                                        }} className='' style={{ marginTop: 15, maxWidth: 400, minWidth: 400, alignItems: 'center', display: 'flex', marginBottom: 5 }}>
                                                            <div className='d-inline-flex' style={{ alignItems: 'center' }}><div className='' dangerouslySetInnerHTML={{ __html: `<span className='text-primary fw-semibold'>${vaccine.name}</span>` }}></div>
                                                            </div>
                                                        </li>
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
                                )
                            }
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
        {/* <div className="accordion" id="accordianCandidateVaccineInfo">
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
        </div> */}
    </div >
}

export default Licenser;