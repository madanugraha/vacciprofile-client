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
        <div className='col-12 w-100' style={{ cursor: 'pointer' }} onClick={() => window.location.href = "/"}>
            <h3 className='subheading mb-0' style={{ color: '#D17728' }}></h3>
            <div className='d-inline-flex justify-content-between align-items-center w-100'>
                <img className='heading' src="/images/vacci-profile-logo.png" alt="vacciprofile logo" width={210} height={100} />
                <span style={{ color: '#D17728' }}>Last updated: 1, August 2025 04:16 (GMT+8)</span>
            </div>

        </div>
    </div>
}

export default Header;