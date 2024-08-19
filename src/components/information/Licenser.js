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
        <h1 className='heading text-primary pt-2'>{selectedLicenser.fullName} ({selectedLicenser.name})</h1>
        {selectedLicenser.description}
        <div className='table-responsive'>
            <table className='table table-light w-100 m-0 mt-3'>
                <thead>
                    <tr>
                        <th colSpan={4} className='text-center'><i>Vaccines</i></th>
                    </tr>
                    <tr>
                        <th><i>Tradename</i></th>
                        <th><i>Vaccine Type</i></th>
                        <th><i>Indication</i></th>
                    </tr>
                </thead>
                <tbody>
                    {getVaccinesByLicenser(selectedLicenser).map((vaccine, index) => (
                    <tr key={index}>
                        <td><i>{<span className='text-primary fw-bold hover-cursor hover-underline' onClick={()=>handleSelectVaccine(vaccine.name)}>{vaccine.name}</span>}</i></td>
                        <td><i>{vaccine.vaccineType || '-'}</i></td>
                        <td><i>{vaccine.comments || '-'}</i></td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
}

export default Licenser;