import React from 'react';

/**
 * Pathogen Component
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
 * // Example usage of Pathogen component
 * <Pathogen 
 *    selectedPathogen={{ 
 *        name: 'COVID-19', 
 *        description: 'Severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2) is the virus that causes COVID-19.'
 *    }} 
 *    italizeScientificNames={text => text.replace(/(SARS-CoV-2)/g, '<i>$1</i>')} 
 * />
 */

const Pathogen = ({selectedPathogen, italizeScientificNames}) => {
    return <div className='slide-left'>
        <h1 className='heading text-primary pt-2'>{selectedPathogen.name}</h1>
        <p>{italizeScientificNames(selectedPathogen.description)}</p>
    </div>
}

export default Pathogen;