import React, { useState, useEffect } from 'react';

/**
 * Sidebar Component
 *
 * A component that displays a sidebar for selecting manufacturers, products, or pathogens. It supports changing the active tab and handling item selection.
 *
 * @component
 * @namespace Sidebar
 * @param {Object} props - The component accepts various props to handle sidebar functionality.
 * @param {string} props.activeTab - The currently active tab, which can be 'Manufacturer', 'Vaccine', or 'Pathogen'.
 * @param {Function} props.setActiveTab - Function to set the type of details to be displayed ('Manufacturer', 'Vaccine', or 'Pathogen').
 * @param {Array} props.sidebarList - List of items (manufacturers, products, or pathogens) available for selection.
 * @param {Object} props.selectedVaccine - The currently selected vaccine.
 * @param {Object} props.selectedPathogen - The currently selected pathogen.
 * @param {Object} props.selectedManufacturer - The currently selected manufacturer.
 * @param {Object} props.selectedLicenser - The currently selected licenser.
 * @param {Function} props.setSelectedVaccine - Function to update the selected vaccine.
 * @param {Function} props.setSelectedPathogen - Function to update the selected pathogen.
 * @param {Function} props.setSelectedManufacturer - Function to update the selected manufacturer.
 * @param {Function} props.setSelectedLicenser - Function to update the selected licenser.
 * @param {String} props.changedFrom - The param where the selected item change took place
 * @param {Function} props.setChangedFrom - Function to set the source of the change triggering the main update.
 * @param {Function} props.italizeScientificNames - Function that converts scientific names in the description to italicized text.
 * @returns {JSX.Element} The Sidebar component for selecting items and updating the main based on the active tab.
 *
 * @example
 * // Example usage of Sidebar component
 * <Sidebar 
 *    activeTab="Manufacturer"
 *    setActiveTab={(type) => console.log(type)}
 *    sidebarList={[{ name: 'ItemA' }, { name: 'ItemB' }]}
 *    selectedManufacturer={{ name: 'ItemA' }}
 *    selectedVaccine={{ name: 'ItemB' }}
 *    selectedPathogen={{ name: 'ItemC' }}
 *    selectedLicenser={{ name: 'ItemC' }}
 *    setSelectedManufacturer={(item) => console.log(item)}
 *    setSelectedVaccine={(item) => console.log(item)}
 *    setSelectedPathogen={(item) => console.log(item)}
 *    setSelectedLicenser={(item) => console.log(item)}
 *    changedFrom='Sidebar'
 *    setChangedFrom={(source) => console.log(source)}
 *    italizeScientificNames={text => text.replace(/(SARS-CoV-2)/g, '<i>$1</i>')}
 * />
 */

const Sidebar = ({ 
    activeTab,
    setActiveTab,
    sidebarList = [],
    selectedVaccine,
    selectedPathogen,
    selectedManufacturer,
    selectedLicenser,
    setSelectedVaccine,
    setSelectedPathogen,
    setSelectedManufacturer,
    setSelectedLicenser,  
    setChangedFrom,
    changedFrom,
    italizeScientificNames
}) => {

    const [animationClass, setAnimationClass] = useState('slide-right');
    const [showCountries, setShowCountries] = useState(false);

    const licenserFilter = ["FDA", "EMA", "WHO"];
    const filteredSidebarList = activeTab === 'Licenser' 
        ? sidebarList.filter(item => licenserFilter.includes(item.name))
        : sidebarList;

    const handleClickSidebar = item => {
        setChangedFrom('Sidebar');

        setTimeout(() => {
            if (activeTab === 'Manufacturer') {
                if (item !== selectedManufacturer) {
                    setSelectedManufacturer(item);
                    setActiveTab('Manufacturer');
                } else {
                    setSelectedManufacturer({});
                }
            } else if (activeTab === 'Vaccine') {
                if (item !== selectedVaccine) {
                    setSelectedVaccine(item);
                    setActiveTab('Vaccine');
                } else {
                    setSelectedVaccine({});
                }
            } else if (activeTab === 'Pathogen') {
                if (item !== selectedPathogen) {
                    setSelectedPathogen(item);
                    setActiveTab('Pathogen');
                } else {
                    setSelectedPathogen({});
                }
            } else if (activeTab === 'Licenser') {
                if (item.name === 'Countries') {
                    setShowCountries(!showCountries);
                } else if (item !== selectedLicenser) {
                    setSelectedLicenser(item);
                    setActiveTab('Licenser');
                } else {
                    setSelectedLicenser({});
                }
            }
            setChangedFrom('');
        }, 5);
    };
    
    useEffect(() => {
        if (changedFrom === "Topbar") {
            setAnimationClass('');
            const timeout = setTimeout(() => {
                setAnimationClass('slide-right');
            }, 20);
            return () => clearTimeout(timeout);
        }
    }, [changedFrom]);

    return (
        <div className={`sidebar col-6 col-sm-4 col-lg-3 ps-1 pe-0 ${animationClass}`}>
            <div className='sidebar-items overflow-auto'>
                {filteredSidebarList.map((item, i) => (
                    <div 
                        key={i} 
                        className={`sidebar-item bg-sidebar-unselected text-dark rounded-3 ms-2 mb-1 ${
                            activeTab === 'Licenser' && selectedLicenser === item ? 'active' : 'inactive'
                        }`} 
                        onClick={() => handleClickSidebar(item)}
                    >
                        {italizeScientificNames(item.name)}
                    </div>
                ))}
                {activeTab === 'Licenser' && (
                    <div 
                        key='Countries'
                        className={`sidebar-item bg-sidebar-unselected text-dark rounded-3 py-1 ms-2 mb-1 ${
                            showCountries ? 'active' : 'inactive'
                        }`} 
                        onClick={() => handleClickSidebar({ name: 'Countries' })}
                    >
                        Countries
                    </div>
                )}
                {showCountries && sidebarList.filter(item => !licenserFilter.includes(item.name)).map((item, i) => (
                    <div 
                        key={`country-${i}`} 
                        className="sidebar-item bg-sidebar-unselected text-dark rounded-3 py-1 ms-2 mb-1"
                        onClick={() => handleClickSidebar(item)}
                    >
                        {italizeScientificNames(item.name)}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;