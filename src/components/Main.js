import React, { useState, useEffect } from 'react';

import VaccineListTable from './information/VaccineListTable';
import Pathogen from './information/Pathogen';
import Vaccine from './information/Vaccine';
import ManufacturerProfile from './information/ManufacturerProfile';
import Licenser from './information/Licenser';
import PipelineVaccineListTable from './information/PipelineVaccineListTable';
import manufacturers from '../assets/data/manufacturers.json';
import pathogens from '../assets/data/pathogens.json';
import vaccines from '../assets/data/vaccines.json';
import { getLicenserDetailById, getManufactureDetailByName, getPathogenDetailById, getPathogenVaccinesByArrayName, getPathogenVaccinesByName, getProductProfileValueByVaccineNameAndType, getVaccineDetailById, getVaccineDetailByName } from '../utils/pathogens';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import ReactModal from 'react-modal';
import { toast } from 'react-toastify';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '80%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 6,
    borderRadius: 4
};

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
 * @param {Array} props.sidebarList - List of items (manufacturers, vaccines, or pathogens) available for selection.
 * @param {string} props.activeTab - The type of details to display ('Pathogen', 'Vaccine', 'Manufacturer', 'Licenser').
 * @param {Object} props.activeFilters - The current active filters.
 * @param {Object} props.setActiveFilters - Sets the current active filters.
 * @param {Function} props.handleSelectPathogen - Function to handle the selection of a pathogen.
 * @param {Function} props.handleSelectVaccine - Function to handle the selection of a vaccine.
 * @param {Function} props.handleSelectLicenser - Function to handle the selection of an licenser.
 * @param {Function} props.getPathogenByVaccine - Function to get the pathogen associated with a vaccine.
 * @param {Function} props.getVaccinesByManufacturer - Function to get vaccines associated with a manufacturer.
 * @param {Function} props.getVaccinesByLicenser - Function to get vaccines associated with an licenser.
 * @param {String} props.changedFrom - The param where the selected item change took place
 * @param {Function} props.italizeScientificNames - Function to italicize scientific names in descriptions.
 * @param {Function} props.convertCamelCaseToReadable - Function to convert camel case strings to a readable format.
 * @param {Function} props.getLicenserById - Function to retrieve licenser details by ID.
 * @returns {JSX.Element} The Main component displaying detailed information based on the selected type and filters.
 *
 * @example
 * // Example usage of Main component
 * <Main
 *    selectedPathogen={{ name: 'COVID-19', description: '...' }}
 *    selectedVaccine={{ name: 'VaccineX', description: '...', link: '...', lastUpdated: '...' }}
 *    selectedManufacturer={{ name: 'ManufacturerY', description: '...' }}
 *    selectedLicenser='LicenserZ'
 *    sidebarList={[{ name: 'ItemA' }, { name: 'ItemB' }]}
 *    activeTab='Pathogen'
 *    activeFilters={activeFilters}
 *    setActiveFilters={filters=>console.log(activeFilters)}
 *    handleSelectPathogen={(pathogen) => console.log(pathogen)}
 *    handleSelectVaccine={(vaccine) => console.log(vaccine)}
 *    handleSelectLicenser={(licenser) => console.log(licenser)}
 *    getPathogenByVaccine={(vaccine) => ({ name: 'VirusX' })}
 *    getVaccinesByManufacturer={() => [{ name: 'Vaccine1' }]}
 *    getVaccinesByLicenser={() => [{ name: 'Vaccine2' }]}
 *    changedFrom='Sidebar'
 *    italizeScientificNames={(text) => <i>{text}</i>}
 *    convertCamelCaseToReadable={(text) => text.replace(/([a-z])([A-Z])/g, '$1 $2')}
 *    getLicenserById={(id) => ({ licenserId: id, name: 'LicenserZ' })}
 * />
 */

