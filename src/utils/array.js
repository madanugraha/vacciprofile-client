import vaccines from '../assets/data/candidate-vaccines.json';
import pathogens from '../assets/data/candidate-pathogens.json';
import _ from 'lodash';

export const removeDuplicatesFromArray = (arr, prop) => {
    if (arr && arr.length > 0) {
        return arr.reduce((accumulator, current) => {
            if (!accumulator.find((item) => item[prop] === current[prop])) {
                accumulator.push(current);
            }
            return accumulator;
        }, [])
    };
    return [];
};

export const sortArrayAscending = (arr, prop) => {
    if (arr && arr.length > 0) {
        return arr.sort((a, b) => a[prop].localeCompare(b[prop]))
    };
    return [];
};

export const getCandidatePathogens = () => {
    return pathogens
};

export const getCandidateVaccines = () => {
    return vaccines.sort((a, b) => a.name.localeCompare(b.name))
};

export const getAllRelatedVaccineCandidateByName = (name) => {
    return vaccines.filter((x) => x.name !== "" && x.name.toLowerCase().includes(name.toLowerCase()))
}

export const getAllPathogenNameByVaccineCandidateName = (name) => {
    const f = vaccines.filter((x) => x.name.toLowerCase().includes(name.toLowerCase()));
    if (f.length > 0) {
        const ff = f.map((x) => x.pathogenName);
        if (ff.length > 0) {
            return _.uniq(ff).join(', ')
        }
    }
};

export const getAllPhasesByVaccineCandidateName = (name) => {
    const f = vaccines.filter((x) => x.name.toLowerCase().includes(name.toLowerCase()));
    if (f.length > 0) {
        const ff = f.map((x) => x.clinicalPhase);
        if (ff.length > 0) {
            return _.uniq(ff).join(', ')
        }
    }
};

export const getAllPlatformByCandidateName = (name) => {
    const f = vaccines.filter((x) => x.name.toLowerCase().includes(name.toLowerCase()));
    if (f.length > 0) {
        const ff = f.map((x) => x.platform);
        if (ff.length > 0) {
            const platforms = _.uniq(ff);
            let platformFinal = [];
            for (let i = 0; i < platforms.length; i++) {
                if (platforms[i].includes(',')) {
                    const s = _.uniq(platforms[i].split(','));
                    if (s.length > 0) {
                        for (let i = 0; i < s.length; i++) {
                            platformFinal.push(s[i])
                        }
                    }
                } else if (platforms[i].includes(';')) {
                    const s = _.uniq(platforms[i].split(';'));
                    if (s.length > 0) {
                        for (let i = 0; i < s.length; i++) {
                            platformFinal.push(s[i])
                        }
                    }
                } else {
                    platformFinal.push(platforms[i])
                }
            }

            platformFinal = platformFinal.filter((x) => !x.includes(';')).sort((a, b) => a.localeCompare(b));
            if (platformFinal.length > 0) {
                return _.uniq(platformFinal).join(', ')
                // return _.uniqBy(f.sort((a, b) => a.platform.localeCompare(b.platform)), "platform")
            } else {
                return ""
            }
        }
    }
};

export const getCandidateVaccinesByPathogenName = (pathogen) => {
    return vaccines.filter((x) => x.pathogenName.toLowerCase().includes(pathogen.toLowerCase()))
}

export const getCandidateVaccineByManufactureName = (manufacture) => {
    return vaccines.filter((x) => x.name !== "" && x.manufacturer.includes(manufacture))
}

export const getVaccineCandidatePlatformsUniqueByPathogenName = (pathogen) => {
    const d = vaccines.filter((x) => x.pathogenName.toLowerCase().includes(pathogen.toLowerCase()) && !x.platform.includes('No data'));
    let platforms = [];
    const f = d.map((x) => {
        platforms.push(x.platform);
        return x
    });
    platforms = _.uniq(platforms);
    let platformFinal = [];
    for (let i = 0; i < platforms.length; i++) {
        if (platforms[i].includes(',')) {
            const s = _.uniq(platforms[i].split(','));
            if (s.length > 0) {
                for (let i = 0; i < s.length; i++) {
                    platformFinal.push(s[i])
                }
            }
        } else if (platforms[i].includes(';')) {
            const s = _.uniq(platforms[i].split(';'));
            if (s.length > 0) {
                for (let i = 0; i < s.length; i++) {
                    platformFinal.push(s[i])
                }
            }
        } else {
            platformFinal.push(platforms[i])
        }
    }

    platformFinal = platformFinal.filter((x) => !x.includes(';')).sort((a, b) => a.localeCompare(b));
    if (platformFinal.length > 0) {
        return _.uniq(platformFinal);
        // return _.uniqBy(f.sort((a, b) => a.platform.localeCompare(b.platform)), "platform")
    } else {
        return []
    }
}

export const checkIfPathogenCandidate = (pathogen) => {
    return pathogen?.link ? false : true
}

