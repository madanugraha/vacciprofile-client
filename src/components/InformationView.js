import React, { useState, useEffect, useRef } from 'react';

import VaccineListTable from './information/VaccineListTable';
import MicrobeInformation from './information/MicrobeInformation';
import VaccineInformation from './information/VaccineInformation';
import ManufacturerInformation from './information/ManufacturerInformation';
import AccreditationInformation from './information/AccreditationInformation';

/**
 * InformationView Component
 *
 * @component
 * @namespace Main
 * @param {Object} props - The component accepts various props to handle the display of information.
 * @param {Object} props.activeFilters - The current filters applied to the information view.
 * @param {Function} props.setActiveFilters - Function to update the active filters.
 * @param {Array} props.manufacturersList - List of manufacturers available for selection.
 * @param {Object} props.selectedMicrobe - The currently selected microbe.
 * @param {Object} props.selectedVaccine - The currently selected vaccine.
 * @param {Object} props.selectedManufacturer - The currently selected manufacturer.
 * @param {Object} props.selectedAccreditation - The currently selected accreditation.
 * @param {string} props.detailsType - The type of details to display ('Microbe', 'Vaccine', 'Manufacturer', 'Accreditation').
 * @param {Function} props.handleSelectMicrobe - Function to handle the selection of a microbe.
 * @param {Function} props.handleSelectVaccine - Function to handle the selection of a vaccine.
 * @param {Function} props.handleSelectAccreditation - Function to handle the selection of an accreditation.
 * @param {Function} props.getMicrobeByVaccine - Function to get the microbe associated with a vaccine.
 * @param {Function} props.getVaccinesByManufacturer - Function to get vaccines associated with a manufacturer.
 * @param {Function} props.getVaccinesByAccreditation - Function to get vaccines associated with an accreditation.
 * @param {Function} props.italizeScientificNames - Function to italicize scientific names in descriptions.
 * @param {Function} props.convertCamelCaseToReadable - Function to convert camel case strings to a readable format.
 * @param {string} props.changedFrom - Source of the change triggering the view update.
 * @returns {JSX.Element} The Information View component displaying detailed information based on the selected type and filters.
 *
 * @example
 * // Example usage of InformationView component
 * <InformationView
 *    activeFilters={{ searchString: '', firstAlphabet: '' }}
 *    setActiveFilters={(filters) => console.log(filters)}
 *    manufacturersList={[]}
 *    selectedMicrobe={{ name: 'COVID-19', description: '...' }}
 *    selectedVaccine={{ name: 'VaccineX', description: '...', link: '...', lastUpdated: '...' }}
 *    selectedManufacturer={{ name: 'ManufacturerY', description: '...' }}
 *    selectedAccreditation='AccreditationZ'
 *    detailsType='Microbe'
 *    handleSelectMicrobe={(microbe) => console.log(microbe)}
 *    handleSelectVaccine={(vaccine) => console.log(vaccine)}
 *    handleSelectAccreditation={(accreditation) => console.log(accreditation)}
 *    getMicrobeByVaccine={(vaccine) => ({ name: 'VirusX' })}
 *    getVaccinesByManufacturer={() => [{ name: 'Vaccine1' }]}
 *    getVaccinesByAccreditation={() => [{ name: 'Vaccine2' }]}
 *    italizeScientificNames={(text) => <i>{text}</i>}
 *    convertCamelCaseToReadable={(text) => text.replace(/([a-z])([A-Z])/g, '$1 $2')}
 *    changedFrom='Sidebar'
 * />
 */

const InformationView = ({
    activeFilters,
    setActiveFilters,
    manufacturersList, 
    selectedMicrobe, 
    selectedVaccine, 
    selectedManufacturer,
    selectedAccreditation, 
    detailsType, 
    handleSelectMicrobe, 
    handleSelectVaccine, 
    handleSelectAccreditation, 
    getMicrobeByVaccine,
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
    }, [selectedMicrobe, selectedVaccine, selectedManufacturer, selectedAccreditation, changedFrom]);

    useEffect(() => {
        setSlideClass(''); 
        const timeout = setTimeout(() => {
            setSlideClass('slide-left'); 
        }, 0); 
        return () => clearTimeout(timeout);
    }, [selectedManufacturer]);

    return <div className={`view-container bg-white col-6 col-sm-8 col-lg-9 p-0 pe-1 ${slideClass}`}>
        <div className='border border-primary border-1 rounded-4 slide-left'>
            { manufacturersList.length === 0 ? <div className='empty-view d-flex justify-content-center align-items-center'>
                    <span className='clear-filters text-decoration-underline' onClick={()=>setActiveFilters({...activeFilters, searchString: '', firstAlphabet: ''})}>
                        Clear filters
                    </span>
                </div> : ( manufacturersList.length!==0 && JSON.stringify(selectedManufacturer) === '{}') 
                ? <div className='empty-view position-relative'>
                <img className='arrow-image position-absolute' src="/images/arrow.png" alt="Arrow" width={100} height={100}/>
                <span className='select-prompt position-absolute'>Select a Manufacturer</span>
            </div> : <>
                <h1 className='heading text-primary px-3 pt-2'>Updated {selectedManufacturer.name} Reported Data</h1>
                {getVaccinesByManufacturer().length>0 
                ? <VaccineListTable 
                    detailsType={detailsType}
                    selectedMicrobe={selectedMicrobe}
                    selectedVaccine={selectedVaccine}
                    selectedAccreditation={selectedAccreditation}
                    handleSelectVaccine={handleSelectVaccine}
                    handleSelectMicrobe={handleSelectMicrobe} 
                    handleSelectAccreditation={handleSelectAccreditation}
                    getVaccinesByManufacturer={getVaccinesByManufacturer}
                    getMicrobeByVaccine={getMicrobeByVaccine}
                /> : ``}
                <div className='details-container px-3 pt-2 pb-3' ref={detailsRef}>
                    {detailsType==="Microbe" 
                    ? <MicrobeInformation 
                        selectedMicrobe={selectedMicrobe} 
                        italizeScientificNames={italizeScientificNames}
                    /> : detailsType==="Vaccine" 
                    ? <VaccineInformation 
                        selectedVaccine={selectedVaccine}
                        italizeScientificNames={italizeScientificNames}
                    /> : detailsType==="Manufacturer" 
                    ? <ManufacturerInformation
                        selectedManufacturer={selectedManufacturer}
                        getVaccinesByManufacturer={getVaccinesByManufacturer}
                        convertCamelCaseToReadable={convertCamelCaseToReadable}
                    /> : detailsType==="Accreditation" 
                    ? <AccreditationInformation
                        getVaccinesByAccreditation={getVaccinesByAccreditation}
                        handleSelectVaccine={handleSelectVaccine}
                        selectedAccreditation={selectedAccreditation}
                    /> 
                    : <></>}
                </div>
            </>}
        </div>
    </div>
}

export default InformationView;