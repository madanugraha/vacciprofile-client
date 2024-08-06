import React, { useState, useEffect, useRef } from 'react';

import VaccineListTable from './VaccineListTable';
import Pathogen from './Pathogen';
import VaccineInformation from './VaccineInformation';
import ManufacturerProfile from './ManufacturerProfile';
import AccreditationInformation from './AccreditationInformation';

/**
 * View Component
 *
 * @component
 * @namespace Main
 * @param {Object} props - The component accepts various props to handle the display of information.
 * @param {Object} props.activeFilters - The current filters applied to the information view.
 * @param {Function} props.setActiveFilters - Function to update the active filters.
 * @param {Array} props.manufacturersList - List of manufacturers available for selection.
 * @param {Object} props.selectedPathogen - The currently selected pathogen.
 * @param {Object} props.selectedVaccine - The currently selected vaccine.
 * @param {Object} props.selectedManufacturer - The currently selected manufacturer.
 * @param {Object} props.selectedAccreditation - The currently selected accreditation.
 * @param {string} props.activeTab - The type of details to display ('Pathogen', 'Vaccine', 'Manufacturer', 'Accreditation').
 * @param {Function} props.handleSelectPathogen - Function to handle the selection of a pathogen.
 * @param {Function} props.handleSelectVaccine - Function to handle the selection of a vaccine.
 * @param {Function} props.handleSelectAccreditation - Function to handle the selection of an accreditation.
 * @param {Function} props.getPathogenByVaccine - Function to get the pathogen associated with a vaccine.
 * @param {Function} props.getVaccinesByManufacturer - Function to get vaccines associated with a manufacturer.
 * @param {Function} props.getVaccinesByAccreditation - Function to get vaccines associated with an accreditation.
 * @param {Function} props.italizeScientificNames - Function to italicize scientific names in descriptions.
 * @param {Function} props.convertCamelCaseToReadable - Function to convert camel case strings to a readable format.
 * @param {string} props.changedFrom - Source of the change triggering the view update.
 * @returns {JSX.Element} The Information View component displaying detailed information based on the selected type and filters.
 *
 * @example
 * // Example usage of View component
 * <View
 *    activeFilters={{ searchString: '', firstAlphabet: '' }}
 *    setActiveFilters={(filters) => console.log(filters)}
 *    manufacturersList={[]}
 *    selectedPathogen={{ name: 'COVID-19', description: '...' }}
 *    selectedVaccine={{ name: 'VaccineX', description: '...', link: '...', lastUpdated: '...' }}
 *    selectedManufacturer={{ name: 'ManufacturerY', description: '...' }}
 *    selectedAccreditation='AccreditationZ'
 *    activeTab='Pathogen'
 *    handleSelectPathogen={(pathogen) => console.log(pathogen)}
 *    handleSelectVaccine={(vaccine) => console.log(vaccine)}
 *    handleSelectAccreditation={(accreditation) => console.log(accreditation)}
 *    getPathogenByVaccine={(vaccine) => ({ name: 'VirusX' })}
 *    getVaccinesByManufacturer={() => [{ name: 'Vaccine1' }]}
 *    getVaccinesByAccreditation={() => [{ name: 'Vaccine2' }]}
 *    italizeScientificNames={(text) => <i>{text}</i>}
 *    convertCamelCaseToReadable={(text) => text.replace(/([a-z])([A-Z])/g, '$1 $2')}
 *    changedFrom='Sidebar'
 * />
 */

const View = ({
    activeTab,
    activeFilters,
    setActiveFilters,
    manufacturersList, 
    selectedPathogen, 
    selectedVaccine, 
    selectedManufacturer,
    selectedAccreditation, 
    handleSelectPathogen, 
    handleSelectVaccine, 
    handleSelectAccreditation, 
    getPathogenByVaccine,
    getVaccinesByManufacturer,
    getVaccinesByAccreditation,
    italizeScientificNames,
    convertCamelCaseToReadable,
    changedFrom
}) => {
    const detailsRef = useRef(null);
    const prevChangedFrom = useRef(changedFrom);

    const [slideClass, setSlideClass] = useState('slide-left');

    useEffect(() => {
        if (prevChangedFrom.current !== 'Sidebar' && changedFrom !== 'Sidebar') {
            if (detailsRef.current) {
                detailsRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }
        prevChangedFrom.current = changedFrom;
    }, [selectedPathogen, selectedVaccine, selectedManufacturer, selectedAccreditation, changedFrom]);

    useEffect(() => {
        setSlideClass(''); 
        const timeout = setTimeout(() => {
            setSlideClass('slide-left'); 
        }, 0); 
        return () => clearTimeout(timeout);
    }, [selectedManufacturer]);

    return <div className={`view-container bg-white col-6 col-sm-8 col-lg-9 p-0 pe-1 ${slideClass}`}>
        <div className='border border-primary border-1 rounded-4 slide-left'>
            { 
            // manufacturersList.length === 0 ? <div className='empty-view d-flex justify-content-center align-items-center'>
            //         <span className='clear-filters text-decoration-underline' onClick={()=>setActiveFilters({...activeFilters, searchString: '', firstAlphabet: ''})}>
            //             Clear filters
            //         </span>
            //     </div> : 
            (activeTab === 'Manufacturer' && Object.keys(selectedManufacturer).length === 0) ||
            (activeTab === 'Product' && Object.keys(selectedVaccine).length === 0) ||
            (activeTab === 'Pathogen' && Object.keys(selectedPathogen).length === 0)
                ? <div className='empty-view position-relative'>
                <img className='arrow-image position-absolute' src="/images/arrow.png" alt="Arrow" width={100} height={100}/>
                <span className='select-prompt position-absolute'>Select a {activeTab}</span>
            </div> : <>
                {activeTab==="Manufacturer" ? <h1 className='heading text-primary px-3 pt-2'>Updated {selectedManufacturer.name} Reported Data</h1>:null}
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
                    /> : activeTab==="Accreditation" 
                    ? <AccreditationInformation
                        getVaccinesByAccreditation={getVaccinesByAccreditation}
                        handleSelectVaccine={handleSelectVaccine}
                        selectedAccreditation={selectedAccreditation}
                    /> 
                    : null}
                    {activeTab==="Manufacturer" && getVaccinesByManufacturer().length>0 
                    ? <VaccineListTable 
                        activeTab={activeTab}
                        selectedPathogen={selectedPathogen}
                        selectedVaccine={selectedVaccine}
                        selectedAccreditation={selectedAccreditation}
                        handleSelectVaccine={handleSelectVaccine}
                        handleSelectPathogen={handleSelectPathogen} 
                        handleSelectAccreditation={handleSelectAccreditation}
                        getVaccinesByManufacturer={getVaccinesByManufacturer}
                        getPathogenByVaccine={getPathogenByVaccine}
                    /> : ``}
                    </div>
            </>}
        </div>
    </div>
}

export default View;