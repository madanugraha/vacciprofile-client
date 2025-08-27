const q = [
    `
Afghanistan
Committee: Science, Epidemiology and Research (SER)
Year established: 2010`,
    `
Albania
Committee: National Technical-Advisory Committee on Immunization (NTACI)
Year established: 2015
Year evaluated: 2022
Evaluation information: self-assessment`,
    `
Algeria
Committee: Comité Technique de Consultation sur la Vaccination (CTCV)
Year established: 2010
Year evaluated: 2023`,
    `Andorra`,
    `Angola
Committee: Comité Nacional de Peritos para o Programa Alargado de Vacinação (PAV)
Year established: 2017
Year evaluated: 2019`,
    `
Antigua and Barbuda
Committee: The Caribbean Immunization Technical Advisory Group (CITAG)
Year established: 2018`,
    `
Argentina
Committee: Comisión Nacional de Inmunizaciones (CoNaIn)
Year established: 2000
Year evaluated: 2018
Website: https://www.argentina.gob.ar/salud/inmunoprevenibles/comisiones/conain
`,
    `
Armenia
Committee: Armenian National Advisory Committee on Immunization (NACI)
Year established: 2011`,
    `
Australia
Committee: Australian Technical Advisory Group on Immunisation (ATAGI)
Year established: 1997
Website: https://beta.health.gov.au/committees-and-groups/australian-technical-advisory-group-on-immunisation`,
    `
Austria
Committee: Nationales Impfgremium (NIG)
Website: https://www.sozialministerium.at/Themen/Gesundheit/Impfen/Nationales-Impfgremium.html`,
    `
Azerbaijan
`,
    `
Bahamas
Committee: The Caribbean Immunization Technical Advisory Group (CITAG)
Year established: 2018`,
    `Bahrain
Committee: Bahrain Immunization Committee (BIC)
Year established: 2009`,
    `
Bangladesh
Committee: National Committee of Immunization Practices of Bangladesh (NCIP)
Year established: 2008
Year evaluated: 2020`,
    `Barbados
Committee: The Caribbean Immunization Technical Advisory Group (CITAG)
Year established: 2018
`,
    `Belarus
Year evaluated: 2022`,
    `
Belgium
Committee: Conseil Supérieur de la Santé (CSS)
Year established: 1991
Website: https://www.health.belgium.be/en/node/30023`,
    `Belize
Committee: The Caribbean Immunization Technical Advisory Group (CITAG)
Year established: 2018`,
    `
Benin
Committee: Comité National Consultatif pour la Vaccination et les Vaccins (CNCV)
Year established: 2013
`,
    `
Bhutan
Committee: National Committee of Immunization Practices of Bhutan (NCIP)
Year established: 2008
Year evaluated: 2020
`,
    `
Bolivia
Committee: Comité Nacional de Inmunizaciones (CNI)
Year established: 2000
Website: https://pai.minsalud.gob.bo/pagina/54
`,
    `
Bosnia and Herzegovina
Committee: Stručno savjetodavno tijelo za imunizaciju (SSTI)
Year established: 2005
Year evaluated: 2022
Website: https://www.zzjzfbih.ba/informacije-o-cjepivu/
`,
    `
Botswana
Committee: Botswana National Immunization Technical Advisory Group (BOTSNITAG)
Year established: 2022
`,
    `
Brazil
`,
    `
Brunei Darussalam
Committee: Brunei National Immunization Technical Advisory Group
Year established: 2021
`,
    `
Bulgaria
`,
    `
Burkina Faso
Committee: Groupe Technique Consultatif sur la Vaccination (GTCV)
Year established: 2014
Year evaluated: 2023
`,
    `
Burundi
`,
    `
Cambodia
`,
    `
Cameroon
Committee: Groupe National Consultatif Technique en Vaccination (GNCV)
Year established: 2015
Website: https://pevcameroon.cm/apropos/histories?lang=en
`,
    `
Canada
Committee: National Advisory Committee on Immunization (NACI)
Year established: 1964
Website: https://www.canada.ca/en/public-health/services/immunization/national-advisory-committee-on-immunization-naci/naci-membership-representation.html
`,
    `
Chad
Committee: Comité National Technique de Vaccination (CNTV)
Year established: 2023`,
    `
Cape Verde
Committee: Grupo Técnico Consultivo da Vacinação (GTCV)
Website: https://www.governo.cv/ministro-da-saude-confere-posse-ao-grupo-tecnico-consultivo-da-vacinacao-gtcv-de-cabo-verde/`,
    `
Central African Republic`,
    `
Cyprus
Committee: National Vaccination Advisory Committee (NVAC)
Website: https://www.gov.cy/moh/en/committees`,
    `
Chile
Committee: Comité asesor en vacunas y estrategias de inmunización (CAVEI)
Year established: 2011
Website: https://vacunas.minsal.cl/cavei/
`,
    `
China
Committee: National Immunization Advisory Committee (NIAC)
Year established: 2017
`,
    `
Colombia
Committee: Comité Nacional de Praticas en Inmunizacion (CNPI)
Year established: 2010
`,
    `
Comoros
Year established: 2021
`,
    `
Congo
Year established: 2023
`,
    `
Congo (Democratic Republic of)
Committee: DRC National Immunization Technical Advisory Group (DRCNITAG)
Year established: 2016
`,
    `
Costa Rica
Committee: Comisión Nacional de Vacunación y Epidemiología (CNVE)
Year established: 2001
`,
    `
Ivory Coast
Committee: Comité National d'Experts Indépendants pour la Vaccination et les vaccins de la Côte d'Ivoire (CNEIVCI)
Year established: 2009
`,
    `
Croatia
Committee: Croatian National Immunization Technical Advisory Group (CNITAG)
`,
    `
Cuba
Committee: Grupo Asesor Técnico sobre Enfermedades Prevenibles por Vacunación (GTA)
`,
    `
Dominican Republic
Committee: Comité Técnico Asesor de Inmunoprevenibles por Vacunas (CNATI)
Website: https://www.diariosalud.do/noticias/cnati-rd-respalda-actualizacion-calendario-de-inmunizacion-nacional/
`,
    `
Equatorial Guinea
`,
    `
Czech Republic
Committee: Národní imunizační komise (NIKO)
Year established: 2023
Website: https://ppo.mzcr.cz/workGroup/11
`,
    `
Denmark
Committee: Sundhedsstyrelsens vaccinationsudvalg (VVU)
Year established: 1980
Website: https://www.sst.dk/en/english/General-public
`,
    `
Dominica
Committee: The Caribbean Immunization Technical Advisory Group (CITAG)
Year established: 2018
`,
    `
Djibouti
Committee: Djibouti National Immunization Technical Advisory Group (DJINITAG)
Year established: 2023
`,
    `
Ecuador
Committee: Comité Nacional de Inmunización (CNI)
Year established: 2018
Website: http://www.salud.gob.ec/programa-ampliado-de-inmunizaciones-pai/
`,
    `
Egypt
Committee: Egypt National Immunization Technical Advisory Group (EGYNITAG)
Year established: 1992
`,
    `
El Salvador
Committee: Comité Assesor de las Practicas de Inmunizacion (CAPI)
Year established: 2001
Year evaluated: 2023
`,
    `
Eritrea
`,
    `
Eswatini
Committee: Swaziland National Immunization Technical Advisory Group (SWANITAG)

`,
    `
Estonia
Committee: Expert Committee for Immunoprophylaxis (ECI)
Year established: 2006
`,
    `
Ethiopia
Committee: Ethiopian National Immunization Technical Advisory Group (ENITAG)
Year established: 2016
Website: https://www.ajol.info/index.php/ejhs/article/view/266675
`,
    `
Fiji
Committee: National Vaccine-Preventable Diseases Committee (NVPDC)
`,
    `
Finland
Committee: Kansallinen rokotusasiantuntijaryhmä (KRAR)
Year established: 2001
Website: https://thl.fi/en/topics/infectious-diseases-and-vaccinations/information-about-vaccinations/finnish-national-vaccination-programme
`,
    `
France
Committee: Commission Technique des Vaccinations (CTV)
Year established: 1985
Website: https://www.has-sante.fr/jcms/c_2758065/en/technical-committee-for-vaccinations
`,
    `
Gambia
Committee: Gambia National Immunization Technical Advisory Group (GMNITAG)
Year established: 2020
`,
    `
Gabon
Committee: Comité National Technique de Vaccination (CNTV)
`,
    `
Georgia
Committee: ეროვნული იმუნიზაციის ტექნიკური საკონსულტაციო ჯგუფი (GEONITAG)
Year established: 2014
`,
    `
Germany
Committee: Ständige Impfkommission (STIKO)
Year established: 1972
Website: https://www.rki.de/EN/Topics/Infectious-diseases/Immunisation/STIKO/standing-committee-on-vaccination-stiko-node.html
`,
    `
Ghana
Committee: Ghana National Immunization Technical Advisory Group (GHNITAG)
Year established: 2018
Year evaluated: 2024
`,
    `
Greece
Committee: National Immunization Committee (NIC)
Year established: 1991
`,
    `
Grenada
Committee: The Caribbean Immunization Technical Advisory Group (CITAG)
Year established: 2018
`,
    `
Guatemala
Committee: Consejo Nacional de Prácticas de Inmunizaciones (CONAPI)
Year established: 2013
`,
    `
Guinea
Committee: Groupe Consultatif National sur la Vaccination (GINITAG)
Year established: 2018
`,
    `
Guinea-Bissau
Committee: Groupe Technique Consultatif National pour la Vaccination (GTCNV)
Website: https://sivegub.info/index.php/2025/01/23/decreto-ministerial-que-cria-o-nitag-na-guine-bissau/
`,
    `
Guyana
Committee: The Caribbean Immunization Technical Advisory Group (CITAG)
Year established: 2018
`,
    `
Haiti
Year established: 2014
`,
    `
Honduras
Committee: Consejo Consultivo Nacional de Inmunizaciónes (CCNI)
Year established: 1999
`,
    `
Iceland
Committee: Sottvarnarad
Year established: 1998
`,
    `
India
Committee: National Technical Advisory Group on Immunisation in India (NTAGI)
Year established: 2001
Year evaluated: 2020
Website: https://nihfw.ac.in/cms/national-technical-advisory-group-on-immunization-ntagi.php
`,
    `
Indonesia
Committee: Indonesian Technical Advisory Group on Immunization (ITAGI)
Year established: 2007
Year evaluated: 2020
`,
    `
Iraq
Committee: اللجنة الفنية الوطنية للتطعيمات (IRNITAG)
Year established: 2002
`,
    `
Hungary
Committee: Országos Immunizációs Szakértői Tanács (OIST)
`,
    `

Ireland
Committee: National Immunisation Advisory Committee (NIAC)
Year established: 1998
Website: https://www.hiqa.ie/areas-we-work/national-immunisation-advisory-committee
`,

    `
Islamic Republic of Iran
Committee: Iran National Immunization Technical Advisory Group (IRNITAG)
Year established: 1982
`,
    `
Israel
Committee: Advisory Committee on Infectious Diseases and Immunizations (ACIDI)
`,

    `
Italy
Committee: Gruppo Tecnico Consultivo Nazionale Vaccinazioni (GTCNV)
Year established: 2017
`,
    `
Jamaica
Committee: The Caribbean Immunization Technical Advisory Group (CITAG)
Year established: 2018
`,
    `
Japan
Committee: Yobō Sesshu Wakuchin Bunkakai (MHLW)
`,
    `
Jordan
Committee: اللجنة الفنية الوطنية للتطعيمات (JORNITAG)
`,
    `
Kazakhstan
Committee: Advisory Сommission on Immunization (ACI)
Year established: 2012
Website: http://nitag.kz/
`,
    `
Kenya
Committee: National Immunization Technical Advisory Group of Kenya (KENITAG)
Year established: 2014
`,
    `
Kiribati
Year established: 2014
`,
    `
Kuwait
Committee: اللجنة الفنية الوطنية للتطعيمات (KWTNITAG)
Year established: 1972
`,
    `
Kyrgyzstan
Committee: Technical Advisory Group of Immunization Experts (TAGIE)
Year established: 2012
Year evaluated: 2023
`,
    `
Lao People's Democratic Republic
Committee: LITAG
Year established: 2013
`,
    `
Latvia
Committee: Imunizācijas valsts padome (IVP)
Year established: 2000
Website: http://www.vm.gov.lv/lv/ministrija/konsultativas_padomes/imunizacijas_valsts_padome/
`,
    `
Lebanon
Committee: Groupe Technique National de Consultation d'Immunisation (GTNCI) 
Year established: 2022
Year evaluated: 2023
`,
    `

Lesotho
Committee: Lesotho National Immunization Technical Advisory Group (LESNITAG)
Year established: 2018
Year evaluated: 2025
Evaluation information: The
`,
    `
Liberia
Year established: 2021
`,
    `
Lithuania
Committee: Board for coordination of National Immunization Programme (BCNIP)
Year established: 1999
`,
    `
Luxembourg
Committee: Conseil Supérieur des Maladies Infectieuses (CSMI)
Year established: 1963
Website: https://sante.public.lu/fr/espace-professionnel/recommandations/conseil-maladies-infectieuses.html
`,
    `
Macedonia
Committee: National Immunization Committee (NIC)
`,
    `
Madagascar
Committee: Groupe Technique Consultatif sur la Vaccination (GTCV)
Year established: 2022
`,
    `
Malawi
Committee: Malawi National Immunization Technical Advisory Group (MAITAG)
Year established: 2015
`,
    `
Malaysia
Committee: National Committee on Immunization Practices (NCIP)
Year established: 2008
`,
    `
Maldives
Committee: Maldives National Committees for Immunization Practices (MNCIP)
Year established: 2008
Year evaluated: 2020
`,
    `
Mali
Committee: Groupe Technique Consultatif pour les Vaccins et la Vaccination (GTCV)
Year established: 2014
`,
    `
Malta
Committee: Advisory Committee on Immunisation Policy (ACIP)
Year established: 2007
Website: https://www.gov.mt/en/Government/Government%20of%20Malta/Ministries%20and%20Entities/Officially%20Appointed%20Bodies/Pages/Committees/Advisory-Committee-on-Immunisation.aspx
`,
    `
Mauritius
Committee: Mauritius National Immunization Technical Advisory Group (MAUNITAG)
Year established: 2019
Year evaluated: 2025
`,
    `
Mauritania
Committee: Groupe Consultatif des experts de l'immunisation (GCEI)
Year established: 2023
`,
    `
Mexico
Committee: Consejo Nacional de Vacunacion (Conava)
Year established: 1991
`,
    `
Moldova (Republic of)
Year established: 2013
`,
    `
Monaco
`,
    `
Palau
`,
    `
Palestine
`,
    `
Papua New Guinea
`,
    `
Micronesia
`,
    `
Mongolia
Committee: Mongolian National Immunization Technical Advisory Group (MONITAG)
Year established: 2010
`,
    `
Montenegro
`,
    `
Morocco
Committee: اللجنة التقنية والعلمية الاستشارية في مجال التلقيح (TSACV)
Year established: 1982
`,
    `
Mozambique
Committee: Comité de Peritos para a Imunização (CoPI)
Year established: 2011
Year evaluated: 2017
`,
    `
Myanmar
Committee: National Committee of Immunization Practices of Myanmar (NCIP)
Year established: 2009
Year evaluated: 2020
`,
    `
Namibia
Committee: Namibia National Immunization Technical Advisory Group (NAMNITAG)
`,
    `
Nauru
`,
    `
Philippines
Committee: National Immunization Committee (NIC)
`,
    `
Nepal
Committee: Nepal National Committee on Immunization Practices (NCIP)
Year established: 2010
Year evaluated: 2020
`,
    `
Netherlands
Committee: Committe on Vaccinations (CoV)
Year established: 1902
Website: https://www.healthcouncil.nl/about-us/organisation/permanent-committees/committee-on-vaccinations
`,
    `
New Zealand
Committee: Immunization Sub-committee of The Pharmacology and Therapeutics Advisory Committee (PTAC)
Year established: 1984
Website: https://pharmac.govt.nz/about/expert-advice/pharmacology-and-therapeutics-advisory-committee-ptac
`,
    `
Nicaragua
`,
    `
Niger
Committee: Groupe Technique Consultatif pour la Vaccination (GTCV)
Year established: 2013
`,
    `
Nigeria
Committee: Nigeria National Immunization Technical Advisory Group (NGITAG)
Year established: 2015
`,
    `
Norway
Committee: Vitenskapelig referansegruppe for nasjonale vaksinasjonsprogram (SRGNIP)
Website: https://www.fhi.no/en/va/innforing-av-nye-vaksiner/scientific-reference-group-for-national-immunisation-programs/
`,
    `North Korea
Committee: Korea Expert Committee on Immunization Practices (KECIP)
Year established: 1990`,
    `
Oman
Committee: National Committee for Vaccines Regulation and Surveillance of Vaccine-Preventable Diseases (NCVR)
Year established: 2000
Year evaluated: 2023`,
    `
Pakistan
Committee: Pakistan National Immunization Technical Advisory Group (PAKNITAG)
`,
    `
Panama
Committee: Comité Nacional de Inmunización (NIC)
Website: https://rna.campusvirtualsp.org/en/country/panama
`,
    `
Paraguay
Committee: Comité Técnico Nacional de Inmunizaciones (COTENAI)
Year established: 2012
Year evaluated: 2023
`,
    `
Peru
Committee: COMITE DE EXPERTOS DE LA ESTRATEGIA SANITARIA DE INMUNIZACIONES MINSA PERU (CEESI)
Year established: 2012
`,
    `
Poland
Committee: Komitet ds. Szczepień (NIC)
Year established: 2003
`,
    `
Portugal
Committee: Comissão Técnica de Vacinação (CTV)
Year established: 1997
Website: https://www.actamedicaportuguesa.com/revista/index.php/amp/article/view/12155/5856
`,
    `
Qatar
Year established: 2010
Year evaluated: 2023
`,
    `
Romania
Committee: Comitetul Național de Imunizare (NIC)
Year established: 2022
`,
    `
Russian Federation
Committee: Рабочая группа экспертов по иммунопрофилактике инфекционных болезней (РГЭИИБ)
Year established: 2018
`,
    `

Rwanda
Committee: National Immunization Advisory Mechanism (NIAM)
Year established: 2017
Website: https://immunizationdata.who.int/global/wiise-detail-page/national-immunization-advisory-mechanism?ISO_3_CODE=RWA`
    ,
    `
Saint Kitts and Nevis
Committee: The Caribbean Immunization Technical Advisory Group (CITAG)
Year established: 2018
`,
    `
Saint Lucia
Committee: The Caribbean Immunization Technical Advisory Group (CITAG)
Year established: 2018
`,
    `

Saint Vincent and The Grenadines
Committee: The Caribbean Immunization Technical Advisory Group (CITAG)
Year established: 2018
`,
    `
Saudi Arabia
Committee: اللجنة الوطنية للتطعيم (NIC)
Year established: 2008
`,
    `
Senegal
Committee: Comité Consultatif pour la Vaccination au Sénégal (CCVS)
Year established: 2013
`,
    `
Serbia
Committee: Stručni Ekspertski Komitet za Imunizaciju (SECI)
Year established: 2018
Year evaluated: 2023
`,
    `
Seychelles
Committee: Seychelles National Immunization Technical Advisory Group (SYCNITAG)
Year established: 2019
Year evaluated: 2022
`,
    `
Sierra Leone
Committee: Sierra Leone National Immunization Technical Advisory Group (SLNITAG)
Year established: 2020
`,
    `
Singapore
Committee: Expert Committee on Immunisation (ECI)
Year established: 1975
`,
    `
Slovakia
Committee: Working Group for Immunization Issues (WGII)
Year established: 2006
`,
    `
Slovenia
Committee: Posvetovalna skupina za cepljenje (PSC)
Year established: 2011
Website: http://www.nijz.si/sl/posvetovalna-skupina-za-cepljenje
`,
    `
Somalia
Committee: Somalia National Advisory Group on Immunization (SOMNITAG)
Year established: 2023
`,
    `

South Africa
Committee: National Advisory Group on Immunization of South Africa (NAGI)
Year established: 1993
Year evaluated: 2024
`,
    `
South Korea
Committee: Korea Expert Committee on Immunization Practices (KECIP)
Year established: 1992
Website: https://www.kdca.go.kr/index.es?sid=a3
`,
    `
South Sudan
Committee: South Sudan Immunisation Technical Advisory Group (SSITAG)
Year established: 2016
`,
    `
Spain
Committee: Ponencia de Registro y Programa de Vacunaciones (PRPV)
Year established: 1991
Website: https://www.mscbs.gob.es/profesionales/saludPublica/prevPromocion/vacunaciones/comoTrabajamos/ponencia.htm
`,
    `
Sri Lanka
Committee: Advisory Committee on Communicable Diseases (ACCD)
Year evaluated: 2020
`
    ,
    `
State of Libya
Year established: 2022
`,
    `
Liechtenstein
`,
    `
Sudan
Committee: Sudan National Immunization Technical Advisory Group (SDNNITAG)
Year established: 2009
Year evaluated: 2024
`,
    `
Suriname
Committee: The Caribbean Immunization Technical Advisory Group (CITAG)
Year established: 2018
`,
    `

Sweden
Committee: Reference group for national vaccination programmes (REFVAC)
Year established: 2016
Website: https://www.folkhalsomyndigheten.se/the-public-health-agency-of-sweden/communicable-disease-control/vaccinations/vaccination-programmes
`,
    `

Switzerland
Committee: Commission Fédérale pour les Vaccinations (CFV)
Year established: 2004
Website: https://www.bag.admin.ch/en/
`,
    `
Syria
Committee: Syria National Immunization Technical Advisory Group (SYRNITAG)
Year established: 2007
`,
    `
Tajikistan
Committee: Национальная группа технических консультаций по иммунизации (TJKNITAG)
`,
    `
Taiwan
`,
    `
Tonga
`,
    `

Tanzania (United Republic Of)
Committee: Tanzania National Immunization Technical Advisory Group (TZNITAG)
Year established: 2017
Year evaluated: 2023
`,
    `

Thailand
Committee: Advisory Committee on Immunization Practices of Thailand (ACIP)
Year established: 1970
Year evaluated: 2020
Website: http://www.nvco.go.th/

`,
    `
Timor-Leste
Committee: Comité Nacional de Consultoria Técnica em Imunização (NTAC)
Year evaluated: 2020
`,
    `
Togo
Committee: Groupe Technique Consultatif sur la Vaccination (GTCV)
Year established: 2015
Year evaluated: 2023
`,
    `
Trinidad and Tobago
Committee: The Caribbean Immunization Technical Advisory Group (CITAG)
Year established: 2018
`,
    `

Tunisia
Committee: Comité Technique de Vaccination (CTV)
Year established: 2010
`,
    `
Turkey
Committee: Ulusal Aşılama Teknik Danışma Grubu (TURNITAG)
Website: disab.saglik.gov.tr/EN-77506/national-immunization-technical-advisory-group-nitag-turkey-meeting.html
`,
    `
Turkmenistan
Year evaluated: 2023
`,
    `

Uganda
Committee: Uganda National Immunization Technical Advisory Group (UNITAG)
Year established: 2014
Year evaluated: 2022
`,
    `
Ukraine
Committee: Національна технічна група з питань імунізації (UKR)
`,
    `
United Arab Emirates
Committee: اللجنة الوطنية الفنية للتطعي (UAENITAG)
Website: https://mohap.gov.ae/en/w/ministry-of-health-and-prevention-adopted-4-updates-on-the-national-immunization-program
`,
    `
United Kingdom
Committee: Joint Committee on Vaccination and Immunisation (JCVI)
Year established: 1963
Website: https://www.gov.uk/government/groups/joint-committee-on-vaccination-and-immunisation
`,
    `
United States
Committee: Advisory Committee on Immunization Practices (ACIP)
Year established: 1964
Website: https://www.cdc.gov/acip/?CDC_AAref_Val=https://www.cdc.gov/vaccines/acip/index.html
`,
    `

Uruguay
Committee: Comisión Nacional Asesora de Vacunaciones (CNAV)
Year established: 1985
Website: https://www.gub.uy/ministerio-salud-publica/comunicacion/publicaciones/actas-reuniones-comision-nacional-asesora-vacunaciones
`,
    `
Uzbekistan
Year evaluated: 2022
`,
    `
Vanuatu
`,
    `
Vatican City
`,
    `
Venezuela
`,
    `
Viet Nam
Committee: National Immunization Technical Advisory Group for the use of Vaccine and Biologicals (NITAG-UVB)
Year established: 1998
`,
    `
Yemen
Committee: Yemen National Immunization Technical Advisory Group (YEMNITAG)
Year established: 2009
`,
    `
Zambia
Committee: Zambia Immunization Technical Advisory Group (ZITAG)
Year established: 2016
Year evaluated: 2023
`,
    `
Zimbabwe
Committee: Child Survival Technical Working Group (CSTWG)
Year established: 2011
`
]

