import React, { useState, useEffect, useCallback } from 'react';
import './App.scss';
import './assets/animations/animations.css';

import Header from './components/Header';
import AlphabetsBar from './components/AlphabetsBar.js';
import Sidebar from './components/Sidebar';
import Main from './components/Main.js';
import TopBar from './components/TopBar.js';
// import Footer from './components/Footer.js';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import manufacturers from './assets/data/manufacturers.json';
import pathogens from './assets/data/pathogens.json';
import vaccines from './assets/data/vaccines.json';
import pipelineVaccines from './assets/data/pipeline-vaccines.json';
import licensers from './assets/data/licensers.json';
import { finalRemapNitagCountry } from './assets/data/nitag-countries.js';
import scientificNames from './assets/scientificNames';
import { compareMenu } from './assets/data/compare-vaccine.js';
import { getCandidatePathogens, getCandidateVaccines, removeDuplicatesFromArray, sortArrayAscending } from './utils/array.js';
import { getAllSinglePathogenArray } from './utils/pathogens.js';

/**
 * Main application component for the vaccine profile page.
 *
 * @component
 *
 * @description 
 * This is the main component of the vaccine profile application. It manages the state of selected items, 
 * handles user interactions, and renders the Header, Sidebar, Main, and other components. It 
 * is the entry point into the application.
 *
 * @returns {JSX.Element} The main application component containing all sub-components and logic.
 *
 * @example
 * // Example usage of App component
 * <App />
 */

