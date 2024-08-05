import React, { useState, useEffect } from 'react';
import './App.scss';
import './assets/animations/animations.css';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import InformationView from './components/InformationView.js';
import TopBar from './components/TopBar.js';

import manufacturers from './assets/data/manufacturers.json';
import pathogens from './assets/data/pathogens.json';
import vaccines from './assets/data/vaccines.json';
import scientificNames from './assets/scientificNames';

/**
 * Main application component for the vaccine profile page.
 *
 * @component
 *
 * @description 
 * This is the main component of the vaccine profile application. It manages the state of selected items, 
 * handles user interactions, and renders the Header, Sidebar, InformationView, and AlphabetsNavigation components.
 *
 * @returns {JSX.Element} The main application component containing all sub-components and logic.
 *
 * @example
 * // Example usage of App component
 * <App />
 */

const App = () => {
    const [activeTab, setActiveTab] = useState('Manufacturer');
    const [activeFilters, setActiveFilters] = useState({
        firstAlphabet: '',
        searchKeyword: ''
    })
    const [ selectedPathogen, setSelectedPathogen ] = useState({});
    const [ selectedVaccine, setSelectedVaccine ] = useState({});
    const [ selectedManufacturer, setSelectedManufacturer ] = useState({});
    const [ selectedAccreditation, setSelectedAccreditation ] = useState("")
    const [ detailsType, setDetailsType ] = useState("");
    const [ sidebarList, setSidebarList ] = useState();
    const [ pathogensList, setPathogensList ] = useState();
    const [ vaccinesList, setVaccinesList ] = useState();
    const [ manufacturersList, setManufacturersList ] = useState(manufacturers);
    const [ changedFrom, setChangedFrom ] = useState('');

    /**
     * Handles the search input change.
     *
     * @param {string} tab - The selected tab type can be "Manufacturers", "Pathogens" or "Products".
     */
    
    const handleTabChange = tab => {
        setActiveTab(tab);
    };

    /**
     * Handles the search input change.
     *
     * @param {string} keyword - The search keyword.
     */

    const handleSearch = keyword => {
        setActiveFilters({...activeFilters, 
            searchKeyword: keyword
        })
    };

    /**
     * Handles selecting a pathogen.
     *
     * @param {object} pathogen - The selected pathogen object.
     */

    const handleSelectPathogen = pathogen => {
        const vaccine = vaccines.find(vaccine => vaccine.vaccineId === pathogen.vaccines[0].vaccineId);
        setSelectedVaccine(vaccine);
        setSelectedPathogen(pathogen);
        setDetailsType("Pathogen");
        setActiveFilters({...activeFilters, firstAlphabet: ''});
    };

    /**
     * Handles selecting a vaccine.
     *
     * @param {object} vx - The selected vaccine object.
     */

    const handleSelectVaccine = vx => {
        const vaccine = vaccines.find(vaccine => vaccine.name === vx.name);
        setSelectedVaccine(vaccine);
        setDetailsType("Vaccine");
    };

    /**
     * Handles selecting a manufacturer.
     *
     * @param {object} manufacturer - The selected manufacturer object.
     */

    const handleSelectManufacturer = manufacturer => {
        setSelectedManufacturer(manufacturer);
        setDetailsType("Manufacturer");
    };

    /**
     * Handles selecting an accreditation.
     *
     * @param {string} accreditation - The selected accreditation.
     */

    const handleSelectAccreditation = accreditation => {
        setSelectedAccreditation(accreditation);
        setDetailsType("Accreditation");
    }

    /**
     * Retrieves the pathogen associated with a vaccine.
     *
     * @param {object} vaccine - The vaccine object.
     * @returns {object} The pathogen object.
     */

    const getPathogenByVaccine = vaccine => {
        return pathogens.find(pathogen => pathogen.pathogenId === vaccine.pathogenId);
    };

    /**
     * Retrieves vaccines by accreditation.
     *
     * @returns {Array} List of vaccines with the selected accreditation.
     */

    const getVaccinesByAccreditation = () => {
        return vaccines.filter(vaccine => vaccine.accreditation.includes(selectedAccreditation));
    }

    /**
     * Retrieves vaccines by manufacturer.
     *
     * @returns {Array} List of vaccines from the selected manufacturer.
     */

    const getVaccinesByManufacturer = () => {
        return vaccines.filter(vaccine => vaccine.manufacturerId === selectedManufacturer.manufacturerId);
    }

    /**
     * Converts camel case strings to readable format.
     *
     * @param {string} string - The camel case string.
     * @returns {string} The readable string.
     */

    const convertCamelCaseToReadable = string => {
        return string==="ceo" ? "CEO" : string.replace(/([A-Z])/g, ' $1')
    };

    /**
     * Italizes scientific names in a given text.
     *
     * @param {string} text - The text containing scientific names.
     * @returns {JSX.Element} The text with scientific names italicized.
     */

    const italizeScientificNames = text => {
        const parts = text.split(new RegExp(`(${scientificNames.join('|')})`, 'gi'));
    
        return (
            <span>
                {parts.map((part, index) => {
                    const isScientificName = part && scientificNames.some(name => name.toLowerCase() === part.toLowerCase());
                    return isScientificName ? (
                        <i key={index}>{part}</i>
                    ) : (
                        part
                    );
                })}
            </span>
        );
    };

    useEffect(()=>{
        setManufacturersList(manufacturers);
        setPathogensList(pathogens);
        setVaccinesList(vaccines);
    },[])

    useEffect(()=>{
        if (activeTab === "Pathogen") {
            setSidebarList(pathogensList || []);
        } else if (activeTab === "Product") {
            setSidebarList(vaccinesList || []);
        } else if (activeTab === "Manufacturer")  {
            setSidebarList(manufacturersList || []);
        }
        console.log("sidebarList: ", sidebarList)
    },[activeTab, pathogensList, vaccinesList, manufacturersList])

    useEffect(() => {
        const filterManufacturersList = () => {
            let filteredManufacturersList;
            if (activeFilters.searchKeyword) {
                filteredManufacturersList = manufacturers.filter(manufacturer =>
                    manufacturer.name.toLowerCase().includes(activeFilters.searchKeyword.toLowerCase()) ||
                    manufacturer.description.toLowerCase().includes(activeFilters.searchKeyword.toLowerCase())
                );
            } else {
                filteredManufacturersList = manufacturers;
            }

            if (activeFilters.firstAlphabet) {
                filteredManufacturersList = filteredManufacturersList.filter(manufacturer =>
                    manufacturer.name.startsWith(activeFilters.firstAlphabet)
                );
            }
            setManufacturersList(filteredManufacturersList);
        };

        filterManufacturersList();
    }, [activeFilters]);
    
    return (
        <div className='vacciprofile-page'>
            <div className='container'>
                <Header/>
                <TopBar
                    activeTab={activeTab}
                    handleTabChange={handleTabChange}
                />
                <div className='row py-4'>
                    <Sidebar
                        activeTab={activeTab}
                        sidebarList={sidebarList}
                        selectedManufacturer={selectedManufacturer}
                        setSelectedManufacturer={setSelectedManufacturer}
                        handleSelectManufacturer={handleSelectManufacturer}
                        handleSearch={handleSearch}
                        setChangedFrom={setChangedFrom}
                        changedFrom={changedFrom}
                        setDetailsType={setDetailsType}
                    />
                    <InformationView
                        activeTab={activeTab}
                        activeFilters={activeFilters}
                        setActiveFilters={setActiveFilters}
                        manufacturersList={manufacturersList}
                        selectedPathogen={selectedPathogen}
                        selectedVaccine={selectedVaccine}
                        selectedManufacturer={selectedManufacturer}
                        selectedAccreditation={selectedAccreditation}
                        detailsType={detailsType}
                        handleSelectPathogen={handleSelectPathogen}
                        handleSelectVaccine={handleSelectVaccine}
                        handleSelectManufacturer={handleSelectManufacturer}
                        handleSelectAccreditation={handleSelectAccreditation}
                        getPathogenByVaccine={getPathogenByVaccine}
                        getVaccinesByManufacturer={getVaccinesByManufacturer}
                        getVaccinesByAccreditation={getVaccinesByAccreditation}
                        italizeScientificNames={italizeScientificNames}
                        convertCamelCaseToReadable={convertCamelCaseToReadable}
                        changedFrom={changedFrom}
                    />
                    {/* <AlphabetsNavigation 
                        activeFilters={activeFilters} 
                        setActiveFilters={setActiveFilters}
                        setSelectedManufacturer={setSelectedManufacturer}
                    /> */}
                </div>
            </div>
        </div>
    );
};

export default App;
