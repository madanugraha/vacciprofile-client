import React from 'react';

/**
 * VaccineListTable Component
 *
 * @component
 * @namespace VaccineListTable
 * @param {Object} props - The component accepts detailsType, selectedPathogen, selectedVaccine, selectedAccreditation, and several handler and data functions as props.
 * @param {string} props.detailsType - The type of detail currently selected, e.g., "Vaccine", "Pathogen", or "Accreditation".
 * @param {Object} props.selectedPathogen - The currently selected pathogen object.
 * @param {Object} props.selectedVaccine - The currently selected vaccine object.
 * @param {string} props.selectedAccreditation - The currently selected accreditation.
 * @param {Function} props.handleSelectPathogen - Function that gets triggered when a pathogen is selected.
 * @param {Function} props.handleSelectVaccine - Function that gets triggered when a vaccine is selected.
 * @param {Function} props.handleSelectAccreditation - Function that gets triggered when an accreditation is selected.
 * @param {Function} props.getVaccinesByManufacturer - Function that returns a list of vaccines based on the manufacturer.
 * @param {Function} props.getPathogenByVaccine - Function that returns the pathogen associated with a specific vaccine.
 * @returns {JSX.Element} The Manufacturer Information Table component.
 *
 * @example
 * // Render the VaccineListTable component with dummy data and functions
 * <VaccineListTable 
 *   detailsType="Vaccine"
 *   selectedPathogen={{ name: 'Pathogen X' }}
 *   selectedVaccine={{ name: 'Vaccine Y' }}
 *   selectedAccreditation="Accreditation Z"
 *   handleSelectPathogen={pathogen => console.log('Pathogen selected:', pathogen)}
 *   handleSelectVaccine={vaccine => console.log('Vaccine selected:', vaccine)}
 *   handleSelectAccreditation={accreditation => console.log('Accreditation selected:', accreditation)}
 *   getVaccinesByManufacturer={() => [{ name: 'Vaccine Y', accreditation: ['Accreditation Z'] }]}
 *   getPathogenByVaccine={vaccine => ({ name: 'Pathogen X' })}
 * />
 */

const VaccineListTable = ({
    detailsType, 
    selectedPathogen, 
    selectedVaccine, 
    selectedAccreditation,
    handleSelectPathogen, 
    handleSelectVaccine, 
    handleSelectAccreditation, 
    getVaccinesByManufacturer,
    getPathogenByVaccine
}) => {
    return <div className="accordion" id="accordianVaccineList">
    <div className="accordion-item">
      <h2 className="accordion-header" id="accordianVaccines">
        <button className="accordion-button collapsed bg-unselectable py-1 px-2" type="button" data-bs-toggle="collapse" data-bs-target="#accordianVacList" aria-expanded="false" aria-controls="collapseTwo">
          List of Vaccines
        </button>
      </h2>
      <div id="accordianVacList" className="accordion-collapse collapse" aria-labelledby="accordianVaccines" data-bs-parent="#accordianVaccineList">
        <div className="accordion-body">
            <div className='view-header table-responsive m-0'>
                <table className='table table-success w-100 m-0'>
                    <thead>
                        <tr>
                            <th>Vaccine</th>
                            <th>Pathogen</th>
                            <th>Accreditation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getVaccinesByManufacturer().map((vaccine, key)=><tr key={key}>
                            <td className='vaccine-cell'>
                                <span
                                    className={`${detailsType==="Vaccine" && selectedVaccine.name === vaccine.name ? `selected` : `selectable`}`} 
                                    onClick={()=>handleSelectVaccine(vaccine)}>
                                    {vaccine.name}
                                </span>
                            </td>
                            <td className='pathogen-cell'>
                                <span 
                                    className={`${detailsType==="Pathogen" && selectedPathogen.name === getPathogenByVaccine(vaccine).name ? `selected` : `selectable`}`} 
                                    onClick={()=>{handleSelectPathogen(getPathogenByVaccine(vaccine))}}>{getPathogenByVaccine(vaccine).name}
                                </span>
                            </td>
                            <td className='accreditation-cell'>
                                {vaccine.accreditation.map((accreditation, index)=>
                                <span>
                                    <span key={index} 
                                        className={`${detailsType==="Accreditation" && selectedAccreditation === accreditation ? `selected` : `selectable`}`} 
                                        onClick={()=>handleSelectAccreditation(accreditation)}>
                                        {accreditation}
                                    </span>{index<vaccine.accreditation.length-1 ? <span className='text-decoration-none'>, </span> : ``}
                                </span>)}
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