import { useEffect, useState } from "react";
import { getNitagDetailByCountry } from "../../utils/array";

const NITAGMap = (
    selectedNitag
) => {
    const detailNitag = selectedNitag.selectedNitag;
    return (
        <div className="world-map" style={{ height: '100%' }}>
            <div id="regions_div"></div>
        </div>
    )
};

export default NITAGMap