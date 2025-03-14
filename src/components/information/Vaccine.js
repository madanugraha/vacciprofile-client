import React, { useState } from 'react';
import ReactModal from "react-modal";
import { getProductProfileValueByVaccineNameAndType } from '../../utils/pathogens';
import { getAllRelatedVaccineCandidateByName } from '../../utils/array';

/**
 * Vaccine Component
 *
 * @component
 * @namespace Vaccine
 * @param {Object} props - The component accepts selectedVaccine and italizeScientificNames as props.
 * @param {Object} props.selectedVaccine - The selected vaccine object containing details such as name, description, link, and lastUpdated.
 * @param {string} props.selectedVaccine.name - The name of the selected vaccine.
 * @param {string} props.selectedVaccine.description - The description of the selected vaccine.
 * @param {string} props.selectedVaccine.link - The URL link to learn more about the selected vaccine.
 * @param {string} props.selectedVaccine.lastUpdated - The last updated date for the selected vaccine.
 * @param {Function} props.convertCamelCaseToReadable - Function that converts camel case strings to a readable format.
 * @returns {JSX.Element} The Vaccine Information component.
 *
 * @example
 * // Render the Vaccine component with a sample vaccine and italizeScientificNames function
 * <Vaccine 
 *   selectedVaccine={{ 
 *     name: 'Vaccine X', 
 *     description: 'A description of Vaccine X with scientific names.', 
 *     link: 'https://example.com/vaccine-x', 
 *     lastUpdated: '2024-07-29' 
 *   }} 
 *   convertCamelCaseToReadable={key => key.replace(/([A-Z])/g, ' $1').toLowerCase()}
 * />
 */

