import React from 'react';

/**
 * VaccineListTable Component
 *
 * @component
 * @namespace VaccineListTable
 * @param {Object} props - The component accepts activeTab, selectedPathogen, selectedVaccine, selectedLicenser, and several handler and data functions as props.
 * @param {string} props.activeTab - The type of detail currently selected, e.g., "Vaccine", "Pathogen", or "Licenser".
 * @param {Object} props.selectedPathogen - The currently selected pathogen object.
 * @param {Object} props.selectedVaccine - The currently selected vaccine object.
 * @param {string} props.selectedLicenser - The currently selected licenser.
 * @param {Function} props.handleSelectPathogen - Function that gets triggered when a pathogen is selected.
 * @param {Function} props.handleSelectVaccine - Function that gets triggered when a vaccine is selected.
 * @param {Function} props.handleSelectLicenser - Function that gets triggered when an licenser is selected.
 * @param {Function} props.getVaccinesByManufacturer - Function that returns a list of vaccines based on the manufacturer.
 * @param {Function} props.getPathogenByVaccine - Function that returns the pathogen associated with a specific vaccine.
 * @param {Function} props.getLicenserById - Function to retrieve licenser details by ID.
 * @returns {JSX.Element} The Manufacturer Information Table component.
 *
 * @example
 * // Render the VaccineListTable component with dummy data and functions
 * <VaccineListTable 
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
 * />
 */

const VaccineListTable = ({
    activeTab, 
    selectedPathogen, 
    selectedVaccine, 
    selectedLicenser,
    handleSelectPathogen, 
    handleSelectVaccine, 
    handleSelectLicenser, 
    getVaccinesByManufacturer,
    getPathogenByVaccine,
    getLicenserById
}) => {
    return <div className="accordion" id="accordianVaccineList">
    <div className="accordion-item">
        <h2 className="accordion-header" id="accordianVaccines">
            <button className="accordion-button collapsed bg-accordian text-muted py-1 px-2" type="button" data-bs-toggle="collapse" data-bs-target="#accordianVacList" aria-expanded="false" aria-controls="collapseTwo">
            List of Vaccines
            </button>
        </h2>
        <div id="accordianVacList" className="accordion-collapse collapse" aria-labelledby="accordianVaccines" data-bs-parent="#accordianVaccineList">
            <div className="accordion-body">
                <div className='main-header table-responsive m-0'>
                    <table className='table w-100 m-0'>
                        <thead>
                            <tr>
                                <th>Vaccine Brand Name</th>
                                <th>Pathogen</th>
                                <th>Licensing Authorities</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getVaccinesByManufacturer().map((vaccine, key)=><tr key={key}>
                                <td className='vaccine-cell'>
                                    <span
                                        className={`${activeTab==="Vaccine" && selectedVaccine.name === vaccine.name ? `selected` : `selectable`}`} 
                                        onClick={()=>handleSelectVaccine(vaccine)}>
                                        {vaccine.name}
                                    </span>
                                </td>
                                <td className='pathogen-cell'>
                                    <span 
                                        className={`${activeTab==="Pathogen" && selectedPathogen.name === getPathogenByVaccine(vaccine).name ? `selected` : `selectable`}`} 
                                        onClick={()=>{handleSelectPathogen(getPathogenByVaccine(vaccine))}}>{getPathogenByVaccine(vaccine).name}
                                    </span>
                                </td>
                                <td className='licenser-cell'>
                                {vaccine.licensers.map((l, index) => {
                                    const { licenserId } = l;
                                    const licenser = getLicenserById(licenserId); 

                                    if (!licenser) return null; 
                                    
                                    return (
                                        <span key={licenserId}>
                                            <span 
                                                className={`${activeTab === "Licenser" && selectedLicenser === licenser ? `selected` : `selectable`}`} 
                                                onClick={() => handleSelectLicenser(licenser)}>
                                                {licenser.name}
                                            </span>
                                            {index < vaccine.licensers.length - 1 ? <span className='text-decoration-none'>, </span> : ``}
                                        </span>
                                    );
                                })}
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

export default VaccineListTable;