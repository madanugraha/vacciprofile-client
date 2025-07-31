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
import Comparison from './information/Comparison';
import NitagTable from './information/nitag-table';
import { getCandidatePathogens, removeDuplicatesFromArray, sortArrayAscending } from '../utils/array';
import NITAGMap from './information/nitag';

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
    getComparisonByName,
    selectedNitag,
    selectedVaccineCandidate,
    handleSelectVaccineCandidate
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
                (activeTab === 'Compare' && isSelectedObjectNotEmpty(selectedCompare)) ||
                (activeTab === 'Nitag' && isSelectedObjectNotEmpty(selectedNitag)) ||
                (activeTab === 'Licensed Vaccines' && isSelectedObjectNotEmpty(selectedPathogen)) ||
                (activeTab === 'Vaccine Candidates' && isSelectedObjectNotEmpty(selectedVaccineCandidate))
            ) {
                setAnimationClass('');
                const timeout = setTimeout(() => {
                    setAnimationClass('slide-left');
                }, 5);
                return () => clearTimeout(timeout);
            }
        };
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
                activeTab !== "Compare" && sidebarList.length === 0 ? <div className='empty-main d-flex justify-content-center align-items-center'>
                    <span className='clear-filters text-decoration-underline' onClick={() => setActiveFilters({ ...activeFilters, searchKeyword: '', firstAlphabet: '' })}>
                        Clear filters
                    </span>
                </div> :
                    (activeTab === 'Manufacturer' && Object.keys(selectedManufacturer).length === 0) ||
                        // (activeTab === 'Vaccine' && Object.keys(selectedVaccine).length === 0) ||
                        (activeTab === 'Licensed Vaccines' && Object.keys(selectedPathogen).length === 0) ||
                        (activeTab === 'Vaccine Candidates' && Object.keys(selectedVaccineCandidate).length === 0) ||
                        (activeTab === 'Pathogen' && Object.keys(selectedPathogen).length === 0) ||
                        (activeTab === 'Licenser' && Object.keys(selectedLicenser).length === 0) ||
                        (activeTab === 'Compare' && Object.keys(selectedCompare).length === 0)
                        ? <div className='empty-main position-relative'>
                            <img className='arrow-image position-absolute' src="/images/arrow.png" alt="Arrow" width={100} height={100} />
                            <span className='select-prompt position-absolute'>Select a {activeTab}</span>
                        </div> : <>
                            <div className='details-container'>
                                {/* <Vaccine
                                    selectedVaccine={selectedVaccineCandidate}
                                    italizeScientificNames={italizeScientificNames}
                                    convertCamelCaseToReadable={convertCamelCaseToReadable}
                                /> */}
                                {activeTab === "Pathogen"
                                    ? <Pathogen
                                        selectedPathogen={selectedPathogen}
                                        isHide={true}
                                        italizeScientificNames={italizeScientificNames}
                                        activeTab={activeTab}
                                        handleSelectVaccine={handleSelectVaccine}
                                    /> : activeTab === "Licensed Vaccines"
                                        ? <Pathogen
                                            selectedPathogen={selectedPathogen}
                                            isHide={true}
                                            italizeScientificNames={italizeScientificNames}
                                            activeTab={activeTab}
                                            handleSelectVaccine={handleSelectVaccine}
                                        /> : activeTab === "Vaccine Candidates"
                                            ? <Pathogen
                                                selectedPathogen={selectedVaccineCandidate}
                                                isHide={true}
                                                isCandidatePathogen={true}
                                                italizeScientificNames={italizeScientificNames}
                                                activeTab={activeTab}
                                                handleSelectVaccineCandidate={handleSelectVaccineCandidate}
                                                handleSelectVaccine={handleSelectVaccine}
                                            /> : activeTab === "Manufacturer"
                                                ? <ManufacturerProfile
                                                    selectedManufacturer={selectedManufacturer}
                                                    getVaccinesByManufacturer={getVaccinesByManufacturer}
                                                    convertCamelCaseToReadable={convertCamelCaseToReadable}
                                                /> : activeTab === "Licenser"
                                                    ? <Licenser
                                                        activeFilters={activeFilters}
                                                        activeTab={activeTab}
                                                        getVaccinesByLicenser={getVaccinesByLicenser}
                                                        handleSelectVaccine={handleSelectVaccine}
                                                        selectedLicenser={selectedLicenser}
                                                        selectedPathogen={selectedPathogen}
                                                        selectedVaccine={selectedVaccine}
                                                        handleSelectPathogen={handleSelectPathogen}
                                                        italizeScientificNames={italizeScientificNames}
                                                        convertCamelCaseToReadable={convertCamelCaseToReadable}
                                                    /> : activeTab === "Compare" ? (
                                                        <Comparison selectedPathogen={selectedCompare}
                                                            italizeScientificNames={italizeScientificNames} />
                                                    ) : activeTab === "Nitag" ?
                                                        <NITAGMap activeTab={activeTab} selectedNitag={selectedNitag} />
                                                        // ? <NitagTable
                                                        //     activeTab={activeTab}
                                                        //     selectedNitag={selectedNitag}
                                                        // />
                                                        : null}
                                {activeTab === "Manufacturer"
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
                                        handleSelectVaccineCandidate={handleSelectVaccineCandidate}
                                        getLicenserById={getLicenserById}
                                        convertCamelCaseToReadable={convertCamelCaseToReadable}
                                        italizeScientificNames={italizeScientificNames}
                                        selectedManufacturer={selectedManufacturer}
                                    />
                                    : ``}



                                {/* {activeTab === "Manufacturer" && getPipelineVaccinesByManufacturer().length > 0
                                    ?
                                    <PipelineVaccineListTable
                                        activeTab={activeTab}
                                        selectedPathogen={selectedPathogen}
                                        selectedVaccine={selectedVaccine}
                                        selectedLicenser={selectedLicenser}
                                        selectedManufacturer={selectedManufacturer}
                                        handleSelectVaccine={handleSelectVaccine}
                                        handleSelectPathogen={handleSelectPathogen}
                                        handleSelectLicenser={handleSelectLicenser}
                                        getPipelineVaccinesByManufacturer={getPipelineVaccinesByManufacturer}
                                        getPathogenByVaccine={getPathogenByVaccine}
                                        getPathogenById={getPathogenById}
                                        getLicenserById={getLicenserById}
                                        italizeScientificNames={italizeScientificNames}
                                    />
                                    : ``} */}
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