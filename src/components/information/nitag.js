import { useEffect, useState } from "react";
import { getNitagDetailByCountry } from "../../utils/array";

const NITAGMap = (
    selectedNitag
) => {
    const detailNitag = selectedNitag.selectedNitag;
    return (
        <div className="world-map" style={{ height: '100%' }}>
            <div id="no-nitag" onClick={(e) => {
                window.open('https://nitag-resource.org/network/map', "_blank");
                e.currentTarget.style.display = "none";
            }} style={{ cursor: 'pointer', display: 'none', color:'red' }} className="w-full bg-black py-3 px-4">
                
            </div>
            <div id="regions_div"></div>
        </div>
    )
};

export default NITAGMap