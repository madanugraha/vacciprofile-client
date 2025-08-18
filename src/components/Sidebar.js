import React, { useState, useEffect } from 'react';
import { getCandidatePathogens, getCandidateVaccines, removeDuplicatesFromArray, sortArrayAscending } from '../utils/array';
import { getAllSinglePathogenArray, getCombinationVaccineneArray, getPathogenDetailById, getSinglePathogenVaccineArray } from '../utils/pathogens';
import { vaccineDeases } from '../assets/data/dieases';
import nitag from '../assets/data/nitag.json';
import { useSearchParams } from 'react-router';
import { toast } from 'react-toastify';
import { turnFirstLetterOfWordUpperCase } from '../utils/string';

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
    selectedNitag,
    selectedVaccineCandidate,
    selectedManufacturer,
    selectedLicenser,
    setSelectedVaccine,
    setSelectedVaccineCandidate,
    setSelectedPathogen,
    setSelectedManufacturer,
    setSelectedLicenser,
    setSelectedCompare,
    setSelectedNitag,
    setChangedFrom,
    changedFrom,
    italizeScientificNames,
    activeFilters
}) => {

    const [animationClass, setAnimationClass] = useState('slide-right');
    const [showCountries, setShowCountries] = useState(false);

    const [showLicensedPathogens, setShowLicensedPathogens] = useState(true);
    const [showVaccineCandidatePathogens, setShowVaccineCandidatePathogens] = useState(true);

    const [showVaccineDeases, setShowVaccineDeases] = useState(false);

    const [showLicensedVaccines, setShowLicensedVaccines] = useState(true);
    const [showVaccineCandidates, setShowVaccineCandidates] = useState(true);

    const [showSinglePathogenVaccines, setShowSinglePathogenVaccines] = useState(true);
    const [showCombinationVaccines, setShowCombinationVaccines] = useState(false);

    const licenserFilter = ["FDA", "EMA", "WHO"];
    const filteredLicenserSidebarList = activeTab === "Licenser" && (activeFilters?.searchKeyword || activeFilters?.firstAlphabet) ? sidebarList : activeTab === 'Licenser'
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
            } else if (activeTab === 'Licensed Vaccines') {
                if (item !== selectedPathogen) {
                    setSelectedPathogen(item);
                    setActiveTab('Licensed Vaccines');
                } else {
                    setSelectedPathogen({});
                }
            } else if (activeTab === 'Vaccine Candidates') {
                if (item !== selectedVaccineCandidate) {
                    setSelectedVaccineCandidate(item);
                    setActiveTab('Vaccine Candidates');
                } else {
                    setSelectedVaccineCandidate({});
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
            } else if (activeTab === 'Nitag') {
                if (item !== selectedNitag) {
                    setSelectedNitag(item);
                    setActiveTab('Nitag');
                } else {
                    setSelectedNitag({});
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
        };
    }, [changedFrom]);

    const sampleVaccineCandidatePathogen = sortArrayAscending(removeDuplicatesFromArray(getCandidatePathogens(), "name"), "name")
    const sampleVaccineCandidatesVaccine = getCandidateVaccines();

    const [searchParams, setSearchParams] = useSearchParams();
    const activeMenu = searchParams.get("menu");


    // useEffect(() => {
    //     if (activeTab === "Pathogen") {
    //         // setActiveTab("Pathogen")
    //     };
    //     if (activeTab === "Manufacturer") {
    //         // setActiveTab("Manufacturer");
    //     };
    //     if (activeTab === "Licenser") {
    //         // setActiveTab("Licenser");
    //     };
    //     if (activeTab === "Licensed Vaccines") {
    //         // setActiveTab("Licensed Vaccines");
    //     }
    //     if (activeTab === "Vaccine Candidates") {
    //         handleClickSidebar(selectedVaccineCandidate.name)
    //         // setActiveTab("Vaccine Candidates");
    //     }
    //     if (activeTab === "Nitag") {
    //     }
    //     if (activeTab === "Compare") {
    //     };
    // }, [activeTab]);

    useEffect(() => {
        if (activeMenu === "pathogen") {
            setActiveTab("Pathogen")
        };
        if (activeMenu === "manufacturer") {
            setActiveTab("Manufacturer");
        };
        if (activeMenu === "licenser") {
            setActiveTab("Licenser");
        };
        if (activeMenu === "licensed-vaccines") {
            setActiveTab("Licensed Vaccines");
        }
        if (activeMenu === "vaccine-candidates") {
            // handleClickSidebar(selectedVaccineCandidate.name)
            setActiveTab("Vaccine Candidates");
        }
        if (activeMenu === "nitag") {
            setActiveTab("Nitag");
        }
        if (activeMenu === "compare") {
            setActiveTab("Compare");
        };
    }, [activeMenu]);

    // useEffect(() => {
    //     if (activeTab === "Vaccine Candidates") {
    //         handleClickSidebar(selectedVaccineCandidate);
    //     }
    // }, [selectedVaccineCandidate])

    // console.log(filteredLicenserSidebarList);

    // console.log(filteredLicenserSidebarList)

    const idxVaccineCandidate = filteredLicenserSidebarList.findIndex((x) => x.name === selectedVaccineCandidate?.name);
    const [currentIdxCandidatePathogen, setCurrentIdxCandidatePathogen] = useState(idxVaccineCandidate ? idxVaccineCandidate : 0);

    // console.log(filteredLicenserSidebarList);
    return (
        <div className={`sidebar col-6 col-sm-4 col-lg-3 ps-1 pe-0 ${animationClass}`}>
            <div id="sidebar" className='sidebar-items overflow-auto'>
                {
                    activeTab === "Nitag" && filteredLicenserSidebarList.map((item) => {
                        return (
                            <>
                                <div id={`nitag-country-${item[0]}`} onClick={() => {
                                    handleClickSidebar(item);
                                    const ctx = item[0];
                                    function handleClickCountryMatchURL(country, url) {
                                        const noNitagElm = document.getElementById('no-nitag');
                                        if (country) {
                                            country = country.toLowerCase();
                                            if (url === "Unavailable") {
                                                noNitagElm.textContent = `The NITAG of ${turnFirstLetterOfWordUpperCase(country)} does not have its own dedicated website. You will, however, find some information on the website of the WHO Global NITAG Network (GNN). Click here to open GNN network website`
                                                noNitagElm.style.display = "block";
                                                // toast.error(`The NITAG of ${country} does not have its own dedicated website. You will, however, find some information on the website of the WHO Global NITAG Network (GNN). Click here to open GNN network website`)
                                            }
                                            if (url !== "Unavailable") {
                                                noNitagElm.textContent = ``
                                                noNitagElm.style.display = "none";
                                                return window.open(url, '_blank');
                                            }
                                        }
                                    };

                                    const website = item[1]
                                    if (website && website.split('Website: ').length > 0) {
                                        const websiteUrl = website.split('Website: ')[1];
                                        handleClickCountryMatchURL(ctx, websiteUrl)
                                    };
                                }} className={`sidebar-item bg-sidebar-unselected text-dark rounded-3 ms-2 mb-1 ${(activeTab === 'Nitag' && selectedNitag === item) ? 'active' : 'inactive'}`}>
                                    {item[0]}{item.length > 0 ? `${(!item[1]?.includes('Committee: -') ? ", " + item[1].split('<br/>')[0]?.replace('Committee: ', '') : "")}` : ""}
                                </div>
                            </>
                        )
                    })
                }

                {/* {
                    activeTab === "Pathogen" && activeTab !== "Nitag" && (
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
                                Pathogen with Vaccines Candidate
                            </div>
                            {showVaccineCandidatePathogens && sampleVaccineCandidatePathogen.map((item, i) => {
                                return (
                                    <div
                                        key={i + "zxcasdqweqwe"}
                                        className={`sidebar-item bg-sidebar-unselected text-dark rounded-3 ms-4 mb-1 ${showVaccineCandidatePathogens && activeTab === 'Pathogen' && selectedPathogen === item
                                            ? 'active' : 'inactive'
                                            }`}
                                        onClick={() => {
                                            handleClickSidebar(item)
                                        }}
                                    >
                                        {italizeScientificNames(item.name)}
                                    </div>
                                )
                            })}
                            {showLicensedPathogens && filteredLicenserSidebarList.map((item, i) => {
                                return (
                                    <div
                                        key={i}
                                        className={`sidebar-item bg-sidebar-unselected text-dark rounded-3 ms-4 mb-1 ${showLicensedPathogens && activeTab === 'Pathogen' && selectedPathogen === item
                                            ? 'active' : 'inactive'
                                            }`}
                                        onClick={() => {
                                            handleClickSidebar(item)
                                        }}
                                    >
                                        {italizeScientificNames(item.name)}
                                    </div>
                                )
                            })}
                        </>
                    )
                } */}

                {
                    activeTab === "Compare" && (
                        <>
                            <div onClick={() => {
                                setShowVaccineDeases(false);
                                setShowLicensedPathogens(!showLicensedPathogens)
                            }} className={`sidebar-item bg-sidebar-unselected text-dark rounded-3 ms-2 mb-1 ${showLicensedPathogens ? 'active' : 'inactive'}`}>
                                Pathogens
                            </div>
                            {/* <div onClick={() => {
                                setShowVaccineDeases(!showVaccineDeases);
                                setShowLicensedPathogens(false);
                            }} className={`sidebar-item bg-sidebar-unselected text-dark rounded-3 ms-2 mb-1 ${showVaccineDeases ? 'active' : 'inactive'}`}>
                                Diseases
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
                            {showLicensedPathogens && filteredLicenserSidebarList.map((item, i) => (
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
                    activeTab === "Vaccine Candidates" && (
                        <>
                            {/* <div onClick={() => {
                                    setShowLicensedPathogens(false);
                                    setShowVaccineCandidatePathogens(!showVaccineCandidatePathogens)
                                }} className={`sidebar-item bg-sidebar-unselected text-dark rounded-3 ms-2 mb-1 ${showVaccineCandidatePathogens ? 'active' : 'imactive'}`}>
                                    Pathogen with Vaccines Candidate
                                </div> */}
                            {showVaccineCandidatePathogens && filteredLicenserSidebarList.map((item, i) => {
                                // console.log(item, i)
                                return (
                                    <div
                                        key={i + Math.round() * 999}
                                        className={`sidebar-item bg-sidebar-unselected text-dark rounded-3 ms-4 mb-1 ${((showVaccineCandidatePathogens && activeTab === 'Vaccine Candidates' && ((selectedVaccineCandidate === item) || (selectedVaccineCandidate.name === item.name))))
                                            ? 'active' : (currentIdxCandidatePathogen - i) === 0 ? 'active' : 'inactive'
                                            }`}
                                        onClick={() => {
                                            setCurrentIdxCandidatePathogen(i);
                                            handleClickSidebar(item)
                                        }}
                                    >
                                        {italizeScientificNames(item.name)}
                                    </div>
                                )
                            })}
                        </>
                    )
                }

                {
                    activeTab === "Licensed Vaccines" && (
                        <>
                            {/* <div onClick={() => {
                                setShowVaccineCandidatePathogens(false);
                                setShowLicensedPathogens(!showLicensedPathogens)
                            }} className={`sidebar-item bg-sidebar-unselected text-dark rounded-3 ms-2 mb-1 ${showLicensedPathogens ? 'active' : 'inactive'}`}>
                                Pathogen with Licensed Vaccines
                            </div> */}
                            {showLicensedPathogens && filteredLicenserSidebarList.map((item, i) => {
                                return (
                                    <div
                                        key={i}
                                        className={`sidebar-item bg-sidebar-unselected text-dark rounded-3 ms-4 mb-1 ${showLicensedPathogens && activeTab === 'Licensed Vaccines' && selectedPathogen === item
                                            ? 'active' : 'inactive'
                                            }`}
                                        onClick={() => {
                                            handleClickSidebar(item)
                                        }}
                                    >
                                        {italizeScientificNames(item.name)}
                                    </div>
                                )
                            })}
                        </>
                    )
                }

                {activeTab !== "Compare" && activeTab !== "Pathogen" && activeTab !== "Licensed Vaccines" && activeTab !== "Vaccine Candidates" && activeTab !== "Nitag" && filteredLicenserSidebarList.map((item, i) => (
                    <div
                        key={i}
                        className={`sidebar-item bg-sidebar-unselected text-dark rounded-3 ms-2 mb-1 ${activeTab === 'Manufacturer' && selectedManufacturer === item
                            ? 'active' : activeTab === 'Licensed Vaccines' && selectedPathogen === item
                                // ? 'active' : activeTab === 'Vaccine' && selectedVaccine === item
                                ? 'active' : activeTab === 'Vaccine Candidates' && selectedVaccineCandidate === item
                                    ? 'active' : activeTab === 'Pathogen' && selectedPathogen === item
                                        ? 'active' : activeTab === 'Licenser' && selectedLicenser === item
                                            ? 'active' : activeTab === 'Compare' && selectedCompare === item ? 'active' : 'inactive'
                            }`}
                        onClick={() => {
                            handleClickSidebar(item)
                        }}
                    >
                        {activeTab === "Pathogen" ? italizeScientificNames(item.name) : activeTab === "Compare" ? item.name :
                            activeTab !== "Licenser" ? item.name :
                                `${item.country ? `${item.country} ${item.fullName !== "#" ? `, ${item.fullName}` : ""}` : `${item.acronym} ${item?.region || ""}`}`}
                    </div>
                ))}
                {!(activeFilters?.searchKeyword || activeFilters?.firstAlphabet) && activeTab === 'Licenser' && filteredLicenserSidebarList.length > 0 && (
                    <div
                        key='Countries'
                        className={`sidebar-item bg-sidebar-unselected text-dark rounded-3 py-1 ms-2 mb-1 ${showCountries ? 'active-country' : 'inactive'
                            }`}
                        onClick={() => handleClickSidebar({ name: 'Countries' })}
                    >Licensing authorities in other countries
                    </div>
                )}
                {!activeFilters?.searchKeyword && showCountries && sortArrayAscending(sidebarList.filter(item => !licenserFilter.includes(item.acronym)), "country").map((item, i) => (
                    <div
                        key={`country-${i}`}
                        className={`sidebar-item bg-sidebar-unselected text-dark rounded-3 ms-2 mb-1 ${selectedLicenser === item ? 'active' : 'inactive'}`}
                        onClick={() => handleClickSidebar(item)}
                    >{item.country && `${item.country} ${item.fullName !== "#" ? `, ${item.fullName}` : ""}`}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;