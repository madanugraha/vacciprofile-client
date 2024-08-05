import React, { useState } from "react";

/**
 * TopBar Component
 *
 * @component
 * @namespace TopBar
 *
 * @example
 * // Example usage of TopBar component
 * <TopBar 
 * />
 */

const TopBar = ({
    activeTab,
    handleTabChange
}) => {

    return <div className="topbar row pt-3 slide-down">
        <ul className="nav nav-tabs">
            <li className={`nav-itemn nav-link ${activeTab === 'Manufacturer' ? 'active' : ''}`} onClick={() => handleTabChange('Manufacturer')}>
                Manufacturers
            </li>
            <li className={`nav-item nav-link ${activeTab === 'Product' ? 'active' : ''}`} onClick={() => handleTabChange('Product')}>
                Products
            </li>
            <li className={`nav-item nav-link ${activeTab === 'Pathogen' ? 'active' : ''}`} onClick={() => handleTabChange('Pathogen')}>
                Pathogen
            </li>
        </ul>
    </div>
}
export default TopBar;