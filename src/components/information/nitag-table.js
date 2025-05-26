import { useEffect, useState } from "react";
import { getNitagDetailByCountry } from "../../utils/array";

const NitagTable = (
    selectedNitag
) => {
    const detailNitag = selectedNitag.selectedNitag;

    // F6C6AD D1D1D1 F6C6AD D1D1D1

    let totalScore = 0
    const totalScore1 = detailNitag?.questions?.map((x) => {
        const answ1 = parseInt(x.answers1[x.answers1.length - 1])
        const answ2 = parseInt(x.answers2[x.answers2.length - 1]);

        totalScore += (answ1 + answ2)
    });

    return (
        <div className='main-header table-responsive m-0' style={{ height: '100%' }}>
            {
                totalScore !== 0 && (
                    <h4 style={{ marginBottom: 15 }}>{detailNitag?.country} NITAG score: {totalScore}</h4>
                )
            }
            {
                detailNitag && detailNitag?.questions?.map((question, i) => {
                    return (
                        <table className="table w-100" style={{ marginBottom: 40 }}>
                            <tr>
                                <td colspan="12" align="center" style={{ fontWeight: 'bolder', background: i % 2 === 0 ? '#F6C6AD' : '#D1D1D1', borderColor: 'black' }}>{question.question}</td>

                            </tr>
                            <tr>
                                <td colspan="6" align="center" style={{ background: i % 2 === 0 ? '#F6C6AD' : '#D1D1D1', borderColor: 'black' }}>Question {question.no}.a</td>
                                <td colspan="6" align="center" style={{ background: i % 2 === 0 ? '#F6C6AD' : '#D1D1D1', borderColor: 'black' }}>Question {question.no}.b</td>
                            </tr>
                            <tr>
                                <td colspan="5" style={{ background: i % 2 === 0 ? '#F6C6AD' : '#D1D1D1', borderColor: 'black' }}>{question.q1}</td>
                                <td style={{ background: i % 2 === 0 ? '#F6C6AD' : '#D1D1D1', borderColor: 'black', fontWeight: 'bolder' }}>Score</td>
                                <td style={{ background: i % 2 === 0 ? '#F6C6AD' : '#D1D1D1', borderColor: 'black' }} colspan="5">{question.q2}</td>
                                <td style={{ background: i % 2 === 0 ? '#F6C6AD' : '#D1D1D1', borderColor: 'black', fontWeight: 'bolder' }}>Score</td>
                            </tr>
                            <tr>
                                {question.answers1.map((answ1, i) => {
                                    return (
                                        <td style={{ borderColor: 'black' }}>{(answ1.includes('http') ? <a style={{ textDecoration: 'underline', background: 'none', color: 'blue' }} target='_blank' rel='no-refferer' href={answ1}>Link {i}</a> : answ1) || "N/A"}</td>
                                    )
                                })}
                                {question.answers2.map((answ2, i) => {
                                    return (
                                        <td style={{ borderColor: 'black' }}>{(answ2.includes('http') ? <a style={{ textDecoration: 'underline', background: 'none', color: 'blue' }} target="_blank" rel='no-refferer' href={answ2}>Link {i}</a> : answ2) || "N/A"}</td>
                                    )
                                })}
                            </tr>
                        </table>
                    )
                })
            }

        </div>
    )
};


export default NitagTable