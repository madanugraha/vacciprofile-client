import React from 'react';
import licenserOld from '../assets/data/licensers.json';
import _ from 'lodash';
import { finalRemapNitagCountry } from '../assets/data/nitag-countries';

/**
 * Header Component
 *
 * @component
 * @namespace Header
 * @returns {JSX.Element} The Header component that displays the main title and a welcome message.
 *
 * @example
 * // Example usage of Header component
 * <Header />
 */

const Header = () => {

    const englishArr = [
        "Algeria",
        "Cambodia",
        "Cape Verde",
        "Chad",
        "Congo, Brazzaville",
        "Dominica",
        "Ecuador",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Georgia",
        "Kiribati",
        "Kuwait",
        "Liberia",
        "Libya",
        "Mali",
        "Mauritania",
        "Mauritius",
        "Morocco",
        "Nauru",
        "Sao Tome and Principe",
        "Somalia",
        "South Sudan",
        "Timor-Leste",
        "Tonga",
        "Tuvalu",
        "Uganda (Very Slow)",
        "Yemen",
        "Zambia"
    ];



    const filteredArray = licenserOld.filter(mainItem => {
        return englishArr.some(filterItem => {
            return mainItem.country === filterItem
        });
    });

    console.log(filteredArray.map((x) => {
        return {
            country: x.country,
            website: x.website
        }
    }));

    return <div className='row bg-primary text-white pt-3 pb-2 slide-down'>
        <div className='col-12 w-100' style={{ cursor: 'pointer' }} onClick={() => window.location.href = "/"}>
            <h3 className='subheading mb-0' style={{ color: '#D17728' }}></h3>
            <div className='d-inline-flex justify-content-between align-items-center w-100'>
                <img className='heading' src="/images/vacci-profile-logo.png" alt="vacciprofile logo" width={210} height={100} />
                <span style={{ color: '#D17728' }}>VacciProfile Last updated: 27, August 2025 00:36 (GMT+8)</span>
            </div>
        </div>
    </div>
};

export default Header;