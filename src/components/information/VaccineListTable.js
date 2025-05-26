import React, { useState } from 'react';
import { getAllPathogenNameByVaccineCandidateName, getAllPhasesByVaccineCandidateName, getAllPlatformByCandidateName, getCandidateVaccineByManufactureName, removeDuplicatesFromArray } from '../../utils/array';
import { getLicensedVaccineByManufacturerId, getLicensingDateByVaccineNameAndTypeV2, getPathogenDetailById } from '../../utils/pathogens';
import * as _ from 'lodash';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Box, Modal } from '@mui/material';
import Vaccine from './Vaccine';

/**
 * VaccineListTable Component
 *
 * @component
 * @namespace VaccineListTable
 * @param {Object} props - The component accepts activeTab, selectedPathogen, selectedVaccine, selectedLicenser, and several handler and data functions as props.
 * @param {string} props.activeTab - The type of detail currently selected, e.g., "Vaccine", "Pathogen", or "Licenser".
 * @param {Object} props.selectedPathogen - The currently selected pathogen object.
 * @param {Object} props.selectedVaccine - The currently selected vaccine object.
 * @param {string} props.selectedLicenser - The currently selected licenser.
 * @param {Function} props.handleSelectPathogen - Function that gets triggered when a pathogen is selected.
 * @param {Function} props.handleSelectVaccine - Function that gets triggered when a vaccine is selected.
 * @param {Function} props.handleSelectLicenser - Function that gets triggered when an licenser is selected.
 * @param {Function} props.getVaccinesByManufacturer - Function that returns a list of vaccines based on the manufacturer.
 * @param {Function} props.getPathogenByVaccine - Function that returns the pathogen associated with a specific vaccine.
 * @param {Function} props.getLicenserById - Function to retrieve licenser details by ID.
 * @param {Function} props.italizeScientificNames - Function to italicize scientific names in descriptions.
 * @returns {JSX.Element} The Manufacturer Information Table component.
 *
 * @example
 * // Render the VaccineListTable component with dummy data and functions
 * <VaccineListTable 
 *   activeTab="Vaccine"
 *   selectedPathogen={{ name: 'Pathogen X' }}
 *   selectedVaccine={{ name: 'Vaccine Y' }}
 *   selectedLicenser="Licenser Z"
 *   handleSelectPathogen={pathogen => console.log('Pathogen selected:', pathogen)}
 *   handleSelectVaccine={vaccine => console.log('Vaccine selected:', vaccine)}
 *   handleSelectLicenser={licenser => console.log('Licenser selected:', licenser)}
 *   getVaccinesByManufacturer={() => [{ name: 'Vaccine Y', licenser: ['Licenser Z'] }]}
 *   getPathogenByVaccine={vaccine => ({ name: 'Pathogen X' })}
 *   getLicenserById={(id) => ({ licenserId: id, name: 'LicenserZ' })}
 *   italizeScientificNames={(text) => <i>{text}</i>}
 * />
 */


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '95%',
    height: '95%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 6,
    overflow: 'scroll',
    borderRadius: 4
};


