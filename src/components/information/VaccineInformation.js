import React from 'react';

/**
 * VaccineInformation Component
 *
 * @component
 * @namespace Vaccine
 * @param {Object} props - The component accepts selectedVaccine and italizeScientificNames as props.
 * @param {Object} props.selectedVaccine - The selected vaccine object containing details such as name, description, link, and lastUpdated.
 * @param {string} props.selectedVaccine.name - The name of the selected vaccine.
 * @param {string} props.selectedVaccine.description - The description of the selected vaccine.
 * @param {string} props.selectedVaccine.link - The URL link to learn more about the selected vaccine.
 * @param {string} props.selectedVaccine.lastUpdated - The last updated date for the selected vaccine.
 * @param {Function} props.italizeScientificNames - Function that italicizes scientific names in the description.
 * @returns {JSX.Element} The Vaccine Information component.
 *
 * @example
 * // Render the VaccineInformation component with a sample vaccine and italizeScientificNames function
 * <VaccineInformation 
 *   selectedVaccine={{ 
 *     name: 'Vaccine X', 
 *     description: 'A description of Vaccine X with scientific names.', 
 *     link: 'https://example.com/vaccine-x', 
 *     lastUpdated: '2024-07-29' 
 *   }} 
 *   italizeScientificNames={text => text.replace(/(scientificName)/gi, '<i>$1</i>')}
 * />
 */

const VaccineInformation = ({ selectedVaccine, italizeScientificNames }) => {
    return <div className='position-relative slide-left'>
        <h1 className='heading text-primary pt-2'>{selectedVaccine.name}</h1>
        {/* <p className='mb-3'>{italizeScientificNames(selectedVaccine.description)}</p> */}
        {selectedVaccine.packageInsertLink && <p className='text-warning hover-underline mb-1' onClick={()=>window.open(selectedVaccine.packageInsertLink, '_blank')}>Package Insert <i class="fa-regular fa-file-pdf text-warning"></i></p>}
        <p className='mb-0'><a className='read-more hover-underline' target="_blank" rel="noopener noreferrer" href={`${selectedVaccine.link}`}>Learn more...</a></p>
        <span className='last-updated text-muted position-absolute end-0 bottom-0'>Last updated: {selectedVaccine.lastUpdated}</span>
    </div> 
}

export default VaccineInformation;