    import React, { useState, useEffect, useCallback } from 'react';
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
     * handles user interactions, and renders the Header, Sidebar, InformationView, and other components. It 
     * is the entry point into the application.
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
            setActiveTab("Pathogen");
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
            setActiveTab("Vaccine");
        };

        /**
         * Handles selecting a manufacturer.
         *
         * @param {object} manufacturer - The selected manufacturer object.
         */

        const handleSelectManufacturer = manufacturer => {
            setSelectedManufacturer(manufacturer);
            setActiveTab("Manufacturer");
        };

        /**
         * Handles selecting an accreditation.
         *
         * @param {string} accreditation - The selected accreditation.
         */

        const handleSelectAccreditation = accreditation => {
            setSelectedAccreditation(accreditation);
            setActiveTab("Accreditation");
        }

        /**
         * Retrieves the pathogen associated with a vaccine.
         *
         * @param {object} vaccine - The vaccine object.
         * @returns {object} The pathogen object.
         */

        const getPathogenByVaccine = useCallback(vaccine => {
            return pathogens.find(pathogen => pathogen.pathogenId === vaccine.pathogenId);
        }, []);

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
         * @param {Object} [manufacturer=selectedManufacturer] - The manufacturer object to filter vaccines by. Defaults to `selectedManufacturer` if not provided.
         * @returns {Array} List of vaccines from the selected manufacturer.
         */

        const getVaccinesByManufacturer = useCallback((manufacturer = selectedManufacturer) => {
            return vaccines.filter(vaccine => vaccine.manufacturerId === manufacturer.manufacturerId);
        }, [selectedManufacturer]);

        /**
         * Retrieves vaccines by pathogen.
         *
         * @param {Object} pathogen - The pathogen object.
         * @returns {Array} List of vaccines associated with the given pathogen.
         */
        
        const getVaccineByPathogen = useCallback(pathogen => {
            return vaccines.filter(vaccine => vaccine.pathogenId === pathogen.pathogenId);
        }, []);

        /**
         * Retrieves manufacturers by vaccine.
         *
         * @param {Object} vaccine - The vaccine object.
         * @returns {Array} List of manufacturers associated with the given vaccine.
         */

        const getManufacturerByVaccine = useCallback(vaccine => {
            return manufacturers.filter(manufacturer => manufacturer.manufacturerId === vaccine.manufacturerId);
        }, []);

        /**
         * Filters the list of manufacturers based on the search keyword.
         * 
         * This function filters manufacturers and also checks related vaccines and pathogens for matches with the search keyword.
         * 
         * @function
         * @name filterManufacturers
         * 
         * @param {string} keywordLower - The lowercased search keyword used for filtering.
         * @returns {Array} - An array of filtered manufacturers.
         */
        const filterManufacturersBySearch = useCallback((keyword) => {
            return manufacturersList.filter(manufacturer => {
                const matchesKeyword = manufacturer.name.toLowerCase().includes(keyword) ||
                                        manufacturer.description.toLowerCase().includes(keyword);
                if (matchesKeyword) return true;
                
                const vaccines = getVaccinesByManufacturer(manufacturer) || [];
                return vaccines.some(vaccine => {
                    const vaccineMatch = vaccine.name.toLowerCase().includes(keyword) ||
                                        vaccine.description.toLowerCase().includes(keyword);
                    
                    if (vaccineMatch) return true;
                    
                    const pathogens = getPathogenByVaccine(vaccine) || [];
                    return Array.isArray(pathogens) && pathogens.some(pathogen =>
                        pathogen.name.toLowerCase().includes(keyword) ||
                        pathogen.description.toLowerCase().includes(keyword)
                    );
                });
            });
        }, [manufacturersList, getVaccinesByManufacturer, getPathogenByVaccine]);

        /**
         * Filters the list of vaccines based on the search keyword.
         * 
         * This function filters vaccines and also checks related pathogens and manufacturers for matches with the search keyword.
         * 
         * @function
         * @name filterVaccines
         * 
         * @param {string} keyword - The lowercased search keyword used for filtering.
         * @returns {Array} - An array of filtered vaccines.
         */
        const filterVaccinesBySearch = useCallback((keyword) => {
            return vaccinesList.filter(vaccine => {
                const vaccineMatch = vaccine.name.toLowerCase().includes(keyword) ||
                                    vaccine.description.toLowerCase().includes(keyword);
                if (vaccineMatch) return true;
                const pathogens = getPathogenByVaccine(vaccine) || [];
                const pathogenMatch = Array.isArray(pathogens) && pathogens.some(pathogen =>
                    pathogen.name.toLowerCase().includes(keyword) ||
                    pathogen.description.toLowerCase().includes(keyword)
                );
                const manufacturersMatch = getManufacturerByVaccine(vaccine).some(manufacturer =>
                    manufacturer.name.toLowerCase().includes(keyword) ||
                    manufacturer.description.toLowerCase().includes(keyword)
                );
                return pathogenMatch || manufacturersMatch;
            });
        }, [vaccinesList, getPathogenByVaccine, getManufacturerByVaccine]);

        /**
         * Filters the list of pathogens based on the search keyword.
         * 
         * This function filters pathogens and also checks related vaccines and manufacturers for matches with the search keyword.
         * 
         * @function
         * @name filterPathogens
         * 
         * @param {string} keyword - The lowercased search keyword used for filtering.
         * @returns {Array} - An array of filtered pathogens.
         */
        const filterPathogensBySearch = useCallback((keyword) => {
            return pathogensList.filter(pathogen => {
                const pathogenMatch = pathogen.name.toLowerCase().includes(keyword) ||
                                    pathogen.description.toLowerCase().includes(keyword);
                
                if (pathogenMatch) return true;
                
                const vaccines = getVaccineByPathogen(pathogen) || [];
                return Array.isArray(vaccines) && vaccines.some(vaccine => {
                    const vaccineMatch = vaccine.name.toLowerCase().includes(keyword) ||
                                        vaccine.description.toLowerCase().includes(keyword);
                    
                    if (vaccineMatch) return true;
                    
                    return getManufacturerByVaccine(vaccine).some(manufacturer =>
                        manufacturer.name.toLowerCase().includes(keyword) ||
                        manufacturer.description.toLowerCase().includes(keyword)
                    );
                });
            });
        }, [pathogensList, getVaccineByPathogen, getManufacturerByVaccine]);

        /**
         * Filters the sidebar list based on the currently selected tab and search keyword.
         * 
         * This function determines which filtering function to use based on the active tab and updates the `sidebarList` state
         * with the filtered list of items that match the search criteria.
         * 
         * @function
         * @name filterLists
         * 
         * @returns {void} This function does not return a value. It updates the `sidebarList` state directly.
         */
        const filterListsBySearch = useCallback(() => {
            let filteredSidebarList = [];
            
            if (activeFilters.searchKeyword) {
                const keywordLower = activeFilters.searchKeyword.toLowerCase()
                
                if (activeTab === 'Manufacturer') {
                    filteredSidebarList = filterManufacturersBySearch(keywordLower);
                } else if (activeTab === 'Product') {
                    filteredSidebarList = filterVaccinesBySearch(keywordLower);
                } else if (activeTab === 'Pathogen') {
                    filteredSidebarList = filterPathogensBySearch(keywordLower);
                }
                setSidebarList(filteredSidebarList);
            } else {
                if (activeTab === 'Manufacturer') {
                    setSidebarList(manufacturersList);
                } else if (activeTab === 'Product') {
                    setSidebarList(vaccinesList);
                } else if (activeTab === 'Pathogen') {
                    setSidebarList(pathogensList);
                }
            }
        }, [activeFilters.searchKeyword, activeTab, manufacturersList, pathogensList, vaccinesList, filterManufacturersBySearch, filterPathogensBySearch, filterVaccinesBySearch]);        
        
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
            filterListsBySearch();
        },[activeTab, pathogensList, vaccinesList, manufacturersList, filterListsBySearch])

        useEffect(() => {
            filterListsBySearch();
        }, [activeFilters, filterListsBySearch]);
        
        return (
            <div className='vacciprofile-page'>
                <div className='container'>
                    <Header/>
                    <TopBar
                        activeTab={activeTab}
                        handleTabChange={handleTabChange}
                        handleSearch={handleSearch}
                    />
                    <div className='row py-4'>
                        <Sidebar
                            activeTab={activeTab}
                            sidebarList={sidebarList}
                            selectedManufacturer={selectedManufacturer}
                            setSelectedManufacturer={setSelectedManufacturer}
                            handleSelectManufacturer={handleSelectManufacturer}
                            setChangedFrom={setChangedFrom}
                            changedFrom={changedFrom}
                            setActiveTab={setActiveTab}
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
