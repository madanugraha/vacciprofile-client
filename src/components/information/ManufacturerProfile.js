import React from 'react';

/**
 * ManufacturerProfile Component
 *
 * @component
 * @namespace Manufacturer
 * @param {Object} props - The component accepts selectedManufacturer and convertCamelCaseToReadable as props.
 * @param {Object} props.selectedManufacturer - The manufacturer information object.
 * @param {string} props.selectedManufacturer.name - The name of the manufacturer.
 * @param {string} props.selectedManufacturer.description - The description of the manufacturer.
 * @param {Object} props.selectedManufacturer.details - Additional information about the manufacturer.
 * @param {Object[]} props.selectedManufacturer.details.sources - List of sources related to the manufacturer.
 * @param {Function} props.convertCamelCaseToReadable - Function that converts camel case strings to a readable format.
 * @returns {JSX.Element} The Manufacturer Information component.
 *
 * @example
 * // Render the ManufacturerProfile component with dummy data and function
 * <ManufacturerProfile 
 *   selectedManufacturer={{
 *     name: 'Manufacturer X',
 *     description: 'A leading manufacturer in the industry.',
 *     details: {
 *       revenue: '100M',
 *       operatingIncome: '50M',
 *       netIncome: '25M',
 *       totalAssets: '500M',
 *       totalEquity: '300M',
 *       sources: [
 *         { title: 'Source 1', link: 'http://source1.com', lastUpdated: '2024-01-01' },
 *         { title: 'Source 2', link: 'http://source2.com', lastUpdated: '2024-02-01' }
 *       ]
 *     }
 *   }}
 *   convertCamelCaseToReadable={key => key.replace(/([A-Z])/g, ' $1').toLowerCase()}
 * />
 */

const ManufacturerProfile = ({ 
    selectedManufacturer, 
    convertCamelCaseToReadable
}) => {
    return <>
    <h1 className='heading text-primary'>Updated {selectedManufacturer.name} Reported Data ({selectedManufacturer.lastUpdated})</h1>
    <div className="accordion" id="accordianManufacturerInfo">
    <div className="accordion-item mb-1">
      <h2 className="accordion-header" id="accordianManufacturer">
        <button className="accordion-button collapsed bg-accordian text-muted py-1 px-2" type="button" data-bs-toggle="collapse" data-bs-target="#accordianManu" aria-expanded="false" aria-controls="collapseTwo">
         Manufacturer Profile
        </button>
      </h2>
      <div id="accordianManu" className="accordion-collapse collapse mb-1" aria-labelledby="accordianManufacturer" data-bs-parent="#accordianManufacturerInfo">
        <div className="accordion-body">
            <div className=''>
                {selectedManufacturer.details ? <><div className='table-responsive'>
                    <table className='table table-light w-100 m-0'>
                        <thead>
                            <tr>
                                <th className='text-center' colSpan={2}>Information</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(selectedManufacturer.details).map(([attributeKey, attributeValue], index) => {
                                if (attributeKey === 'revenue') {
                                    return (
                                        <tr key={index}>
                                            <td className='text-center' style={{ width: '50%' }}>
                                                Revenue/Operating Income/Net Income
                                            </td>
                                            <td className='text-center'>
                                                {selectedManufacturer.details.revenue}/{selectedManufacturer.details.operatingIncome}/{selectedManufacturer.details.netIncome}
                                            </td>
                                        </tr>
                                    );
                                }

                                if (attributeKey === 'totalAssets') {
                                    return (
                                        <tr key={index}>
                                            <td className='text-center' style={{ width: '50%' }}>
                                                Total Assets/Total Equity
                                            </td>
                                            <td className='text-center'>
                                                {selectedManufacturer.details.totalAssets}/{selectedManufacturer.details.totalEquity}
                                            </td>
                                        </tr>
                                    );
                                }

                                return attributeKey !== "sources" && attributeKey !== "lastUpdated" &&
                                    attributeKey !== "operatingIncome" && attributeKey !== "netIncome" && attributeKey !== "totalEquity" ? (
                                    <tr key={index}>
                                        <td className='text-center text-capitalize' style={{ width: '50%' }}>
                                            {convertCamelCaseToReadable(attributeKey)}
                                        </td>
                                        <td className='text-center'>{attributeValue}</td>
                                    </tr>
                                ) : null;
                            })}
                        </tbody>
                    </table>
                </div>
                <span className='sources-list'>Source(s): {selectedManufacturer.details.sources.map((source, index)=><span key={index}>
                    <a className='manufacturer-table-source' href={`${source.link}`} target="_blank" rel="noopener noreferrer">{source.title}</a>
                    <span> ({source.lastUpdated}){selectedManufacturer.details.sources.length>1 && index<selectedManufacturer.details.sources.length-1 ? ', ' : ''}</span></span>)}
                </span></> : null}
            </div>
        </div>
      </div>
    </div>
  </div>
</>}

export default ManufacturerProfile;