const Main = ({
    activeTab,
    sidebarList = [],
    selectedPathogen,
    selectedVaccine,
    selectedManufacturer,
    selectedLicenser,
    activeFilters,
    setActiveFilters,
    handleSelectPathogen,
    handleSelectVaccine,
    handleSelectLicenser,
    getPathogenByVaccine,
    getPathogenById,
    getVaccinesByManufacturer,
    getPipelineVaccinesByManufacturer,
    getVaccinesByLicenser,
    changedFrom,
    italizeScientificNames,
    convertCamelCaseToReadable,
    getLicenserById,
    handleSelectCompare,
    selectedCompare,
    getComparisonByName
}) => {

    const [animationClass, setAnimationClass] = useState('slide-left');

    const pathogs = pathogens.sort((a, b) => a.name.localeCompare(b.name));
    const manus = manufacturers.sort((a, b) => a.name.localeCompare(b.name));
    // pathogens compare
    const [pathognCompare1, setPathogenCompare1] = useState(pathogs);
    const [pathogenComparee2, setPathogenCompare2] = useState(pathogs);

    // vaccinee comparee
    const [vaccineCompare1, setVaccineCompare1] = useState(vaccines);
    const [vaccineComparee2, setVaccineCompare2] = useState(vaccines);

    // manufacture compare
    const [manufactureCompare1, setManufactureCompare1] = useState(manus);
    const [manufactureComparee2, setManufactureCompare2] = useState(manus);
    const [targetCompare1, setTargetCompare1] = useState('');
    const [targetCompare2, setTargetCompare2] = useState('');
    const [targetCompareVaccine1, setTargetCompareVaccine1] = useState('');
    const [targetCompareVaccine2, setTargetCompareVaccine2] = useState('');

    const [open, setOpen] = useState(false);
    const [modalSelectedVaccine, setModalSelectedVaccine] = useState({});


    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedVacciProfile, setSelectedVacciProfile] = useState({});

    /**
     * This function determines sets the modal Open
     * 
     * @function
     * @name openModal
     * 
     * @returns {void} This function does not return a value. It updates the `isOpen` state directly.
     */

    function openModal() {
        setModalIsOpen(true);
    }

    /**
     * This function determines sets the modal Close
     * 
     * @function
     * @name openModal
     * 
     * @returns {void} This function does not return a value. It updates the `isOpen` state directly.
     */

    function closeModal() {
        setModalIsOpen(false);
    };

    const [compareState, setCompareState] = useState('pre-compare');

    const handleSetActivePathogenCompare1 = (name) => {
        const d = pathognCompare1.map((x) => {
            if (x.name === name) {
                return {
                    ...x,
                    isActive: true
                }
            } else {
                return {
                    ...x,
                    isActive: false
                }
            }
        });
        setPathogenCompare1(d);
    };

    const handleSetActivePathogenCompare2 = (name) => {
        const d = pathogenComparee2.map((x) => {
            if (x.name === name) {
                return {
                    ...x,
                    isActive: true
                }
            } else {
                return {
                    ...x,
                    isActive: false
                }
            }
        });
        setPathogenCompare2(d);
    };

    const handleSetActiveVaccineCompare1 = (name) => {
        const d = vaccineCompare1.map((x) => {
            if (x.name === name) {
                return {
                    ...x,
                    isActive: true
                }
            } else {
                return {
                    ...x,
                    isActive: false
                }
            }
        });
        setVaccineCompare1(d);
    };
    const handleSetActiveVaccineCompare2 = (name) => {
        const d = vaccineComparee2.map((x) => {
            if (x.name === name) {
                return {
                    ...x,
                    isActive: true
                }
            } else {
                return {
                    ...x,
                    isActive: false
                }
            }
        });
        setVaccineCompare2(d);
    };
    const handleSetActiveManufactureCompare1 = (name) => {
        const d = manufactureCompare1.map((x) => {
            if (x.name === name) {
                return {
                    ...x,
                    isActive: true
                }
            } else {
                return {
                    ...x,
                    isActive: false
                }
            }
        });
        setManufactureCompare1(d);
    };

    const handleSetActiveManufactureCompare2 = (name) => {
        const d = manufactureComparee2.map((x) => {
            if (x.name === name) {
                return {
                    ...x,
                    isActive: true
                }
            } else {
                return {
                    ...x,
                    isActive: false
                }
            }
        });
        setManufactureCompare2(d);
    };

    const formatHeading = content => {
        if (!content) {
            return <span>No content available</span>;
        }
        const updatedContent = content.replace(/'/g, '"');
        return updatedContent.split(/<br\s*\/?>/gi).map((part, index, array) => (
            <span key={index} className={`${index === 1 ? `text-hover` : ``}`}>
                {part}
                {index < array.length - 1 && <br />}
            </span>
        ));
    };

    /**
     * Removes all <br/> tags from a given string.
     *
     * @param {string} text - The input string that may contain <br/> tags.
     * @returns {string} - The input string with all <br/> tags removed.
     *
     * @example
     * const input = "This is a line.<br/>This is another line.<br/>";
     * const output = removeBrTags(input);
     * console.log(output); // "This is a line.This is another line."
     */
    // function removeBrTags(text) {
    //     return text.replace(/<br\s*\/?>/gi, '');
    // }

    /**
        * Formats the given content by:
        * 1. Splitting it at `<br />` or `<br>` tags and inserting React line break elements (`<br />`).
        * 2. Replacing any single apostrophes `'` with double inverted commas `"` in the content.
        * 
        * This function takes a string with `<br />` or `<br>` tags and returns an array of React elements. The string is split at each `<br />` tag, and a line break is inserted between each part, except after the last part. It also replaces single apostrophes with double inverted commas.
        * 
        * @function
        * @param {string} content - The string containing text, `<br />` or `<br>` tags, and possibly single apostrophes.
        * @returns {React.ReactNode[]} An array of React elements where each element represents a part of the original string. Line breaks are inserted between parts based on the original `<br />` tags, and apostrophes are replaced with double quotes.
        * 
        * @example
        * // Example usage
        * const content = "Monovalent live-attuned <br/>(CHIKV-LR2006-OPY1; deleted nsPr3 (replicase complex))";
        * const formatContent = formatContent(content);
        * 
        * // formatContent will be an array of React elements with line breaks appropriately inserted and single apostrophes replaced.
        */
    const formatContent = content => {
        if (typeof content === 'object' && content !== null) {
            content = JSON.stringify(content, null, 2);
        }
        if (typeof content !== 'string') {
            return <span>{String(content)}</span>;
        }
        const updatedContent = content.replace(/'/g, '"');
        const parts = updatedContent.split(/<br\s*\/?>/gi);
        return parts.map((part, index) => (
            <React.Fragment key={index}>
                {part}
                {index < parts.length - 1 && <br />}
            </React.Fragment>
        ));
    };

    const resetAllActiveSelected = () => {
        const newPathogensArray = pathogens.map((v) => {
            return {
                ...v,
                isActive: false
            }
        });
        setPathogenCompare1(newPathogensArray);
        setPathogenCompare2(newPathogensArray);

        const newVaccinesArrray = vaccines.map((v) => {
            return {
                ...v,
                isActive: false
            }
        });
        setVaccineCompare1(newVaccinesArrray);
        setVaccineCompare2(newVaccinesArrray);

        const newManufactureeArrray = manufacturers.map((v) => {
            return {
                ...v,
                isActive: false
            }
        });
        setManufactureCompare1(newManufactureeArrray);
        setManufactureCompare2(newManufactureeArrray);
    }

    useEffect(() => {
        if (changedFrom === "Sidebar") {
            const isSelectedObjectNotEmpty = (obj) => Object.keys(obj).length !== 0;
            if (
                (activeTab === 'Manufacturer' && isSelectedObjectNotEmpty(selectedManufacturer)) ||
                (activeTab === 'Vaccine' && isSelectedObjectNotEmpty(selectedVaccine)) ||
                (activeTab === 'Pathogen' && isSelectedObjectNotEmpty(selectedPathogen)) ||
                (activeTab === 'Licenser' && isSelectedObjectNotEmpty(selectedLicenser)) ||
                (activeTab === 'Compare' && isSelectedObjectNotEmpty(selectedCompare))
            ) {
                setAnimationClass('');
                const timeout = setTimeout(() => {
                    setAnimationClass('slide-left');
                }, 5);
                return () => clearTimeout(timeout);
            }
        }
        resetAllActiveSelected();
        setTargetCompare1('');
        setTargetCompare2('');
        setCompareState('pre-compare');
    }, [changedFrom, activeTab, selectedLicenser, selectedManufacturer, selectedPathogen, selectedVaccine, selectedCompare]);


    useEffect(() => {
        const newPathogensArray = pathogens.map((v) => {
            return {
                ...v,
                isActive: false
            }
        });
        setPathogenCompare1(newPathogensArray);
        setPathogenCompare2(newPathogensArray);

        const newVaccinesArrray = vaccines.map((v) => {
            return {
                ...v,
                isActive: false
            }
        });
        setVaccineCompare1(newVaccinesArrray);
        setVaccineCompare2(newVaccinesArrray);

        const newManufactureeArrray = manufacturers.map((v) => {
            return {
                ...v,
                isActive: false
            }
        });
        setManufactureCompare1(newManufactureeArrray);
        setManufactureCompare2(newManufactureeArrray);
    }, []);


    const platforms = [
        "type",
        "name",
        "composition",
        "strainCoverage",
        "indication",
        "dosing",
        "contraindication",
        "immunogenicity",
        "Efficacy (VEy vs virologically confirmed dengue (VCD))",
        "durationOfProtection",
        "coAdministration",
        "reactogenicity",
        "safety",
        "vaccinationGoal",
        "others"
    ];

    // useEffect(() => {
    //     console.log(compareState, targetCompare1, targetCompare2)
    //     resetAllActiveSelected();
    // }, [compareState, targetCompare1, targetCompare2])
    // console.log(sidebarList);
    return <div className={`bg-white col-6 col-sm-8 col-lg-9 p-0 pe-1 ${animationClass}`}>
        <div className='main-container border border-primary border-1 rounded-3 slide-left overflow-auto'>
            {
                sidebarList.length === 0 ? <div className='empty-main d-flex justify-content-center align-items-center'>
                    <span className='clear-filters text-decoration-underline' onClick={() => setActiveFilters({ ...activeFilters, searchKeyword: '', firstAlphabet: '' })}>
                        Clear filters
                    </span>
                </div> :
                    (activeTab === 'Manufacturer' && Object.keys(selectedManufacturer).length === 0) ||
                        (activeTab === 'Vaccine' && Object.keys(selectedVaccine).length === 0) ||
                        (activeTab === 'Pathogen' && Object.keys(selectedPathogen).length === 0) ||
                        (activeTab === 'Licenser' && Object.keys(selectedLicenser).length === 0) ||
                        (activeTab === 'Compare' && Object.keys(selectedCompare).length === 0)
                        ? <div className='empty-main position-relative'>
                            <img className='arrow-image position-absolute' src="/images/arrow.png" alt="Arrow" width={100} height={100} />
                            <span className='select-prompt position-absolute'>Select a {activeTab}</span>
                        </div> : <>
                            <div className='details-container'>
                                {activeTab === "Pathogen"
                                    ? <Pathogen
                                        selectedPathogen={selectedPathogen}
                                        italizeScientificNames={italizeScientificNames}
                                    /> : activeTab === "Vaccine"
                                        ? <Vaccine
                                            selectedVaccine={selectedVaccine}
                                            italizeScientificNames={italizeScientificNames}
                                            convertCamelCaseToReadable={convertCamelCaseToReadable}
                                        /> : activeTab === "Manufacturer"
                                            ? <ManufacturerProfile
                                                selectedManufacturer={selectedManufacturer}
                                                getVaccinesByManufacturer={getVaccinesByManufacturer}
                                                convertCamelCaseToReadable={convertCamelCaseToReadable}
                                            /> : activeTab === "Licenser"
                                                ? <Licenser
                                                    getVaccinesByLicenser={getVaccinesByLicenser}
                                                    handleSelectVaccine={handleSelectVaccine}
                                                    selectedLicenser={selectedLicenser}
                                                /> : activeTab === "Compare" ? (
                                                    <>
                                                        {compareState === 'pre-compare' ? (
                                                            <div className='d-inline-flex'>
                                                                {/** TO-COMPARE-1 */}
                                                                <div className={`sidebar col-6 col-sm-4 col-lg-3 ps-1 pe-0 ${animationClass}`}>
                                                                    {selectedCompare?.name === "Pathogen" && (
                                                                        <div className='sidebar-items overflow-auto'>
                                                                            {pathognCompare1.sort((a, b) => b.name - a.name).map((pathogen) => {
                                                                                return (
                                                                                    <div
                                                                                        key={`pathogen-1-${pathogen.name}`}
                                                                                        style={{ width: 1200 }}
                                                                                        className={`sidebar-item bg-sidebar-unselected text-dark rounded-3 ms-2 mb-1 ${pathogen?.isActive ? 'active' : 'inactive'}`}
                                                                                        onClick={() => {
                                                                                            setTargetCompare1(pathogen.name)
                                                                                            handleSetActivePathogenCompare1(pathogen.name)
                                                                                        }}
                                                                                    >
                                                                                        {pathogen?.name}
                                                                                    </div>
                                                                                )
                                                                            })}
                                                                        </div>
                                                                    )}
                                                                    {selectedCompare?.name === "Vaccine" && (
                                                                        <div className='sidebar-items overflow-auto'>
                                                                            {vaccineCompare1.map((vaccine) => {
                                                                                return (
                                                                                    <div
                                                                                        key={`vaccine-1-${vaccine.name}`}
                                                                                        className={`sidebar-item bg-sidebar-unselected text-dark rounded-3 ms-2 mb-1 ${vaccine?.isActive ? 'active' : 'inactive'}`}
                                                                                        onClick={() => {
                                                                                            setTargetCompare1(vaccine.name)
                                                                                            handleSetActiveVaccineCompare1(vaccine.name)
                                                                                        }}
                                                                                    >
                                                                                        {vaccine?.name}
                                                                                    </div>
                                                                                )
                                                                            })}
                                                                        </div>
                                                                    )}
                                                                    {selectedCompare?.name === "Manufacturer" && (
                                                                        <div className='sidebar-items overflow-auto'>
                                                                            {manufactureCompare1.map((manufacture) => {
                                                                                return (
                                                                                    <div
                                                                                        style={{ width: 1000 }}
                                                                                        key={`manufacturer-1-${manufacture.name}`}
                                                                                        className={`sidebar-item bg-sidebar-unselected text-dark rounded-3 ms-2 mb-1 ${manufacture?.isActive ? 'active' : 'inactive'}`}
                                                                                        onClick={() => {
                                                                                            setTargetCompare1(manufacture.name)
                                                                                            handleSetActiveManufactureCompare1(manufacture.name)
                                                                                        }}
                                                                                    >
                                                                                        {manufacture?.name}
                                                                                    </div>
                                                                                )
                                                                            })}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                {/** TO-COMPARE-2 */}
                                                                <div style={{ marginLeft: 10 }} className={`sidebar col-6 col-sm-4 col-lg-3 ps-1 pe-0 ${animationClass}`}>
                                                                    {selectedCompare?.name === "Pathogen" && (
                                                                        <div className='d-inline-flex'>
                                                                            <div className='sidebar-items overflow-auto'>
                                                                                {getPathogenVaccinesByName(targetCompare1).map((pathogen) => {
                                                                                    return (
                                                                                        <div
                                                                                            key={`pathogen-2-${pathogen.name}`}
                                                                                            className={`sidebar-item bg-sidebar-unselected text-dark rounded-3 ms-2 mb-1 ${targetCompareVaccine1 === pathogen.name ? 'active' : 'inactive'}`}
                                                                                            onClick={() => {
                                                                                                setTargetCompareVaccine1(pathogen.name)
                                                                                                // handleSetActivePathogenCompare2(pathogen.name)
                                                                                            }}
                                                                                        >
                                                                                            {pathogen?.name}
                                                                                        </div>
                                                                                    )
                                                                                })}
                                                                            </div>
                                                                            <div className='sidebar-items overflow-auto'>
                                                                                {getPathogenVaccinesByName(targetCompare1).map((pathogen) => {
                                                                                    return (
                                                                                        <div
                                                                                            key={`pathogen-2-${pathogen.name}`}
                                                                                            className={`sidebar-item bg-sidebar-unselected text-dark rounded-3 ms-2 mb-1 ${targetCompareVaccine2 === pathogen.name ? 'active' : 'inactive'}`}
                                                                                            onClick={() => {
                                                                                                setTargetCompareVaccine2(pathogen.name)
                                                                                                // handleSetActivePathogenCompare2(pathogen.name)
                                                                                            }}
                                                                                        >
                                                                                            {pathogen?.name}
                                                                                        </div>
                                                                                    )
                                                                                })}
                                                                            </div>
                                                                        </div>

                                                                    )}
                                                                    {selectedCompare?.name === "Vaccine" && (
                                                                        <div className='sidebar-items overflow-auto'>
                                                                            {vaccineComparee2.map((vaccine) => {
                                                                                return (
                                                                                    <div
                                                                                        key={`vaccine-2-${vaccine.name}`}
                                                                                        className={`sidebar-item bg-sidebar-unselected text-dark rounded-3 ms-2 mb-1 ${vaccine?.isActive ? 'active' : 'inactive'}`}
                                                                                        onClick={() => {
                                                                                            setTargetCompare2(vaccine.name)
                                                                                            handleSetActiveVaccineCompare2(vaccine.name)
                                                                                        }}
                                                                                    >
                                                                                        {vaccine?.name}
                                                                                    </div>
                                                                                )
                                                                            })}
                                                                        </div>
                                                                    )}
                                                                    {selectedCompare?.name === "Manufacturer" && (
                                                                        <div className='sidebar-items overflow-auto'>
                                                                            {manufactureComparee2.map((manufacture) => {
                                                                                return (
                                                                                    <div
                                                                                        key={`manufacture-2-${manufacture.name}`}
                                                                                        className={`sidebar-item bg-sidebar-unselected text-dark rounded-3 ms-2 mb-1 ${manufacture?.isActive ? 'active' : 'inactive'}`}
                                                                                        onClick={() => {
                                                                                            setTargetCompare2(manufacture.name)
                                                                                            handleSetActiveManufactureCompare2(manufacture.name)
                                                                                        }}
                                                                                    >
                                                                                        {manufacture?.name}
                                                                                    </div>
                                                                                )
                                                                            })}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                {
                                                                    (targetCompareVaccine1 && targetCompareVaccine2) || (targetCompare1 && targetCompare2) ? (
                                                                        <div onClick={() => {
                                                                            if ((!targetCompareVaccine1 && !targetCompareVaccine2) && (!targetCompare1 && !targetCompare2)) {
                                                                                return toast.error('Please select to compare first.')
                                                                            }
                                                                            setCompareState(`compare-result-${selectedCompare?.name.toLowerCase()}`)
                                                                        }} className='cursor-pointer' style={{ width: 180, backgroundColor: 'blue', height: 30, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                                                                            <p className='' style={{ padding: 4, borderRadius: 8, alignSelf: 'center', textAlign: 'center', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bolder' }}>Proceed Compare</p>
                                                                        </div>
                                                                    ) : null
                                                                }
                                                            </div>
                                                        ) : (
                                                            <div style={{ height: '100%', width: '100%' }}>
                                                                <div className='d-flex flex-column'>
                                                                    <div onClick={() => {
                                                                        resetAllActiveSelected();
                                                                        setTargetCompare1('');
                                                                        setTargetCompare2('');
                                                                        setCompareState('pre-compare');
                                                                    }} className='cursor-pointer d-inline-flex text-center align-items-center' style={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 4, paddingRight: 4, backgroundColor: 'red', borderRadius: 10, width: 80, marginBottom: 20 }}>
                                                                        <i className='fa-solid fa-arrow-left' style={{ color: 'white' }} />
                                                                        <span className='' style={{ marginLeft: 5, color: 'white', fontWeight: 'bolder' }}>Back</span>
                                                                    </div>
                                                                    <div className='d-flex flex-column' style={{ marginBottom: 10 }}>
                                                                        <span style={{ fontWeight: 'bolder', fontSize: 18 }}>Comparison Result</span>
                                                                        <span style={{ marginBottom: 20 }}>Between: {targetCompareVaccine1} and {targetCompareVaccine2}</span>
                                                                    </div>
                                                                    {compareState === "compare-result-pathogen" && (
                                                                        <>
                                                                            <div className='outer'>
                                                                                <div className="d-inline-flex w-100 inner">
                                                                                    {getPathogenVaccinesByArrayName([targetCompareVaccine1, targetCompareVaccine2]).length > 0 ? getPathogenVaccinesByArrayName([targetCompareVaccine1, targetCompareVaccine2]).map((vaccine, vaccineIdx) => {
                                                                                        return vaccine?.productProfiles && (
                                                                                            <table style={{ marginLeft: vaccineIdx === 0 ? 400 : 0, overflow: 'hidden' }} className='table-fixed' key={vaccine.description} border={1}>
                                                                                                <tbody>
                                                                                                    {platforms.map((key) => {
                                                                                                        return key === "name" ? null : (
                                                                                                            <>
                                                                                                                <tr key={Math.random() * 999}>
                                                                                                                    {vaccineIdx === 0 && (
                                                                                                                        <td colSpan={1} style={{ color: 'white', fontWeight: 'bold', height: '100%' }} className={`align-middle ${vaccineIdx === 0 && 'fix'} ${key === "composition" ? `text-white bg-black` : ``}`}>{key === "composition" ? `Composition/Platform` : key === "coAdministration" ? `Co-Administration` : convertCamelCaseToReadable(key)}</td>
                                                                                                                    )}
                                                                                                                    <td colSpan={2} width={400 * 1} style={{ fontWeight: key === "type" ? "bold" : "normal" }} className={`align-middle ${key === "composition" ? `text-white bg-black` : ``}`}>{key === "type" ? `EMA - ${vaccine.name}` : getProductProfileValueByVaccineNameAndType("EMA", key, vaccine.name)}</td>
                                                                                                                    <td colSpan={2} width={400 * 1} style={{ fontWeight: key === "type" ? "bold" : "normal" }} className={`align-middle ${key === "composition" ? `text-white bg-black` : ``}`}>{key === "type" ? `FDA - ${vaccine.name}` : getProductProfileValueByVaccineNameAndType("FDA", key, vaccine.name)}</td>
                                                                                                                    <td colSpan={2} width={400 * 1} style={{ fontWeight: key === "type" ? "bold" : "normal" }} className={`align-middle ${key === "composition" ? `text-white bg-black` : ``}`}>{key === "type" ? `WHO - ${vaccine.name}` : getProductProfileValueByVaccineNameAndType("WHO", key, vaccine.name)}</td>
                                                                                                                </tr>
                                                                                                            </>
                                                                                                        )
                                                                                                    })}
                                                                                                </tbody>
                                                                                            </table>
                                                                                        )
                                                                                    }) : null}
                                                                                </div>
                                                                            </div>
                                                                            {/* <table border={1}>
                                                                                <tr>
                                                                                    <td style={{ fontWeight: 'bold' }}>Name</td>
                                                                                    <td colSpan={3} style={{ fontWeight: 'bold' }}>{targetCompareVaccine1}</td>
                                                                                    <td colSpan={3} style={{ fontWeight: 'bold' }}>{targetCompareVaccine2}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td style={{ fontWeight: 'bold' }} colSpan={7} align='center'>VacciProfiles</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td style={{ fontWeight: 'bold' }}>Factor</td>
                                                                                    <td style={{ fontWeight: 'bold' }} colSpan={3}>{targetCompareVaccine1}</td>
                                                                                    <td style={{ fontWeight: 'bold' }} colSpan={3}>{targetCompareVaccine2}</td>
                                                                                </tr>
                                                                                {platforms.map((key) => {
                                                                                    return key === "name" ? null : (
                                                                                        <>
                                                                                            <tr>
                                                                                                <td colSpan={1} style={{ color: key === 'type' ? 'black' : 'gray', fontWeight: 'bold' }} className={`align-middle ${key === "composition" ? `text-white bg-black` : ``}`}>{key === "composition" ? `Composition/Platform` : key === "coAdministration" ? `Co-Administration` : convertCamelCaseToReadable(key)}</td>
                                                                                                <td colSpan={3} style={{ fontWeight: key === "type" ? "bold" : "normal" }} className={`align-middle ${key === "composition" ? `text-white bg-black` : ``}`}>{getProductProfileValueByVaccineName(key, targetCompareVaccine1)}</td>
                                                                                                <td colSpan={3} style={{ fontWeight: key === "type" ? "bold" : "normal" }} className={`align-middle ${key === "composition" ? `text-white bg-black` : ``}`}>{getProductProfileValueByVaccineName(key, targetCompareVaccine2)}</td>
                                                                                            </tr>
                                                                                        </>

                                                                                    )
                                                                                })}
                                                                            </table> */}
                                                                        </>
                                                                    )}
                                                                    {compareState === "compare-result-vaccine" && (
                                                                        <table>
                                                                            <tr>
                                                                                <td style={{ fontWeight: 'bold' }}>Name</td>
                                                                                <td colSpan={3} style={{ fontWeight: 'bold' }}>{targetCompare1}</td>
                                                                                <td colSpan={3} style={{ fontWeight: 'bold' }}>{targetCompare2}</td>
                                                                            </tr>
                                                                            {/** LICENSING TARGET 1 */}
                                                                            <tr>
                                                                                <td style={{ fontWeight: 'bold' }} colSpan={7} align='center'>Licensing - {targetCompare1}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style={{ fontWeight: 'bold', color: 'gray' }}>Link</td>
                                                                                <td style={{ fontWeight: 'bold', color: 'gray' }} colSpan={2}>Licensing/ SmPC</td>
                                                                                <td style={{ fontWeight: 'bold', color: 'gray' }} colSpan={2}>Indication</td>
                                                                                <td style={{ fontWeight: 'bold', color: 'gray' }}>Approval Date</td>
                                                                                <td style={{ fontWeight: 'bold', color: 'gray' }}>Doses Sold</td>
                                                                            </tr>
                                                                            {
                                                                                getVaccineDetailByName(targetCompare1)?.licensingDates && getVaccineDetailByName(targetCompare1).licensingDates.length > 0 ? getVaccineDetailByName(targetCompare1).licensingDates.map((licenser, idx) => {
                                                                                    return (
                                                                                        <>
                                                                                            <tr>
                                                                                                <td><a href={licenser?.source} target="_blank" rel="noreferrer" style={{ fontWeight: 'normal', color: 'blue' }}>{licenser?.name || "click here"}</a></td>
                                                                                                <td colSpan={2}>{licenser?.name || "-"}</td>
                                                                                                <td colSpan={2}>{licenser?.indication || "-"}</td>
                                                                                                <td>{licenser.date}</td>
                                                                                                <td>{licenser?.dosesSold || "-"}</td>
                                                                                            </tr>
                                                                                        </>
                                                                                    )
                                                                                }) : <tr>
                                                                                    <td colSpan={5}>- No Data Available -</td>
                                                                                </tr>
                                                                            }
                                                                            {/** LICENSING TARGET 2 */}
                                                                            <tr>
                                                                                <td style={{ fontWeight: 'bold' }} colSpan={7} align='center'>Licensing - {targetCompare2}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style={{ fontWeight: 'bold', color: 'gray' }}>Link</td>
                                                                                <td style={{ fontWeight: 'bold', color: 'gray' }} colSpan={2}>Licensing/ SmPC</td>
                                                                                <td style={{ fontWeight: 'bold', color: 'gray' }} colSpan={2}>Indication</td>
                                                                                <td style={{ fontWeight: 'bold', color: 'gray' }}>Approval Date</td>
                                                                                <td style={{ fontWeight: 'bold', color: 'gray' }}>Doses Sold</td>
                                                                            </tr>
                                                                            {
                                                                                getVaccineDetailByName(targetCompare1)?.licensingDates && getVaccineDetailByName(targetCompare1).licensingDates.length > 0 ? getVaccineDetailByName(targetCompare2).licensingDates.map((licenser, idx) => {
                                                                                    return (
                                                                                        <>
                                                                                            <tr>
                                                                                                <td><a href={licenser?.source} target="_blank" rel="noreferrer" style={{ fontWeight: 'normal', color: 'blue' }}>{licenser?.name || "click here"}</a></td>
                                                                                                <td colSpan={2}>{licenser?.name || "-"}</td>
                                                                                                <td colSpan={2}>{licenser?.indication || "-"}</td>
                                                                                                <td>{licenser.date}</td>
                                                                                                <td>{licenser?.dosesSold || "-"}</td>
                                                                                            </tr>
                                                                                        </>
                                                                                    )
                                                                                }) : <tr>
                                                                                    <td colSpan={5}>- No Data Available -</td>
                                                                                </tr>
                                                                            }
                                                                            <tr>
                                                                                <td style={{ fontWeight: 'bold' }} colSpan={7} align='center'>VacciProfiles</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style={{ fontWeight: 'bold' }}>{targetCompare1}</td>
                                                                                <td colSpan={6} className='text-left'>
                                                                                    <i
                                                                                        className="fa-solid fa-file-medical text-hover hover-cursor"
                                                                                        onClick={() => {
                                                                                            setSelectedVacciProfile(getVaccineDetailByName(targetCompare1).productProfiles[0]);
                                                                                            openModal();
                                                                                        }}
                                                                                    ></i>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style={{ fontWeight: 'bold' }}>{targetCompare2}</td>
                                                                                <td colSpan={6} className='text-left'>
                                                                                    <i
                                                                                        className="fa-solid fa-file-medical text-hover hover-cursor"
                                                                                        onClick={() => {
                                                                                            setSelectedVacciProfile(getVaccineDetailByName(targetCompare2).productProfiles[0]);
                                                                                            openModal();
                                                                                        }}
                                                                                    ></i>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td colSpan={7} align='center' style={{ fontWeight: 'bold' }}>General Information</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style={{ fontWeight: 'bold', color: 'gray' }}>Factor</td>
                                                                                <td colSpan={3} style={{ fontWeight: 'bold' }}>{targetCompare1}</td>
                                                                                <td colSpan={3} style={{ fontWeight: 'bold' }}>{targetCompare2}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style={{ fontWeight: 'bold', color: 'gray' }}>Map Vaccine Preventable Diseases</td>
                                                                                <td colSpan={3}>{getVaccineDetailByName(targetCompare1)?.introduction ? getVaccineDetailByName(targetCompare1)?.introduction["General Information"]["Map Vaccine Preventable Diseases"] : "-"}</td>
                                                                                <td colSpan={3}>{getVaccineDetailByName(targetCompare1)?.introduction ? getVaccineDetailByName(targetCompare2)?.introduction["General Information"]["Map Vaccine Preventable Diseases"] : "-"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style={{ fontWeight: 'bold', color: 'gray' }}>Vaccine SmPCs (FDA, EMA, WHO, others)</td>
                                                                                <td colSpan={3}>{getVaccineDetailByName(targetCompare1)?.introduction ? getVaccineDetailByName(targetCompare1)?.introduction["General Information"]["Vaccine SmPCs (FDA, EMA, WHO, others)"] : "-"}</td>
                                                                                <td colSpan={3}>{getVaccineDetailByName(targetCompare1)?.introduction ? getVaccineDetailByName(targetCompare2)?.introduction["General Information"]["Vaccine SmPCs (FDA, EMA, WHO, others)"] : "-"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style={{ fontWeight: 'bold', color: 'gray' }}>Product profiles</td>
                                                                                <td colSpan={3}>{getVaccineDetailByName(targetCompare1)?.introduction ? getVaccineDetailByName(targetCompare1)?.introduction["General Information"]["Product profiles"] : "-"}</td>
                                                                                <td colSpan={3}>{getVaccineDetailByName(targetCompare1)?.introduction ? getVaccineDetailByName(targetCompare2)?.introduction["General Information"]["Product profiles"] : "-"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style={{ fontWeight: 'bold', color: 'gray' }}>Pipeline products - summary table</td>
                                                                                <td colSpan={3}>{getVaccineDetailByName(targetCompare1)?.introduction ? getVaccineDetailByName(targetCompare1)?.introduction["General Information"]["Pipeline products - summary table"] : "-"}</td>
                                                                                <td colSpan={3}>{getVaccineDetailByName(targetCompare1)?.introduction ? getVaccineDetailByName(targetCompare2)?.introduction["General Information"]["Pipeline products - summary table"] : "-"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style={{ fontWeight: 'bold', color: 'gray' }}>Failed products</td>
                                                                                <td colSpan={3}>{getVaccineDetailByName(targetCompare1)?.introduction ? getVaccineDetailByName(targetCompare1)?.introduction["General Information"]["Failed products"] : "-"}</td>
                                                                                <td colSpan={3}>{getVaccineDetailByName(targetCompare1)?.introduction ? getVaccineDetailByName(targetCompare2)?.introduction["General Information"]["Failed products"] : "-"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td colSpan={7} style={{ fontWeight: 'bold' }} align='center'>Company products, pipeline</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style={{ fontWeight: 'bold', color: 'gray' }}>Factor</td>
                                                                                <td colSpan={3} style={{ fontWeight: 'bold' }}>{targetCompare1}</td>
                                                                                <td colSpan={3} style={{ fontWeight: 'bold' }}>{targetCompare2}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style={{ fontWeight: 'bold', color: 'gray' }}>VPD-BoD, Product presentations, Monograph</td>
                                                                                <td colSpan={3}>{getVaccineDetailByName(targetCompare1)?.introduction ? getVaccineDetailByName(targetCompare1)?.introduction["Company products, pipeline"]["VPD-BoD, Product presentations, Monograph"] : "-"}</td>
                                                                                <td colSpan={3}>{getVaccineDetailByName(targetCompare1)?.introduction ? getVaccineDetailByName(targetCompare2)?.introduction["Company products, pipeline"]["VPD-BoD, Product presentations, Monograph"] : "-"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style={{ fontWeight: 'bold', color: 'gray' }}>Pivotal publications / data vaccines</td>
                                                                                <td colSpan={3}>{getVaccineDetailByName(targetCompare1)?.introduction ? getVaccineDetailByName(targetCompare1)?.introduction["Company products, pipeline"]["Pivotal publications / data vaccines"] : "-"}</td>
                                                                                <td colSpan={3}>{getVaccineDetailByName(targetCompare1)?.introduction ? getVaccineDetailByName(targetCompare2)?.introduction["Company products, pipeline"]["Pivotal publications / data vaccines"] : "-"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style={{ fontWeight: 'bold', color: 'gray' }}>Interviews</td>
                                                                                <td colSpan={3}>{getVaccineDetailByName(targetCompare1)?.introduction ? getVaccineDetailByName(targetCompare1)?.introduction["Company products, pipeline"]["Interviews"] : "-"}</td>
                                                                                <td colSpan={3}>{getVaccineDetailByName(targetCompare1)?.introduction ? getVaccineDetailByName(targetCompare2)?.introduction["Company products, pipeline"]["Interviews"] : "-"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style={{ fontWeight: 'bold', color: 'gray' }}>Relevant literature</td>
                                                                                <td colSpan={3}>{getVaccineDetailByName(targetCompare1)?.introduction ? getVaccineDetailByName(targetCompare1)?.introduction["Company products, pipeline"]["Relevant literature"] : "-"}</td>
                                                                                <td colSpan={3}>{getVaccineDetailByName(targetCompare1)?.introduction ? getVaccineDetailByName(targetCompare2)?.introduction["Company products, pipeline"]["Relevant literature"] : "-"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style={{ fontWeight: 'bold', color: 'gray' }}>Pipeline products - detailed information (TPP)</td>
                                                                                <td colSpan={3}>{getVaccineDetailByName(targetCompare1)?.introduction ? getVaccineDetailByName(targetCompare1)?.introduction["Company products, pipeline"]["Pipeline products - detailed information (TPP)"] : "-"}</td>
                                                                                <td colSpan={3}>{getVaccineDetailByName(targetCompare1)?.introduction ? getVaccineDetailByName(targetCompare2)?.introduction["Company products, pipeline"]["Pipeline products - detailed information (TPP)"] : "-"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style={{ fontWeight: 'bold', color: 'gray' }}>Last Updated</td>
                                                                                <td style={{ fontWeight: 'bold' }} align='right' colSpan={3}>{getVaccineDetailByName(targetCompare1)?.lastUpdated}</td>
                                                                                <td style={{ fontWeight: 'bold' }} align='right' colSpan={3}>{getVaccineDetailByName(targetCompare2)?.lastUpdated}</td>
                                                                            </tr>
                                                                        </table>
                                                                    )}
                                                                    {compareState === "compare-result-manufacturer" && (
                                                                        <table>
                                                                            <tr>
                                                                                <td style={{ fontWeight: 'bold' }}>Name</td>
                                                                                <td style={{ fontWeight: 'bold' }}>{targetCompare1}</td>
                                                                                <td style={{ fontWeight: 'bold' }}>{targetCompare2}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style={{ fontWeight: 'bold', color: 'gray' }}>Founded</td>
                                                                                <td>{getManufactureDetailByName(targetCompare1)?.details?.founded || "-"}</td>
                                                                                <td>{getManufactureDetailByName(targetCompare2)?.details?.founded || "-"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style={{ fontWeight: 'bold', color: 'gray' }}>Headquarter</td>
                                                                                <td>{getManufactureDetailByName(targetCompare1)?.details?.headquarters || "-"}</td>
                                                                                <td>{getManufactureDetailByName(targetCompare2)?.details?.headquarters || "-"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style={{ fontWeight: 'bold', color: 'gray' }}>CEO</td>
                                                                                <td>{getManufactureDetailByName(targetCompare1)?.details?.ceo || "-"}</td>
                                                                                <td>{getManufactureDetailByName(targetCompare2)?.details?.ceo || "-"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style={{ fontWeight: 'bold', color: 'gray' }}>Revenue/Operating Income/Net Income</td>
                                                                                <td>{getManufactureDetailByName(targetCompare1)?.details?.revenue || "-"}/{getManufactureDetailByName(targetCompare1)?.details?.operatingIncome || "-"}/{getManufactureDetailByName(targetCompare1)?.details?.netIncome || "-"}</td>
                                                                                <td>{getManufactureDetailByName(targetCompare2)?.details?.revenue || "-"}/{getManufactureDetailByName(targetCompare2)?.details?.operatingIncome || "-"}/{getManufactureDetailByName(targetCompare2)?.details?.netIncome || "-"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style={{ fontWeight: 'bold', color: 'gray' }}>Total Assets/Total Equity</td>
                                                                                <td>{getManufactureDetailByName(targetCompare1)?.details?.totalAssets || "-"}/{getManufactureDetailByName(targetCompare1)?.details?.totalEquity || "-"}</td>
                                                                                <td>{getManufactureDetailByName(targetCompare2)?.details?.totalAssets || "-"}/{getManufactureDetailByName(targetCompare2)?.details?.totalEquity || "-"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style={{ fontWeight: 'bold', color: 'gray' }}>Number of Employees</td>
                                                                                <td>{getManufactureDetailByName(targetCompare1)?.details?.numberOfEmployees || "-"}</td>
                                                                                <td>{getManufactureDetailByName(targetCompare2)?.details?.numberOfEmployees || "-"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td align='center' colSpan={3} style={{ fontWeight: 'bold' }}>Licensed Vaccines ({targetCompare1})</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style={{ fontWeight: 'bold', color: 'gray' }}>Vaccine Name</td>
                                                                                <td style={{ fontWeight: 'bold', color: 'gray' }}>Pathogen</td>
                                                                                <td style={{ fontWeight: 'bold', color: 'gray' }}>Licensing</td>
                                                                            </tr>
                                                                            {
                                                                                getManufactureDetailByName(targetCompare1)?.vaccines && getManufactureDetailByName(targetCompare1).vaccines.length > 0 ? getManufactureDetailByName(targetCompare1).vaccines?.map((vaccine) => {
                                                                                    return (
                                                                                        <tr>
                                                                                            <td>{getVaccineDetailById(vaccine?.vaccineId)?.name || "-"}</td>
                                                                                            <td>{getPathogenDetailById(vaccine?.pathogenId)?.name || "-"}</td>
                                                                                            <td>{getVaccineDetailById(vaccine?.vaccineId)?.licensers.length > 0 ? getVaccineDetailById(vaccine?.vaccineId)?.licensers.map((lic) => getLicenserDetailById(lic.licenserId).acronym).join(', ') : "-"}</td>
                                                                                        </tr>
                                                                                    )
                                                                                }) : <tr>
                                                                                    <td align='center' colSpan={3}>- No Data Available -</td>
                                                                                </tr>
                                                                            }

                                                                            <tr>
                                                                                <td align='center' colSpan={3} style={{ fontWeight: 'bold' }}>Licensed Vaccines ({targetCompare2})</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style={{ fontWeight: 'bold', color: 'gray' }}>Vaccine Name</td>
                                                                                <td style={{ fontWeight: 'bold', color: 'gray' }}>Pathogen</td>
                                                                                <td style={{ fontWeight: 'bold', color: 'gray' }}>Licensing</td>
                                                                            </tr>
                                                                            {
                                                                                getManufactureDetailByName(targetCompare2)?.vaccines && getManufactureDetailByName(targetCompare2).vaccines.length > 0 ? getManufactureDetailByName(targetCompare2).vaccines?.map((vaccine) => {
                                                                                    return (
                                                                                        <tr>
                                                                                            <td>{getVaccineDetailById(vaccine?.vaccineId)?.name || "-"}</td>
                                                                                            <td>{getPathogenDetailById(vaccine?.pathogenId)?.name || "-"}</td>
                                                                                            <td>{getVaccineDetailById(vaccine?.vaccineId)?.licensers.length > 0 ? getVaccineDetailById(vaccine?.vaccineId)?.licensers.map((lic) => getLicenserDetailById(lic.licenserId).acronym).join(', ') : "-"}</td>
                                                                                        </tr>
                                                                                    )
                                                                                }) : <tr>
                                                                                    <td align='center' colSpan={3}>- No Data Available -</td>
                                                                                </tr>
                                                                            }
                                                                            <tr>
                                                                                <td style={{ fontWeight: 'bold', color: 'gray' }}>Last Updated</td>
                                                                                <td>{getManufactureDetailByName(targetCompare1)?.lastUpdated || "-"}</td>
                                                                                <td>{getManufactureDetailByName(targetCompare2)?.lastUpdated || "-"}</td>
                                                                            </tr>
                                                                        </table>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </>
                                                )
                                                    : null}
                                {activeTab === "Manufacturer" && getVaccinesByManufacturer().length > 0
                                    ?
                                    <VaccineListTable
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
                                        italizeScientificNames={italizeScientificNames}
                                        selectedManufacturer={selectedManufacturer}
                                    />
                                    : ``}

                                {activeTab === "Manufacturer" && getPipelineVaccinesByManufacturer().length > 0
                                    ?
                                    <PipelineVaccineListTable
                                        activeTab={activeTab}
                                        selectedPathogen={selectedPathogen}
                                        selectedVaccine={selectedVaccine}
                                        selectedLicenser={selectedLicenser}
                                        handleSelectVaccine={handleSelectVaccine}
                                        handleSelectPathogen={handleSelectPathogen}
                                        handleSelectLicenser={handleSelectLicenser}
                                        getPipelineVaccinesByManufacturer={getPipelineVaccinesByManufacturer}
                                        getPathogenByVaccine={getPathogenByVaccine}
                                        getPathogenById={getPathogenById}
                                        getLicenserById={getLicenserById}
                                        italizeScientificNames={italizeScientificNames}
                                    />
                                    : ``}
                            </div>
                            <Modal
                                keepMounted
                                open={open}
                                onClose={() => setOpen(false)}
                                aria-labelledby="keep-mounted-modal-title"
                                aria-describedby="keep-mounted-modal-description"
                            >
                                <Box sx={style}>
                                    <Vaccine selectedVaccine={modalSelectedVaccine} convertCamelCaseToReadable={convertCamelCaseToReadable} />
                                </Box>
                            </Modal>
                            {selectedVacciProfile && <ReactModal isOpen={modalIsOpen} closeTimeoutMS={200} shouldCloseOnOverlayClick={true} onRequestClose={closeModal}>
                                <i class="fa-solid fa-xmark fa-lg modal-close-btn position-absolute end-0 hover-cursor" onClick={closeModal}></i>
                                <h1 className="heading text-black pt-2 text-center">{formatHeading(selectedVacciProfile.name)}</h1>
                                <table className='table table-light w-100 m-0'>
                                    <tbody>
                                        {Object.entries(selectedVacciProfile).map(([key, value], index) => {
                                            if (key === "name") return null;
                                            return (
                                                <tr key={index}>
                                                    <td className={`align-middle ${key === "composition" ? `text-white bg-black` : ``}`}>{key === "composition" ? `Composition/Platform` : key === "coAdministration" ? `Co-Administration` : convertCamelCaseToReadable(key)}</td>
                                                    <td className={`align-middle ${key === "composition" ? `text-white bg-black` : ``}`}>{formatContent(value)}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </ReactModal>}
                        </>}
        </div>
    </div>
}

export default Main;