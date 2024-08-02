import React from 'react';

/**
 * VaccineListTable Component
 *
 * @component
 * @namespace VaccineListTable
 * @param {Object} props - The component accepts detailsType, selectedMicrobe, selectedVaccine, selectedAccreditation, and several handler and data functions as props.
 * @param {string} props.detailsType - The type of detail currently selected, e.g., "Vaccine", "Microbe", or "Accreditation".
 * @param {Object} props.selectedMicrobe - The currently selected microbe object.
 * @param {Object} props.selectedVaccine - The currently selected vaccine object.
 * @param {string} props.selectedAccreditation - The currently selected accreditation.
 * @param {Function} props.handleSelectMicrobe - Function that gets triggered when a microbe is selected.
 * @param {Function} props.handleSelectVaccine - Function that gets triggered when a vaccine is selected.
 * @param {Function} props.handleSelectAccreditation - Function that gets triggered when an accreditation is selected.
 * @param {Function} props.getVaccinesByManufacturer - Function that returns a list of vaccines based on the manufacturer.
 * @param {Function} props.getMicrobeByVaccine - Function that returns the microbe associated with a specific vaccine.
 * @returns {JSX.Element} The Manufacturer Information Table component.
 *
 * @example
 * // Render the VaccineListTable component with dummy data and functions
 * <VaccineListTable 
 *   detailsType="Vaccine"
 *   selectedMicrobe={{ name: 'Microbe X' }}
 *   selectedVaccine={{ name: 'Vaccine Y' }}
 *   selectedAccreditation="Accreditation Z"
 *   handleSelectMicrobe={microbe => console.log('Microbe selected:', microbe)}
 *   handleSelectVaccine={vaccine => console.log('Vaccine selected:', vaccine)}
 *   handleSelectAccreditation={accreditation => console.log('Accreditation selected:', accreditation)}
 *   getVaccinesByManufacturer={() => [{ name: 'Vaccine Y', accreditation: ['Accreditation Z'] }]}
 *   getMicrobeByVaccine={vaccine => ({ name: 'Microbe X' })}
 * />
 */

const VaccineListTable = ({
    detailsType, 
    selectedMicrobe, 
    selectedVaccine, 
    selectedAccreditation,
    handleSelectMicrobe, 
    handleSelectVaccine, 
    handleSelectAccreditation, 
    getVaccinesByManufacturer,
    getMicrobeByVaccine
}) => {
    return <div className='view-header table-responsive m-0'>
        <table className='table table-success w-100 m-0'>
            <thead>
                <tr>
                    <th>Vaccine</th>
                    <th>Virus/ Bacteria</th>
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
                    <td className='microbe-cell'>
                        <span 
                            className={`${detailsType==="Microbe" && selectedMicrobe.name === getMicrobeByVaccine(vaccine).name ? `selected` : `selectable`}`} 
                            onClick={()=>{handleSelectMicrobe(getMicrobeByVaccine(vaccine))}}>{getMicrobeByVaccine(vaccine).name}
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
}

export default VaccineListTable;