const Vaccine = ({
    selectedVaccine,
    convertCamelCaseToReadable
}) => {

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
    }

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
     * const formatHeading = formatHeading(content);
     * 
     * // formatHeading will be an array of React elements with line breaks appropriately inserted and single apostrophes replaced.
     */

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
    function removeBrTags(text) {
        return text.replace(/<br\s*\/?>/gi, '');
    }

    const platforms = [
        "type",
        "name",
        "composition",
        "strainCoverage",
        "indication",
        "dosing",
        "contraindication",
        "immunogenicity",
        "Efficacy",
        "durationOfProtection",
        "coAdministration",
        "reactogenicity",
        "safety",
        "vaccinationGoal",
        "others"
    ];
    return <div className='position-relative slide-left'>
        <h1 className='heading text-primary text-center'>{selectedVaccine.name}
            {/* {selectedVaccine.packageInsertLink && <i className="fa-regular fa-file-pdf text-warning hover-cursor hover-underline ms-2" onClick={()=>window.open(selectedVaccine.packageInsertLink, '_blank')}></i>} */}
            {selectedVaccine.productProfile && <i className="fa-solid fa-file-medical text-hover hover-cursor ms-2" onClick={openModal}></i>}
        </h1>
        {/* <p className='mb-3'>{italizeScientificNames(selectedVaccine.description)}</p> */}
        {/* {selectedVaccine.licensingDates && ( */}
        {selectedVaccine?.clinicalPhase ? <table className='table table-light table-striped w-100 m-0'>
            <thead>
                <tr>
                    <th className='text-center'>Pathogen</th>
                    <th className='text-center'>Platform</th>
                    <th className='text-center'>Manufacturer</th>
                    <th className='text-center'>Clinical Phase</th>

                </tr>
            </thead>
            <tbody>
                {getAllRelatedVaccineCandidateByName(selectedVaccine?.name).length && getAllRelatedVaccineCandidateByName(selectedVaccine?.name).length > 0 ? getAllRelatedVaccineCandidateByName(selectedVaccine?.name).map((data, index) => (
                    <React.Fragment key={index}>
                        <tr>
                            <td className='text-center'>{data.pathogenName}</td>
                            <td className='text-center'>{data.platform}</td>
                            <td className='text-center'>{data.manufacturer}</td>
                            <td className='text-center'>{data.clinicalPhase}</td>
                        </tr>
                    </React.Fragment>
                )) : <tr>
                    <td>- No Data Available -</td>
                </tr>}
            </tbody>
        </table> : (
            <table className='table table-light table-striped w-100 m-0'>
                <thead>
                    <tr>
                        <th className='text-center'>Licensing/ SmPC</th>
                        {/* <th className='text-center'>Number of Doses Sold</th> */}
                        {/* <th>Indication</th> */}
                        <th className='text-center'>Date of Approval</th>
                        <th className='text-center'>Last Updated</th>

                    </tr>
                </thead>
                <tbody>
                    {selectedVaccine.licensingDates && selectedVaccine.licensingDates.length > 0 ? selectedVaccine.licensingDates.map((licensingDate, index) => (
                        <React.Fragment key={index}>
                            <tr>
                                {/* <td className='text-center'><a href="#" className='selectable' target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-file-lines text-dark hover-cursor"></i></a></td> */}
                                <td className='text-center'><a href={licensingDate.source} className='selectable' target="_blank" rel="noopener noreferrer">{licensingDate.name}</a></td>
                                <td className='text-center'>{licensingDate.approvalDate || "#"}</td>
                                <td className='text-center'>{licensingDate.lastUpdated || "#"}</td>
                            </tr>
                        </React.Fragment>
                    )) : <tr>
                        <td>- No Data Available -</td>
                    </tr>}
                </tbody>
            </table>
        )}

        {/* // )} */}
        {selectedVaccine.productProfiles && (
            <div className="d-inline-flex w-100 inner">
                <table style={{ overflow: 'hidden' }} key={selectedVaccine.description} border={1}>
                    <tbody>
                        {platforms.map((key) => {
                            return key === "name" ? null : (
                                <>
                                    <tr>
                                        <td colSpan={1} style={{ color: key === 'type' ? 'white' : 'black', fontWeight: 'bold' }} className={`baseline align-middle ${key === "composition" ? `text-white bg-black` : ``}`}>{key === "composition" ? `Composition/Platform` : key === "coAdministration" ? `Co-Administration` : convertCamelCaseToReadable(key)}</td>
                                        <td colSpan={2} width={400 * 1} style={{ fontWeight: key === "type" ? "bold" : "normal" }} className={`baseline align-middle ${key === "composition" ? `text-white bg-black` : ``}`}>{key === "type" ? `EMA - ${selectedVaccine?.isDoubleName ? getProductProfileValueByVaccineNameAndType("EMA", "name", selectedVaccine.name) : selectedVaccine.name}` : getProductProfileValueByVaccineNameAndType("EMA", key, selectedVaccine.name)}</td>
                                        <td colSpan={2} width={400 * 1} style={{ fontWeight: key === "type" ? "bold" : "normal" }} className={`baseline align-middle ${key === "composition" ? `text-white bg-black` : ``}`}>{key === "type" ? `FDA - ${selectedVaccine?.isDoubleName ? getProductProfileValueByVaccineNameAndType("FDA", "name", selectedVaccine.name) : selectedVaccine.name}` : getProductProfileValueByVaccineNameAndType("FDA", key, selectedVaccine.name)}</td>
                                        <td colSpan={2} width={400 * 1} style={{ fontWeight: key === "type" ? "bold" : "normal" }} className={`baseline align-middle ${key === "composition" ? `text-white bg-black` : ``}`}>{key === "type" ? `WHO - ${selectedVaccine?.isDoubleName ? getProductProfileValueByVaccineNameAndType("WHO", "name", selectedVaccine.name) : selectedVaccine.name}` : getProductProfileValueByVaccineNameAndType("WHO", key, selectedVaccine.name)}</td>
                                    </tr>
                                </>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )}
        <p className='mb-0 ms-1'><a className='read-more hover-cursor hover-underline' target="_blank" rel="noopener noreferrer" href={`${selectedVaccine.link}`}>Learn more...</a></p>
        <span className='last-updated text-muted position-absolute end-0 bottom-0 me-1'>Last updated: {selectedVaccine.lastUpdated}</span>
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
    </div>
}

export default Vaccine;