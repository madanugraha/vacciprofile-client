// import React from 'react';

// /**
//  * AlphabetsNavigation Component
//  *
//  * @component
//  * @namespace Navigation
//  * @param {Object} props - The component accepts activeFilters, setActiveFilters, and setSelectedManufacturer as props.
//  * @param {Object} props.activeFilters - The current state of filters applied, including the selected alphabet.
//  * @param {Function} props.setActiveFilters - Function that updates the state of active filters.
//  * @param {Function} props.setSelectedManufacturer - Function that updates the selected manufacturer.
//  * @returns {JSX.Element} The Alphabet Navigation component.
//  *
//  * @example
//  * // Render the AlphabetsNavigation component
//  * <AlphabetsNavigation 
//  *   activeFilters={activeFilters} 
//  *   setActiveFilters={setActiveFilters} 
//  *   setSelectedManufacturer={setSelectedManufacturer}
//  * />
//  */

// const AlphabetsNavigation = ({ 
//     activeFilters, 
//     setActiveFilters,
//     setSelectedManufacturer
//  }) => {

//     const handleAlphabetChange = letter => {
//         setActiveFilters({...activeFilters, 
//             firstAlphabet: activeFilters.firstAlphabet === letter ? '' : letter
//         });
//         setSelectedManufacturer({});
//     } 

//     return <div className="alphabet-container d-flex justify-content-around mx-auto mt-3 slide-up">
//         {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map(letter => (
//             <span key={letter} 
//                 className={`alphabet-item ${activeFilters.firstAlphabet===letter ? `bg-primary`:``}`} 
//                 onClick={()=>handleAlphabetChange(letter)}>
//                 {letter}
//             </span>
//         ))}
//     </div>
// }

// export default AlphabetsNavigation;