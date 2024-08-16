import React from 'react';

/**
 * A component that renders a list of alphabet letters as clickable items.
 * Highlights the active filter alphabet and triggers a callback function when an alphabet is clicked.
 *
 * @component
 * @example
 * const activeFilters = { firstAlphabet: 'A' };
 * const handleAlphabetChange = (letter) => {  
 *   return (
 *     <Alphabets 
 *       activeFilters={activeFilters}
 *       handleAlphabetChange={handleAlphabetChange}
 *     />
 *   );
 * };
 * @param {Object} props - The props object.
 * @param {Object} props.activeFilters - The current active filters.
 * @param {string} props.activeFilters.firstAlphabet - The currently selected alphabet for filtering.
 * @param {Function} props.handleAlphabetChange - The function to call when an alphabet is clicked.
 * 
 * @returns {JSX.Element} The rendered component.
 */

const Alphabets = ({ 
    activeFilters,
    handleAlphabetChange
 }) => {

    return (
        <div className="alphabet-container d-flex justify-content-around mx-auto mt-3 slide-up">
            {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map(alphabet => (
                <span 
                    key={alphabet} 
                    className={`alphabet-item ${activeFilters.firstAlphabet === alphabet ? 'alphabet-item-selected' : 'alphabet-item'}`} 
                    onClick={() => handleAlphabetChange(alphabet)}
                >
                    {alphabet}
                </span>
            ))}
        </div>
    );
}

export default Alphabets;