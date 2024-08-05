import React from 'react';

/**
 * Sidebar Component
 *
 * @component
 * @namespace Sidebar
 * @param {Object} props - The component accepts various props to handle sidebar functionality.
 * @param {Function} props.setDetailsType - Function to set the type of details to be displayed ('Pathogen', 'Vaccine', 'Manufacturer', 'Accreditation').
 * @param {Array} props.manufacturersList - List of manufacturers available for selection.
 * @param {Object} props.selectedManufacturer - The currently selected manufacturer.
 * @param {Function} props.setSelectedManufacturer - Function to update the selected manufacturer.
 * @param {Function} props.handleSelectManufacturer - Function to handle the selection of a manufacturer.
 * @param {Function} props.handleSearch - Function to handle the search input changes.
 * @param {Function} props.setChangedFrom - Function to set the source of the change triggering the view update.
 * @returns {JSX.Element} The Sidebar component for selecting manufacturers and searching.
 *
 * @example
 * // Example usage of Sidebar component
 * <Sidebar 
 *    setDetailsType={(type) => console.log(type)}
 *    manufacturersList={[{ name: 'ManufacturerA' }, { name: 'ManufacturerB' }]}
 *    selectedManufacturer={{ name: 'ManufacturerA' }}
 *    setSelectedManufacturer={(manufacturer) => console.log(manufacturer)}
 *    handleSelectManufacturer={(manufacturer) => console.log(manufacturer)}
 *    handleSearch={(query) => console.log(query)}
 *    setChangedFrom={(source) => console.log(source)}
 * />
 */

const Sidebar = ({ 
    setDetailsType,
    manufacturersList,  
    selectedManufacturer,
    setSelectedManufacturer, 
    handleSelectManufacturer, 
    handleSearch,
    setChangedFrom
}) => {
    
    const handleChangeManufacturer = manufacturer => {
        if(manufacturer!==selectedManufacturer) {
            setChangedFrom('Sidebar');
            setTimeout(() => {
                handleSelectManufacturer(manufacturer);
                setDetailsType("Manufacturer");
                setChangedFrom('');
            }, 0);
        } else {
            setSelectedManufacturer({});
        }
    }

    return <div className='sidebar col-6 col-sm-4 col-lg-3 ps-1 pe-3 slide-right'>
        <div className='search-container'>
            <span className="position-relative">
                <input type="text" className="text-center bg-info rounded-2 border-dark border-0 w-100" id="search" name="search" placeholder="Search" onChange={e => handleSearch(e.target.value)}/>
                <i className="fa fa-search position-absolute top-50 translate-middle-y end-0 me-2 text-muted" aria-hidden="true"></i>
            </span>
        </div>
        <div className='Manufacturer-list mt-3'>
        {manufacturersList
            .slice() 
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((manufacturer, i) => (
                <div 
                    key={i} 
                    className={`sidebar-item bg-light text-dark rounded-3 py-1 mt-1 ${selectedManufacturer === manufacturer ? 'active' : 'inactive'}`} 
                    onClick={() => handleChangeManufacturer(manufacturer)}
                >
            {manufacturer.name}
        </div>
    ))
}
        </div>
    </div>
}

export default Sidebar;