import React, { useState, useEffect, useRef } from 'react';

import VaccineListTable from './information/VaccineListTable';
import Pathogen from './information/Pathogen';
import VaccineInformation from './information/VaccineInformation';
import ManufacturerProfile from './information/ManufacturerProfile';
import Licenser from './information/Licenser';

/**
 * Main Component
 *
 * @component
 * @namespace Main
 * @param {Object} props - The component accepts various props to handle the display of information.
 * @param {Object} props.selectedPathogen - The currently selected pathogen.
 * @param {Object} props.selectedVaccine - The currently selected vaccine.
 * @param {Object} props.selectedManufacturer - The currently selected manufacturer.
 * @param {Object} props.selectedLicenser - The currently selected licenser.
 * @param {string} props.activeTab - The type of details to display ('Pathogen', 'Vaccine', 'Manufacturer', 'Licenser').
 * @param {Function} props.handleSelectPathogen - Function to handle the selection of a pathogen.
 * @param {Function} props.handleSelectVaccine - Function to handle the selection of a vaccine.
 * @param {Function} props.handleSelectLicenser - Function to handle the selection of an licenser.
 * @param {Function} props.getPathogenByVaccine - Function to get the pathogen associated with a vaccine.
 * @param {Function} props.getVaccinesByManufacturer - Function to get vaccines associated with a manufacturer.
 * @param {Function} props.getVaccinesByLicenser - Function to get vaccines associated with an licenser.
 * @param {Function} props.italizeScientificNames - Function to italicize scientific names in descriptions.
 * @param {Function} props.convertCamelCaseToReadable - Function to convert camel case strings to a readable format.
 * @param {Function} props.getLicenserById - Function to retrieve licenser details by ID.
 * @param {string} props.changedFrom - Source of the change triggering the main update.
 * @returns {JSX.Element} The Main component displaying detailed information based on the selected type and filters.
 *
 * @example
 * // Example usage of Main component
 * <Main
 *    selectedPathogen={{ name: 'COVID-19', description: '...' }}
 *    selectedVaccine={{ name: 'VaccineX', description: '...', link: '...', lastUpdated: '...' }}
 *    selectedManufacturer={{ name: 'ManufacturerY', description: '...' }}
 *    selectedLicenser='LicenserZ'
 *    activeTab='Pathogen'
 *    handleSelectPathogen={(pathogen) => console.log(pathogen)}
 *    handleSelectVaccine={(vaccine) => console.log(vaccine)}
 *    handleSelectLicenser={(licenser) => console.log(licenser)}
 *    getPathogenByVaccine={(vaccine) => ({ name: 'VirusX' })}
 *    getVaccinesByManufacturer={() => [{ name: 'Vaccine1' }]}
 *    getVaccinesByLicenser={() => [{ name: 'Vaccine2' }]}
 *    italizeScientificNames={(text) => <i>{text}</i>}
 *    convertCamelCaseToReadable={(text) => text.replace(/([a-z])([A-Z])/g, '$1 $2')}
 *    changedFrom='Sidebar'
 *    getLicenserById={(id) => ({ licenserId: id, name: 'LicenserZ' })}
 * />
 */

const Main = ({
    activeTab,
    selectedPathogen, 
    selectedVaccine, 
    selectedManufacturer,
    selectedLicenser, 
    handleSelectPathogen, 
    handleSelectVaccine, 
    handleSelectLicenser, 
    getPathogenByVaccine,
    getVaccinesByManufacturer,
    getVaccinesByLicenser,
    italizeScientificNames,
    convertCamelCaseToReadable,
    changedFrom,
    getLicenserById
}) => {
    const detailsRef = useRef(null);
    const prevChangedFrom = useRef(changedFrom);

    const [slideClass, setSlideClass] = useState('slide-left');

    useEffect(() => {
        if (prevChangedFrom.current !== 'Sidebar' && changedFrom !== 'Sidebar') {
            if (detailsRef.current) {
                detailsRef.current.scrollIntoMain({ behavior: 'smooth' });
            }
        }
        prevChangedFrom.current = changedFrom;
    }, [selectedPathogen, selectedVaccine, selectedManufacturer, selectedLicenser, changedFrom]);

    useEffect(() => {
        setSlideClass(''); 
        const timeout = setTimeout(() => {
            setSlideClass('slide-left'); 
        }, 0); 
        return () => clearTimeout(timeout);
    }, [selectedManufacturer]);

    return <div className={`main-container bg-white col-6 col-sm-8 col-lg-9 p-0 pe-1 ${slideClass}`}>
        <div className='border border-primary border-1 rounded-4 slide-left'>
            { 
            // manufacturersList.length === 0 ? <div className='empty-main d-flex justify-content-center align-items-center'>
            //         <span className='clear-filters text-decoration-underline' onClick={()=>setActiveFilters({...activeFilters, searchString: ''})}>
            //             Clear filters
            //         </span>
            //     </div> : 
            (activeTab === 'Manufacturer' && Object.keys(selectedManufacturer).length === 0) ||
            (activeTab === 'Product' && Object.keys(selectedVaccine).length === 0) ||
            (activeTab === 'Pathogen' && Object.keys(selectedPathogen).length === 0) ||
            (activeTab === 'Licenser' && Object.keys(selectedLicenser).length === 0)
                ? <div className='empty-main position-relative'>
                <img className='arrow-image position-absolute' src="/images/arrow.png" alt="Arrow" width={100} height={100}/>
                <span className='select-prompt position-absolute'>Select a {activeTab}</span>
            </div> : <>
                {activeTab==="Manufacturer" ? <h1 className='heading text-primary px-3 pt-2'>Updated {selectedManufacturer.name} Reported Data ({selectedManufacturer.lastUpdated})</h1>:null}
                <div className='details-container px-3 pt-2 pb-3' ref={detailsRef}>
                    {activeTab==="Pathogen" 
                    ? <Pathogen 
                        selectedPathogen={selectedPathogen} 
                        italizeScientificNames={italizeScientificNames}
                    /> : activeTab==="Product" 
                    ? <VaccineInformation 
                        selectedVaccine={selectedVaccine}
                        italizeScientificNames={italizeScientificNames}
                    /> : activeTab==="Manufacturer" 
                    ? <ManufacturerProfile
                        selectedManufacturer={selectedManufacturer}
                        getVaccinesByManufacturer={getVaccinesByManufacturer}
                        convertCamelCaseToReadable={convertCamelCaseToReadable}
                    /> : activeTab==="Licenser" 
                    ? <Licenser
                        getVaccinesByLicenser={getVaccinesByLicenser}
                        handleSelectVaccine={handleSelectVaccine}
                        selectedLicenser={selectedLicenser}
                    />
                    : null}
                    {activeTab==="Manufacturer" && getVaccinesByManufacturer().length>0 
                    ? <VaccineListTable 
                        activeTab={activeTab}
                        selectedPathogen={selectedPathogen}
                        selectedVaccine={selectedVaccine}
                        selectedLicenser={selectedLicenser}
                        handleSelectVaccine={handleSelectVaccine}
                        handleSelectPathogen={handleSelectPathogen} 
                        handleSelectLicenser={handleSelectLicenser}
                        getVaccinesByManufacturer={getVaccinesByManufacturer}
                        getPathogenByVaccine={getPathogenByVaccine}
                        getLicenserById={getLicenserById}
                    /> : ``}
                </div>
            </>}
        </div>
    </div>
}

export default Main;