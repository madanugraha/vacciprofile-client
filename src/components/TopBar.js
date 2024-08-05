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

const TopBar = () => {

    const [activeTab, setActiveTab] = useState('Manufacturers');

    const handleClick = (tab) => {
      setActiveTab(tab);
    };

    return <div className="topbar row pt-3">
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <a
                className={`nav-link ${activeTab === 'Manufacturers' ? 'active' : ''}`}
                href="https://example.com"
                onClick={() => handleClick('Manufacturers')}
                >
                Manufacturers
                </a>
            </li>
            <li className="nav-item">
                <a
                className={`nav-link ${activeTab === 'Products' ? 'active' : ''}`}
                href="https://example.com"
                onClick={() => handleClick('Products')}
                >
                Products
                </a>
            </li>
            <li className="nav-item">
                <a
                className={`nav-link ${activeTab === 'Pathogen' ? 'active' : ''}`}
                href="https://example.com"
                onClick={() => handleClick('Pathogen')}
                >
                Pathogen
                </a>
            </li>
        </ul>
    </div>
}
export default TopBar;