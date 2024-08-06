import React from 'react';

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
    return <div className='row bg-primary text-white py-4 slide-down'>
    <div className='col-12'>
        <h3 className='subheading mb-0'>Welcome to</h3>
        <h1 className='heading'>VacciPROFILE</h1>
    </div>
</div>
}

export default Header;