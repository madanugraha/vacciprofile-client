import React from 'react';

/**
 * PipelineVaccineListTable Component
 *
 * @component
 * @namespace PipelineVaccineListTable
 * @param {Object} props - The component accepts activeTab, selectedPathogen, selectedVaccine, selectedLicenser, and several handler and data functions as props.
 * @param {string} props.activeTab - The type of detail currently selected, e.g., "Vaccine", "Pathogen", or "Licenser".
 * @param {Object} props.selectedPathogen - The currently selected pathogen object.
 * @param {Object} props.selectedVaccine - The currently selected vaccine object.
 * @param {string} props.selectedLicenser - The currently selected licenser.
 * @param {Function} props.handleSelectPathogen - Function that gets triggered when a pathogen is selected.
 * @param {Function} props.handleSelectVaccine - Function that gets triggered when a vaccine is selected.
 * @param {Function} props.handleSelectLicenser - Function that gets triggered when an licenser is selected.
 * @param {Function} props.getVaccinesByManufacturer - Function that returns a list of vaccines based on the manufacturer.
 * @param {Function} props.getPipelineVaccinesByManufacturer - Function that returns a list of pipeline vaccines based on the manufacturer.
 * @param {Function} props.getPathogenByVaccine - Function that returns the pathogen associated with a specific vaccine.
 * @param {Function} props.getLicenserById - Function to retrieve licenser details by ID.
 * @param {Function} props.italizeScientificNames - Function to italicize scientific names in descriptions.
 * @returns {JSX.Element} The Manufacturer Information Table component.
 *
 * @example
 * // Render the PipelineVaccineListTable component with dummy data and functions
 * <PipelineVaccineListTable 
 *   activeTab="Vaccine"
 *   selectedPathogen={{ name: 'Pathogen X' }}
 *   selectedVaccine={{ name: 'Vaccine Y' }}
 *   selectedLicenser="Licenser Z"
 *   handleSelectPathogen={pathogen => console.log('Pathogen selected:', pathogen)}
 *   handleSelectVaccine={vaccine => console.log('Vaccine selected:', vaccine)}
 *   handleSelectLicenser={licenser => console.log('Licenser selected:', licenser)}
 *   getVaccinesByManufacturer={() => [{ name: 'Vaccine Y', licenser: ['Licenser Z'] }]}
 *   getPathogenByVaccine={vaccine => ({ name: 'Pathogen X' })}
 *   getLicenserById={(id) => ({ licenserId: id, name: 'LicenserZ' })}
 *   italizeScientificNames={(text) => <i>{text}</i>}
 * />
 */

const PipelineVaccineListTable = ({
    activeTab,
    selectedPathogen,
    selectedVaccine,
    getPipelineVaccinesByManufacturer,
    getPathogenById,
    getLicenserById,
    italizeScientificNames
}) => {
    return <div className="accordion mt-1" id="accordianPipelineVaccineList">
        <div className="accordion-item">
            <h2 className="accordion-header" id="accordianPipelineVaccineLists">
                <button className="accordion-button collapsed bg-accordian text-muted py-1 px-2" type="button" data-bs-toggle="collapse" data-bs-target="#accordianPipelineVacList" aria-expanded="false" aria-controls="collapseTwo">
                    List of Pipeline Vaccines
                </button>
            </h2>
            <div id="accordianPipelineVacList" className="accordion-collapse collapse" aria-labelledby="accordianPipelineVaccineLists" data-bs-parent="#accordianPipelineVaccineList">
                <div className="accordion-body pb-1 px-0 pt-0">
                    <div className='main-header table-responsive m-0'>
                        <table className='table w-100 m-0'>
                            <thead>
                                <tr>
                                    <th>Vaccine Brand Name</th>
                                    <th>Pathogen</th>
                                    <th>Status</th>
                                    <th>Licensing Authorities</th>
                                    <th>Miletones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getPipelineVaccinesByManufacturer().map((vaccine, key) => <tr key={key}>
                                    <td className='vaccine-cell'>
                                        <span
                                            className={`${activeTab === "Vaccine" && selectedVaccine.name === vaccine.name ? `selected` : `disabled`}`}
                                            onClick={() => {
                                                // TODO Pipeline Vaccine
                                                // handleSelectVaccine(vaccine)
                                            }}>
                                            {vaccine.name}
                                        </span>
                                    </td>
                                    <td className='pathogen-cell d-flex flex-row'>
                                        {vaccine.pathogen.length > 0 ? vaccine.pathogen.map((pathogenId) => {
                                            return (
                                                <span
                                                    className={`${activeTab === "Pathogen" && selectedPathogen.name === getPathogenById(pathogenId).name ? `selected` : `disabled`}`}
                                                    onClick={() => {
                                                        // TODO Pipeline Vaccine
                                                        // handleSelectPathogen(getPathogenById(pathogenId).name)
                                                    }}>{italizeScientificNames(getPathogenById(pathogenId).name)},
                                                </span>
                                            )
                                        }) : '-'}
                                    </td>
                                    <td className='status-cell'>
                                        <span>{vaccine.status}</span>
                                    </td>
                                    <td className='licenser-cell'>
                                        {vaccine.licensing_authority.map((l, index) => {
                                            const licenser = getLicenserById(l);
                                            if (licenser === null) return ""
                                            return (
                                                <a href={licenser.website} className='selectable' target="_blank" rel="noopener noreferrer">
                                                    {licenser.acronym}{index < vaccine.licensing_authority.length - 1 ? ', ' : ``}
                                                </a>
                                            );
                                        })}
                                    </td>
                                    <td className='milestones-cell'>
                                        <span>-</span>
                                        {/* <div className='d-flex flex-col'>
                                            <span><button>Open Detail</button></span>
                                        </div> */}
                                    </td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default PipelineVaccineListTable;