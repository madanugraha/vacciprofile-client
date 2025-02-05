import React from 'react';
import moment from 'moment';
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
    return <div className='row bg-primary text-white pt-3 pb-2 slide-down'>
        <div className='col-12 w-100'>
            <h3 className='subheading mb-0'>Welcome to</h3>
            <div className='d-inline-flex justify-content-between align-items-center w-100'>
                <h1 className='heading'>VacciPROFILE</h1>
                <span>Last updated: {moment().format('DD, MMM YYYY')}</span>
            </div>

        </div>
    </div>
}

export default Header;