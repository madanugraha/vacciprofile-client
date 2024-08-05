import React from 'react';

/**
 * PathogenInformation Component
 *
 * @component
 * @namespace Pathogen
 * @param {Object} props - The component accepts selectedPathogen and italizeScientificNames as props.
 * @param {Object} props.selectedPathogen - The selected pathogen object containing its details.
 * @param {string} props.selectedPathogen.name - The name of the selected pathogen.
 * @param {string} props.selectedMPathogen.description - The description of the selected pathogen.
 * @param {Function} props.italizeScientificNames - Function that converts scientific names in the description to italicized text.
 * @returns {JSX.Element} The Pathogen Information component.
 *
 * @example
 * // Example usage of PathogenInformation component
 * <PathogenInformation 
 *    selectedPathogen={{ 
 *        name: 'COVID-19', 
 *        description: 'Severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2) is the virus that causes COVID-19.'
 *    }} 
 *    italizeScientificNames={(text) => text.replace(/(SARS-CoV-2)/g, '<i>$1</i>')} 
 * />
 */

const PathogenInformation = ({selectedPathogen, italizeScientificNames}) => {
    return <div className='slide-left'>
        <h4 className='report-heading'>{selectedPathogen.name}</h4>
        <p>{italizeScientificNames(selectedPathogen.description)}</p>
    </div>
}

export default PathogenInformation;