import React, { useState } from 'react';
import { getVaccinesByPathogenId } from '../../utils/pathogens';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Vaccine from './Vaccine';


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
 * Pathogen Component
 *
 * @component
 * @namespace Pathogen
 * @param {Object} props - The component accepts selectedPathogen and italizeScientificNames as props.
 * @param {Object} props.selectedPathogen - The selected pathogen object containing its details.
 * @param {string} props.selectedPathogen.name - The name of the selected pathogen.
 * @param {string} props.selectedMPathogen.description - The description of the selected pathogen.
 * @param {Function} props.italizeScientificNames - Function that converts scientific names in the description to italicized text.
 * @returns {JSX.Element} The Pathogen Information component.
 *
 * @example
 * // Example usage of Pathogen component
 * <Pathogen 
 *    selectedPathogen={{ 
 *        name: 'COVID-19', 
 *        description: 'Severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2) is the virus that causes COVID-19.'
 *    }} 
 *    italizeScientificNames={text => text.replace(/(SARS-CoV-2)/g, '<i>$1</i>')} 
 * />
 */
const Pathogen = ({ selectedPathogen, italizeScientificNames }) => {
    const [open, setOpen] = useState(false);
    const [selectedVaccine, setSelectedVaccine] = useState({});
    const convertCamelCaseToReadable = string => {
        const formattedString = string === "ceo"
            ? "CEO"
            : string.replace(/([A-Z])/g, ' $1');
        return formattedString.charAt(0).toUpperCase() + formattedString.slice(1);
    };

    return (
        <>
            <div className='slide-left p-4'>
                <h1 className='heading text-primary pt-2'>{italizeScientificNames(selectedPathogen.name)}</h1>
                <p className='mb-2'>{italizeScientificNames(selectedPathogen.description)}</p>
                <div className='mt-4 d-inline-flex'>
                    {selectedPathogen?.image && (
                        <img src={selectedPathogen?.image} width={200} height={200} />
                    )}
                    <ul>
                        {selectedPathogen?.bulletpoints ? selectedPathogen?.bulletpoints.split('|').map((bullet) => {
                            return (
                                <li className='flex flex-row mb-2'>
                                    <div className='mt-2' dangerouslySetInnerHTML={{ __html: bullet.replaceAll('|', '').replaceAll(selectedPathogen.name, `<span classname="text-primary" style={{ color: "blue" }}>${selectedPathogen.name}</span>`) }}></div>
                                </li>
                            )
                        }) : (
                            <li className='flex flex-row mb-2'>
                                <span className='mt-2'>No Data Found</span>
                            </li>
                        )}
                    </ul>
                </div>
                <div className='mt-4'>
                    <h1 className='heading text-primary pt-2 mb-2'>Related Vaccines</h1>
                    {getVaccinesByPathogenId(selectedPathogen.pathogenId).length > 0 ? getVaccinesByPathogenId(selectedPathogen.pathogenId).map((vaccine) => {
                        return (
                            <div onClick={() => {
                                setSelectedVaccine(vaccine)
                                setOpen(true)
                            }} className='flex flex-row mb-2'>
                                <span className='mt-2 fw-semibold text-primary cursor-pointer'>&#8226;{" "}{vaccine.name}</span>
                            </div>
                        )
                    }) : (
                        <div className='flex flex-row mb-2'>
                            &#8226;{" "}
                            <span className='mt-2'>No Data Found</span>
                        </div>
                    )}
                </div>
                <div className='cursor-pointer' style={{ width: 150, height: 30, borderRadius: 8, flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <p className='mb-0 mt-4 bg-primary' style={{ padding: 4, borderRadius: 8, alignSelf: 'center', textAlign: 'center', alignItems: 'center', justifyContent: 'center', marginTop: 4 }}><a className='read-more' style={{ textAlign: 'center', color: 'white', alignSelf: 'center', fontWeight: 'bold' }} target="_blank" rel="noopener noreferrer" href={selectedPathogen.link}>Find out more</a></p>
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
                    <Vaccine selectedVaccine={selectedVaccine} convertCamelCaseToReadable={convertCamelCaseToReadable} />
                </Box>
            </Modal>
        </>
    )
}
export default Pathogen;