export const getVaccineCandidateIfPathogenCandidateSelected = (pathogen) => {
    if (pathogen?.bulletpoints) {
        // pathogen licensed
    } else {
        // pathogen candidate
    }
}
const vaccineBackups = [
    {
        "name": "Abrysvo™",
        "vaccineId": 1,
        "pathogenId": 1,
        "manufacturers": [
            {
                "manufacturerId": 1
            }
        ],
        "licensers": [
            {
                "licenserId": 1,
                "link": "https://www.fda.gov/media/168889/download?attachment"
            },
            {
                "licenserId": 2,
                "link": "https://www.ema.europa.eu/en/documents/product-information/abrysvo-epar-product-information_en.pdf"
            }
        ],
        "licensingDates": [
            {
                "name": "FDA",
                "type": "Maternal",
                "date": "08/2023",
                "source": "https://s28.q4cdn.com/781576035/files/doc_financials/2023/ar/2023-10k.pdf"
            },
            {
                "name": "FDA",
                "type": "Older Adults",
                "date": "05/2023",
                "source": "https://s28.q4cdn.com/781576035/files/doc_financials/2023/ar/2023-10k.pdf"
            },
            {
                "name": "EMA",
                "type": "Maternal",
                "date": "08/2023",
                "source": "https://s28.q4cdn.com/781576035/files/doc_financials/2023/ar/2023-10k.pdf"
            },
            {
                "name": "EMA",
                "type": "Older Adults",
                "date": "08/2023",
                "source": "https://s28.q4cdn.com/781576035/files/doc_financials/2023/ar/2023-10k.pdf"
            }
        ],
        "approvalDate": "2023",
        "description": "Abrysvo™ is a vaccine developed by Pfizer to prevent lower respiratory tract disease caused by respiratory syncytial virus (RSV) in certain populations.",
        "introduction": {
            "General Information": {
                "Map Vaccine Preventable Diseases": "Map by disease",
                "Vaccine SmPCs (FDA, EMA, WHO, others)": "Search by disease, include combos",
                "Product profiles": "Pfizer's Abrysvo is approved for two key populations: pregnant individuals (for protecting infants) and older adults.",
                "Pipeline products - summary table": "Phase 3 studies ongoing, showing strong safety and immunogenicity data.",
                "Failed products": "None known."
            },
            "Company products, pipeline": {
                "VPD-BoD, Product presentations, Monograph": "Available as injection.",
                "Pivotal publications / data vaccines": "Published Phase 3 trials showing positive safety and efficacy results.",
                "Interviews": "Interviews with leading researchers discussing vaccine progress and approvals.",
                "Relevant literature": "Scientific articles on RSV vaccines and Abrysvo’s maternal immunization strategy.",
                "Pipeline products - detailed information (TPP)": "Phase 3 trials for additional age groups."
            }
        },
        "productProfiles": [
            {
                "type": "FDA",
                "name": "FDA-Product Profile: Abrysvo™ (Pfizer)<br/>Respiratory Syncytial Virus (RSV) vaccine",
                "composition": "Abrysvo contains RSVPreF, a protein-based vaccine designed to prevent RSV infections in targeted populations.",
                "strainCoverage": "RSV strains A and B.",
                "indication": "Protects infants from birth to 6 months from RSV-related lower respiratory tract disease (LRTD) when administered between 32 to 36 weeks of pregnancy. Prevents LRTD caused by RSV in older adults.",
                "dosing": "Single-dose intramuscular injection.",
                "immunogenicity": "Demonstrated strong immune response in pregnant women and older adults, with high neutralizing antibody levels against RSV.",
                "efficacyEndpointsPhase3": "Reduction in RSV-related lower respiratory tract disease in infants and older adults.",
                "efficacyData": "Results show a significant decrease in severe RSV cases.",
                "durationOfProtection": "Several months, with research ongoing on long-term immunity.",
                "coAdministration": "Tested with flu vaccines; data supports co-administration in older adults.",
                "reactogenicity": "Common side effects include pain at the injection site, fatigue, headache, and muscle pain.",
                "safety": "Safe for both pregnant individuals and older adults, with no significant adverse events reported.",
                "vaccinationGoal": "Prevent severe RSV infections, particularly in vulnerable groups like newborns and the elderly.",
                "others": "FDA-approved for older adults and pregnant women. Phase 3 trials underway for expanded age groups."
            },
            {
                "type": "EMA",
                "name": "EMA-Product Profile: Abrysvo™",
                "composition": "-",
                "strainCoverage": "-",
                "indication": "-",
                "contraindication": "-",
                "dosing": "-",
                "immunogenicity": "-",
                "Efficacy(VEy vs virologically confirmed dengue (VCD))": "-",
                "durationOfProtection": "-",
                "coAdministration": "-",
                "reactogenicity": "-",
                "safety": "-",
                "vaccinationGoal": "-",
                "others": "-"
            },
            {
                "type": "WHO",
                "name": "WHO-Product Profile: Abrysvo™ ",
                "composition": "-",
                "strainCoverage": "-",
                "indication": "-",
                "contraindication": "-",
                "dosing": "-",
                "immunogenicity": "-",
                "Efficacy(VEy vs virologically confirmed dengue (VCD))": "-",
                "durationOfProtection": "-",
                "coAdministration": "-",
                "reactogenicity": "-",
                "safety": "-",
                "vaccinationGoal": "-",
                "others": "-"
            }
        ],
        "link": "https://www.pfizer.com/products/product-detail/abrysvotm",
        "lastUpdated": "2024-AUG"
    },
    {
        "name": "Penbraya™",
        "vaccineId": 3,
        "pathogenId": 3,
        "manufacturers": [
            {
                "manufacturerId": 1
            }
        ],
        "licensers": [
            {
                "licenserId": 1,
                "link": "https://www.fda.gov/media/151707/download?attachment"
            },
            {
                "licenserId": 2,
                "link": "https://catalogues.ema.europa.eu/node/3979/methodological-aspects"
            }
        ],
        "licensingDates": [
            {
                "name": "FDA",
                "date": "20/10/2023",
                "source": "https://www.fda.gov/vaccines-blood-biologics/vaccines/penbraya"
            }
        ],
        "description": "Penbraya™ is a vaccine that provides protection against invasive meningococcal disease caused by Neisseria meningitidis groups A, B, C, W, and Y.",
        "introduction": {
            "General Information": {
                "Map Vaccine Preventable Diseases": "Protects against 5 leading types of meningococcal meningitis (A, B, C, W, Y)",
                "Vaccine SmPCs (FDA, EMA, WHO, others)": "FDA-approved",
                "Product profiles": "Approved for use in individuals 10 through 25 years of age",
                "Pipeline products - summary table": "",
                "Failed products": ""
            },
            "Company products, pipeline": {
                "VPD-BoD, Product presentations, Monograph": "Meningococcal groups A, B, C, W, Y vaccine",
                "Pivotal publications / data vaccines": "",
                "Interviews": "",
                "Relevant literature": "",
                "Pipeline products - detailed information (TPP)": ""
            }
        },
        "productProfiles": [
            {
                "type": "FDA",
                "name": "FDA-Product Profile: Penbraya™ (Pfizer)",
                "composition": "N. meningitidis serogroup A, C, W, and Y polysaccharide (5 mcg each); two recombinant lipidated factor H binding protein variants from serogroup B (60 mcg each).",
                "strainCoverage": "Meningococcal serogroups A, B, C, W, Y",
                "indication": "Prevention of invasive meningococcal disease in individuals aged 10 to 25 years.",
                "dosing": "Two-dose series, given 6 months apart",
                "immunogenicity": "Effective in producing an immune response against all 5 serogroups",
                "efficacyEndpointsPhase3": "",
                "efficacyData": "",
                "durationOfProtection": "",
                "coAdministration": "",
                "reactogenicity": "Common side effects include pain at the injection site, fatigue, headache, muscle pain, and chills.",
                "safety": "Generally well-tolerated, but precautions should be taken for those with certain immune deficiencies or previous vaccine-related allergic reactions.",
                "vaccinationGoal": "Prevent invasive meningococcal disease",
                "others": ""
            }
        ],
        "link": "https://www.pfizer.com/products/product-detail/penbrayatm",
        "packageInsertLink": "https://www.fda.gov/media/173223/download?attachment",
        "lastUpdated": "TBU"
    },
    {
        "name": "Pfizer-BioNTech COVID-19 Vaccine",
        "vaccineId": 4,
        "pathogenId": 2,
        "manufacturers": [
            {
                "manufacturerId": 5
            },
            {
                "manufacturerId": 1
            }
        ],
        "licensers": [
            {
                "licenserId": 1,
                "link": "https://www.fda.gov/vaccines-blood-biologics/coronavirus-covid-19-cber-regulated-biologics/pfizer-biontech-covid-19-vaccine"
            },
            {
                "licenserId": 2,
                "link": "https://www.ema.europa.eu/en/documents/product-information/comirnaty-epar-product-information_en.pdf"
            },
            {
                "licenserId": 3,
                "link": "https://www.who.int/news-room/feature-stories/detail/who-can-take-the-pfizer-biontech-covid-19--vaccine-what-you-need-to-know"
            }
        ],
        "licensingDates": [
            {
                "name": "FDA",
                "date": "11/12/2020",
                "source": "https://www.fda.gov/news-events/press-announcements/fda-takes-key-action-fight-against-covid-19-issuing-emergency-use-authorization-first-covid-19"
            },
            {
                "name": "EMA",
                "date": "21/12/2020",
                "source": "https://www.ema.europa.eu/en/news/ema-recommends-first-covid-19-vaccine-authorisation-eu"
            },
            {
                "name": "FDA",
                "date": "23/08/2023",
                "source": "https://www.fda.gov/vaccines-blood-biologics/comirnaty"
            }
        ],
        "description": "The Pfizer-BioNTech COVID-19 Vaccine, also known as BNT162b2 or Comirnaty, is an mRNA vaccine developed by Pfizer and BioNTech to prevent COVID-19 caused by the SARS-CoV-2 virus.",
        "introduction": {
            "General Information": {
                "Map Vaccine Preventable Diseases": "Map by disease",
                "Vaccine SmPCs (FDA, EMA, WHO, others)": "Search by disease, include combos",
                "Product profiles": "",
                "Pipeline products - summary table": "By click, TPP",
                "Failed products": ""
            },
            "Company products, pipeline": {
                "VPD-BoD, Product presentations, Monograph": "Pfizer-BioNTech COVID-19 Vaccine is indicated for the prevention of COVID-19 in individuals aged 6 months and older.",
                "Pivotal publications / data vaccines": "Phase 3 trials demonstrated 95% efficacy in preventing COVID-19 infection in participants without prior infection.",
                "Interviews": "Advertorial",
                "Relevant literature": "Widely cited in studies on mRNA technology, COVID-19 vaccines, and public health strategies for combating the pandemic.",
                "Pipeline products - detailed information (TPP)": ""
            }
        },
        "productProfiles": [
            {
                "type": "FDA",
                "name": "Pfizer-BioNTech COVID-19 Vaccine (Comirnaty) - mRNA Vaccine",
                "composition": "mRNA encoding the SARS-CoV-2 spike glycoprotein encapsulated in lipid nanoparticles.",
                "strainCoverage": "Covers the original SARS-CoV-2 strain and has shown effectiveness against various variants, including Delta and Omicron.",
                "indication": "Active immunization for the prevention of COVID-19 caused by SARS-CoV-2 in individuals 6 months of age and older.",
                "dosing": "Primary series consists of two doses (0.3 mL each) given 3 weeks apart. Booster doses are recommended, with additional doses based on evolving recommendations.",
                "immunogenicity": "Induces strong immune responses, including neutralizing antibodies and T-cell activation, providing protection against symptomatic and severe COVID-19.",
                "efficacyEndpointsPhase3": "Primary endpoint was the prevention of symptomatic COVID-19 infection, with secondary endpoints including severe disease and death.",
                "efficacyData": "Initial trials showed 95% efficacy in preventing symptomatic COVID-19 infection. Real-world data support continued effectiveness, although reduced efficacy against newer variants.",
                "durationOfProtection": "Protection wanes over time, leading to recommendations for booster doses, particularly in elderly and high-risk populations.",
                "coAdministration": "Can be co-administered with other vaccines, including influenza vaccines, under specific guidelines.",
                "reactogenicity": "Common side effects include injection site pain, fatigue, headache, chills, and fever. Rare cases of myocarditis have been reported, particularly in younger males.",
                "safety": "Generally well tolerated with no significant safety concerns in most populations. Post-authorization monitoring identified rare adverse events, including myocarditis and anaphylaxis.",
                "vaccinationGoal": "To prevent COVID-19 infection, severe disease, hospitalization, and death, and to reduce transmission within the population.",
                "others": "Authorized for emergency use globally, with full approval granted in several regions. Used as part of large-scale vaccination campaigns to combat the COVID-19 pandemic."
            }
        ],
        "link": "https://www.pfizer.com/products/product-detail/pfizer-biontech-covid-19-vaccine",
        "vaccineType": "mRNA Covid vaccine",
        "comments": "First license, 12/2020",
        "revenue": "$11,220 million",
        "revenueLink": "https://s28.q4cdn.com/781576035/files/doc_financials/2023/ar/2023-10k.pdf",
        "lastUpdated": "2023"
    },
    {
        "name": "Prevnar/Prevenar 13",
        "vaccineId": 5,
        "pathogenId": 3,
        "manufacturers": [
            {
                "manufacturerId": 1
            }
        ],
        "licensers": [
            {
                "licenserId": 1,
                "link": "https://www.fda.gov/media/107657/download?attachment"
            },
            {
                "licenserId": 2,
                "link": "https://www.ema.europa.eu/en/documents/overview/prevenar-13-epar-summary-public_en.pdf"
            },
            {
                "licenserId": 3,
                "link": "https://www.who.int/teams/immunization-vaccines-and-biologicals/diseases/pneumonia"
            }
        ],
        "licensingDates": [
            {
                "name": "FDA",
                "type": "Adults",
                "date": "12/07/2016",
                "source": "https://www.drugs.com/newdrugs/pfizer-receives-fda-approval-prevnar-13-adults-age-18-through-49-4409.html"
            },
            {
                "name": "FDA",
                "type": "Children (Aged 6-17)",
                "date": "25/01/2023",
                "source": "https://www.drugs.com/newdrugs/pfizer-receives-fda-approval-prevnar-13-vaccine-naive-children-adolescents-aged-6-years-through-17-3662.html"
            },
            {
                "name": "FDA",
                "type": "Older Adults (Aged 50 and Older)",
                "date": "03/01/2012",
                "source": "https://www.drugs.com/newdrugs/fda-expands-prevnar-13-vaccine-ages-50-older-3011.html"
            },
            {
                "name": "FDA",
                "type": "Children (6 weeks to 5 years)",
                "date": "24/02/2010",
                "source": "https://www.drugs.com/newdrugs/fda-expands-prevnar-13-vaccine-ages-50-older-3011.html"
            }
        ],
        "description": "Prevnar 13 is a pneumococcal conjugate vaccine developed by Pfizer that protects against 13 serotypes of Streptococcus pneumoniae.",
        "introduction": {
            "General Information": {
                "Map Vaccine Preventable Diseases": "Map by disease",
                "Vaccine SmPCs (FDA, EMA, WHO, others)": "Search by disease, include combos",
                "Product profiles": "",
                "Pipeline products - summary table": "By click, TPP",
                "Failed products": ""
            },
            "Company products, pipeline": {
                "VPD-BoD, Product presentations, Monograph": "Prevnar 13 is used for the prevention of invasive pneumococcal disease caused by 13 serotypes of Streptococcus pneumoniae in various age groups.",
                "Pivotal publications / data vaccines": "Phase 3 studies showed high immunogenicity and safety in preventing pneumococcal disease.",
                "Interviews": "Advertorial",
                "Relevant literature": "Frequently referenced in publications on pneumococcal disease prevention, especially for pediatric and adult vaccination programs.",
                "Pipeline products - detailed information (TPP)": ""
            }
        },
        "productProfiles": [
            {
                "type": "FDA",
                "name": "Prevnar 13 (Pfizer) - Pneumococcal 13-Valent Conjugate Vaccine",
                "composition": "13 serotypes of pneumococcal polysaccharides conjugated to a CRM197 carrier protein.",
                "strainCoverage": "Protects against 13 serotypes of Streptococcus pneumoniae, including those responsible for invasive disease and pneumonia.",
                "indication": "Active immunization for the prevention of invasive pneumococcal disease caused by Streptococcus pneumoniae in individuals aged 6 weeks and older.",
                "dosing": "Four-dose series in infants and young children (at 2, 4, 6, and 12-15 months). Single dose for adults 18 years and older.",
                "immunogenicity": "Induces robust immune responses against all 13 included serotypes, with high opsonophagocytic activity.",
                "efficacyEndpointsPhase3": "Prevention of invasive pneumococcal disease (IPD) and pneumonia caused by the 13 serotypes.",
                "efficacyData": "Clinical trials showed high efficacy against IPD in infants, children, and adults. Proven to reduce the incidence of pneumococcal disease and pneumonia.",
                "durationOfProtection": "Provides long-term protection, but booster doses may be required for certain populations.",
                "coAdministration": "Can be administered with other vaccines, such as influenza and diphtheria, under proper guidelines.",
                "reactogenicity": "Common side effects include injection site pain, fever, irritability, and decreased appetite in infants.",
                "safety": "Generally well tolerated, with a safety profile similar to other pneumococcal vaccines. Rare hypersensitivity reactions may occur.",
                "vaccinationGoal": "To reduce the incidence of invasive pneumococcal disease, pneumonia, and other pneumococcal infections in at-risk populations.",
                "others": "Prev`nar 13 is part of routine pediatric and adult vaccination schedules in many countries, significantly lowering disease burden globally."
            }
        ],
        "vaccineType": "13-valent pneumococcal conjugate vaccine",
        "link": "https://www.pfizer.com/products/product-detail/prevnar_13",
        "lastUpdated": "TBU"
    },
    {
        "name": "Prevnar/Prevenar 20™",
        "vaccineId": 6,
        "pathogenId": 3,
        "manufacturers": [
            {
                "manufacturerId": 1
            }
        ],
        "licensers": [
            {
                "licenserId": 1,
                "link": "https://www.fda.gov/media/151502/download?attachment"
            },
            {
                "licenserId": 2,
                "link": "https://www.ema.europa.eu/en/documents/product-information/prevenar-20-epar-product-information_en.pdf"
            },
            {
                "licenserId": 3,
                "link": "https://cdn.who.int/media/docs/default-source/pvg/global-vaccine-safety/pneumococcal-vaccine-rates-information-sheet.pdf"
            }
        ],
        "licensingDates": [
            {
                "name": "FDA",
                "date": "10/06/2021",
                "source": "https://www.fda.gov/vaccines-blood-biologics/vaccines/prevnar-20"
            }
        ],
        "description": "Prevnar 20 is a pneumococcal conjugate vaccine developed by Pfizer for the prevention of diseases caused by 20 serotypes of Streptococcus pneumoniae.",
        "introduction": {
            "General Information": {
                "Map Vaccine Preventable Diseases": "Map by disease",
                "Vaccine SmPCs (FDA, EMA, WHO, others)": "Search by disease, include combos",
                "Product profiles": "",
                "Pipeline products - summary table": "By click, TPP",
                "Failed products": ""
            },
            "Company products, pipeline": {
                "VPD-BoD, Product presentations, Monograph": "Prevnar 20 is indicated for active immunization to prevent invasive disease caused by 20 specific serotypes of Streptococcus pneumoniae in individuals aged 6 weeks and older.",
                "Pivotal publications / data vaccines": "Clinical trials demonstrated robust immune responses and safety in both pediatric and adult populations.",
                "Interviews": "Advertorial",
                "Relevant literature": "Prevnar 20 has been discussed extensively in medical journals and public health forums regarding its efficacy and role in vaccination schedules.",
                "Pipeline products - detailed information (TPP)": ""
            }
        },
        "productProfiles": [
            {
                "type": "FDA",
                "name": "Prevnar 20 (Pfizer) - Pneumococcal 20-Valent Conjugate Vaccine",
                "composition": "Contains polysaccharides from 20 serotypes of Streptococcus pneumoniae conjugated to a diphtheria CRM197 protein.",
                "strainCoverage": "Protects against 20 serotypes of Streptococcus pneumoniae.",
                "indication": "Active immunization for the prevention of invasive disease caused by Streptococcus pneumoniae serotypes 1, 3, 4, 5, 6A, 6B, 7F, 8, 9V, 10A, 11A, 12F, 14, 15B, 18C, 19A, 19F, 22F, 23F, and 33F in individuals 6 weeks of age and older. Also indicated for the prevention of otitis media caused by S. pneumoniae serotypes 4, 6B, 9V, 14, 18C, 19F, and 23F in individuals 6 weeks through 5 years of age.",
                "dosing": "Administered as a single 0.5 mL intramuscular dose for adults. For children, the dosing schedule varies based on age and previous vaccination history.",
                "immunogenicity": "Elicits strong immune responses, with high levels of IgG and opsonophagocytic activity against the 20 vaccine serotypes.",
                "efficacyEndpointsPhase3": "Prevention of invasive pneumococcal disease and pneumonia caused by the 20 serotypes included in the vaccine.",
                "efficacyData": "Clinical studies showed that Prevnar 20 is effective in preventing diseases caused by the included serotypes in both adults and children.",
                "durationOfProtection": "Expected to provide long-lasting immunity; however, the exact duration of protection is still under investigation.",
                "coAdministration": "May be administered concomitantly with other vaccines, following appropriate guidelines.",
                "reactogenicity": "Common side effects include injection site pain, swelling, muscle pain, joint pain, headache, and fatigue.",
                "safety": "Generally well tolerated. In rare cases, hypersensitivity reactions may occur.",
                "vaccinationGoal": "To reduce the incidence of invasive pneumococcal diseases and pneumonia caused by the 20 serotypes in the vaccine.",
                "others": "Prevnar 20 received FDA approval in June 2021 for use in adults aged 18 and older, and in April 2023 for use in children aged 6 weeks and older."
            }
        ],
        "link": "https://www.pfizer.com/products/product-detail/prevnar-20tm",
        "packageInsertLink": "https://fda.report/media/149987/Package+Insert+-+PREVNAR+20.pdf",
        "lastUpdated": "TBU"
    },
    {
        "name": "TicoVac™ (Tick-Borne Encephalitis Vaccine)",
        "vaccineId": 7,
        "pathogenId": 4,
        "manufacturers": [
            {
                "manufacturerId": 1
            }
        ],
        "licensers": [
            {
                "licenserId": 1,
                "link": "https://www.fda.gov/media/151502/download"
            }
        ],
        "licensingDates": [
            {
                "name": "FDA",
                "date": "08/2021",
                "source": "https://s28.q4cdn.com/781576035/files/doc_financials/2023/ar/2023-10k.pdf"
            }
        ],
        "description": "TicoVac™ is a vaccine developed by Pfizer to prevent tick-borne encephalitis (TBE), a viral infection transmitted through tick bites.",
        "introduction": {
            "General Information": {
                "Map Vaccine Preventable Diseases": "Map by disease",
                "Vaccine SmPCs (FDA, EMA, WHO, others)": "Search by disease, include combos",
                "Product profiles": "",
                "Pipeline products - summary table": "By click, TPP",
                "Failed products": ""
            },
            "Company products, pipeline": {
                "VPD-BoD, Product presentations, Monograph": "TicoVac™ is indicated for active immunization to prevent tick-borne encephalitis in individuals over 1 year of age who are at risk of exposure.",
                "Pivotal publications / data vaccines": "Clinical trials have shown high immunogenicity and effectiveness in preventing TBE in various age groups.",
                "Interviews": "Advertorial",
                "Relevant literature": "Frequently cited in studies on tick-borne diseases and vaccination programs, particularly in endemic regions.",
                "Pipeline products - detailed information (TPP)": ""
            }
        },
        "productProfiles": [
            {
                "type": "EMA",
                "name": "TicoVac™ (Pfizer) - Tick-Borne Encephalitis Vaccine",
                "composition": "Inactivated tick-borne encephalitis virus grown in chick embryo cell cultures.",
                "strainCoverage": "Covers multiple strains of tick-borne encephalitis virus prevalent in Europe and Asia.",
                "indication": "Active immunization against tick-borne encephalitis in individuals aged 1 year and older, especially those living in or traveling to endemic areas.",
                "dosing": "Primary series consists of three doses. Booster doses are recommended every 3-5 years.",
                "immunogenicity": "Strong immunogenic response with high levels of neutralizing antibodies after the full vaccination schedule.",
                "efficacyEndpointsPhase3": "Prevention of tick-borne encephalitis following vaccination.",
                "efficacyData": "Clinical data show over 90% effectiveness in preventing TBE after completion of the primary vaccination series.",
                "durationOfProtection": "Long-lasting protection with booster doses required every 3-5 years to maintain immunity.",
                "coAdministration": "Can be co-administered with other vaccines under certain conditions.",
                "reactogenicity": "Common side effects include injection site pain, fatigue, headache, and fever.",
                "safety": "Generally well tolerated; rare cases of allergic reactions and local site reactions have been reported.",
                "vaccinationGoal": "To prevent tick-borne encephalitis in individuals at risk, reducing the incidence of this serious viral infection.",
                "others": "Widely used in Europe, where tick-borne encephalitis is endemic, and increasingly recommended for travelers to high-risk regions."
            }
        ],
        "vaccineType": "Tick-borne-encephalitis (TBE) whole-virus vaccine.",
        "link": "https://www.pfizer.com/products/product-detail/ticovac",
        "lastUpdated": "TBU"
    },
    {
        "name": "Trumenba™",
        "vaccineId": 8,
        "pathogenId": 5,
        "manufacturers": [
            {
                "manufacturerId": 1,
                "link": "https://www.fda.gov/media/89936/download"
            }
        ],
        "licensers": [
            {
                "licenserId": 1,
                "link": "https://www.fda.gov/media/89936/download?attachment"
            },
            {
                "licenserId": 2,
                "link": "https://www.ema.europa.eu/en/documents/product-information/trumenba-epar-product-information_en.pdf"
            }
        ],
        "licensingDates": [
            {
                "name": "FDA",
                "date": "13/03/2017",
                "source": "https://www.fda.gov/vaccines-blood-biologics/vaccines/trumenba"
            }
        ],
        "description": "Trumenba is a vaccine developed by Pfizer to prevent invasive meningococcal disease caused by Neisseria meningitidis serogroup B.",
        "introduction": {
            "General Information": {
                "Map Vaccine Preventable Diseases": "Map by disease",
                "Vaccine SmPCs (FDA, EMA, WHO, others)": "Search by disease, include combos",
                "Product profiles": "",
                "Pipeline products - summary table": "By click, TPP",
                "Failed products": ""
            },
            "Company products, pipeline": {
                "VPD-BoD, Product presentations, Monograph": "Trumenba is indicated for active immunization to prevent invasive disease caused by Neisseria meningitidis serogroup B in individuals aged 10 through 25 years.",
                "Pivotal publications / data vaccines": "Phase 3 trials showed high immunogenicity and safety against meningococcal disease caused by serogroup B.",
                "Interviews": "Advertorial",
                "Relevant literature": "Widely cited in the context of meningococcal vaccine studies and public health recommendations.",
                "Pipeline products - detailed information (TPP)": ""
            }
        },
        "productProfiles": [
            {
                "type": "FDA",
                "name": "Trumenba (Pfizer) - Meningococcal B Vaccine",
                "composition": "Two recombinant lipidated factor H binding protein (fHBP) antigens from Neisseria meningitidis serogroup B.",
                "strainCoverage": "Protects against a broad range of Neisseria meningitidis serogroup B strains.",
                "indication": "Active immunization against invasive meningococcal disease caused by serogroup B in individuals aged 10 to 25 years.",
                "dosing": "Three-dose series (0, 2, 6 months) or two-dose series (0, 6 months).",
                "immunogenicity": "Induces protective antibodies against multiple strains of Neisseria meningitidis serogroup B.",
                "efficacyEndpointsPhase3": "Production of bactericidal antibodies that are effective in preventing meningococcal disease.",
                "efficacyData": "Clinical trials demonstrated robust immune responses, with high levels of bactericidal antibodies.",
                "durationOfProtection": "Duration of protection is not fully established; booster doses may be required.",
                "coAdministration": "Can be administered concomitantly with other vaccines, following proper guidelines.",
                "reactogenicity": "Common side effects include injection site pain, fatigue, headache, and muscle pain.",
                "safety": "Generally well tolerated; no serious safety concerns identified, although hypersensitivity reactions may occur.",
                "vaccinationGoal": "Prevention of invasive meningococcal disease caused by Neisseria meningitidis serogroup B.",
                "others": "Trumenba has been included in meningococcal vaccination programs, especially in areas with high-risk populations or outbreaks."
            }
        ],
        "vaccineType": "Meningococcal B vaccine",
        "link": "https://www.pfizer.com/products/product-detail/trumenba",
        "lastUpdated": "TBU"
    },
    {
        "name": "Janssen COVID-19 Vaccine",
        "vaccineId": 9,
        "pathogenId": 2,
        "manufacturers": [
            {
                "manufacturerId": 2
            }
        ],
        "licensers": [
            {
                "licenserId": 1,
                "source": "https://www.fda.gov/vaccines-blood-biologics/coronavirus-covid-19-cber-regulated-biologics/janssen-covid-19-vaccine"
            },
            {
                "licenserId": 2,
                "source": "https://www.ema.europa.eu/en/documents/product-information/jcovden-epar-product-information_en.pdf"
            },
            {
                "licenserId": 4,
                "source": "https://www.gov.uk/government/publications/regulatory-approval-of-covid-19-vaccine-janssen"
            },
            {
                "licenserId": 13,
                "source": "https://www.janssen.com/southafrica/johnson-johnson-single-dose-covid-19-vaccine-granted-registration-south-african-health-products"
            }
        ],
        "licensingDates": [
            {
                "name": "U.S. Food and Drug Administration (FDA)",
                "type": "Licensing Authority",
                "date": "02/27/2021",
                "source": "https://en.wikipedia.org/wiki/Janssen_COVID-19_vaccine"
            },
            {
                "name": "European Medicines Agency (EMA)",
                "type": "Licensing Authority",
                "date": "03/11/2021",
                "source": "https://en.wikipedia.org/wiki/Janssen_COVID-19_vaccine"
            },
            {
                "name": "Medicines and Healthcare products Regulatory Agency (MHRA)",
                "type": "Licensing Authority",
                "date": "05/28/2021",
                "source": "https://www.gov.uk/government/publications/regulatory-approval-of-covid-19-vaccine-janssen"
            },
            {
                "name": "South African Health Products Regulatory Authority (SAHPRA)",
                "type": "Licensing Authority",
                "date": "02/17/2021",
                "source": "https://en.wikipedia.org/wiki/Janssen_COVID-19_vaccine"
            }
        ],
        "description": "The Janssen COVID-19 Vaccine, developed by Johnson & Johnson, is a viral vector vaccine used for the prevention of COVID-19 caused by SARS-CoV-2.",
        "introduction": {
            "General Information": {
                "Map Vaccine Preventable Diseases": "Map by disease",
                "Vaccine SmPCs (FDA, EMA, WHO, others)": "Search by disease, include combos",
                "Product profiles": "",
                "Pipeline products - summary table": "By click, TPP",
                "Failed products": ""
            },
            "Company products, pipeline": {
                "VPD-BoD, Product presentations, Monograph": "Janssen COVID-19 Vaccine is a viral vector vaccine that uses a human adenovirus to deliver the SARS-CoV-2 spike protein gene to elicit an immune response.",
                "Pivotal publications / data vaccines": "Phase 3 clinical trials demonstrated effectiveness in preventing severe COVID-19 and reducing hospitalizations.",
                "Interviews": "Advertorial",
                "Relevant literature": "Frequently mentioned in scientific literature and public health discussions for its single-dose regimen and role in pandemic control.",
                "Pipeline products - detailed information (TPP)": ""
            }
        },
        "productProfiles": [
            {
                "type": "EMA",
                "name": "Janssen COVID-19 Vaccine (Johnson & Johnson)",
                "composition": "Non-replicating adenovirus vector encoding the SARS-CoV-2 spike protein.",
                "strainCoverage": "Effective against the original strain and certain variants of SARS-CoV-2, though efficacy may vary by variant.",
                "indication": "Active immunization for the prevention of COVID-19 in individuals 18 years of age and older.",
                "dosing": "Single dose (0.5 mL), with a booster dose recommended for certain populations.",
                "immunogenicity": "Induces strong immune responses, including neutralizing antibodies and T-cell activation.",
                "efficacyEndpointsPhase3": "Prevention of symptomatic and severe COVID-19 cases.",
                "efficacyData": "Efficacy against moderate to severe COVID-19 was approximately 66.9%, with higher protection against severe disease and hospitalization.",
                "durationOfProtection": "Protection lasts at least several months after the single dose, with booster doses suggested for prolonged protection.",
                "coAdministration": "Can be co-administered with other vaccines, including the influenza vaccine, under certain guidelines.",
                "reactogenicity": "Common side effects include pain at the injection site, headache, fatigue, muscle aches, and fever.",
                "safety": "Generally well tolerated; rare cases of thrombosis with thrombocytopenia syndrome (TTS) and Guillain-Barré syndrome have been reported.",
                "vaccinationGoal": "To reduce COVID-19 transmission, prevent severe cases, and decrease hospitalizations and deaths.",
                "others": "Authorized for emergency use globally and plays a role in mass vaccination campaigns, including use in low- and middle-income countries."
            }
        ],
        "link": "https://www.jnj.com/coronavirus/covid-19-vaccine",
        "lastUpdated": "TBU"
    },
    {
        "name": "Vaxzevria",
        "vaccineId": 10,
        "pathogenId": 2,
        "manufacturers": [
            {
                "manufacturerId": 6
            }
        ],
        "licensers": [
            {
                "licenserId": 2,
                "link": "https://www.ema.europa.eu/en/documents/product-information/vaxzevria-epar-product-information_en.pdf"
            },
            {
                "licenserId": 3,
                "link": "https://extranet.who.int/prequal/sites/default/files/document_files/smpc-azd1222_Jan2023.pdf"
            }
        ],
        "licensingDates": [
            {
                "name": "TGA",
                "type": "Provisional Approval",
                "date": "02/2021",
                "source": "https://www.tga.gov.au/covid-19-vaccine-astrazeneca-vaxzevria"
            },
            {
                "name": "TGA",
                "type": "Provisional Approval for Booster Dose",
                "date": "02/2022",
                "source": "https://www.tga.gov.au/covid-19-vaccine-astrazeneca-vaxzevria"
            },
            {
                "name": "EMA",
                "type": "Conditional Marketing Authorisation",
                "date": "01/2021",
                "source": "https://www.ema.europa.eu/en/medicines/human/EPAR/vaxzevria"
            }
        ],
        "introduction": {
            "General Information": {
                "Map Vaccine Preventable Diseases": "Map by disease",
                "Vaccine SmPCs (FDA, EMA, WHO, others)": "Search by disease, include combos",
                "Product profiles": "",
                "Pipeline products - summary table": "By click, TPP",
                "Failed products": ""
            },
            "Company products, pipeline": {
                "VPD-BoD, Product presentations, Monograph": "Vaxzevria is a recombinant adenovirus vector vaccine indicated for the prevention of COVID-19 in individuals 18 years of age and older.",
                "Pivotal publications / data vaccines": "Phase 3 trial data showed efficacy in preventing COVID-19, particularly severe disease.",
                "Interviews": "Advertorial",
                "Relevant literature": "Widely discussed in scientific and public health literature regarding its role in global vaccination efforts.",
                "Pipeline products - detailed information (TPP)": ""
            }
        },
        "productProfiles": [
            {
                "type": "EMA",
                "name": "Vaxzevria (AstraZeneca) - COVID-19 Vaccine",
                "composition": "Recombinant adenovirus vector encoding the SARS-CoV-2 spike protein.",
                "strainCoverage": "Effective against various strains of SARS-CoV-2, though efficacy may vary by variant.",
                "indication": "Active immunization to prevent COVID-19 caused by SARS-CoV-2 in individuals aged 18 and older.",
                "dosing": "Two doses (0.5 mL each), administered 4-12 weeks apart.",
                "immunogenicity": "Induces strong immune responses, including neutralizing antibodies and T-cell responses.",
                "efficacyEndpointsPhase3": "Prevention of symptomatic COVID-19, severe disease, and hospitalization.",
                "efficacyData": "Initial trials showed 60-80% efficacy against symptomatic COVID-19. Effectiveness against severe disease and death is higher.",
                "durationOfProtection": "Protection lasts at least 6 months after the second dose, with booster doses recommended for prolonged immunity.",
                "coAdministration": "Can be co-administered with influenza vaccines and other vaccines under certain guidelines.",
                "reactogenicity": "Common side effects include pain at the injection site, fatigue, headache, muscle pain, fever, and chills.",
                "safety": "Generally well tolerated, but rare cases of thrombotic events (blood clots) have been reported, particularly in younger adults.",
                "vaccinationGoal": "Control the spread of COVID-19 and reduce the severity of the disease and associated hospitalizations.",
                "others": "Authorized under emergency use in multiple countries and plays a key role in global vaccination programs, including COVAX."
            }
        ],
        "link": "https://www.astrazeneca.com/media-centre/press-releases/2021/astrazeneca-announces-covid-19-vaccine-update.html",
        "lastUpdated": "TBU"
    },
    {
        "name": "Gardasil",
        "vaccineId": 11,
        "pathogenId": 6,
        "manufacturers": [
            {
                "manufacturerId": 4
            }
        ],
        "licensers": [
            {
                "licenserId": 1,
                "link": "https://www.fda.gov/files/vaccines,%20blood%20&%20biologics/published/Package-Insert---Gardasil.pdf"
            },
            {
                "licenserId": 2,
                "link": "https://www.ema.europa.eu/en/documents/product-information/gardasil-epar-product-information_en.pdf"
            },
            {
                "licenserId": 3,
                "link": "https://www.who.int/teams/immunization-vaccines-and-biologicals/diseases/human-papillomavirus-vaccines-(HPV)"
            },
            {
                "licenserId": 4,
                "link": "https://assets.publishing.service.gov.uk/media/62291db38fa8f526d907f6c7/UKHSA-12304-HPV-healthcare-professional-factsheet.pdf"
            }
        ],
        "licensingDates": [
            {
                "name": "EMA",
                "type": "Marketing Authorisation",
                "date": "09/2006",
                "source": "https://www.ema.europa.eu/en/medicines/human/EPAR/gardasil"
            },
            {
                "name": "EMA",
                "type": "Marketing Authorisation",
                "date": "07/2015",
                "source": "https://www.ema.europa.eu/en/documents/overview/gardasil-9-epar-summary-public_en.pdf"
            }
        ],
        "description": "Gardasil 9 is a 9-valent human papillomavirus (HPV) recombinant vaccine used to prevent cancers caused by HPV types, specifically targeting both high-risk and low-risk HPV strains.",
        "introduction": {
            "General Information": {
                "Map Vaccine Preventable Diseases": "Map by disease",
                "Vaccine SmPCs (FDA, EMA, WHO, others)": "Search by disease, include combos",
                "Product profiles": "",
                "Pipeline products - summary table": "By click, TPP",
                "Failed products": ""
            },
            "Company products, pipeline": {
                "VPD-BoD, Product presentations, Monograph": "",
                "Pivotal publications / data vaccines": "",
                "Interviews": "Advertorial",
                "Relevant literature": "",
                "Pipeline products - detailed information (TPP)": ""
            }
        },
        "productProfiles": [
            {
                "type": "FDA",
                "name": "FDA-Product Profile: Gardasil® 9 (MAH: Merck Sharp & Dohme LLC)",
                "composition": "Recombinant vaccine covering HPV types 6, 11, 16, 18, 31, 33, 45, 52, and 58.",
                "strainCoverage": "HPV Types 6, 11 (low-risk) and 16, 18, 31, 33, 45, 52, 58 (high-risk for cancer).",
                "indication": "Prevention of cervical, vulvar, vaginal, anal, oropharyngeal, and other head and neck cancers, as well as genital warts.",
                "dosing": "2-dose schedule for individuals 9-14 years old, 3-dose schedule for individuals 15-45 years old.",
                "contraindication": "Severe allergic reactions to yeast or previous doses of Gardasil or Gardasil 9.",
                "immunogenicity": "Demonstrated immune response against targeted HPV types, preventing diseases related to these strains.",
                "efficacyEndpointsPhase3": "Protection against cervical, vulvar, vaginal, anal, and other cancers caused by high-risk HPV types.",
                "efficacyData": "Approved for preventing multiple cancers and genital warts caused by HPV types 6, 11, 16, 18, 31, 33, 45, 52, and 58.",
                "durationOfProtection": "Duration of protection for 2-dose schedule not yet established.",
                "coAdministration": "Safe co-administration with Menactra and Adacel; minor increase in injection-site swelling when combined.",
                "reactogenicity": "Common side effects include injection-site pain, swelling, erythema, and headache.",
                "safety": "Contraindicated in individuals with hypersensitivity to yeast. Syncope has been reported post-vaccination.",
                "vaccinationGoal": "Protection against multiple HPV-related cancers and genital warts.",
                "others": "Does not provide protection against diseases caused by HPV strains not covered by the vaccine or those exposed through prior infection."
            }
        ],
        "link": "https://www.merck.com/product/usa/pi_circulars/g/gardasil/gardasil_pi.pdf",
        "lastUpdated": "TBU"
    },
    {
        "name": "FSME-Immun®",
        "vaccineId": 12,
        "pathogenId": 4,
        "manufacturers": [
            {
                "manufacturerId": 1
            }
        ],
        "licensers": [
            {
                "licenserId": 1,
                "link": "https://www.fda.gov/media/151994/download"
            }
        ],
        "licensingDates": [
            {
                "name": "EMA",
                "type": "Marketing Authorisation",
                "date": "06/10/2005",
                "source": "https://www.ema.europa.eu/en/medicines/human/EPAR/fsme-immun"
            }
        ],
        "description": "FSME-Immun® is a vaccine developed by Pfizer, used to protect against tick-borne encephalitis (TBE), a viral infection affecting the brain and spine. It is recommended for individuals in areas where TBE is endemic.",
        "introduction": {
            "General Information": {
                "Map Vaccine Preventable Diseases": "Map by TBE endemic regions",
                "Vaccine SmPCs (FDA, EMA, WHO, others)": "Search for tick-borne encephalitis vaccines",
                "Product profiles": "FSME-Immun®",
                "Pipeline products - summary table": "No relevant pipeline products",
                "Failed products": "None related"
            },
            "Company products, pipeline": {
                "VPD-BoD, Product presentations, Monograph": "TBE vaccines for endemic regions",
                "Pivotal publications / data vaccines": "Nygren 2022 case-control, Erber 2022 efficacy studies",
                "Interviews": "None available",
                "Relevant literature": "Multiple efficacy studies from Germany, Latvia, and Switzerland",
                "Pipeline products - detailed information (TPP)": "No current pipeline product"
            }
        },
        "productProfiles": [
            {
                "type": "EMA",
                "name": "FSME-Immun® (Tick-Borne Encephalitis Vaccine)",
                "composition": "Inactivated TBE virus derived from European TBE strain Neudörfl",
                "strainCoverage": "European TBE virus strains",
                "indication": "Protection against tick-borne encephalitis for individuals in endemic regions",
                "dosing": "Primary series: 3 doses administered over a specified time period",
                "immunogenicity": "In studies, seropositivity rates above 95% in individuals younger than 60",
                "efficacyEndpointsPhase3": "Completion of 3-dose regimen with optional booster",
                "efficacyData": "Up to 96.6% vaccine effectiveness after completion of 3-dose regimen and booster dose",
                "durationOfProtection": "Long-lasting, with effectiveness remaining stable up to 10 years",
                "coAdministration": "No specific data on co-administration with other vaccines",
                "reactogenicity": "Mild side effects include local tenderness, headache, and fatigue",
                "safety": "Safe for most age groups; individuals with severe allergies to vaccine components should avoid use",
                "vaccinationGoal": "Protection for individuals in endemic areas, particularly those exposed to outdoor activities",
                "others": "Efficacy varies by region, showing higher rates in areas like Germany and Latvia"
            }
        ],
        "vaccineType": "Tick-borne-encephalitis (TBE) whole-virus vaccine.",
        "link": "https://www.pfizer.com/products/product-detail/ticovac",
        "lastUpdated": "TBU"
    },
    {
        "name": "Valneva VLA1553 Chikungunya Vaccine",
        "pathogenId": 4,
        "vaccineId": 13,
        "manufacturers": [],
        "licensers": [
            {
                "licenserId": 1,
                "link": "https://www.fda.gov/files/vaccines%2C%20blood%20%26%20biologics/published/Package-Insert-IXCHIQ.pdf"
            }
        ],
        "licensingDates": [
            {
                "name": "EMA",
                "type": "Accelerated Assessment",
                "date": "06/2024",
                "source": "https://valneva.com/press/valneva-receives-marketing-authorization-in-europe-for-chikungunya-vaccine"
            }
        ],
        "description": "-",
        "introduction": {
            "General Information": {
                "Map Vaccine Preventable Diseases": "Map by disease",
                "Vaccine SmPCs (FDA, EMA, WHO, others)": "Search by disease, include combos",
                "Product profiles": "",
                "Pipeline products - summary table": "By click, TPP",
                "Failed products": ""
            },
            "Company products, pipeline": {
                "VPD-BoD, Product presentations, Monograph": "",
                "Pivotal publications / data vaccines": "",
                "Interviews": "Advertorial",
                "Relevant literature": "",
                "Pipeline products - detailed information (TPP)": ""
            }
        },
        "productProfiles": [
            {
                "type": "EMA",
                "name": "Short Target Product Profile Phase 3:<br/>Valnea VLA1533 - Chikungunya vaccine (fast track)",
                "composition": "Monovalent live-attuned <br/>(CHIKV-LR2006-OPY1; deleted nsPr3 (replicase complex))",
                "strainCoverage": "All strains",
                "indication": "'Adults and children'-P3:>18 years in endemic regions",
                "dosing": "Single dose i.m.",
                "immunogenicity": "Descriptive only (100% responders after 1 dose)",
                "efficacyEndpointsPhase3": "Immunogenicity (NT vs. surrogate) day 28",
                "efficacyData": "Surrogate 'protective titer'",
                "durationOfProtection": "Unknown, possibly lifelong",
                "coAdministration": "None",
                "reactogenicity": "Target? Similar to TdaP or other?",
                "safety": "N=4,000 US adults",
                "vaccinationGoal": "Individual protection",
                "others": "Fast track and Breakthrough Designation (FDA), PRIME (EMA)"
            },
            {
                "type": "FDA",
                "name": "FDA-Product Profile: MVA-BN (JYNNEOS®) (MAH: Bavarian Nordic A/S)<br/>Suspension for injection; smallpox and monkeypox vaccine (Live attenuated, non-replicating)",
                "composition": "1 dose (0.5mL) contains modified vaccinia Ankara-Bavarian Nordic live virus (0.5x10% to 3.95x10 Inf.U); produced in chick embryo cells; storage: freezer, -20°C /refrigerator; shelf life: up to 3 yrs. at -20°C±10°C, 4 weeks at 2-8°C.",
                "strainCoverage": "Smallpox and monkeypox viruses.",
                "indication": "Active immunization against smallpox and mpox in adults ≥ 18 years at high risk of infection. To be used based on official recommendations.",
                "dosing": "2 doses (0.5ml each); 4-week interval; S.C.<br/>Booster: limited data available, if necessary single dose in healthy adults and 2 doses in immunocompromised patients (0, >28day).",
                "contraindication": "Hypersensitivity (administered if benefits > risk); limited data in pregnancy; no data in breastfeeding (administered if benefits > risk).",
                "immunogenicity": "Immunogenicity was assessed by ELISA and PRNT; percentage of seroresponders: 2 doses, 4wks. Interval, in Vaccinia-naive individuals, 42 days f/u, 77.2-99.8%; 2 doses, 4 wks. Interval, in Vaccinia-naive individuals, 42 days f/u, 77.2-99.8%; 2 doses, 4 wks. Interval, in vaccinia-experienced individuals, 42 days f/u, 85.5-100%.",
                "efficacyEndpointsPhase3": "Challenge study in NHP: 80-100% reduction in mortality; VEy based on immunogenicity and animal challenge studies.",
                "efficacyData": "VEs not included in the label:\nVEs against mpox (Epic study): 1 dose, 35.8% (95% CI, 22.1; 47.1); 2 doses, 66.0% (95%CI,47.4; 78.1).\nVEs against mpox (Multijurisdictional study): 1 dose, 75.2% (95% CI, 61.2; 84.2); 2 doses, 85.9% (95% CI, 73.8; 92.4).\nVEs against mpox (New York state study): 1 dose, 68% (95% CI,25; 87), 2 doses, 89% (95% CI,44; 98).",
                "durationOfProtection": "Unknown.",
                "coAdministration": "No data on the concomitant use with other vaccines.",
                "reactogenicity": "Vaccine-naive healthy adults: injection site pain (84.9%), redness (60.8%), swelling (51.6%), induration (45.4%), and itching (43.1%), muscle pain (42.8%), headache (34.8%), fatigue(30.4%), nausea (17.3%) and chills (10.4%); healthy adults previously vaccinated with smallpox vaccine: injection site redness (80.9%), pain (79.5%), induration (70.4%), swelling (67.2%), and itching (32.0%), fatigue (33.5%), headache (27.6%), and muscle pain (21.5%); similar reactogenicity in HIV-infected patients and adults with atopic dermatitis.",
                "safety": "Higher frequency of injection site erythma and swelling, headache, myalgia, chills, nausea, and fatigue in atopic dermatitis patients; May cause flare-ups or worsening skin condition in atopic dermatitis patients.",
                "vaccinationGoal": "Individual protection; outbreak control.",
                "others": "No safety/efficacy/effectiveness data in <18 yrs. and ≥ 65 yrs.; lower immune response in HIV-infected individuals; no data in other immunosuppressed individuals; dose intervals of less than 28 days should be avoided in immunosuppressed individuals.; authorization under exceptional circumstances; vial temperature should be 8-25°C before use."
            }
        ]
    },
    {
        "name": "Menveo",
        "vaccineId": 14,
        "pathogenId": 22,
        "manufacturers": [
            {
                "manufacturerId": 8
            }
        ],
        "licensers": [
            {
                "licenserId": 1,
                "link": "https://www.fda.gov/vaccines-blood-biologics/vaccines/menveo"
            },
            {
                "licenserId": 2,
                "link": "https://www.ema.europa.eu/en/medicines/human/EPAR/menveo"
            }
        ],
        "licensingDates": [
            {
                "name": "EMA",
                "type": "Marketing Authorisation",
                "date": "03/2010",
                "source": "https://www.ema.europa.eu/en/medicines/human/EPAR/menveo"
            }
        ],
        "description": "Menveo is a meningococcal conjugate vaccine used for active immunization to prevent invasive meningococcal disease caused by Neisseria meningitidis serogroups A, C, Y, and W-135.",
        "introduction": {
            "General Information": {
                "Map Vaccine Preventable Diseases": "Map by disease",
                "Vaccine SmPCs (FDA, EMA, WHO, others)": "Search by disease, include combos",
                "Product profiles": "Available via GSKPro",
                "Pipeline products - summary table": "",
                "Failed products": ""
            },
            "Company products, pipeline": {
                "VPD-BoD, Product presentations, Monograph": "Menveo targets meningococcal serogroups A, C, Y, W-135.",
                "Pivotal publications / data vaccines": "",
                "Interviews": "GSKPro resources",
                "Relevant literature": "Available from FDA and GSKPro",
                "Pipeline products - detailed information (TPP)": ""
            }
        },
        "productProfiles": [
            {
                "type": "FDA",
                "name": "MENVEO (GlaxoSmithKline Biologicals SA) Meningococcal (Groups A, C, Y, and W-135) Oligosaccharide Diphtheria CRM197 Conjugate Vaccine",
                "composition": "A 2-vial presentation combining a MenCYW-135 liquid conjugate component and a MenA lyophilized conjugate component",
                "strainCoverage": "Neisseria meningitidis serogroups A, C, Y, W-135",
                "indication": "Active immunization for individuals aged 2 months through 55 years to prevent invasive meningococcal disease.",
                "dosing": "0.5 mL intramuscular injection after reconstitution. The schedule varies by age group, with primary doses given at 2 months and booster doses depending on age and risk factors.",
                "contraindication": "Hypersensitivity to any component of the vaccine, including diphtheria toxoid.",
                "immunogenicity": "Menveo has shown strong immune response across age groups, with effectiveness in preventing infections caused by the covered strains.",
                "efficacyEndpointsPhase3": "Immunogenicity based on serum bactericidal antibody responses.",
                "efficacyData": "Demonstrates robust protection against the covered strains.",
                "durationOfProtection": "Exact duration unknown, boosters may be required depending on age and risk factors.",
                "coAdministration": "No significant interaction with other routine childhood or adult vaccines.",
                "reactogenicity": "Common side effects include injection site reactions, fever, irritability, and headache.",
                "safety": "Generally well-tolerated, with a safety profile consistent with other conjugate vaccines.",
                "vaccinationGoal": "Individual protection and herd immunity against meningococcal disease.",
                "others": "Used in both pediatric and adult populations, with a flexible dosing schedule depending on age."
            }
        ],
        "vaccineType": "Meningococcal conjugate vaccine.",
        "link": "https://www.gsk.com/en-gb/products/our-vaccines/menveo/",
        "lastUpdated": "2024-Aug"
    },
    {
        "name": "Fluad",
        "vaccineId": 15,
        "pathogenId": 8,
        "manufacturers": [
            {
                "manufacturerId": 8
            }
        ],
        "licensers": [
            {
                "licenserId": 1,
                "link": "https://www.fda.gov/vaccines-blood-biologics/vaccines/fluad"
            },
            {
                "licenserId": 2,
                "link": "https://www.ema.europa.eu/en/medicines/human/EPAR/fluad"
            },
            {
                "licenserId": 6,
                "link": "https://www.tga.gov.au/resources/auspmd/fluad"
            }
        ],
        "licensingDates": [
            {
                "name": "FDA",
                "type": "Approval Letter",
                "date": "11/2015",
                "source": "https://www.fda.gov/vaccines-blood-biologics/vaccines/fluad"
            },
            {
                "name": "EMA",
                "type": "Marketing Authorisation",
                "date": "03/2010",
                "source": "https://ec.europa.eu/health/documents/community-register/2021/20210723152583/anx_152583_en.pdf"
            }
        ],
        "description": "FLUAD is an adjuvanted influenza vaccine designed for active immunization against influenza disease caused by influenza virus subtypes A and types B in individuals aged 65 years and older.",
        "introduction": {
            "General Information": {
                "Map Vaccine Preventable Diseases": "Map by disease",
                "Vaccine SmPCs (FDA, EMA, WHO, others)": "Search by disease, include combos",
                "Product profiles": "Available via Seqirus",
                "Pipeline products - summary table": "",
                "Failed products": ""
            },
            "Company products, pipeline": {
                "VPD-BoD, Product presentations, Monograph": "FLUAD targets influenza virus subtypes A and B.",
                "Pivotal publications / data vaccines": "",
                "Interviews": "Seqirus resources",
                "Relevant literature": "Available from FDA and Seqirus",
                "Pipeline products - detailed information (TPP)": ""
            }
        },
        "productProfiles": [
            {
                "type": "FDA",
                "name": "FLUAD (Seqirus, Inc.) Adjuvanted Influenza Vaccine",
                "composition": "A standard-dose inactivated influenza vaccine with MF59 adjuvant.",
                "strainCoverage": "Influenza virus subtypes A and types B.",
                "indication": "Active immunization for individuals aged 65 years and older against influenza disease.",
                "dosing": "0.5 mL intramuscular injection. The schedule varies based on age and health status.",
                "contraindication": "History of severe allergic reaction to any component of the vaccine or to a previous influenza vaccine.",
                "immunogenicity": "FLUAD has shown enhanced immune responses in older adults compared to non-adjuvanted vaccines.",
                "efficacyEndpointsPhase3": "Immunogenicity assessed via serum antibody responses.",
                "efficacyData": "Demonstrates robust protection against the strains covered.",
                "durationOfProtection": "Exact duration unknown; annual vaccination is recommended.",
                "coAdministration": "Can be administered alongside other routine vaccines without significant interactions.",
                "reactogenicity": "Common side effects include injection site pain, fatigue, headache, and myalgia.",
                "safety": "Generally well-tolerated with a safety profile consistent with other influenza vaccines.",
                "vaccinationGoal": "To provide individual protection and contribute to herd immunity against influenza.",
                "others": "FLUAD is specifically formulated for older adults who may have a weaker immune response."
            }
        ],
        "vaccineType": "Influenza vaccine.",
        "link": "https://www.seqirus.com/products/influenza-vaccines/fluad",
        "lastUpdated": "2024-Aug"
    },
    {
        "name": "Bexsero",
        "vaccineId": 16,
        "pathogenId": 21,
        "manufacturers": [
            {
                "manufacturerId": 8
            }
        ],
        "licensers": [
            {
                "licenserId": 1,
                "link": "https://www.fda.gov/media/90996/download?attachment"
            },
            {
                "licenserId": 2,
                "link": "https://www.ema.europa.eu/en/medicines/human/EPAR/bexsero"
            }
        ],
        "licensingDates": [
            {
                "name": "FDA",
                "type": "Approval Letter",
                "date": "02/2015",
                "source": "https://www.fda.gov/media/90996/download?attachment"
            },
            {
                "name": "EMA",
                "type": "Marketing Authorisation",
                "date": "01/2013",
                "source": "https://www.ema.europa.eu/en/documents/product-information/bexsero-epar-product-information_en.pdf"
            }
        ],
        "description": "Bexsero is a meningococcal group B vaccine used for active immunization to prevent invasive meningococcal disease caused by Neisseria meningitidis serogroup B.",
        "introduction": {
            "General Information": {
                "Map Vaccine Preventable Diseases": "Map by disease",
                "Vaccine SmPCs (FDA, EMA, WHO, others)": "Search by disease, include combos",
                "Product profiles": "Available via GSKPro",
                "Pipeline products - summary table": "",
                "Failed products": ""
            },
            "Company products, pipeline": {
                "VPD-BoD, Product presentations, Monograph": "Bexsero targets meningococcal serogroup B.",
                "Pivotal publications / data vaccines": "",
                "Interviews": "GSKPro resources",
                "Relevant literature": "Available from FDA and GSKPro",
                "Pipeline products - detailed information (TPP)": ""
            }
        },
        "productProfiles": [
            {
                "type": "FDA",
                "name": "BEXSERO (GlaxoSmithKline) Meningococcal Group B Vaccine",
                "composition": "A suspension containing four different components from the surface of Neisseria meningitidis group B.",
                "strainCoverage": "Neisseria meningitidis serogroup B.",
                "indication": "Active immunization for individuals aged 2 months and older to prevent invasive meningococcal disease.",
                "dosing": "0.5 mL intramuscular injection. Administered as a two-dose schedule at 0 and 6 months or a three-dose schedule at 0, 1-2, and 6 months.",
                "contraindication": "History of severe allergic reaction to any component of the vaccine.",
                "immunogenicity": "Bexsero has shown strong immune responses in various age groups.",
                "efficacyEndpointsPhase3": "Immunogenicity based on serum bactericidal antibody responses.",
                "efficacyData": "Demonstrates robust protection against serogroup B infections.",
                "durationOfProtection": "Exact duration unknown; multiple doses may be necessary for optimal protection.",
                "coAdministration": "Can be administered with other vaccines without significant interactions.",
                "reactogenicity": "Common side effects include pain at the injection site, fatigue, headache, and mild fever.",
                "safety": "Generally well-tolerated with a safety profile consistent with other vaccines.",
                "vaccinationGoal": "To provide individual protection against meningococcal disease and contribute to herd immunity.",
                "others": "Approved for use in individuals aged 10 through 25 years in the U.S."
            }
        ],
        "vaccineType": "Meningococcal serogroup B vaccine.",
        "link": "https://www.gsk.com/en-gb/products/our-vaccines/bexsero/",
        "lastUpdated": "2024-Aug"
    },
    {
        "name": "RabAvert",
        "vaccineId": 17,
        "pathogenId": 20,
        "manufacturers": [
            {
                "manufacturerId": 8
            }
        ],
        "licensers": [
            {
                "licenserId": 1,
                "link": "https://www.fda.gov/media/83874/download?attachment"
            }
        ],
        "licensingDates": [
            {
                "name": "FDA",
                "date": "05/10/2024",
                "source": "https://www.fda.gov/vaccines-blood-biologics/vaccines/rabavert"
            },
            {
                "name": "TGA",
                "date": "04/27/2023",
                "source": "https://www.tga.gov.au/sites/default/files/2023-05/auspar-verorab-230427.pdf"
            },
            {
                "name": "Health Canada",
                "date": "04/17/2014",
                "source": "https://www.novartis.com/ca-en/sites/novartis_ca/files/rabavert_scrip_e.pdf"
            }
        ],
        "description": "RabAvert is a rabies vaccine manufactured by Novartis, used for pre-exposure and post-exposure immunization against rabies infection.",
        "introduction": {
            "General Information": {
                "Map Vaccine Preventable Diseases": "Map by disease",
                "Vaccine SmPCs (FDA, EMA, WHO, others)": "Search by disease, include combos",
                "Product profiles": "",
                "Pipeline products - summary table": "By click, TPP",
                "Failed products": ""
            },
            "Company products, pipeline": {
                "VPD-BoD, Product presentations, Monograph": "RabAvert is indicated for immunization against rabies for individuals at high risk of exposure and for post-exposure prophylaxis.",
                "Pivotal publications / data vaccines": "",
                "Interviews": "Advertorial",
                "Relevant literature": "Rabies vaccines are critical for preventing infection after potential exposure.",
                "Pipeline products - detailed information (TPP)": ""
            }
        },
        "productProfiles": [
            {
                "type": "EMA",
                "name": "RabAvert (Novartis) - Rabies Vaccine",
                "composition": "Inactivated rabies virus, grown in chick embryo cell cultures.",
                "strainCoverage": "Rabies virus strains.",
                "indication": "Pre-exposure immunization for individuals at high risk and post-exposure prophylaxis following contact with a potentially rabid animal.",
                "dosing": "Pre-exposure: 3 doses (day 0, 7, 21 or 28); Post-exposure: 5 doses (day 0, 3, 7, 14, 28).",
                "immunogenicity": "High antibody response in vaccinated individuals.",
                "efficacyEndpointsPhase3": "Prevention of rabies infection following exposure.",
                "efficacyData": "Highly effective in preventing rabies if administered promptly after exposure.",
                "durationOfProtection": "Long-lasting protection, with periodic booster doses recommended for ongoing risk.",
                "coAdministration": "Can be administered with human rabies immune globulin (HRIG) in post-exposure settings.",
                "reactogenicity": "Common side effects include injection site reactions, headache, nausea, and dizziness.",
                "safety": "Generally well tolerated, but allergic reactions and hypersensitivity may occur.",
                "vaccinationGoal": "Prevention of rabies in high-risk individuals and post-exposure prophylaxis to prevent the onset of rabies symptoms.",
                "others": "RabAvert is part of WHO's recommended regimen for rabies prevention."
            }
        ],
        "vaccineType": "Rabies vaccine.",
        "link": "https://www.gsk.com/en-gb/products/our-vaccines/rabavert/",
        "lastUpdated": "2024-Aug"
    },
    {
        "name": "Healive",
        "vaccineId": 27,
        "pathogenId": 10,
        "manufacturers": [
            {
                "manufacturerId": 10
            }
        ],
        "licensers": [
            {
                "licenserId": 197,
                "link": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3656073/"
            }
        ],
        "licensingDates": [
            {
                "name": "China",
                "type": "Initial License",
                "date": "01/2001",
                "source": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3656073/"
            },
            {
                "name": "BPOM Indonesia",
                "type": "Approval",
                "date": "02/2022",
                "source": "http://www.sinovac.com/en-us/news/id-3208"
            },
            {
                "name": "MOPH Lebanon",
                "type": "Approval",
                "date": "01/2023",
                "source": "http://www.sinovac.com/en-us/news/id-3230"
            }
        ],
        "description": "Healive is an inactivated hepatitis A vaccine developed by Sinovac Biotech for active immunization against hepatitis A virus infection.",
        "introduction": {
            "General Information": {
                "Map Vaccine Preventable Diseases": "Map by disease",
                "Vaccine SmPCs (FDA, EMA, WHO, others)": "Search by disease, include combos",
                "Product profiles": "Available via Sinovac",
                "Pipeline products - summary table": "",
                "Failed products": ""
            },
            "Company products, pipeline": {
                "VPD-BoD, Product presentations, Monograph": "Healive targets hepatitis A virus.",
                "Pivotal publications / data vaccines": "",
                "Interviews": "Sinovac resources",
                "Relevant literature": "Available from WHO and Sinovac",
                "Pipeline products - detailed information (TPP)": ""
            }
        },
        "productProfiles": [
            {
                "type": "WHO",
                "name": "Healive (Sinovac Biotech) Hepatitis A Vaccine",
                "composition": "Inactivated hepatitis A virus vaccine derived from human diploid cells.",
                "strainCoverage": "Hepatitis A virus.",
                "indication": "Active immunization for individuals aged 1 year and older to prevent hepatitis A infection.",
                "dosing": "0.5 mL intramuscular injection for children aged 1-16 years; 1.0 mL for adults.",
                "contraindication": "History of severe allergic reaction to any component of the vaccine.",
                "immunogenicity": "Demonstrates high seroconversion rates; virtually all vaccinees were seropositive one month after vaccination.",
                "efficacyEndpointsPhase3": "Efficacy assessed through prevention of hepatitis A outbreaks and seroconversion rates.",
                "efficacyData": "Provides protection against hepatitis A for at least 30 years post-immunization based on statistical modeling.",
                "durationOfProtection": "Long-term protection with a booster recommended between 6-12 months after the primary dose.",
                "coAdministration": "Can be administered with other vaccines without significant interactions.",
                "reactogenicity": "Common side effects include injection site reactions, mild fever, and fatigue, generally mild.",
                "safety": "Considered safe with a well-documented safety profile; monitored continuously for adverse effects.",
                "vaccinationGoal": "To provide individual protection against hepatitis A and contribute to public health efforts in endemic areas.",
                "others": "Healive is WHO-prequalified and has been registered in over 30 countries."
            }
        ],
        "vaccineType": "Inactivated virus vaccine.",
        "link": "https://www.sinovac.com/healive",
        "lastUpdated": "2024-Aug"
    },
    {
        "name": "Anflu",
        "vaccineId": 28,
        "pathogenId": 8,
        "manufacturers": [
            {
                "manufacturerId": 10
            }
        ],
        "licensers": [
            {
                "licenserId": 121,
                "link": "http://www.sinovac.com/en-us/news/id-320"
            }
        ],
        "licensingDates": [
            {
                "name": "Dominican Republic",
                "type": "Commercialization Approval",
                "date": "11/2022",
                "source": "http://www.sinovac.com/en-us/news/id-3204"
            }
        ],
        "description": "Anflu is a preservative-free, inactivated trivalent influenza vaccine developed by Sinovac Biotech for active immunization against seasonal influenza.",
        "introduction": {
            "General Information": {
                "Map Vaccine Preventable Diseases": "Map by disease",
                "Vaccine SmPCs (FDA, EMA, WHO, others)": "Search by disease, include combos",
                "Product profiles": "Available via Sinovac",
                "Pipeline products - summary table": "",
                "Failed products": ""
            },
            "Company products, pipeline": {
                "VPD-BoD, Product presentations, Monograph": "Anflu targets seasonal influenza virus strains.",
                "Pivotal publications / data vaccines": "",
                "Interviews": "Sinovac resources",
                "Relevant literature": "Available from WHO and Sinovac",
                "Pipeline products - detailed information (TPP)": ""
            }
        },
        "productProfiles": [
            {
                "type": "WHO",
                "name": "Anflu (Sinovac Biotech) Trivalent Influenza Vaccine",
                "composition": "Inactivated split-virus vaccine containing hemagglutinin from three influenza virus strains.",
                "strainCoverage": "H1N1, H3N2, and B virus strains.",
                "indication": "Active immunization for individuals aged 6 months and older to prevent seasonal influenza.",
                "dosing": "0.5 mL intramuscular injection; children receiving the vaccine for the first time may require two doses.",
                "contraindication": "History of severe allergic reaction to any component of the vaccine.",
                "immunogenicity": "Highly immunogenic with seroconversion rates exceeding licensure criteria in clinical trials.",
                "efficacyEndpointsPhase3": "Efficacy assessed through seroconversion rates and prevention of symptomatic influenza.",
                "efficacyData": "Demonstrates strong protection against circulating influenza strains with good safety profile.",
                "durationOfProtection": "Exact duration unknown; annual vaccination recommended due to changing virus strains.",
                "coAdministration": "Can be administered with other vaccines without significant interactions.",
                "reactogenicity": "Common side effects include injection site pain, fever, and fatigue, generally mild.",
                "safety": "Considered safe with extensive clinical experience; monitored continuously for adverse effects.",
                "vaccinationGoal": "To provide individual protection against seasonal influenza and reduce transmission in the community.",
                "others": "Over 20 million doses sold worldwide since its introduction in 2006."
            }
        ],
        "vaccineType": "Inactivated virus vaccine.",
        "link": "https://www.sinovac.com/anflu",
        "lastUpdated": "2024-Aug"
    },
    {
        "name": "Inlive",
        "vaccineId": 29,
        "pathogenId": 23,
        "manufacturers": [
            {
                "manufacturerId": 10
            }
        ],
        "licensers": [
            {
                "licenserId": 8,
                "link": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10748258/"
            },
            {
                "licenserId": 1,
                "link": "https://www.cdc.gov/mmwr/volumes/68/rr/rr6802a1.htm"
            },
            {
                "licenserId": 2,
                "link": "https://www.who.int/publications/m/item/japanese-encephalitis-vaccines-live-attenuated-annex-7-trs-no-980"
            },
            {
                "licenserId": 5,
                "link": "https://www.who.int/publications/m/item/japanese-encephalitis-vaccines-live-attenuated-annex-7-trs-no-980"
            },
            {
                "licenserId": 5,
                "link": "https://www.canada.ca/en/public-health/services/publications/healthy-living/canadian-immunization-guide-part-4-active-vaccines/page-11-japanese-encephalitis-vaccine.html"
            },
            {
                "licenserId": 23,
                "link": "https://www.shimclinic.com/singapore/japanese-encephalitis-vaccine"
            }
        ],
        "licensingDates": [
            {
                "name": "NMPA",
                "type": "Licensing Authority",
                "date": "2009",
                "source": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10748258/"
            },
            {
                "name": "FDA",
                "type": "Licensing Authority",
                "date": "03/2009",
                "source": "https://www.cdc.gov/mmwr/volumes/68/rr/rr6802a1.htm"
            },
            {
                "name": "FDA",
                "type": "Licensing Authority",
                "date": "05/2013",
                "source": "https://www.cdc.gov/vaccines/acip/recs/grade/je-child.html"
            },
            {
                "name": "EMA",
                "type": "Licensing Authority",
                "date": "03/2009",
                "source": "https://en.wikipedia.org/wiki/Japanese_encephalitis_vaccine"
            }
        ],
        "description": "Inlive is an inactivated Japanese encephalitis vaccine developed by Sinovac Biotech for active immunization against Japanese encephalitis virus infection.",
        "introduction": {
            "General Information": {
                "Map Vaccine Preventable Diseases": "Map by disease",
                "Vaccine SmPCs (FDA, EMA, WHO, others)": "Search by disease, include combos",
                "Product profiles": "Available via Sinovac",
                "Pipeline products - summary table": "",
                "Failed products": ""
            },
            "Company products, pipeline": {
                "VPD-BoD, Product presentations, Monograph": "Inlive targets Japanese encephalitis virus.",
                "Pivotal publications / data vaccines": "",
                "Interviews": "Sinovac resources",
                "Relevant literature": "Available from WHO and Sinovac",
                "Pipeline products - detailed information (TPP)": ""
            }
        },
        "productProfiles": [
            {
                "type": "WHO",
                "name": "Inlive (Sinovac Biotech) Japanese Encephalitis Vaccine",
                "composition": "Inactivated Japanese encephalitis virus vaccine derived from Vero cells.",
                "strainCoverage": "Japanese encephalitis virus.",
                "indication": "Active immunization for individuals aged 12 months and older to prevent Japanese encephalitis.",
                "dosing": "0.5 mL intramuscular injection. Administered as a two-dose primary series followed by booster doses as needed.",
                "contraindication": "History of severe allergic reaction to any component of the vaccine.",
                "immunogenicity": "Induces protective levels of neutralizing antibodies against Japanese encephalitis virus.",
                "efficacyEndpointsPhase3": "Efficacy assessed through prevention of Japanese encephalitis cases and seroconversion rates.",
                "efficacyData": "Demonstrates high efficacy in preventing Japanese encephalitis in endemic areas.",
                "durationOfProtection": "Exact duration unknown; booster doses are recommended based on epidemiological and immunological factors.",
                "coAdministration": "Can be administered with other vaccines without significant interactions.",
                "reactogenicity": "Common side effects include injection site reactions, fever, and headache, generally mild.",
                "safety": "Considered safe with a well-documented safety profile; monitored continuously for adverse effects.",
                "vaccinationGoal": "To provide individual protection against Japanese encephalitis and reduce the burden of disease in endemic regions.",
                "others": "Inlive is WHO-prequalified and has been used in national immunization programs in several countries."
            }
        ],
        "vaccineType": "Live attenuated vaccine.",
        "link": "https://www.sinovac.com/inlive",
        "lastUpdated": "2024-Aug"
    },
    {
        "name": "PVRV",
        "vaccineId": 30,
        "pathogenId": 20,
        "manufacturers": [
            {
                "manufacturerId": 10
            }
        ],
        "licensers": [
            {
                "licenserId": 8,
                "source": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10627063/"
            },
            {
                "licenserId": 1,
                "source": "https://www.cdc.gov/mmwr/volumes/68/rr/rr6802a1.htm"
            },
            {
                "licenserId": 6,
                "source": "https://www.tga.gov.au/sites/default/files/2023-05/auspar-verorab-230427.pdf"
            }
        ],
        "licensingDates": [
            {
                "name": "WHO",
                "type": "Pre- and Post-Exposure Prophylaxis",
                "date": "2014",
                "source": "https://www.who.int/docs/default-source/searo/india/health-topic-pdf/pep-prophylaxis-guideline-15-12-2014.pdf?sfvrsn=8619bec3_2"
            },
            {
                "name": "TGA",
                "type": "Pre- and Post-Exposure Prophylaxis",
                "date": "27/04/2023",
                "source": "https://www.tga.gov.au/sites/default/files/2023-05/auspar-verorab-230427.pdf"
            },
            {
                "name": "NMPA",
                "type": "Pre- and Post-Exposure Prophylaxis",
                "date": "2005",
                "source": "https://journals.plos.org/plosntds/article?id=10.1371/journal.pntd.0003412"
            }
        ],
        "description": "PVRV (Purified Vero Cell Rabies Vaccine) is an inactivated rabies vaccine developed for pre-exposure and post-exposure prophylaxis against rabies.",
        "introduction": {
            "General Information": {
                "Map Vaccine Preventable Diseases": "Map by disease",
                "Vaccine SmPCs (FDA, EMA, WHO, others)": "Search by disease, include combos",
                "Product profiles": "Available via Sanofi Pasteur",
                "Pipeline products - summary table": "",
                "Failed products": ""
            },
            "Company products, pipeline": {
                "VPD-BoD, Product presentations, Monograph": "PVRV targets rabies virus.",
                "Pivotal publications / data vaccines": "",
                "Interviews": "Sanofi Pasteur resources",
                "Relevant literature": "Available from WHO and CDC",
                "Pipeline products - detailed information (TPP)": ""
            }
        },
        "productProfiles": [
            {
                "type": "WHO",
                "name": "PVRV (Verorab) Inactivated Rabies Vaccine",
                "composition": "Inactivated rabies virus vaccine produced using Vero cells.",
                "strainCoverage": "Rabies virus.",
                "indication": "Active immunization for individuals at risk of rabies exposure, including pre-exposure prophylaxis (PrEP) and post-exposure prophylaxis (PEP).",
                "dosing": "0.5 mL intramuscular injection; typically administered as a three-dose series for PrEP on days 0, 7, and 21-28.",
                "contraindication": "History of severe allergic reaction to any component of the vaccine.",
                "immunogenicity": "Demonstrates high seroconversion rates with neutralizing antibodies against rabies virus.",
                "efficacyEndpointsPhase3": "Efficacy assessed through prevention of rabies infection and seroconversion rates.",
                "efficacyData": "Shows comparable efficacy to other rabies vaccines like HDCV and PCECV for both PrEP and PEP.",
                "durationOfProtection": "Exact duration unknown; booster doses recommended for continued protection based on exposure risk.",
                "coAdministration": "Can be administered with other vaccines without significant interactions.",
                "reactogenicity": "Common side effects include mild fever and injection site reactions, generally well tolerated.",
                "safety": "Considered safe with a well-documented safety profile; monitored continuously for adverse effects.",
                "vaccinationGoal": "To provide individual protection against rabies and reduce the incidence of the disease in high-risk populations.",
                "others": "PVRV has been used since 1985 and is recommended by WHO for rabies prevention."
            }
        ],
        "vaccineType": "Inactivated virus vaccine.",
        "link": "https://www.sinovac.com/pvrv",
        "lastUpdated": "2024-Aug"
    },
]

export const getAvailableLicensingByVaccineName = (name, licenserArr) => {

};