import React from "react";
import { useSearchParams } from "react-router";

/**
 * TopBar Component
 *
 * @component
 * @namespace TopBar
 *
 * @example
 * Example usage of TopBar component
 * <TopBar 
 * />
 */

const TopBar = ({
    activeTab,
    handleTabChange,
    handleSearch
}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeMenu = searchParams.get("menu");

    return <div className="topbar row pt-1 slide-down">
        <div className="position-relative">
            <ul className="nav nav-pills">
                <li className={`nav-item nav-link`} onClick={() => window.location.href = "/"}>
                    Home
                </li>
                <li className={`nav-item nav-link ${activeTab === 'Pathogen' ? 'active' : ''}`} onClick={() => handleTabChange('Pathogen')}>
                    Pathogens
                </li>
                <li className={`nav-item nav-link ${activeTab === 'Vaccine' ? 'active' : ''}`} onClick={() => handleTabChange('Vaccine')}>
                    Vaccines
                </li>
                <li className={`nav-item nav-link ${activeTab === 'Manufacturer' ? 'active' : ''}`} onClick={() => handleTabChange('Manufacturer')}>
                    Manufacturers
                </li>
                <li className={`nav-item nav-link ${activeTab === 'Licenser' ? 'active' : ''}`} onClick={() => handleTabChange('Licenser')}>
                    Licensing Authorities
                </li>
                <li className={`nav-item nav-link ${activeTab === 'Compare' ? 'active' : ''}`} onClick={() => handleTabChange('Compare')}>
                    Comparison
                </li>
                {/* {
                    !activeMenu && (
                        <>
                            <li className={`nav-item nav-link ${activeTab === 'Pathogen' ? 'active' : ''}`} onClick={() => handleTabChange('Pathogen')}>
                                Pathogens
                            </li>
                            <li className={`nav-item nav-link ${activeTab === 'Vaccine' ? 'active' : ''}`} onClick={() => handleTabChange('Vaccine')}>
                                Vaccines
                            </li>
                            <li className={`nav-item nav-link ${activeTab === 'Manufacturer' ? 'active' : ''}`} onClick={() => handleTabChange('Manufacturer')}>
                                Manufacturers
                            </li>
                            <li className={`nav-item nav-link ${activeTab === 'Licenser' ? 'active' : ''}`} onClick={() => handleTabChange('Licenser')}>
                                Licensing Authorities
                            </li>
                            <li className={`nav-item nav-link ${activeTab === 'Compare' ? 'active' : ''}`} onClick={() => handleTabChange('Compare')}>
                                Comparison
                            </li>
                        </>
                    )
                }
                {
                    activeMenu === "pathogen" && (
                        <li className={`nav-item nav-link ${activeTab === 'Pathogen' ? 'active' : ''}`} onClick={() => handleTabChange('Pathogen')}>
                            Pathogens
                        </li>
                    )
                }
                {
                    activeMenu === "vaccines" && (
                        <li className={`nav-item nav-link ${activeTab === 'Vaccine' ? 'active' : ''}`} onClick={() => handleTabChange('Vaccine')}>
                            Vaccines
                        </li>
                    )
                }
                {
                    activeMenu === "manufacturer" && (
                        <li className={`nav-item nav-link ${activeTab === 'Manufacturer' ? 'active' : ''}`} onClick={() => handleTabChange('Manufacturer')}>
                            Manufacturers
                        </li>
                    )
                }
                {
                    activeMenu === "licenser" && (
                        <li className={`nav-item nav-link ${activeTab === 'Licenser' ? 'active' : ''}`} onClick={() => handleTabChange('Licenser')}>
                            Licensing Authorities
                        </li>
                    )
                }
                {
                    activeMenu === "comparison" && (
                        <li className={`nav-item nav-link ${activeTab === 'Compare' ? 'active' : ''}`} onClick={() => handleTabChange('Compare')}>
                            Comparison
                        </li>
                    )
                } */}
            </ul>
            <div className='search-container mb-3'>
                <span className="position-relative">
                    <input type="text" className="text-center bg-light rounded-2 border-dark border-0 w-100" id="search" name="search" placeholder="Search" onChange={e => handleSearch(e.target.value)} />
                    <i className="fa fa-search position-absolute top-50 translate-middle-y end-0 me-2 text-muted" aria-hidden="true"></i>
                </span>
            </div>
        </div>
    </div>
}

export default TopBar;