import React from 'react';
import moment from 'moment';

const HomePage = () => {
    return (
        <>
            <div style={{ backgroundColor: "#d9732c" }}>
                <table style={{ width: '100%', border: 'none' }} border={0} cellspacing="0px">
                    <tr><td colspan="2" style={{ height: '10px', border: 'none' }}></td></tr>
                    <tr>
                        <td style={{ paddingLeft: '20px', color: 'white', border: 'none' }} colspan="2" align="left">Welcome to</td>
                    </tr>
                    <tr>
                        <td style={{ paddingLeft: '20px', fontSize: '30px', color: 'white', border: 'none' }} align="left">VacciPROFILE</td>
                        <td style={{ paddingRight: '20px', border: 'none' }} align="right">
                            <div id="current_date" style={{ color: 'white' }}>
                                {moment().format('DD, MMM YYYY')}
                            </div>
                        </td>
                    </tr>
                    <tr><td colspan="2" style={{ height: '10px', border: 'none' }}></td></tr>
                </table>
            </div>

            <div className='container-home text-center' style={{ margin: '0 auto', alignItems: 'center', justifyContent: 'center', flex: 1, flexDirection: 'row' }}>
                <div class="container-home text-center" style={{ margin: '0 auto', alignItems: 'center', justifyContent: 'center', flex: 1, flexDirection: 'column' }}>
                    <div class="card" onClick={() => window.location.href = "/home?menu=pathogen"}>
                        <div class="image-container">
                            <img src="/images/VACCIE PROFILE OUTLINE-03.png" alt="Pathogens" />
                        </div>
                        <div class="title">Pathogens</div>
                        <p>Essential characteristics, vaccines, and vaccine candidates
                        </p>
                        <button class="btn">View more</button>
                    </div>
                    <div class="card" onClick={() => window.location.href = "/home?menu=licensed-vaccines"}>
                        <div class="image-container">
                            <img src="/images/VACCIE PROFILE OUTLINE-04.png" alt="Vaccines" />
                        </div>
                        <div class="title">Vaccines</div>
                        <p>Compare brandnames, licenses. single and combination vaccines</p>
                        <button class="btn">View more</button>
                    </div>
                    <div class="card" onClick={() => window.location.href = "/home?menu=manufacturer"}>
                        <div class="image-container">
                            <img src="/images/VACCIE PROFILE OUTLINE-05.png" alt="Manufacturers" />
                        </div>
                        <div class="title">Manufacturers</div>
                        <p>Basic company information, vaccines. licenses and labels</p>
                        <button class="btn">View more</button>
                    </div>
                    <div class="card" onClick={() => window.location.href = "/home?menu=licenser"}>
                        <div class="image-container">
                            <img src="/images/VACCIE PROFILE OUTLINE-06.png" alt="Licensing Authorities" />
                        </div>
                        <div class="title">Licensing Authorities</div>
                        <p>Essential information and licensed products</p>
                        <button class="btn">View more</button>
                    </div>
                    <div class="card" onClick={() => window.location.href = "/home?menu=vaccine-candidates"}>
                        <div class="image-container">
                            <img src="/images/VACCIE PROFILE OUTLINE-07.png" alt="Pipeline Vaccine" />
                        </div>
                        <div class="title">Vaccine Candidates</div>
                        <p>Vaccine candidates from phase 1 to 4 by pathogen and manufacturer</p>
                        <button class="btn">View more</button>
                    </div>
                    <div class="card" onClick={() => window.location.href = "/home?menu=nitag"}>
                        <div class="image-container">
                            <img src="/images/VACCIE-PROFILE-OUTLINE-08.png" alt="Licensing Authorities" />
                        </div>
                        <div class="title" style={{ fontSize: 15 }}>National Immunization Technical Advisory Groups</div>
                        <span style={{ marginBottom: 8 }}>(NITAGs) Current recommendations and procedures</span>
                        <button class="btn">View more</button>
                    </div>
                </div>
                <div class="card" onClick={() => window.location.href = "/home?menu=compare"}>
                    <div class="image-container">
                        <img src="/images/vacciprofile-compare.png" alt="Comparison" />
                    </div>
                    <div class="title">Comparison</div>
                    <p>Vaccines data comparisons</p>
                    <button class="btn">View more</button>
                </div>
            </div>


            <footer style={{ backgroundColor: '#111', color: '#ddd', padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif;', display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ marginBottom: '10px' }}>
                    <div>
                        <img src="/images/logo PNG.png" alt="Global Health Press Logo" style={{ height: '80px' }} />
                    </div>
                </div>
                <div style={{ marginLeft: 30 }}>
                    <div style={{ marginBlock: '10px' }}>
                        <a href="#" style={{ color: '#ddd', textDecoration: 'none', margin: '0 10px' }}>Terms & Conditions</a> |
                        <a href="#" style={{ color: '#ddd', textDecoration: 'none', margin: '0 10px' }}>Privacy Policy</a> |
                        <a href="#" style={{ color: '#ddd', textDecoration: 'none', margin: '0 10px' }}>Disclaimer</a> |
                        <a href="#" style={{ color: '#ddd', textDecoration: 'none', margin: '0 10px' }}>Imprint</a> |
                        <a href="#" style={{ color: '#ddd', textDecoration: 'none', margin: '0 10px' }}>Contacts</a> |
                        <a href="#" style={{ color: '#ddd', textDecoration: 'none', margin: '0 10px' }}>LinkedIn</a>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        Copyright © 2009-2025 Global Health Press Pte Ltd. Reg. No. 200921795N All Rights Reserved.
                    </div>
                    <div>
                        Subject to <a href="#" style={{ color: '#4da6ff', textDecoration: 'none' }}>Creative Commons Licence (cc)</a>.
                    </div>
                </div>
            </footer>
        </>
    )
};

export default HomePage;