const App = () => {
    const [activeTab, setActiveTab] = useState('Pathogen');
    const [activeFilters, setActiveFilters] = useState({
        firstAlphabet: '',
        searchKeyword: ''
    })
    const [pathogensList, setPathogensList] = useState(pathogens);
    const [vaccinesList, setVaccinesList] = useState();
    const [pipelineVaccineList, setPipelineVaccinesList] = useState();
    const [manufacturersList, setManufacturersList] = useState();
    const [licensersList, setLicensersList] = useState();
    // const [compareList, setCompareList] = useState();
    const [sidebarList, setSidebarList] = useState();
    const [selectedPathogen, setSelectedPathogen] = useState({});
    const [selectedVaccine, setSelectedVaccine] = useState({});
    const [selectedVaccineCandidate, setSelectedVaccineCandidate] = useState({});
    const [selectedManufacturer, setSelectedManufacturer] = useState({});
    const [selectedLicenser, setSelectedLicenser] = useState({})
    const [selectedCompare, setSelectedCompare] = useState({});
    const [selectedNitag, setSelectedNitag] = useState({});
    const [changedFrom, setChangedFrom] = useState('');

    /**
     * Handles the change in the selected alphabet filter.
     * Updates the active filters and resets the selected item.
     *
     * @param {string} letter - The alphabet letter that is selected or deselected.
     * @returns {void}
     */
    const sampleVaccineCandidatePathogen = sortArrayAscending(removeDuplicatesFromArray(getCandidatePathogens(), "name"), "name")

    const handleAlphabetChange = letter => {
        setActiveFilters({
            ...activeFilters,
            firstAlphabet: activeFilters.firstAlphabet === letter ? '' : letter
        });
        setSelectedManufacturer({});
        setSelectedPathogen({});
        setSelectedVaccine({});
        setSelectedLicenser({});
        setSelectedVaccineCandidate({});
        setSelectedNitag({});
    }

    /**
     * Handles the search input change.
     *
     * @param {string} tab - The selected tab type can be "Manufacturer", "Pathogen", "Vaccine" or "Licenser".
     */
    const handleTabChange = tab => {
        setChangedFrom('Topbar');

        setTimeout(() => {
            setChangedFrom('');
        }, 500);

        if (activeTab === tab) {
            switch (activeTab) {
                case 'Manufacturer':
                    setSelectedManufacturer({});
                    break;
                case 'Pathogen':
                    setSelectedPathogen({});
                    break;
                case 'Licensed Vaccines':
                    setSelectedVaccine({});
                    break;
                case 'Vaccine Candidates':
                    setSelectedVaccineCandidate({});
                    break;
                case 'Vaccine':
                    setSelectedVaccine({});
                    break;
                case 'Licenser':
                    setSelectedLicenser({});
                    break;
                case 'Compare':
                    setSelectedCompare({});
                    break;
                case 'Nitag':
                    setSelectedNitag({});
                    break;
                default:
                    break;
            }
        }
        else setActiveTab(tab);
    };

    /**
     * Handles the search input change.
     *
     * @param {string} keyword - The search keyword.
     */

    const handleSearch = keyword => {
        setActiveFilters({
            ...activeFilters,
            searchKeyword: keyword
        })
    };


    const sampleVaccineCandidatesVaccine = getCandidateVaccines();

    /**
     * Handles selecting a pathogen.
     *
     * @param {object} pathogen - The selected pathogen object.
     */

    const handleSelectPathogen = pathogen => {
        const vaccine = vaccines.find(vaccine => vaccine.vaccineId === pathogen.vaccines[0].vaccineId);
        setSelectedVaccine(vaccine);
        setSelectedPathogen(pathogen);
        setActiveTab("Licensed Vaccines");
        setActiveFilters({ ...activeFilters });
    };

    /**
     * Handles selecting a vaccine.
     *
     * @param {object} v - The selected vaccine object.
     */

    const handleSelectVaccine = v => {
        const vaccine = vaccines.find(vaccine => vaccine.vaccineId === v.vaccineId);
        setSelectedVaccine(vaccine);
        setActiveTab("Licensed Vaccines");
    };

    const handleSelectVaccineCandidate = v => {
        const vaccine = sampleVaccineCandidatesVaccine.find(vaccine => vaccine.vaccineId === v.vaccineId);
        setSelectedVaccineCandidate(vaccine);
        setActiveTab("Vaccine Candidates");
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
     * Handles selecting an licenser.
     *
     * @param {string} licenser - The selected licenser.
     */

    const handleSelectLicenser = licenser => {
        setSelectedLicenser(licenser);
        setActiveTab("Licenser");
    };

    const handleSelectNitag = nitag => {
        setSelectedNitag(nitag);
        setActiveTab("Nitag");
    }

    /**
     * Handles selecting an Vaccine to Compare.
     *
     * @param {string} compare - The selected vaccine comparison.
     */

    const handleSelectCompare = compare => {
        setSelectedCompare(compare);
        setActiveTab("Compare");
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


    const getComparisonByName = useCallback(item => {
        return compareMenu.find(menu => menu.name === item.name);
    }, []);

    /**
     * Retrieves the pathogen associated with a ID.
     *
     * @param {number} id - The pathogen id.
     * @returns {object} The pathogen object.
     */

    const getPathogenById = useCallback(pathogenId => {
        return pathogens.find(pathogen => pathogen.pathogenId === pathogenId);
    }, []);

    /**
     * Retrieves vaccines by licenser.
     *
     * @returns {Array} List of vaccines with the selected licenser.
     */

    const getVaccinesByLicenser = useCallback(selectedLicenser => {

        return vaccinesList.filter(vaccine => {
            if (vaccine?.licensers) {
                return vaccine.licensers.some(licenser => licenser.licenserId === selectedLicenser.licenserId)
            } else {
                return []
            }
        });
        // return vaccinesList.filter(vaccine =>
        //     vaccine.licensers.some(licenser => licenser.licenserId === selectedLicenser.licenserId)
        // );
    }, [vaccinesList]);

    /**
     * Retrieves vaccines by manufacturer.
     *
     * @param {Object} [manufacturer=selectedManufacturer] - The manufacturer object to filter vaccines by. Defaults to `selectedManufacturer` if not provided.
     * @returns {Array} List of vaccines from the selected manufacturer.
     */

    const getVaccinesByManufacturer = useCallback((manufacturer = selectedManufacturer) => {
        if (!manufacturer || !manufacturer.manufacturerId) {
            return [];
        }
        return vaccinesList.filter((vaccine) => {
            if (vaccine?.manufacturers) {
                return vaccine.manufacturers.some((m) => {
                    return m.manufacturerId === manufacturer.manufacturerId
                })
            } else {
                return []
            }
        });
    }, [selectedManufacturer, vaccinesList]);

    /**
    * Retrieves pipeline vaccines by manufacturer.
    *
    * @param {Object} [manufacturer=selectedManufacturer] - The manufacturer object to filter vaccines by. Defaults to `selectedManufacturer` if not provided.
    * @returns {Array} List of pipeline vaccines from the selected manufacturer.
    */

    const getPipelineVaccinesByManufacturer = useCallback((manufacturer = selectedManufacturer) => {
        if (!manufacturer || !manufacturer.manufacturerId) {
            return [];
        }
        return pipelineVaccineList.filter(vaccine => vaccine.manufacturerId === manufacturer.manufacturerId)
    }, [selectedManufacturer, pipelineVaccineList]);

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

    const getManufacturersByVaccine = useCallback(vaccine => {
        return manufacturers.filter(manufacturer => manufacturer.manufacturerId === vaccine.manufacturerId);
    }, []);

    /**
     * Retrieves licenser by licenserId.
     *
     * @param {Object} id - The licenserId.
     * @returns {Array} Licenser associated with the given licenserId.
     */

    const getLicenserById = useCallback(id => {
        return licensers.find(licenser => licenser.licenserId === id) || null;
    }, []);

    /**
     * Filters the list of items based on the first alphabet.
     * 
     * @function
     * @name filterListByStartingAlphabet
     * 
     * @param {Array} list - A list of items for filtering.
     * @returns {Array} - An array of filtered items.
     */

    const filterListByStartingAlphabet = useCallback((list) => {

        if (activeTab !== "Nitag") {
            const fieldToFilter = activeTab === 'Licenser' ? 'acronym' : activeTab === 'Nitag' ? 'country' : 'name';
            const filteredList = activeFilters.firstAlphabet.toLowerCase() !== ''
                ? list.filter(item => {
                    const startsWithAlphabet = item[fieldToFilter].toLowerCase().startsWith(activeFilters.firstAlphabet.toLowerCase());
                    return startsWithAlphabet;
                })
                : list;
            return filteredList;
        }

        if (activeTab === "Nitag") {
            // const fieldToFilter = activeTab === 'Licenser' ? 'acronym' : activeTab === 'Nitag' ? 'country' : 'name';
            const filteredList = activeFilters.firstAlphabet.toLowerCase() !== ''
                ? list.filter(item => {
                    const startsWithAlphabet = item[0].toLowerCase().startsWith(activeFilters.firstAlphabet.toLowerCase());
                    return startsWithAlphabet;
                })
                : list;

            return filteredList;
        }

        if (activeTab === "Compare") {
            // const fieldToFilter = activeTab === 'Licenser' ? 'acronym' : activeTab === 'Nitag' ? 'country' : 'name';
            const filteredList = activeFilters.firstAlphabet.toLowerCase() !== ''
                ? list.filter(item => {
                    const startsWithAlphabet = item[0].toLowerCase().startsWith(activeFilters.firstAlphabet.toLowerCase());
                    return startsWithAlphabet;
                })
                : list;

            return filteredList;
        }
    }, [activeFilters.firstAlphabet, activeTab]);

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

    const filterManufacturersByAlphabetAndSearch = useCallback((keyword) => {
        return filterListByStartingAlphabet(manufacturersList).filter(manufacturer => {
            const matchesKeyword = manufacturer.name.toLowerCase().includes(keyword) ||
                manufacturer.description.toLowerCase().includes(keyword);
            if (matchesKeyword) return true;

            // const vaccines = getVaccinesByManufacturer(manufacturer) || [];
            // return vaccines.some(vaccine => {
            //     const vaccineMatch = vaccine.name.toLowerCase().includes(keyword) ||
            //         vaccine.description.toLowerCase().includes(keyword);

            //     if (vaccineMatch) return true;

            //     const pathogens = getPathogenByVaccine(vaccine) || [];
            //     return Array.isArray(pathogens) && pathogens.some(pathogen =>
            //         pathogen.name.toLowerCase().includes(keyword) ||
            //         pathogen.description.toLowerCase().includes(keyword)
            //     );
            // });
        });
    }, [manufacturersList, filterListByStartingAlphabet]);

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

    const filterVaccinesByAlphabetAndSearch = useCallback((keyword) => {
        return filterListByStartingAlphabet(vaccinesList).filter(vaccine => {
            const vaccineMatch = vaccine.name.toLowerCase().includes(keyword) ||
                vaccine.description.toLowerCase().includes(keyword);
            if (vaccineMatch) return true;
            const pathogens = getPathogenByVaccine(vaccine) || [];
            const pathogenMatch = Array.isArray(pathogens) && pathogens.some(pathogen =>
                pathogen.name.toLowerCase().includes(keyword) ||
                pathogen.description.toLowerCase().includes(keyword)
            );
            const manufacturersMatch = getManufacturersByVaccine(vaccine).some(manufacturer =>
                manufacturer.name.toLowerCase().includes(keyword) ||
                manufacturer.description.toLowerCase().includes(keyword)
            );
            return pathogenMatch || manufacturersMatch;
        });
    }, [vaccinesList, filterListByStartingAlphabet, getPathogenByVaccine, getManufacturersByVaccine]);


    const filterVaccineCandidateByAlphabetAndSearch = useCallback((keyword) => {
        return filterListByStartingAlphabet(sampleVaccineCandidatePathogen).filter(vaccine => {
            const vaccineMatch = vaccine.name.toLowerCase().includes(keyword) ||
                vaccine.description.toLowerCase().includes(keyword);
            if (vaccineMatch) return true;
        });
    }, [sampleVaccineCandidatePathogen, filterListByStartingAlphabet]);
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

    const filterPathogensByAlphabetAndSearch = useCallback((keyword) => {
        return filterListByStartingAlphabet(pathogensList).filter(pathogen => {
            const pathogenMatch = pathogen.name?.toLowerCase().includes(keyword) ||
                pathogen.description?.toLowerCase().includes(keyword);
            if (pathogenMatch) return true;
            const vaccines = getVaccineByPathogen(pathogen) || [];
            return Array.isArray(vaccines) && vaccines.some(vaccine => {
                const vaccineMatch = vaccine.name.toLowerCase().includes(keyword) ||
                    vaccine.description.toLowerCase().includes(keyword);
                if (vaccineMatch) return true;
                return getManufacturersByVaccine(vaccine).some(manufacturer =>
                    manufacturer.name.toLowerCase().includes(keyword) ||
                    manufacturer.description.toLowerCase().includes(keyword)
                );
            });
        });
    }, [pathogensList, filterListByStartingAlphabet, getVaccineByPathogen, getManufacturersByVaccine]);

    /**
     * Filters the list of licensers based on the search keyword.
     * 
     * This function filters licensers and also checks related vaccines and pathogens for matches with the search keyword.
     * 
     * @function
     * @name filterLicensers
     * 
     * @param {string} keyword - The lowercased search keyword used for filtering.
     * @returns {Array} - An array of filtered licensers.
     */

    const filterLicensersByAlphabetAndSearch = useCallback((keyword) => {
        return filterListByStartingAlphabet(licensersList).filter(licenser => {
            const licenserMatch = licenser.acronym.toLowerCase().includes(keyword) ||
                licenser.description.toLowerCase().includes(keyword);

            if (licenserMatch) return true;
        });
    }, [licensersList, filterListByStartingAlphabet]);

     const filterNitagByAlphabetAndSearch = useCallback((keyword) => {
        return filterListByStartingAlphabet(finalRemapNitagCountry).filter(licenser => {
            const licenserMatch = licenser[0].toLowerCase().includes(keyword)
            if (licenserMatch) return true;
        });
    }, [filterListByStartingAlphabet]);

    /**
     * Sorts a list of licensers with a custom priority for 'AMA', 'EMA', and 'WHO',
     * followed by alphabetical sorting for the rest.
     *
     * The function first prioritizes 'FDA', 'EMA', and 'WHO' in that order. If neither
     * licenser is in the custom priority list, it sorts the rest alphabetically by their names.
     *
     * @param {Array<Object>} list - The list of licensers to be sorted.
     * @param {string} list[].name - The name of the licenser to be used for sorting.
     * @returns {Array<Object>} - The sorted list of licensers.
     *
     * @example
     * const licensers = [
     *     { name: 'WHO' },
     *     { name: 'EMA' },
     *     { name: 'AMA' },
     *     { name: 'FDA' },
     *     { name: 'CDC' }
     * ];
     *
     * const sortedLicensers = sortLicensers(licensers);
     * // Result: [ { name: 'FDA' }, { name: 'EMA' }, { name: 'WHO' }, { name: 'CDC' }, { name: 'HSA' } ]
     */

    const sortLicensers = useCallback((list) => {
        const customOrder = ['FDA', 'EMA', 'WHO'];
        return list.slice().sort((a, b) => {
            if (!a.acronym || !b.acronym) {
                return (a.acronym ? 1 : -1) - (b.acronym ? 1 : -1);
            }

            const indexA = customOrder.indexOf(a.acronym);
            const indexB = customOrder.indexOf(b.acronym);

            if (indexA !== -1 && indexB !== -1) {
                return indexA - indexB;
            }
            if (indexA !== -1) {
                return -1;
            }
            if (indexB !== -1) {
                return 1;
            }
            return a.acronym.localeCompare(b.acronym);
        });
    }, []);

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


    const filterListsByAlphabetAndSearch = useCallback(() => {
        let filteredSidebarList = [];

        if (activeFilters.searchKeyword && activeFilters.searchKeyword !== "") {
            const keywordLower = activeFilters.searchKeyword.toLowerCase()
            if (activeTab === 'Manufacturer') {
                filteredSidebarList = filterManufacturersByAlphabetAndSearch(keywordLower).slice()
                    .sort((a, b) => a.name.localeCompare(b.name));
            } else if (activeTab === 'Licensed Vaccines') {
                filteredSidebarList = filterPathogensByAlphabetAndSearch(keywordLower).slice()
                    .sort((a, b) => a.name.localeCompare(b.name));
            } else if (activeTab === 'Vaccine Candidates') {
                filteredSidebarList = filterPathogensByAlphabetAndSearch(keywordLower).slice()
                    .sort((a, b) => a.name.localeCompare(b.name));
            } else if (activeTab === 'Licenser') {
                filteredSidebarList = filterVaccinesByAlphabetAndSearch(keywordLower).slice()
                    .sort((a, b) => a.name.localeCompare(b.name));
            }
            else if (activeTab === 'Compare') {
                filteredSidebarList = filterPathogensByAlphabetAndSearch(keywordLower).slice()
                    .sort((a, b) => a.name.localeCompare(b.name));
            }
            else if (activeTab === 'Nitag') {
                filteredSidebarList = filterNitagByAlphabetAndSearch(keywordLower).slice()
            }
            setSidebarList(filteredSidebarList);
        } else {
            if (activeTab === 'Manufacturer') {
                setSidebarList(filterListByStartingAlphabet(manufacturersList).slice()
                    .sort((a, b) => a.name.localeCompare(b.name)));
            } else if (activeTab === 'Licensed Vaccines') {
                setSidebarList(filterListByStartingAlphabet(pathogensList).slice()
                    .sort((a, b) => a.name.localeCompare(b.name)));
            } else if (activeTab === 'Vaccine Candidates') {
                setSidebarList(filterListByStartingAlphabet(sampleVaccineCandidatePathogen).slice()
                    .sort((a, b) => a.name.localeCompare(b.name)));
            } else if (activeTab === 'Pathogen') {
                setSidebarList(filterListByStartingAlphabet(pathogensList).slice()
                    .sort((a, b) => a.name.localeCompare(b.name)));
            } else if (activeTab === 'Licenser') {
                setSidebarList(sortLicensers(filterListByStartingAlphabet(licensersList)));
            } else if (activeTab === 'Compare') {
                setSidebarList(filterListByStartingAlphabet(getAllSinglePathogenArray()).slice());
            } else if (activeTab === 'Nitag') {
                setSidebarList(filterListByStartingAlphabet(finalRemapNitagCountry).slice());
            }
        }
    }, [activeFilters, activeTab, filterListByStartingAlphabet, manufacturersList, pathogensList, vaccinesList, licensersList, filterManufacturersByAlphabetAndSearch, filterPathogensByAlphabetAndSearch, filterVaccinesByAlphabetAndSearch, filterLicensersByAlphabetAndSearch, sortLicensers]);

    /**
     * Converts camel case strings to readable format.
     *
     * @param {string} string - The camel case string.
     * @returns {string} The readable string.
     */

    const convertCamelCaseToReadable = string => {
        const formattedString = string === "ceo"
            ? "CEO"
            : string.replace(/([A-Z])/g, ' $1');
        return formattedString.charAt(0).toUpperCase() + formattedString.slice(1);
    };

    /**
     * Italizes scientific names in a given text.
     *
     * @param {string} text - The text containing scientific names.
     * @returns {JSX.Element} The text with scientific names italicized.
     */
    const italizeScientificNames = text => {
        if (text) {
            // check if texts are array because Pipeline vaccines can be more than one Pathogens included
            if (Array.isArray(text)) {
                if (text.length > 0) {
                    return text.map((txt) => {
                        if (!(typeof txt === "object")) {
                            const parts = txt.split(new RegExp(`(${scientificNames.join('|')})`, 'gi'));
                            return (
                                <>
                                    {parts.map((part, index) => {
                                        const isScientificName = part && scientificNames.some(name => name.toLowerCase() === part.toLowerCase());
                                        return isScientificName ? (
                                            <i key={index}>{part}</i>
                                        ) : (
                                            part
                                        );
                                    })}
                                </>
                            );
                        }
                    })
                } else return text.join(',')
            } else {
                if (text) {
                    if (!(typeof text === "object")) {
                        const parts = text.split(new RegExp(`(${scientificNames.join('|')})`, 'gi'));
                        return (
                            <>
                                {parts.map((part, index) => {
                                    const isScientificName = part && scientificNames.some(name => name.toLowerCase() === part.toLowerCase());
                                    return isScientificName ? (
                                        <i key={index}>{part}</i>
                                    ) : (
                                        part
                                    );
                                })}
                            </>
                        );
                    }
                } else return text
            }
        }
    };

    useEffect(() => {
        setManufacturersList(manufacturers);
        setPathogensList([...pathogens]);
        setVaccinesList(vaccines);
        setPipelineVaccinesList(pipelineVaccines);
        setLicensersList(licensers);
        setSelectedPathogen(pathogens[0])
        setSelectedLicenser(licensers[0]);
        const vaccineSorted = vaccines.sort((a, b) => a.name.localeCompare(b.name))[0];
        const candidateVaccineSorted = sampleVaccineCandidatePathogen.sort((a, b) => a.name.localeCompare(b.name))[0];
        setSelectedVaccine(vaccineSorted);
        setSelectedVaccineCandidate(candidateVaccineSorted);
        setSelectedCompare(pathogens[0]);
        setSelectedManufacturer(manufacturers[0]);
        // setSelectedNitag(finalRemapNitagCountry.slice()
        //    .sort((a, b) => a[0].localeCompare(b[0]))[0]);
    }, []);

    useEffect(() => {
        filterListsByAlphabetAndSearch();
    }, [activeFilters, filterListsByAlphabetAndSearch]);

    return (
        <div className='vacciprofile-page'>
            <div className='container'>
                <Header />
                <TopBar
                    activeTab={activeTab}
                    handleTabChange={handleTabChange}
                    handleSearch={handleSearch}
                />
                <div className='row'>
                    <AlphabetsBar
                        handleAlphabetChange={handleAlphabetChange}
                        activeFilters={activeFilters}
                    />
                </div>
                <div className='row pt-2 pb-4'>
                    <Sidebar
                        activeTab={activeTab}
                        sidebarList={sidebarList}
                        selectedVaccine={selectedVaccine}
                        selectedPathogen={selectedPathogen}
                        selectedManufacturer={selectedManufacturer}
                        selectedLicenser={selectedLicenser}
                        selectedCompare={selectedCompare}
                        selectedNitag={selectedNitag}
                        selectedVaccineCandidate={selectedVaccineCandidate}
                        setSelectedVaccineCandidate={setSelectedVaccineCandidate}
                        setSelectedNitag={setSelectedNitag}
                        setSelectedVaccine={setSelectedVaccine}
                        setSelectedPathogen={setSelectedPathogen}
                        setSelectedManufacturer={setSelectedManufacturer}
                        setSelectedLicenser={setSelectedLicenser}
                        setSelectedCompare={setSelectedCompare}
                        changedFrom={changedFrom}
                        setChangedFrom={setChangedFrom}
                        setActiveTab={setActiveTab}
                        italizeScientificNames={italizeScientificNames}
                    />
                    <Main
                        activeTab={activeTab}
                        sidebarList={sidebarList}
                        selectedPathogen={selectedPathogen}
                        selectedVaccine={selectedVaccine}
                        selectedVaccineCandidate={selectedVaccineCandidate}
                        selectedManufacturer={selectedManufacturer}
                        selectedLicenser={selectedLicenser}
                        selectedCompare={selectedCompare}
                        selectedNitag={selectedNitag}
                        handleSelectPathogen={handleSelectPathogen}
                        handleSelectVaccineCandidate={handleSelectVaccineCandidate}
                        handleSelectNitag={handleSelectNitag}
                        handleSelectVaccine={handleSelectVaccine}
                        handleSelectManufacturer={handleSelectManufacturer}
                        handleSelectLicenser={handleSelectLicenser}
                        handleSelectCompare={handleSelectCompare}
                        activeFilters={activeFilters}
                        setActiveFilters={setActiveFilters}
                        getPathogenByVaccine={getPathogenByVaccine}
                        getComparisonByName={getComparisonByName}
                        getPathogenById={getPathogenById}
                        getVaccinesByManufacturer={getVaccinesByManufacturer}
                        getPipelineVaccinesByManufacturer={getPipelineVaccinesByManufacturer}
                        getVaccinesByLicenser={getVaccinesByLicenser}
                        changedFrom={changedFrom}
                        italizeScientificNames={italizeScientificNames}
                        convertCamelCaseToReadable={convertCamelCaseToReadable}
                        getLicenserById={getLicenserById}
                    />
                </div>
            </div>
            <footer style={{ backgroundColor: '#111', color: '#ddd', padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif;', display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ marginBottom: '10px' }}>
                    <div>
                        <img src="/images/logo PNG.png" alt="Global Health Press Logo" style={{ height: '80px' }} />
                    </div>
                </div>
                <div style={{ marginLeft: 30 }}>
                    <div style={{ marginBlock: '10px' }}>
                        <a href="#" style={{ color: '#ddd', textDecoration: 'none', margin: '0 10px' }}>Terms & Conditions</a> |
                        <a href="#" style={{ color: '#ddd', textDecoration: 'none', margin: '0 10px' }}>Privacy Policy</a> |
                        <a href="#" style={{ color: '#ddd', textDecoration: 'none', margin: '0 10px' }}>Disclaimer</a> |
                        <a href="#" style={{ color: '#ddd', textDecoration: 'none', margin: '0 10px' }}>Imprint</a> |
                        <a href="#" style={{ color: '#ddd', textDecoration: 'none', margin: '0 10px' }}>Contacts</a> |
                        <a href="#" style={{ color: '#ddd', textDecoration: 'none', margin: '0 10px' }}>LinkedIn</a>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        Copyright © 2009-2025 Global Health Press Pte Ltd. Reg. No. 200921795N All Rights Reserved.
                    </div>
                    <div>
                        Subject to <a href="#" style={{ color: '#4da6ff', textDecoration: 'none' }}>Creative Commons Licence (cc)</a>.
                    </div>
                </div>
            </footer>
            <ToastContainer />
        </div>
    );
};

export default App;
