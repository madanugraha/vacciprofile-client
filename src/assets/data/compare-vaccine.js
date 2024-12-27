const titleSeparator = [
    'Composition/Platform',
    'Strain coverage',
    'Indication',
    'Dosing',
    'Contraindication',
    'Immunogenicity',
    'Efficacy',
    'Duration of protection',
    'Co-Administration',
    'Reactogenicity',
    'Safety',
    'Vaccination Goal',
    'Others',
    'Approval Date',
    'Date last updated',
    'Pre-Qualification Date',
    'Remark',
    'PFU',
    'VZV',
    'HZ',
    'PHN',
    'PPD',
    'IC',
    'rDNA',
    'VZIg',
    'Ig',
    'CoP',
    'immunocompromised',
    'Recombinant DNA',
    'CHO',
    'CFU',
];


const dataCompare = [
    {
        name: "Varicella",
        manufactureName: "Zostavax",
        licensers: [
            {
                name: "EMA",
                profile: `
                EMA-Product Profile: Zostavax® (MAH: MSD)Powder and solvent as a suspension for injection; shingles (herpes zoster) vaccine (Live, attenuated)           
Composition/Platform
1 dose (0.65 mL) contains VZV (Oka/Merck strain) not less than 19,400 PFU; produced in human diploid (MRC-5) cells; storage: 2-8°C; shelf life: 18 mo.
Strain coverage
Varicella zoster virus.
Indication
Prevention of herpes zoster (“zoster” or shingles) and herpes zoster-related post-herpetic neuralgia in individuals ≥50 yrs. To be used based on official recommendations (not indicated for treatment of zoster or PHN).
Dosing
Single dose (0.65mL); I.M. (S.C. in coagulation disorder).
Contraindication
Hypersensitivity; immunocompromised patients; active untreated tuberculosis; pregnancy (avoid pregnancy 1 mo. after vaccine); moderate to severe acute febrile disease or infection; limited data in breast-feeding (use risk/benefit strategy)
Immunogenicity
Zostavax elicited significantly higher VZV-specific immune responses 6 wks. post-vaccination than placebo; The VZV-specific immune responses 4 wks. post-vaccination were comparable whether administered by S.C. or I.M. route.
Efficacy (VEy) / Effectiveness (VEs)
VEy in 50-59 yrs., S.C., 2 yrs. f/u: 70%(95%CI: 54; 81); VEy in ≥60 yrs, S.C., 4.9 yrs. f/u: 51%(95%CI: 44; 58) against HZ, 67%(95%CI: 48; 79) against PHN;
VEs against HZ in ≥50 yrs: 54%(95%CI: 53; 55), 3 yrs. f/u; 48%(95%CI: 47; 49), 5 yrs. f/u; 42%(95%CI: 40; 43), 8 yrs. f/u; 38%(95%CI: 37; 40), 10 yrs. f/u; VEs against PHN in ≥50 yrs: 72%(95%CI: 68; 75), 3 yrs. f/u; 67%(95%CI: 64; 70), 5 yrs. f/u; 61%(95%CI: 58; 65), 8 yrs. f/u.
Duration of protection
Inadequate data are available; VEy after 4-7 yrs. f/u: 40% (95%CI: 18; 56) against HZ, 60%(95%CI: -10; 87) against PHN; VEy after 7-10 yrs. f/u: 21%(95%CI: 11; 30) against HZ, 35%(95%CI: 9; 56) against PHN.
Co-Administration
Can be co-administered with inactivated influenza vaccine and PPV23; no data to assess the concomitant use with anti-viral medications known to be effective against VZV.
Reactogenicity
Very common: injection site erythema, pain/tenderness, pruritus, and swelling; common: injection site induration, hematoma, warmth, rash, pyrexia, headache, extremity pain, arthralgia, and myalgia.
Safety 
No safety signals to date.
Vaccination Goal
Individual protection.
Others
No data in children and adolescents; no protection against primary varicella infection (Chickenpox); limited data on the risk of virus transmission by vaccinees (caution in susceptible close contacts).
Approval Date
19/05/2006 
Date last updated
01/07/2022 Zostavax | EMA
PFU
Plaque-forming units
VZV
Varicella Zoster Virus
HZ
Herpes zoster 
PHN
Post-herpetic neuralgia
`
            },
            {
                name: 'FDA',
                profile: `
                FDA-Product Profile: Zostavax® (MAH: MSD)Powder and solvent as a suspension for injection; shingles (herpes zoster) vaccine (Live, attenuated)
Composition/Platform
1 dose (0.65 mL) contains VZV (Oka/Merck strain) not less than 19,400 PFU; produced in human diploid (MRC-5) cells; storage: in freezer (-50 to -15°C) or refrigerator (2-8°C); shelf life: 72 hours in refrigerator, 30 minutes in room temperature.
Strain coverage
Varicella zoster virus.
Indication
Prevention of herpes zoster (“zoster” or shingles) and herpes zoster-related post-herpetic neuralgia in individuals ≥50 yrs. To be used based on official recommendations (not indicated for treatment of zoster or PHN).
Dosing
Single dose (0.65 mL); S.C.
Contraindication
Hypersensitivity; immunocompromised individuals; active untreated tuberculosis; pregnancy (avoid pregnancy 1 mo. after vaccine); acute febrile disease or infection; limited data in breast-feeding (use risk/benefit strategy)
Immunogenicity
Zostavax elicited significantly higher VZV-specific immune responses 6 weeks post-vaccination than placebo.
Efficacy (VEy) / Effectiveness (VEs)
VEy in 50-59 yrs., S.C., 2 yrs. f/u: 70%(95%CI: 54; 81); VEy in ≥60 yrs, S.C., 4.9 yrs. f/u: 51%(95%CI: 44; 58) against HZ, 39%(95%CI: 7; 59) against PHN;
VEs against HZ, 5 yrs. f/u: 34% (95%CI: 25; 42) in 60-69 yrs., 29% (95%CI: 18; 38) in 70-79 yrs., 36% (95%CI: 12; 53) in ≥80; VEs against PHN, 5 yrs. f/u: 61% (95% CI: 33, 77) in 60-69 yrs., 69% (95% CI: 44, 82) in 70-79 yrs., and 34% (95% CI: -49, 71) in ≥80.
Duration of protection
Inadequate data are available.
Co-Administration
Can be co-administered with inactivated influenza vaccine; reduced immune response in concomitant use with PPV23 (administered 4 weeks apart); no data to assess the concomitant use with anti-viral medications known to be effective against VZV.
Reactogenicity
Headache, injection-site reactions.
Safety 
No safety signals to date.
Vaccination Goal
Individual protection.
Others
No data in children and adolescents; no protection against primary varicella infection (Chickenpox).
Approval Date: 15/03/2017, 
Date last updated: 21/02/2019, Zostavax | FDA
PFU: 
Plaque-forming units
VZV: 
Varicella Zoster Virus
HZ: 
Herpes zoster 
PHN: 
Post-herpetic neuralgia
                `
            },
            {
                name: 'WHO',
                profile: `
                WHO-Product Profile: Zostavax® (MAH: MSD)
                No License Yet.`
            }
        ]
    },
    {
        name: "Varicella",
        manufactureName: "Varivax",
        licensers: [
            {
                name: "EMA",
                profile: `
                EMA-Product Profile: Varivax® (MAH: MSD)              
No License Yet.`
            },
            {
                name: "FDA",
                profile: `
                FDA-Product Profile: Varivax® (MAH: MSD)Suspension for injection; varicella virus vaccine (Live, attenuated)           
Composition/Platform
1 dose (0.5mL) contains VZV (Oka/SK strain) ≥1,350 PFU; produced in human diploid (MRC-5) cells; storage: in freezer (-50 to -15°C) or in refrigerator (2 to 8°C); shelf life: 2 years in the refrigerator or 72 hours in the refrigerator for the frozen type.
Strain coverage
Varicella zoster virus.
Indication
Prevention of varicella in individuals ≥ 1 year. To be used based on official recommendations. 
Dosing
I.M. or S.C.; each dose is 0.5mL; 1-12yrs.: 2 doses, 12-15mo., 4-6yrs.; ≥13yrs.: 2 doses, at least 4-week intervals.
Contraindication
Hypersensitivity; immunocompromised patients (can be used in HIV-infected patients); active untreated tuberculosis; pregnancy (avoid pregnancy 3 mo. after vaccine); moderate to severe acute febrile disease or infection (>38.5°C ); limited data in breast-feeding (use risk/benefits strategy).
Immunogenicity
Percentage of seroresponders: 12 mo.- 12 yrs. (1 dose): 97-98.9%, 4-6 wks. f/u; 12 mo.- 12 yrs. (2 doses): 99.9%; ≥13yrs. (2 doses): 99%, 4 wks. f/u.
Efficacy (VEy)
1-14 yrs. (1 dose, S.C.): 96-100% against varicella, 2 yrs. f/u; 1-12 yrs. (1 dose): 94% (95%CI: 93; 96), 10 yrs. f/u; 12 mo. -12 yrs. (2 doses): 98%, 10 yrs. f/u; adolescents and adults (2 doses): 80-100%, 6 yrs. f/u.
Duration of protection
Unknown; immunogenicity studies indicate antibody persistence for up to 10 yrs. 
Co-Administration
Can be co-administered with MMR, DTaP, OPV, Hib, HBV, and other live viral vaccines (if not given concurrently, at least 1 mo. Interval and for ≥12yrs. at least 3 mo. interval); avoid co-administration with (VZIg); avoid using salicylate for 6 weeks in 1-17 yrs. (Reye’s syndrome risk); an interval if blood, plasma, Ig, or VZIg received; at least 3 mo. interval between varicella-containing vaccine and VARIVAX. 
Reactogenicity
Very common: 1-12yrs: fever ≥38.9°C (14.7%), injection site reactions (19.3%); ≥13yrs: fever ≥37.8°C (10.2%), injection-site reactions (24.4%).
Safety 
No safety signals to date.
Vaccination Goal
Individual protection; outbreak control.
Others
No safety/efficacy data in <1yrs.; limited data in ≥65yrs.; vaccinees should avoid close contact with highly susceptible individuals* for 6 weeks; may result in a temporary depression of PPD tuberculin test (use the test on the same day, or at least 4 weeks following vaccination).
Approval Date: 
17/03/1995, 
Date last updated: 
21/08/2023, Varivax | FDA
Remark:
Highly susceptible individuals: Immunocompromised patients, pregnant women without a history of chickenpox or evidence of infection based on clinical test results, newborns of women without a history of chickenpox or evidence of infection based on clinical test results, all newborn infants born at <28 weeks' gestation regardless of maternal varicella immunity. 
PPD: 
purified protein derivative
PFU: 
Plaque-forming units
VZV: 
Varicella Zoster Virus
Ig: 
Immunoglobulin
VZIg: 
Varicella Zoster Immunoglobulin`
            },
            {
                name: 'WHO',
                profile: `
                WHO-Product Profile: Varivax® (MAH: MSD)Suspension for injection; varicella virus vaccine (Live, attenuated)
Composition/Platform
1 dose (0.5mL) contains VZV (Oka/SK strain) ≥1,350 PFU; produced in human diploid (MRC-5) cells; storage: in freezer (-50 to -15°C) or in refrigerator (2 to 8°C); shelf life: 2 years in the refrigerator or 72 hours in the refrigerator for the frozen type.
Strain coverage
Varicella zoster virus.
Indication
Prevention of varicella in individuals ≥ 1 year. To be used based on official recommendations. 
Dosing
I.M. or S.C.; each dose is 0.5mL; 1-12yrs.: 2 doses, 12-15mo., 4-6yrs.; ≥13yrs.: 2 doses, at least 4-week intervals.
Contraindication
Hypersensitivity; immunocompromised patients (can be used in HIV-infected patients); active untreated tuberculosis; pregnancy (avoid pregnancy 3 mo. after vaccine); moderate to severe acute febrile disease or infection (>38.5°C ); limited data in breast-feeding (use risk/benefits strategy).
Immunogenicity
Percentage of seroresponders: 12 mo.- 12 yrs. (1 dose): 97-98.9%, 4-6 wks. f/u; 12 mo.- 12 yrs. (2 doses): 99.9%; ≥13yrs. (2 doses): 99%, 4 wks. f/u.
Efficacy (VEy)
1-14 yrs. (1 dose, S.C.): 96-100% against varicella, 2 yrs. f/u; 1-12 yrs. (1 dose): 94% (95%CI: 93; 96), 10 yrs. f/u; 12 mo. -12 yrs. (2 doses): 98%, 10 yrs. f/u; adolescents and adults (2 doses): 80-100%, 6 yrs. f/u.
Duration of protection
Unknown; immunogenicity studies indicate antibody persistence for up to 10 yrs. 
Co-Administration
Can be co-administered with MMR, DTaP, OPV, Hib, HBV, and other live viral vaccines (if not given concurrently, at least 1 mo. Interval and for ≥12yrs. at least 3 mo. interval); avoid co-administration with (VZIg); avoid using salicylate for 6 weeks in 1-17 yrs. (Reye’s syndrome risk); an interval if blood, plasma, Ig, or VZIg received; at least 3 mo. interval between varicella-containing vaccine and VARIVAX. 
Reactogenicity
Very common: 1-12yrs: fever ≥38.9°C (14.7%), injection site reactions (19.3%); ≥13yrs: fever ≥37.8°C (10.2%), injection-site reactions (24.4%).
Safety 
No safety signals to date.
Vaccination Goal
Individual protection; outbreak control.
Others
No safety/efficacy data in <1yrs.; limited data in ≥65yrs.; vaccinees should avoid close contact with highly susceptible individuals* for 6 weeks; may result in a temporary depression of PPD tuberculin test (use the test on the same day, or at least 4 weeks following vaccination).
Pre-Qualification Date: 
09/02/2018, Varivax | WHO
Remark:
Highly susceptible individuals: Immunocompromised patients, pregnant women without history of chickenpox or evidence of infection based on clinical test results, newborns od women without history of chickenpox or evidence of infection based on clinical test results, all newborn infants born at <28 weeks' gestation regardless of maternal varicella immunity. 
PPD: 
purified protein derivative
PFU: 
Plaque-forming units
VZV: 
Varicella Zoster Virus
Ig: 
Immunoglobulin
VZIg: 
Varicella Zoster Immunoglobulin`
            }
        ]
    },
    {
        name: 'Varicella',
        manufactureName: 'Varicella Vaccine, Live®',
        licensers: [
            {
                name: 'EMA',
                profile: `
                EMA-Product Profile: Varicella Vaccine, Live® (MAH: SINOVAC)              
                No License Yet.`
            },
            {
                name: 'FDA',
                profile: `
                FDA-Product Profile: Varicella Vaccine, Live® (MAH: SINOVAC)              
No License Yet.`
            },
            {
                name: 'WHO',
                profile: `
                WHO-Product Profile: Varicella Vaccine, Live® (MAH: SINOVAC)Suspension for injection; varicella virus vaccine (Live, attenuated)           
Composition/Platform
1 dose (0.5 mL) contains VZV (Oka strain) no less than 3.3 PFU; produced in human diploid (SV-1) cells; storage: 2-8°C; shelf life: 2 years.
Strain coverage
Varicella zoster virus.
Indication
Active immunization for prevention of varicella in 1-12yrs. To be used based on official recommendations.
Dosing
Single dose; 0.5mL; S.C.; single booster dose is needed.
Contraindication
Hypersensitivity; pregnancy (avoid pregnancy 3 mo. after vaccine); acute illness, severe chronic diseases, acute stage of a chronic disease or febrile illness; cardiogenic reaction with similar vaccines; precaution in individuals with history or family history of convulsions, chronic diseases, epilepsy, allergic constitution, or lactating women (administration under the guidance of doctors).
Immunogenicity
Percentage of seroresponders: 1- 12 yrs.: 94.27% (95%CI: 91.29; 96.46).
Efficacy (VEy)
VEy against VZV infection in 1-12 yrs.: 87.1% (95%CI: 69.7; 94.5), 6 mo. f/u.
Duration of protection
Unknown.
Co-Administration
Avoid using salicylate for 6 weeks (Reye’s syndrome risk); an interval of at least 3 mo. after receiving Ig or VZIg received; avoid use with other live vaccines (at least 1mo. interval).
Reactogenicity
Very common: fever (13.95%); uncommon: diarrhea, cough, nausea/vomiting, headache, fatigue/malaise, allergic reaction, rhinorrhea, redness, pain, swelling, rash, and itching.
Safety 
No safety signals to date.
Vaccination Goal
Individual protection; outbreak control.
Others
Because of the risk of transmission, vaccinees especially those who develop a varicella-like rash 2-3 weeks after vaccination should avoid close contact with highly susceptible individuals*; not recommended during an epidemic of varicella.
Pre-Qualification Date: 
03/11/2022, Varicella Vaccine, Live | WHO
Remark:
Highly susceptible individuals: Pregnant women (in particular, pregnant women during the first three months of pregnancy), leukemia patients susceptible to severe varicella, and individuals receiving immunosuppressive therapy.
PFU: 
Plaque-forming units
VZV: 
Varicella Zoster Virus
Ig: 
Immunoglobulin
VZIg: 
Varicella Zoster Immunoglobulin`
            }
        ]
    },
    {
        name: 'Varicella',
        manufactureName: 'SKYVaricella Inj®',
        licensers: [
            {
                name: 'EMA',
                profile: `
                EMA-Product Profile: SKYVaricella Inj® (MAH: SK Bioscience)              
No License Yet.`
            },
            {
                name: 'FDA',
                profile: `
                FDA-Product Profile: SKYVaricella Inj® (MAH: SK Bioscience)              
No License Yet.`
            },
            {
                name: 'WHO',
                profile: `
                WHO-Product Profile: SKYVaricella Inj® (MAH: SK Bioscience)Powder and solvent as a suspension for injection; varicella virus vaccine (Live, attenuated)           
Composition/Platform
1 dose (0.5 mL) contains VZV (Oka/SK strain) no less than 2,400 PFU; produced in human diploid cells (MRC-5); storage: 2-8°C; shelf life: 2 years.
Strain coverage
Varicella zoster virus.
Indication
Prevention of varicella in children 1-12 years. To be used based on official recommendations (not indicated for treatment of zoster or PHN).
Dosing
Single dose (0.5mL); S.C.
Contraindication
Hypersensitivity; immunocompromised patients; active untreated tuberculosis; pregnancy (avoid pregnancy 3 mo. after vaccine); acute febrile disease or infection; limited data in breast-feeding (caution).
Immunogenicity
Percentage of seroresponders: 1-12 yrs.: 99.53% (95%CI: 97.40; 99.99)
Efficacy (VEy)
No efficacy data is available in the label; immunogenicity as above.
Duration of protection
Unknown.
Co-Administration
Avoid using Ig or VZIg (at least 3-11 mo. before or 2 mo. after vaccination unless benefit>risk); avoid using salicylate for 6 weeks (Reye’s syndrome risk); an interval of 3-11 mo. after blood or plasma transfusion should be considered; do not use with other live vaccines (at least 28 days interval).
Reactogenicity
Very common: injection site erythema (32.6%), pain/tenderness (20.3%), swelling/induration (15.5%), or irritation (11.9%), fatigue (12.9%).
Safety 
No safety signals to date.
Vaccination Goal
Individual protection; outbreak control.
Others
no safety/efficacy data in <1yrs.; vaccinees should avoid close contact with highly susceptible individuals* for 6 weeks due to the risk of transmission.
Pre-Qualification Date: 
09/12/2019, SKYVaricella Inj | WHO
Remark:
Highly susceptible individuals: Immunocompromised patients, pregnant women without a history of chickenpox or evidence of infection based on clinical test results, newborns of women without a history of chickenpox or evidence of infection based on clinical test results.
PFU: 
Plaque-forming units
VZV: 
Varicella Zoster Virus
PHN: 
Post-herpetic neuralgia
Ig: 
Immunoglobulin
VZIg: 
Varicella Zoster Immunoglobulin`
            }
        ]
    },
    {
        name: 'Varicella',
        manufactureName: 'BARYCELA inj®',
        licensers: [
            {
                name: 'EMA',
                profile: `
                EMA-Product Profile: BARYCELA inj® (MAH: GC Biopharma)              
No License Yet.`
            },
            {
                name: 'FDA',
                profile: `
                FDA-Product Profile: BARYCELA inj® (MAH: GC Biopharma)              
No License Yet.`,
            },
            {
                name: 'WHO',
                profile: `
                WHO-Product Profile: BARYCELA inj® (MAH: GC Biopharma)Powder and solvent as a suspension for injection; varicella vaccine (Live, attenuated)           
Composition/Platform
1 dose (0.5 mL) contains VZV (MAV/06 strain) no less than 3,800 PFU; produced in human diploid cells (MRC-5); storage: 2-8°C; shelf life: 2 years.
Strain coverage
Varicella zoster virus.
Indication
Prevention of varicella in children 1-12 years. To be used based on official recommendations (not indicated for treatment of zoster or PHN).
Dosing
Single dose; S.C.
Contraindication
Hypersensitivity; Immunocompromised patients; active untreated tuberculosis; pregnancy (avoid pregnancy 3 mo. after vaccine); acute febrile disease or infection, limited data in breast-feeding (caution)
Immunogenicity
Percentage of seroresponders: 1-12 yrs: 97.91% (95%CI: 95.19; 99.32)
Efficacy (VEy)
No efficacy data is available; immunogenicity as above.
Duration of protection
Unknown.
Co-Administration
Avoid using Ig or VZIg (at least 3-11 mo. before or 2 mo. after vaccination unless benefit>risk); avoid using salicylate for 6 weeks (Reye’s syndrome risk); an interval of 3-11 mo. after blood or plasma transfusion should be considered.
Reactogenicity
Very common: injection site erythema (23.1%), and pain (21.7%)/tenderness (21.1%), cough (13.6%); common: injection site pruritus (3.9%),
swelling (3.1%), and induration (9.5%), urticaria (1.4%), fever (9.9%), loss of appetite (8.5%), rash (4.8%), nausea/vomiting (5.2%), headache (3.9%), constipation (3.9%), abdominal pain (2.9%), dyspnea (2.4%), fatigue (2.1%), allergy(1.9%), hypersensitivity (1%).
Safety 
No safety signals to date.
Vaccination Goal
Individual protection; outbreak control.
Others
No safety and efficacy data in <1yrs.; vaccinees should avoid close contact with highly susceptible individuals* for 6 weeks due to the risk of transmission.
Pre-Qualification Date: 
14/02/2023, BARYCELA inj | WHO
Remark:
Highly susceptible individuals: Immunocompromised patients, pregnant women without a history of chickenpox or evidence of infection based on clinical test results, newborns of women without a history of chickenpox or evidence of infection based on clinical test results.
PFU: 
Plaque-forming units
VZV: 
Varicella Zoster Virus
PHN: 
Post-herpetic neuralgia
Ig: 
Immunoglobulin
VZIg: 
Varicella Zoster Immunoglobulin`
            }
        ]
    },
    {
        name: 'Varicella',
        manufactureName: 'Shingrix®',
        licensers: [
            {
                name: 'EMA',
                profile: `
                EMA-Product Profile: Shingrix® (MAH: GSK)Powder as a suspension for injection; herpes zoster vaccine (Recombinant, AS01B adjuvanted)           
Composition/Platform
1 dose (0.5mL) contains 50µg VZV glycoprotein E; produced in CHO cells by rDNA technology; storage: 2-8°C; shelf life: 3 years.
Strain coverage
Varicella zoster virus.
Indication
Prevention of herpes zoster and post-herpetic neuralgia in ≥50 yrs. and ≥18 yrs. at increased risk of HZ. To be used based on official recommendations (not indicated for treatment of zoster or post-herpetic neuralgia).
Dosing
I.M.; 2 doses (0.5mL each); 0, 2-6mo.; immunocompromised individuals, and those who would benefit from a shorter vaccination schedule: 0, 1-2mo.
Contraindication
Hypersensitivity; acute severe febrile disease; precaution in coagulation disorder; no data in pregnancy (avoid to use); no data in breastfeeding; limited data in individuals with a history of HZ (use risk/benefit strategy).
Immunogenicity
Unknown immunological CoP.
Efficacy (VEy)
VEy against HZ: ≥50 yrs.: 97.2%(95%CI: 93.7; 99.0), 4 yrs. f/u; ≥70 yrs.: 91.3%(95%CI: 86.8; 94.5), 4 yrs. f/u; ≥18 yrs. and immunocompromised: 68.2%(95%CI: 55.5; 77.6), 50 mo. f/u; VEy against post-herpetic neuralgia: ≥50 yrs.: 100%(95%CI: 77.1; 100), 4 yrs. f/u; ≥70 yrs.: 88.8%(95%CI: 68.7; 97.1), 4 yrs. f/u; ≥18 yrs. and immunocompromised: 89.3%(95%CI: 22.5; 99.8), 50 mo. f/u; VEy against HZ-related complications* (other than PHN): ≥50 yrs.: 93.7%(95%CI: 59.5; 99.9), 4 yrs. f/u; ≥70 yrs.: 91.6%(95%CI: 43.3; 99.8), 4 yrs. f/u; ≥18 yrs. and immunocompromised: 77.8%(95%CI: 19.0; 96.0), 50 mo. f/u.
Duration of protection
duration beyond 4 yrs. under investigation; VEy against HZ in ≥ 50 yrs. was 93.1%(95%CI: 81.2; 98.2) and in ≥70 yrs. was 87.9%(95%CI: 73.3; 95.4), 4 yrs. after vaccination.
Co-Administration
Can be administered concomitantly with inactivated influenza vaccine, PPV23, PCV13, Tdap, and COVID-19 mRNA vaccines. 
Reactogenicity
Injection site pain (68.1%), myalgia (32.9%), fatigue (32.2%), and headache (26.3%).
Safety 
Syncope/fainting as a psychogenic response to the needle injection reported very rarely accompanied by transient visual disturbance, paraesthesia, and tonic-clonic movements during recovery; increased risk of GBS was observed during the 42 days following vaccination (phase 4 data; insufficient to establish a causal relationship); limited safety data in 18-49 yrs. at increased risk of HZ who are not IC.
Vaccination Goal
Individual protection.
Others
No data for children and adolescents; no protection against primary varicella infection (chickenpox); can be given in the same schedule in previously vaccinated individuals with live attenuated HZ vaccine; no safety/immunogenicity/efficacy data to support mixed regimen with other HZ vaccine.
Approval Date: 
21/03/2018, Date last updated: 
05/12/2023, Shingrix | EMA
VZV: 
Varicella Zoster Virus
HZ: 
Herpes zoster 
PHN: 
Post-herpetic neuralgia
IC: 
immunocompromised
rDNA: 
Recombinant DNA
HZ-related complications: HZ vasculitis, disseminated disease, ophthalmic disease, neurologic disease including stroke, and visceral disease.
CoP: 
Correlate of protection
CHO: 
Chinese hamster ovary`
            },
            {
                name: 'FDA',
                profile: `
                FDA-Product Profile: Shingrix® (MAH: GSK)Powder as a suspension for injection; herpes zoster vaccine (Recombinant, AS01 adjuvanted)
Composition/Platform
1 dose (0.5mL) contains 50µg VZV glycoprotein E; produced in CHO cells by rDNA technology; storage: 2-8°C; shelf life: 3 years.
Strain coverage
Varicella zoster virus.
Indication
Prevention of herpes zoster and post-herpetic neuralgia in ≥50 yrs. and ≥18 yrs. at increased risk of HZ due to immunodeficiency. To be used based on official recommendations.
Dosing
I.M.; 2 doses (0.5 mL each); 0, 2-6mo.; immunocompromised individuals, and those who would benefit from a shorter vaccination schedule: 0, 1-2mo.
Contraindication
Hypersensitivity; limited data in pregnancy; no data in breastfeeding (use risk/benefit strategy).
Immunogenicity
VEy against HZ: ≥50 yrs.: 97.2%(95%CI: 93.7; 99.0);
Efficacy (VEy)
VEy against HZ: ≥50 yrs.: 97.2%(95%CI: 93.7; 99.0), 4 yrs. f/u; ≥70 yrs.: 89.8%(95%CI: 84.3; 93.7), 4 yrs. f/u; ≥18 yrs. and immunocompromised: 68.2%(95%CI: 55.5; 77.6), 50 mo. f/u; VEy against post-herpetic neuralgia: ≥50 yrs.: 100%; ≥70 yrs.: 85.5%(95%CI: 58.5; 96.3), 4 yrs. f/u; ≥18 yrs. and immunocompromised: 89.3%(95%CI: 22.5; 99.8), 50 mo. f/u.
Duration of protection
Unknown immunological CoP.
Co-Administration
Can be co-administered with quadrivalent influenza vaccine, PPV23, PCV13, and Tdap; no evidence for interference in the immune response to SHINGRIX® in subjects previously vaccinated with ZOSTAVAX®. 
Reactogenicity
≥50 yrs: injection site pain (78%), redness (38%), and swelling (26%), myalgia (45%), fatigue (45%), headache (38%), shivering (27%), fever (21%), and gastrointestinal symptoms (17%); ≥18 yrs. and immunocompromised: injection site pain (83-88%), redness (30-35%), and swelling 18-21%), fatigue (54-64%), myalgia (52-58%), headache (30-44%), gastrointestinal symptoms (21-28%), shivering (25-31%), and fever (18-28%). 
Safety 
Syncope/fainting as a psychogenic response to the needle injection reported very rarely accompanied by transient visual disturbance, paraesthesia, and tonic-clonic movements during recovery; increased risk of GBS was observed during the 42 days following vaccination (phase 4 data; insufficient to establish a causal relationship).
Vaccination Goal
Individual protection.
Others
No data in ≤ 18yrs.; not protection against primary varicella infection (chickenpox).
Approval Date: 
20/10/2017, 
Date last updated: 
22/05/2023, Shingrix | FDA
VZV: 
Varicella Zoster Virus
HZ: 
Herpes zoster 
PHN: 
Post-herpetic neuralgia
IC: 
immunocompromised
GBS: 
Guillain-Barré Syndrome 
rDNA: 
Recombinant DNA
CHO: 
Chinese hamster ovary
ZOSTAVAX®: Live zoster vaccine manufactured by MSD.`
            },
            {
                name: 'WHO',
                profile: `
                WHO-Product Profile: Shingrix® (MAH: GSK)              
No License Yet.
                `
            }
        ]
    },
    {
        name: 'Tuberculosis',
        manufactureName: 'BCG vaccine (Serum Institute of India)',
        licensers: [
            {
                name: 'EMA',
                profile: `
                EMA-Product Profile: BCG vaccine® (MAH: Serum Institute of India)
No License Yet.
1`
            },
            {
                name: 'FDA',
                profile: `
                FDA-Product Profile: BCG vaccine® (MAH: Serum Institute of India)
No License Yet.`
            },
            {
                name: 'WHO',
                profile: `
                WHO-Product Profile: BCG vaccine® (MAH: Serum Institute of India)Powder and solution as a suspension for intradermal injection; Bacillus Calmette-Guerin vaccine; BCG (Live, attenuated)
Composition/Platform
Each vial (0.1mL) contains 2-8 x 105 CFU of BCG (Moscow strain 361- I); storage: 2-8°C (protected from direct sunlight); shelf life: 2 years.
Strain coverage
Mycobacterium tuberculosis.
Indication
Active immunization to prevent tuberculosis in all infants at risk of early exposure to the disease and in high-risk groups (hospital personnel and tuberculin-negative contacts of known tuberculosis cases) in countries with low prevalence of tuberculosis; to be used based on official recommendations.
Dosing
I.D; < 1 yr.: each dose is 0.05ml; > 1 yr.: each dose is 0.1mL; as soon as possible after birth. 
Contraindication
Immunodeficiency*; pregnancy; avoid revaccination in children with history of keloid or lupoid reactions; children of HIV+ mothers (avoid vaccination until seronegativity is confirmed by western blot with support of other techniques after 9 mo. of age); breastfeeding can continue despite vaccination
Immunogenicity
No data in the label.
Efficacy (VEy)
No data in the label.
Duration of protection
No data in the label.
Co-Administration
Can be co-administered with DTP, DT, TT, measles, OPV, IPV, HBV, Hib, and yellow fever vaccines and vitamin A supplementation.
Reactogenicity
Injection site induration, ulceration; satellite adenitis; abscess; lupus vulgaris.
Safety 
Risk of generalized reaction to BCG in immunosuppressed individuals vaccinated with BCG or living in contact with a vaccinated individual.
Vaccination Goal
Individual protection.
Others
Skin testing with tuberculin is not generally carried out before giving BCG, but when performed, those who are found to be positive reactors do not need to be immunized; BCG administration early in life provides a high level of protection particularly against severe forms of childhood tuberculosis and tubercular meningitis; in chronic eczema or other dermatological disease, the vaccine can be given in a healthy area of the skin; this vaccine is resistant to pyrazinamide; Neither absence of BCG scar formation nor negative PPD reaction is indicative of poor BCG uptake; no need to repeat BCG inoculation in babies who do not develop BCG scar; avoid using antiseptic in the vaccination area before vaccination; if stored in < -20°C, vaccine will be more stable.
Pre-qualification approval date: 
29/05/2003, BCG vaccine | WHO
CFU: 
Colony forming unit
Immunodeficiency: 
Patients with the altered immune response (hypogammaglobulinemia, congenital immunodeficiency, sarcoidosis, leukemia, generalized malignancy, HIV infections, those on immunosuppressive therapy, corticosteroids, Radiotherapy); Cell-mediated immune deficiency individuals; symptomatic or asymptomatic HIV infected individuals.
3`
            }
        ]
    },
    {
        name: 'Tuberculosis',
        manufactureName: 'BCG vaccine (BB-NCIPD)',
        licensers: [
            {
                name: 'EMA',
                profile: `
                EMA-Product Profile: BCG vaccine® (MAH: BB-NCIPD)
No License Yet.`
            },
            {
                name: 'FDA',
                profile: `
                FDA-Product Profile: BCG vaccine® (MAH: BB-NCIPD)
No License Yet.`
            },
            {
                name: 'WHO',
                profile: `
                WHO-Product Profile: BCG vaccine® (MAH: BB-NCIPD)Powder and solution as a suspension for intradermal injection; Bacillus Calmette-Guerin vaccine; BCG (Live, attenuated)
Composition/Platform
Each ampoule (0.1mL) contains 1.5-6 x 105 CFU of BCG (BCG-SL 222 Sofia); storage: 2-8°C (protected from direct sunlight); shelf life: 3 years.
Strain coverage
Mycobacterium tuberculosis.
Indication
Active immunization to prevent tuberculosis in all infants at birth or reimmunization of children and adults who have negative tuberculin tests.
Dosing
I.D; each dose is 0.1ml; as soon as possible after birth. 
Contraindication
Cell-mediated immune deficiency; immunosuppressive therapy; HIV-infected individuals; avoid revaccination in children with history of keloid or lupoid reactions.
Immunogenicity
No data in the label.
Efficacy (VEy)
No data in the label.
Duration of protection
No data in the label.
Co-Administration
Can be co-administered with DTP, measles, OPV, IPV, HBV, Hib, and yellow fever vaccines and vitamin A supplementation.
Reactogenicity
Injection site papule, nodule, ulcer, abscess, scar; axillary lymphadenopathy; perforation and persistent suppuration; keloid and lupoid reactions.
Safety 
No safety signals to date.
Vaccination Goal
Individual protection.
Others
Skin testing with tuberculin is not generally carried out before giving BCG, but when performed, those who are found to be positive reactors do not need to be immunized; avoid using antiseptic in the vaccination area before vaccination.
Pre-qualification approval date: 
01/02/1991, BCG vaccine | WHO, WHO2
CFU: 
Colony forming unit`
            }
        ]
    },
    {
        name: 'Tuberculosis',
        manufactureName: 'BCG Freeze Dried Glutamate vaccine',
        licensers: [
            {
                name: 'EMA',
                profile: `
                EMA-Product Profile: BCG Freeze Dried Glutamate vaccine® (MAH: Japan BCG Laboratory)
No License Yet.`
            },
            {
                name: 'FDA',
                profile: `
                FDA-Product Profile: BCG Freeze Dried Glutamate vaccine® (MAH: Japan BCG Laboratory)
No License Yet.`
            },
            {
                name: 'WHO',
                profile: `
                WHO-Product Profile: BCG Freeze Dried Glutamate vaccine® (MAH: Japan BCG Laboratory)Suspension for intradermal injection; Bacillus Calmette-Guerin vaccine; BCG (Live, attenuated)
Composition/Platform
Each ampoule contains 0.5mg of BCG; storage: 2-8°C (protected from direct sunlight); shelf life: 2 years.
Strain coverage
Mycobacterium tuberculosis.
Indication
Active immunization for prevention of tuberculosis in all infants at risk of early exposure to the disease; to be used based on official recommendations.
Dosing
I.D; <1 yr.: each dose is 0.05mL; ≥1 yr.: each dose is 0.1ml; as soon as possible after birth.
Contraindication
Cell-mediated immune deficiency individuals; HIV-infected individuals; pregnancy; avoid revaccination in children with history of keloid and lupoid reactions.
Immunogenicity
No data in the label.
Efficacy (VEy)
No data in the label.
Duration of protection
No data in the label.
Co-Administration
Can be co-administered with DTP, measles, OPV, IPV, HBV, Hib, and yellow fever vaccines and vitamin A supplementation; many countries still recommend not to give BCG within 4 weeks of another live vaccine.
Reactogenicity
Injection site induration, ulceration, subsequent pustule formation; axillary/cervical lymphadenopathy; keloid and lupoid reactions; fever.
Safety 
Disseminated BCG infection (BCG osteitis or osteomyelitis) especially in persons with primary or secondary immunodeficiencies.
Vaccination Goal
Individual protection.
Others
Skin testing with tuberculin is not generally carried out before giving BCG, but when performed, those who are found to be positive reactors do not need to be immunized; avoid using antiseptic in the vaccination area before vaccination; if stored in < -20°C, vaccine will be more stable.
Pre-qualification approval date: 
01/01/1987, BCG Freeze Dried Glutamate vaccine | WHO, WHO2`
            }
        ]
    },
];

export function finalParsedDataCompare() {
    const tempArr = dataCompare
    for (const vac of tempArr) {
        for (let idx = 0; idx < vac.licensers.length; idx++) {
            const s = vac.licensers[idx].profile.split('\n');
            const profileArray = [];
            if (s.length > 0) {
                for (let splitStringIdx = 0; splitStringIdx < s.length; splitStringIdx++) {
                    for (let separatorIdx = 0; separatorIdx < titleSeparator.length; separatorIdx++) {
                        if (s[splitStringIdx].includes(titleSeparator[separatorIdx])) {
                            const obj = {
                                name: titleSeparator[separatorIdx],
                                value: s[splitStringIdx + 1]
                            }
                            profileArray.push(obj);
                        }
                    }
                }
            }
            vac.licensers[idx].data = profileArray;
        }
    };
    return tempArr;
};


export const compareMenu = [
    {
        name: 'Pathogen',
        data: []
    },
    {
        name: 'Manufacturer',
        data: []
    },
    {
        name: 'Licensing Authorities (Coming Soon)',
        data: []
    },
]