const VaccineListTable = ({
    activeTab,
    selectedPathogen,
    selectedVaccine,
    selectedLicenser,
    selectedManufacturer,
    handleSelectPathogen,
    handleSelectVaccine,
    handleSelectLicenser,
    getVaccinesByManufacturer,
    getPathogenByVaccine,
    getLicenserById,
    italizeScientificNames,
    convertCamelCaseToReadable
}) => {

    const HtmlTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 220,
            fontSize: theme.typography.pxToRem(12),
            border: '1px solid #dadde9',
        },
    }));

    const [open, setOpen] = useState(false);
    const [modalVaccine, setModalVaccine] = useState({});

    return <>
        <div className="accordion" id="accordianVaccineList">
            <div className="accordion-item">
                <h2 className="accordion-header" id="accordianVaccines">
                    <button className="accordion-button collapsed bg-sidebar-unselected text-muted py-1 px-2" type="button" data-bs-toggle="collapse" data-bs-target="#accordianVacList" aria-expanded="false" aria-controls="collapseTwo">
                        Licensed Vaccines
                    </button>
                </h2>
                <div id="accordianVacList" className="accordion-collapse collapse" aria-labelledby="accordianVaccines" data-bs-parent="#accordianVaccineList">
                    <div className="accordion-body pb-1 px-0 pt-0">
                        <div className='main-header table-responsive m-0'>
                            <table className='table w-100 m-0'>
                                <thead>
                                    <tr>
                                        <th>Vaccine Brand Name</th>
                                        <th>Single or Combination Vaccine</th>
                                        <th>Pathogen</th>
                                        <th>Licensing Authorities</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getLicensedVaccineByManufacturerId(selectedManufacturer.manufacturerId).length > 0 ? getLicensedVaccineByManufacturerId(selectedManufacturer.manufacturerId).sort((a, b) => a.name.localeCompare(b.name)).map((vaccine, key) => {
                                        return (
                                            <tr key={key}>
                                                <td className='vaccine-cell'>
                                                    <span
                                                        className={`${activeTab === "Licensed Vaccines" && selectedVaccine.name === vaccine.name ? `selected` : `selectable`}`}
                                                        onClick={() => {
                                                            setModalVaccine(vaccine);
                                                            setOpen(true);
                                                        }}>
                                                        {vaccine.name}
                                                    </span>
                                                </td>
                                                <td className='vaccine-cell'>
                                                    <span
                                                        className={`selected`}>
                                                        {vaccine.vaccineType === "single" ? "Single Pathogen Vaccine" : "Combination Vaccine"}
                                                    </span>
                                                </td>
                                                <td className='pathogen-cell'>
                                                    <div className='d-inline-flex align-items-center'>
                                                        {vaccine?.pathogenId && vaccine?.pathogenId.length > 0 && vaccine?.pathogenId.map((pathogen, index) => {
                                                            return (
                                                                <span
                                                                    className={`${activeTab === "Pathogen" && selectedPathogen.name === getPathogenDetailById(pathogen).name ? `selected` : `selectable`}`}
                                                                    onClick={() => { handleSelectPathogen(getPathogenDetailById(pathogen)) }}>
                                                                    {getPathogenDetailById(pathogen)?.name ? italizeScientificNames(getPathogenDetailById(pathogen)?.name) : "-"}
                                                                    {index < vaccine?.pathogenId.length - 1 ? <span className='text-decoration-none'>,&nbsp;</span> : ``}
                                                                </span>
                                                            )
                                                        })}
                                                    </div>
                                                </td>
                                                <td className='licenser-cell'>
                                                    <div style={{ display: 'flex' }}>
                                                        <div style={{ display: 'flex' }}>
                                                            {
                                                                getLicensingDateByVaccineNameAndTypeV2("EMA", "source", vaccine.name) === "-" ? null : (
                                                                    <>
                                                                        <HtmlTooltip
                                                                            title={
                                                                                <>
                                                                                    <Typography color="inherit">{"EMA"} Hyperlinks</Typography>
                                                                                    {getLicensingDateByVaccineNameAndTypeV2("EMA", "source", vaccine.name)}
                                                                                </>
                                                                            }
                                                                        >
                                                                            <div style={{ flex: 1, flexDirection: 'row' }}>
                                                                                <span className='selectable'>EMA</span><span className='text-decoration-none'>, {" "}</span>
                                                                            </div>
                                                                        </HtmlTooltip>
                                                                    </>
                                                                )
                                                            }
                                                            {
                                                                getLicensingDateByVaccineNameAndTypeV2("FDA", "source", vaccine.name) === "-" ? null : (
                                                                    <>
                                                                        <HtmlTooltip
                                                                            title={
                                                                                <>
                                                                                    <Typography color="inherit">{"FDA"} Hyperlinks</Typography>
                                                                                    {getLicensingDateByVaccineNameAndTypeV2("FDA", "source", vaccine.name)}
                                                                                </>
                                                                            }
                                                                        >
                                                                            <div>
                                                                                <span className='selectable'>{"FDA"}</span><span className='text-decoration-none'>, {" "}</span>
                                                                            </div>
                                                                        </HtmlTooltip>
                                                                    </>
                                                                )
                                                            }
                                                            {
                                                                getLicensingDateByVaccineNameAndTypeV2("WHO", "source", vaccine.name) === "-" ? null : (
                                                                    <>
                                                                        <HtmlTooltip
                                                                            title={
                                                                                <>
                                                                                    <Typography color="inherit">{"WHO"} Hyperlinks</Typography>
                                                                                    {getLicensingDateByVaccineNameAndTypeV2("WHO", "source", vaccine.name)}
                                                                                </>
                                                                            }
                                                                        >
                                                                            <div>
                                                                                <span className='selectable'>{"WHO"}</span>
                                                                            </div>
                                                                        </HtmlTooltip>
                                                                    </>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                    {/* {vaccine.licensingDates ? vaccine.licensingDates.map((l, index) => {
                                                        const licenser = l.type;
                                                        if (!licenser) return null;
                                                        return (
                                                            <span key={l.approvalDate}>
                                                                <a href={l.source} className='selectable' target="_blank" rel="noopener noreferrer">
                                                                    {l.name}
                                                                </a>
                                                                {index < vaccine.licensingDates.length - 1 ? <span className='text-decoration-none'>, </span> : ``}
                                                            </span>
                                                        );
                                                    }) : '- no data -'} */}
                                                </td>
                                            </tr>
                                        )
                                    }) : (
                                        <tr><td colSpan={4} align='center'>- no data available -</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="accordion-item" style={{ marginTop: 5 }}>
            <h2 className="accordion-header" id="accordianPipelineVaccineLists">
                <button className="accordion-button collapsed bg-sidebar-unselected text-muted py-1 px-2" type="button" data-bs-toggle="collapse" data-bs-target="#accordianPipelineVacList" aria-expanded="false" aria-controls="collapseTwo">
                    Vaccines Candidate
                </button>
            </h2>
            <div id="accordianPipelineVacList" className="accordion-collapse collapse" aria-labelledby="accordianPipelineVaccineLists" data-bs-parent="#accordianPipelineVaccineList">
                <div className="accordion-body pb-1 px-0 pt-0">
                    <div className='main-header table-responsive m-0'>
                        <table className='table w-100 m-0'>
                            <thead>
                                <tr>
                                    <th className='text-center'>Vaccine Brand Name</th>
                                    <th className='text-center'>Pathogen</th>
                                    <th className='text-center'>Platform</th>
                                    <th className='text-center'>Clinical Phase</th>
                                </tr>
                            </thead>
                            <tbody>
                                {_.uniqBy(getCandidateVaccineByManufactureName(selectedManufacturer.name), "name").length > 0 ? _.uniqBy(getCandidateVaccineByManufactureName(selectedManufacturer.name), "name").map((vaccine, key) => {
                                    return (
                                        <tr key={key}>
                                            <td className='vaccine-cell'>
                                                <span
                                                    className={`${activeTab === "Vaccine" && selectedVaccine.name === vaccine.name ? `selected` : `disabled`}`}
                                                    onClick={() => {
                                                        // TODO Pipeline Vaccine
                                                        // handleSelectVaccine(vaccine)
                                                    }}>
                                                    {vaccine.name}
                                                </span>
                                            </td>
                                            <td className='pathogen-cell d-flex flex-row'>
                                                <span>{getAllPathogenNameByVaccineCandidateName(vaccine.name)}</span>
                                            </td>
                                            <td className='status-cell'>
                                                <span>{getAllPlatformByCandidateName(vaccine.name)}</span>
                                            </td>
                                            <td className='licenser-cell'>
                                                {getAllPhasesByVaccineCandidateName(vaccine.name)}
                                            </td>
                                        </tr>
                                    )
                                }) : <tr><td colSpan={4} align='center'>- no data available -</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <Modal
            keepMounted
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={style}>
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <div style={{ position: 'absolute', right: -150, top: -20, width: 300 }}>
                        <button type='button' onClick={() => setOpen(false)} className='btn' style={{ background: '#c1121f', color: 'white', fontSize: 'bold' }}>Close</button>
                    </div>
                    <Vaccine selectedVaccine={modalVaccine} italizeScientificNames={italizeScientificNames} convertCamelCaseToReadable={convertCamelCaseToReadable} />
                </div>
            </Box>
        </Modal>
    </>
}

export default VaccineListTable;