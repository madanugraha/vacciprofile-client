import React from 'react';

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
                        <div>
                            <div className='mt-4' style={{ paddingLeft: 10 }}>
                                <span className='mt-2 fw-bold text-primary'>&#8226;{" "}Single Pathogen Vaccine</span>
                                {getVaccinesByLicenser(selectedLicenser) && getVaccinesByLicenser(selectedLicenser).length > 0 ? getVaccinesByLicenser(selectedLicenser).map((vaccine, index) => (
                                    <div onClick={() => handleSelectVaccine(vaccine)} className='flex flex-row mb-2 cursor-pointer' style={{ marginLeft: 12, marginTop: 5 }}>
                                        &#8226;{" "}
                                        <span className='mt-2'>{vaccine.name}</span>
                                    </div>
                                )) : (
                                    <div className='flex flex-row mb-2'>
                                        &#8226;{" "}
                                        <span className='mt-2'>No Data Found</span>
                                    </div>
                                )}
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
    </div>
}

export default Licenser;