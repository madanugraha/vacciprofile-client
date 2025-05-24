import { getNitagDetailByCountry } from "../../utils/array";

const NitagTable = (
    selectedNitag
) => {

    const detailNitag = getNitagDetailByCountry(selectedNitag.selectedNitag);

    return (
        <div className='main-header table-responsive m-0'>
            <table className='table w-100 m-0'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Source(s)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={1}>
                        <td className='vaccine-cell'>
                            <span
                                className={`selectable`}
                                onClick={() => { }}>
                                {detailNitag.name}
                            </span>
                        </td>
                        <td className='vaccine-cell'>
                            <span
                                className={`selected`}>
                                {detailNitag.source}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
};


export default NitagTable