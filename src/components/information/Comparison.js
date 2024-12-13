import React from 'react';

const mergeArray = (arr) => {
    const tmp = []
    if (arr && arr.length > 0) {
        for (let idx = 0; idx < arr.length; idx++) {
            tmp.push(arr[idx].name)
            // for (let idx2 = 0; idx2 < arr[idx].length; idx2++) {
            //     tmp.push(arr[idx].data[idx2].name)
            // };
        };
    };
    if (tmp.length > 0) {
        return [...new Set([...tmp])]
    } else {
        return []
    }
};
// eslint-disable-next-line no-unused-vars
const getFactorValueByNameAndLicenser = (name, data, manufacture) => {
    if (data && data?.data.length > 0) {
        if (data.name === manufacture) {
            const f = data?.data.filter((dat) => dat.name === name);
            if (f.length > 0) {
                return f[0].value
            } else {
                return "-"
            }
        } else {
            return "-"
        }
    }
    return "-"
}

const Comparison = ({
    handleSelectComparison,
    selectedComparison,
    getComparisonDataByName
}) => {
    return <div className='slide-left'>
        <h2 className='heading text-primary pt-2'>{selectedComparison.name} - {selectedComparison.manufactureName}</h2>
        <p>Vacinne Comparison between: EMA, FDA, and WHO</p>
        <div className='table-responsive'>
            {selectedComparison && getComparisonDataByName(selectedComparison) && getComparisonDataByName(selectedComparison).licensers.length !== 0 ? <table className='table table-light w-100 m-0 mt-3'>
                <thead>
                    <tr>
                        <th>Factor</th>
                        <th>EMA</th>
                        <th>FDA</th>
                        <th>WHO</th>
                    </tr>
                </thead>
                <tbody>
                    {getComparisonDataByName(selectedComparison).licensers.map((x) => {
                        return mergeArray(x.data).map((y) => {
                            return (
                                <>
                                    <tr>
                                        <td>{y}</td>
                                        <td>{x.data.filter((z) => z.name === y)[0]?.value || "-"}</td>
                                        <td>{x.data.filter((z) => z.name === y)[0]?.value || "-"}</td>
                                        <td>{x.data.filter((z) => z.name === y)[0]?.value || "-"}</td>
                                    </tr>
                                </>
                            )
                        })
                    })}
                </tbody>
            </table> : ``}
        </div>
    </div>
}

export default Comparison;