import React, { useState, useEffect } from 'react';
import { getCandidatePathogens, getCandidateVaccines, removeDuplicatesFromArray, sortArrayAscending } from '../utils/array';
import { getAllSinglePathogenArray, getCombinationVaccineneArray, getPathogenDetailById, getSinglePathogenVaccineArray } from '../utils/pathogens';
import { vaccineDeases } from '../assets/data/dieases';
import { useSearchParams } from 'react-router';

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
    selectedCompare,
    selectedManufacturer,
    selectedLicenser,
    setSelectedVaccine,
    setSelectedPathogen,
    setSelectedManufacturer,
    setSelectedLicenser,
    setSelectedCompare,
    setChangedFrom,
    changedFrom,
    italizeScientificNames
}) => {

    const [animationClass, setAnimationClass] = useState('slide-right');
    const [showCountries, setShowCountries] = useState(false);

    const [showLicensedPathogens, setShowLicensedPathogens] = useState(true);
    const [showVaccineCandidatePathogens, setShowVaccineCandidatePathogens] = useState(false);

    const [showVaccineDeases, setShowVaccineDeases] = useState(false);

    const [showLicensedVaccines, setShowLicensedVaccines] = useState(true);
    const [showVaccineCandidates, setShowVaccineCandidates] = useState(false);

    const [showSinglePathogenVaccines, setShowSinglePathogenVaccines] = useState(true);
    const [showCombinationVaccines, setShowCombinationVaccines] = useState(false);

    const licenserFilter = ["FDA", "EMA", "WHO"];
    const filteredLicenserSidebarList = activeTab === 'Licenser'
        ? sidebarList.filter(item => licenserFilter.includes(item.acronym))
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
                    const timeout = setTimeout(() => {
                        setAnimationClass('slide-right');
                    }, 20);
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
            } else if (activeTab === 'Compare') {
                if (item !== selectedCompare) {
                    setSelectedCompare(item);
                    setActiveTab('Compare');
                } else {
                    setSelectedCompare({});
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

    const sampleVaccineCandidatePathogen = getCandidatePathogens();
    const sampleVaccineCandidatesVaccine = getCandidateVaccines();


    const [searchParams, setSearchParams] = useSearchParams();
    const activeMenu = searchParams.get("menu");

    useEffect(() => {

        if (activeMenu === "pathogen") {
            setActiveTab("Pathogen")
        };
        if (activeMenu === "manufacturer") {
            setActiveTab("Manufacturer");
        }
        if (activeMenu === "licenser") {
            setActiveTab("Licenser");
        }
        if (activeMenu === "vaccines") {
            setActiveTab("Vaccine");
        }
    }, [activeMenu]);

    return (
        <div className={`sidebar col-6 col-sm-4 col-lg-3 ps-1 pe-0 ${animationClass}`}>
            <div className='sidebar-items overflow-auto'>
                {
                    activeTab === "Pathogen" && (
                        <>
                            <div onClick={() => {
                                setShowVaccineCandidatePathogens(false);
                                setShowLicensedPathogens(!showLicensedPathogens)
                            }} className={`sidebar-item bg-sidebar-unselected text-dark rounded-3 ms-2 mb-1 ${showLicensedPathogens ? 'active' : 'inactive'}`}>
                                Pathogen with Licensed Vaccines
                            </div>
                            <div onClick={() => {
                                setShowLicensedPathogens(false);
                                setShowVaccineCandidatePathogens(!showVaccineCandidatePathogens)
                            }} className={`sidebar-item bg-sidebar-unselected text-dark rounded-3 ms-2 mb-1 ${showVaccineCandidatePathogens ? 'active' : 'imactive'}`}>
                                Pathogen with Vaccine Candidates
                            </div>
                            {showVaccineCandidatePathogens && sampleVaccineCandidatePathogen.map((item, i) => (
                                <div
                                    key={i}
                                    className={`sidebar-item bg-sidebar-unselected text-dark rounded-3 ms-4 mb-1 ${activeTab === 'Pathogen' && selectedPathogen === item
                                        ? 'active' : 'inactive'
                                        }`}
                                    onClick={() => {
                                        handleClickSidebar(item)
                                    }}
                                >
                                    {italizeScientificNames(item.name)}
                                </div>
                            ))}
                            {showLicensedPathogens && filteredLicenserSidebarList.map((item, i) => (
                                <div
                                    key={i}
                                    className={`sidebar-item bg-sidebar-unselected text-dark rounded-3 ms-4 mb-1 ${activeTab === 'Pathogen' && selectedPathogen === item
                                        ? 'active' : 'inactive'
                                        }`}
                                    onClick={() => {
                                        handleClickSidebar(item)
                                    }}
                                >
                                    {italizeScientificNames(item.name)}
                                </div>
                            ))}
                        </>
                    )
                }
                {
                    activeTab === "Compare" && (
                        <>
                            <div onClick={() => {
                                setShowVaccineDeases(false);
                                setShowLicensedPathogens(!showLicensedPathogens)
                            }} className={`sidebar-item bg-sidebar-unselected text-dark rounded-3 ms-2 mb-1 ${showLicensedPathogens ? 'active' : 'inactive'}`}>
                                Pathogens
                            </div>
                            <div onClick={() => {
                                setShowVaccineDeases(!showVaccineDeases);
                                setShowLicensedPathogens(false);
                            }} className={`sidebar-item bg-sidebar-unselected text-dark rounded-3 ms-2 mb-1 ${showVaccineDeases ? 'active' : 'inactive'}`}>
                                Diseases
                            </div>
                            {/* <div onClick={() => {
                                setShowLicensedPathogens(false);
                                setShowVaccineCandidatePathogens(!showVaccineCandidatePathogens)
                            }} className={`sidebar-item bg-sidebar-unselected text-dark rounded-3 ms-2 mb-1 ${showVaccineCandidatePathogens ? 'active' : 'imactive'}`}>
                                Pathogen with Vaccine Candidates
                            </div> */}
                            {/* <div onClick={() => {
                                setShowVaccineCandidatePathogens(false);
                                setShowLicensedPathogens(!showLicensedPathogens)
                            }} className={`sidebar-item bg-sidebar-unselected text-dark rounded-3 ms-2 mb-1 ${false ? 'active' : 'inactive'}`}>
                                Diseases with Single Pathogen Vaccine
                            </div>
                            <div onClick={() => {
                                setShowVaccineCandidatePathogens(false);
                                setShowLicensedPathogens(!showLicensedPathogens)
                            }} className={`sidebar-item bg-sidebar-unselected text-dark rounded-3 ms-2 mb-1 ${false ? 'active' : 'inactive'}`}>
                                Diseases with Combination Vaccine
                            </div> */}
                            {showVaccineDeases && vaccineDeases.map((item, i) => (
                                <div
                                    key={i}
                                    className={`sidebar-item bg-sidebar-unselected text-dark rounded-3 ms-4 mb-1 ${activeTab === 'Compare' && selectedCompare === item
                                        ? 'active' : 'inactive'
                                        }`}
                                    onClick={() => {
                                        handleClickSidebar(item)
                                    }}
                                >
                                    {italizeScientificNames(item.name)}
                                </div>
                            ))}
                            {showLicensedPathogens && getAllSinglePathogenArray().map((item, i) => (
                                <div
                                    key={i}
                                    className={`sidebar-item bg-sidebar-unselected text-dark rounded-3 ms-4 mb-1 ${activeTab === 'Compare' && selectedCompare === item
                                        ? 'active' : 'inactive'
                                        }`}
                                    onClick={() => {
                                        handleClickSidebar(item)
                                    }}
                                >
                                    {italizeScientificNames(item.name)}
                                </div>
                            ))}
                        </>
                    )
                }
                {
                    activeTab === "Vaccine" && (
                        <>
                            <div onClick={() => {
                                setShowLicensedVaccines(!showLicensedVaccines);
                                setShowVaccineCandidates(false);
                            }} className={`sidebar-item bg-sidebar-unselected text-dark rounded-3 ms-2 mb-1 ${showLicensedVaccines ? 'active' : 'inactive'}`}>
                                Licensed Vaccines
                            </div>
                            {
                                showLicensedVaccines && (
                                    <>
                                        <div onClick={() => {
                                            setShowSinglePathogenVaccines(!showSinglePathogenVaccines);
                                            setShowCombinationVaccines(false);
                                        }} className={`sidebar-item bg-sidebar-unselected text-dark rounded-3 ms-4 mb-1 ${showSinglePathogenVaccines ? 'active' : 'imactive'}`}>
                                            Single Pathogen Vaccines
                                        </div>

                                        <div onClick={() => {
                                            setShowCombinationVaccines(!showCombinationVaccines);
                                            setShowSinglePathogenVaccines(false);
                                        }} className={`sidebar-item bg-sidebar-unselected text-dark rounded-3 ms-4 mb-1 ${showCombinationVaccines ? 'active' : 'imactive'}`}>
                                            Combination Vaccines
                                        </div>

                                    </>
                                )}
                            <div onClick={() => {
                                setShowLicensedVaccines(false);
                                setShowVaccineCandidates(!showVaccineCandidates)
                            }} className={`sidebar-item bg-sidebar-unselected text-dark rounded-3 ms-2 mb-1 ${showVaccineCandidates ? 'active' : 'imactive'}`}>
                                Vaccine Candidates
                            </div>

                            {
                                showLicensedVaccines && (
                                    <div>
                                        {showCombinationVaccines && filteredLicenserSidebarList && filteredLicenserSidebarList.length > 0 && removeDuplicatesFromArray(getCombinationVaccineneArray(filteredLicenserSidebarList), "name").map((item, i) => (
                                            <div
                                                key={i}
                                                className={`sidebar-item bg-sidebar-unselected text-dark rounded-3 ms-5 mb-1 ${showCombinationVaccines && activeTab === 'Vaccine' && selectedVaccine === item
                                                    ? 'active' : 'inactive'
                                                    }`}
                                                onClick={() => {
                                                    handleClickSidebar(item)
                                                }}
                                            >
                                                {item?.name}
                                            </div>
                                        ))}

                                        {showSinglePathogenVaccines && filteredLicenserSidebarList && filteredLicenserSidebarList.length > 0 && removeDuplicatesFromArray(getSinglePathogenVaccineArray(filteredLicenserSidebarList), "name").map((item, i) => (
                                            <div
                                                key={i}
                                                className={`sidebar-item bg-sidebar-unselected text-dark rounded-3 ms-5 mb-1 ${showSinglePathogenVaccines && activeTab === 'Vaccine' && selectedVaccine === item
                                                    ? 'active' : 'inactive'
                                                    }`}
                                                onClick={() => {
                                                    handleClickSidebar(item)
                                                }}
                                            >
                                                {item?.name}
                                            </div>
                                        ))}
                                    </div>
                                )
                            }

                            {showVaccineCandidates && removeDuplicatesFromArray(sampleVaccineCandidatesVaccine, "name").map((item, i) => (
                                <div
                                    key={i}
                                    className={`sidebar-item bg-sidebar-unselected text-dark rounded-3 ms-4 mb-1 ${showVaccineCandidates && activeTab === 'Vaccine' && selectedVaccine === item
                                        ? 'active' : 'inactive'
                                        }`}
                                    onClick={() => {
                                        handleClickSidebar(item)
                                    }}
                                >
                                    {item.name}
                                </div>
                            ))}
                        </>
                    )
                }

                {activeTab !== "Pathogen" && activeTab !== "Vaccine" && filteredLicenserSidebarList.map((item, i) => (
                    <div
                        key={i}
                        className={`sidebar-item bg-sidebar-unselected text-dark rounded-3 ms-2 mb-1 ${activeTab === 'Manufacturer' && selectedManufacturer === item
                            ? 'active' : activeTab === 'Vaccine' && selectedVaccine === item
                                ? 'active' : activeTab === 'Pathogen' && selectedPathogen === item
                                    ? 'active' : activeTab === 'Licenser' && selectedLicenser === item
                                        ? 'active' : activeTab === 'Compare' && selectedCompare === item ? 'active' : 'inactive'
                            }`}
                        onClick={() => {
                            handleClickSidebar(item)
                        }}
                    >
                        {activeTab === "Pathogen" ? italizeScientificNames(item.name) : activeTab === "Compare" ? item.name : activeTab !== "Licenser" ? item.name : `${item.acronym} ${item?.region || ""}`}
                    </div>
                ))}
                {activeTab === 'Licenser' && filteredLicenserSidebarList.length > 0 && (
                    <div
                        key='Countries'
                        className={`sidebar-item bg-sidebar-unselected text-dark rounded-3 py-1 ms-2 mb-1 ${showCountries ? 'active-country' : 'inactive'
                            }`}
                        onClick={() => handleClickSidebar({ name: 'Countries' })}
                    >Licensing authorities in other countries
                    </div>
                )}
                {showCountries && sortArrayAscending(sidebarList.filter(item => !licenserFilter.includes(item.acronym)), "country").map((item, i) => (
                    <div
                        key={`country-${i}`}
                        className={`sidebar-item bg-sidebar-unselected text-dark rounded-3 ms-2 mb-1 ${selectedLicenser === item ? 'active' : 'inactive'}`}
                        onClick={() => handleClickSidebar(item)}
                    >{item.country && `${item.country}, ${item.fullName}`}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;