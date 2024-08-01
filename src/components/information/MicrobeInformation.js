import React from 'react';

/**
 * MicrobeInformation Component
 *
 * @component
 * @namespace Microbe
 * @param {Object} props - The component accepts selectedMicrobe and italizeScientificNames as props.
 * @param {Object} props.selectedMicrobe - The selected microbe object containing its details.
 * @param {string} props.selectedMicrobe.name - The name of the selected microbe.
 * @param {string} props.selectedMicrobe.description - The description of the selected microbe.
 * @param {Function} props.italizeScientificNames - Function that converts scientific names in the description to italicized text.
 * @returns {JSX.Element} The Microbe Information component.
 *
 * @example
 * // Example usage of MicrobeInformation component
 * <MicrobeInformation 
 *    selectedMicrobe={{ 
 *        name: 'COVID-19', 
 *        description: 'Severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2) is the virus that causes COVID-19.'
 *    }} 
 *    italizeScientificNames={(text) => text.replace(/(SARS-CoV-2)/g, '<i>$1</i>')} 
 * />
 */

const MicrobeInformation = ({selectedMicrobe, italizeScientificNames}) => {
    return <div className='slide-left'>
        <h4 className='report-heading'>{selectedMicrobe.name}</h4>
        <p>{italizeScientificNames(selectedMicrobe.description)}</p>
    </div>
}

export default MicrobeInformation;