const q1 = q.map((x) => x.split('\n').filter((z) => z !== "")).map((x, i) => {
    let ar = [];

    ar.push(x[0]);
    x.map((arx, arx1) => {
        if (!x[arx1]) {

        } else {

            if ((x[arx1].includes('Committee: '))) {
                ar.push(x.filter((y) => y.includes('Committee'))[0])
            }

            if ((x[arx1].includes('Year established: '))) {
                ar.push(x.filter((y) => y.includes('Year established: '))[0])
            }

            if ((x[arx1].includes('Year evaluated: '))) {
                ar.push(x.filter((y) => y.includes('Year evaluated: '))[0])
            }

            if ((x[arx1].includes('Website'))) {
                ar.push(x.filter((y) => y.includes('Website: '))[0])
            }
        }

    })
    return ar
});

export const finalRemapNitagCountry = q1.map((x) => {
    const comitee = x.filter((z) => z.includes('Committee'))[0] || "";
    const established = x.filter((z) => z.includes('established'))[0] || "";
    const evaluated = x.filter((z) => z.includes('evaluated'))[0] || "";
    const website = x.filter((z) => z.includes('Website'))[0] || "Website: Unavailable";

    let countryName = x[0];

    // if (countryName === "South Sudan") {
    //     countryName = { v: 'SS', f: 'South Sudan' };
    // };

    // if (countryName === "Russian Federation") {
    //     countryName = { v: 'RU', f: 'Russian Federation' };
    // }

    // if (countryName === "United States") {
    //     countryName = { v: 'United States', f: 'United States of America' };
    // }

    // if (countryName === "Congo (Democratic Republic of)") {
    //     countryName = { v: 'CD', f: 'Congo (Democratic Republic of)' };
    // }

    // if (countryName === "Congo") {
    //     countryName = { v: 'CG', f: 'Congo' };
    // }

    // if (countryName === "Viet Nam") {
    //     countryName = { v: 'VN', f: 'Viet Nam' };
    // }

    // if (countryName === "State of Libya") {
    //     countryName = { v: 'LY', f: 'State of Libya' };
    // }

    // if (countryName === "Islamic Republic of Iran") {
    //     countryName = { v: 'IR', f: 'Islamic Republic of Iran' };
    // }

    // if (countryName === "Lao People's Democratic Republic") {
    //     countryName = { v: 'LA', f: `Lao People's Democratic Republic` };
    // }

    return [countryName, `${comitee} <br/> ${established} <br/> ${website}`]
});