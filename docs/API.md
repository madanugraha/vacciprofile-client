## Objects

<dl>
<dt><a href="#Navigation">Navigation</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>AlphabetsNavigation Component</p>
</dd>
<dt><a href="#Header">Header</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Header Component</p>
</dd>
<dt><a href="#Accreditation">Accreditation</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Accreditation Component</p>
</dd>
<dt><a href="#Manufacturer">Manufacturer</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>ManufacturerInformation Component</p>
</dd>
<dt><a href="#Manufacturer">Manufacturer</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>ManufacturerInformationTable Component</p>
</dd>
<dt><a href="#Microbe">Microbe</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>MicrobeInformation Component</p>
</dd>
<dt><a href="#Vaccine">Vaccine</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>VaccineInformation Component</p>
</dd>
<dt><a href="#Main">Main</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>InformationView Component</p>
</dd>
<dt><a href="#Sidebar">Sidebar</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Sidebar Component</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#App">App()</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>This is the main component of the vaccine profile application. It manages the state of selected items, 
handles user interactions, and renders the Header, Sidebar, InformationView, and AlphabetsNavigation components.</p>
</dd>
</dl>

<a name="Navigation"></a>

## Navigation ⇒ <code>JSX.Element</code>
AlphabetsNavigation Component

**Kind**: global namespace  
**Returns**: <code>JSX.Element</code> - The Alphabet Navigation component.  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | The component accepts activeFilters, setActiveFilters, and setSelectedManufacturer as props. |
| props.activeFilters | <code>Object</code> | The current state of filters applied, including the selected alphabet. |
| props.setActiveFilters | <code>function</code> | Function that updates the state of active filters. |
| props.setSelectedManufacturer | <code>function</code> | Function that updates the selected manufacturer. |

**Example**  
```js
// Render the AlphabetsNavigation component<AlphabetsNavigation   activeFilters={activeFilters}   setActiveFilters={setActiveFilters}   setSelectedManufacturer={setSelectedManufacturer}/>
```
<a name="Header"></a>

## Header ⇒ <code>JSX.Element</code>
Header Component

**Kind**: global namespace  
**Returns**: <code>JSX.Element</code> - The Header component that displays the main title and a welcome message.  
**Component**:   
**Example**  
```js
// Example usage of Header component<Header />
```
<a name="Accreditation"></a>

## Accreditation ⇒ <code>JSX.Element</code>
Accreditation Component

**Kind**: global namespace  
**Returns**: <code>JSX.Element</code> - The Accreditation Information component.  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | The component accepts handleSelectVaccine, selectedAccreditation, and getVaccinesByAccreditation as props. |
| props.handleSelectVaccine | <code>function</code> | Function that gets triggered once a vaccine is selected. |
| props.selectedAccreditation | <code>string</code> | The accreditation that is selected. |
| props.getVaccinesByAccreditation | <code>function</code> | Function that gets a list of vaccines for a specific accreditation. |

**Example**  
```js
// Render the Accreditation component with dummy data and functions<Accreditation   handleSelectVaccine={vaccineName => console.log('Selected vaccine:', vaccineName)}  selectedAccreditation="FDA"  getVaccinesByAccreditation={() => [    { name: 'Vaccine A', vaccineType: 'Type 1', comments: 'Effective', revenue: '$1M' },    { name: 'Vaccine B', vaccineType: 'Type 2', comments: 'Moderate', revenue: '$500K' }  ]}/>
```
<a name="Manufacturer"></a>

## Manufacturer ⇒ <code>JSX.Element</code>
ManufacturerInformation Component

**Kind**: global namespace  
**Returns**: <code>JSX.Element</code> - The Manufacturer Information component.  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | The component accepts selectedManufacturer and convertCamelCaseToReadable as props. |
| props.selectedManufacturer | <code>Object</code> | The manufacturer information object. |
| props.selectedManufacturer.name | <code>string</code> | The name of the manufacturer. |
| props.selectedManufacturer.description | <code>string</code> | The description of the manufacturer. |
| props.selectedManufacturer.information | <code>Object</code> | Additional information about the manufacturer. |
| props.selectedManufacturer.information.sources | <code>Array.&lt;Object&gt;</code> | List of sources related to the manufacturer. |
| props.convertCamelCaseToReadable | <code>function</code> | Function that converts camel case strings to a readable format. |

**Example**  
```js
// Render the ManufacturerInformation component with dummy data and function<ManufacturerInformation   selectedManufacturer={{    name: 'Manufacturer X',    description: 'A leading manufacturer in the industry.',    information: {      type: 'Biotechnology',      country: 'USA',      sources: [        { title: 'Source 1', link: 'http://source1.com', lastUpdated: '2024-01-01' },        { title: 'Source 2', link: 'http://source2.com', lastUpdated: '2024-02-01' }      ]    }  }}  convertCamelCaseToReadable={key => key.replace(/([A-Z])/g, ' $1').toLowerCase()}/>
```
<a name="Manufacturer"></a>

## Manufacturer ⇒ <code>JSX.Element</code>
ManufacturerInformationTable Component

**Kind**: global namespace  
**Returns**: <code>JSX.Element</code> - The Manufacturer Information Table component.  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | The component accepts detailsType, selectedMicrobe, selectedVaccine, selectedAccreditation, and several handler and data functions as props. |
| props.detailsType | <code>string</code> | The type of detail currently selected, e.g., "Vaccine", "Microbe", or "Accreditation". |
| props.selectedMicrobe | <code>Object</code> | The currently selected microbe object. |
| props.selectedVaccine | <code>Object</code> | The currently selected vaccine object. |
| props.selectedAccreditation | <code>string</code> | The currently selected accreditation. |
| props.handleSelectMicrobe | <code>function</code> | Function that gets triggered when a microbe is selected. |
| props.handleSelectVaccine | <code>function</code> | Function that gets triggered when a vaccine is selected. |
| props.handleSelectAccreditation | <code>function</code> | Function that gets triggered when an accreditation is selected. |
| props.getVaccinesByManufacturer | <code>function</code> | Function that returns a list of vaccines based on the manufacturer. |
| props.getCountriesByVaccine | <code>function</code> | Function that returns a list of countries where a vaccine is used. |
| props.getRecommendationByVaccine | <code>function</code> | Function that returns recommendations for a specific vaccine. |
| props.getMicrobeByVaccine | <code>function</code> | Function that returns the microbe associated with a specific vaccine. |

**Example**  
```js
// Render the ManufacturerInformationTable component with dummy data and functions<ManufacturerInformationTable   detailsType="Vaccine"  selectedMicrobe={{ name: 'Microbe X' }}  selectedVaccine={{ name: 'Vaccine Y' }}  selectedAccreditation="Accreditation Z"  handleSelectMicrobe={microbe => console.log('Microbe selected:', microbe)}  handleSelectVaccine={vaccine => console.log('Vaccine selected:', vaccine)}  handleSelectAccreditation={accreditation => console.log('Accreditation selected:', accreditation)}  getVaccinesByManufacturer={() => [{ name: 'Vaccine Y', accreditation: ['Accreditation Z'] }]}  getCountriesByVaccine={vaccine => ['Country A', 'Country B']}  getRecommendationByVaccine={vaccine => 'Recommendation for ' + vaccine.name}  getMicrobeByVaccine={vaccine => ({ name: 'Microbe X' })}/>
```
<a name="Microbe"></a>

## Microbe ⇒ <code>JSX.Element</code>
MicrobeInformation Component

**Kind**: global namespace  
**Returns**: <code>JSX.Element</code> - The Microbe Information component.  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | The component accepts selectedMicrobe and italizeScientificNames as props. |
| props.selectedMicrobe | <code>Object</code> | The selected microbe object containing its details. |
| props.selectedMicrobe.name | <code>string</code> | The name of the selected microbe. |
| props.selectedMicrobe.description | <code>string</code> | The description of the selected microbe. |
| props.italizeScientificNames | <code>function</code> | Function that converts scientific names in the description to italicized text. |

**Example**  
```js
// Example usage of MicrobeInformation component<MicrobeInformation    selectedMicrobe={{        name: 'COVID-19',        description: 'Severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2) is the virus that causes COVID-19.'   }}    italizeScientificNames={(text) => text.replace(/(SARS-CoV-2)/g, '<i>$1</i>')} />
```
<a name="Vaccine"></a>

## Vaccine ⇒ <code>JSX.Element</code>
VaccineInformation Component

**Kind**: global namespace  
**Returns**: <code>JSX.Element</code> - The Vaccine Information component.  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | The component accepts selectedVaccine and italizeScientificNames as props. |
| props.selectedVaccine | <code>Object</code> | The selected vaccine object containing details such as name, description, link, and lastUpdated. |
| props.selectedVaccine.name | <code>string</code> | The name of the selected vaccine. |
| props.selectedVaccine.description | <code>string</code> | The description of the selected vaccine. |
| props.selectedVaccine.link | <code>string</code> | The URL link to learn more about the selected vaccine. |
| props.selectedVaccine.lastUpdated | <code>string</code> | The last updated date for the selected vaccine. |
| props.italizeScientificNames | <code>function</code> | Function that italicizes scientific names in the description. |

**Example**  
```js
// Render the VaccineInformation component with a sample vaccine and italizeScientificNames function<VaccineInformation   selectedVaccine={{     name: 'Vaccine X',     description: 'A description of Vaccine X with scientific names.',     link: 'https://example.com/vaccine-x',     lastUpdated: '2024-07-29'   }}   italizeScientificNames={text => text.replace(/(scientificName)/gi, '<i>$1</i>')}/>
```
<a name="Main"></a>

## Main ⇒ <code>JSX.Element</code>
InformationView Component

**Kind**: global namespace  
**Returns**: <code>JSX.Element</code> - The Information View component displaying detailed information based on the selected type and filters.  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | The component accepts various props to handle the display of information. |
| props.activeFilters | <code>Object</code> | The current filters applied to the information view. |
| props.setActiveFilters | <code>function</code> | Function to update the active filters. |
| props.manufacturersList | <code>Array</code> | List of manufacturers available for selection. |
| props.selectedMicrobe | <code>Object</code> | The currently selected microbe. |
| props.selectedVaccine | <code>Object</code> | The currently selected vaccine. |
| props.selectedManufacturer | <code>Object</code> | The currently selected manufacturer. |
| props.selectedAccreditation | <code>Object</code> | The currently selected accreditation. |
| props.detailsType | <code>string</code> | The type of details to display ('Microbe', 'Vaccine', 'Manufacturer', 'Accreditation'). |
| props.handleSelectMicrobe | <code>function</code> | Function to handle the selection of a microbe. |
| props.handleSelectVaccine | <code>function</code> | Function to handle the selection of a vaccine. |
| props.handleSelectAccreditation | <code>function</code> | Function to handle the selection of an accreditation. |
| props.getCountriesByVaccine | <code>function</code> | Function to get countries associated with a vaccine. |
| props.getMicrobeByVaccine | <code>function</code> | Function to get the microbe associated with a vaccine. |
| props.getVaccinesByManufacturer | <code>function</code> | Function to get vaccines associated with a manufacturer. |
| props.getVaccinesByAccreditation | <code>function</code> | Function to get vaccines associated with an accreditation. |
| props.getRecommendationByVaccine | <code>function</code> | Function to get recommendations for a vaccine. |
| props.italizeScientificNames | <code>function</code> | Function to italicize scientific names in descriptions. |
| props.convertCamelCaseToReadable | <code>function</code> | Function to convert camel case strings to a readable format. |
| props.changedFrom | <code>string</code> | Source of the change triggering the view update. |

**Example**  
```js
// Example usage of InformationView component<InformationView   activeFilters={{ searchString: '', firstAlphabet: '' }}   setActiveFilters={(filters) => console.log(filters)}   manufacturersList={[]}   selectedMicrobe={{ name: 'COVID-19', description: '...' }}   selectedVaccine={{ name: 'VaccineX', description: '...', link: '...', lastUpdated: '...' }}   selectedManufacturer={{ name: 'ManufacturerY', description: '...' }}   selectedAccreditation='AccreditationZ'   detailsType='Microbe'   handleSelectMicrobe={(microbe) => console.log(microbe)}   handleSelectVaccine={(vaccine) => console.log(vaccine)}   handleSelectAccreditation={(accreditation) => console.log(accreditation)}   getCountriesByVaccine={(vaccine) => ['CountryA', 'CountryB']}   getMicrobeByVaccine={(vaccine) => ({ name: 'VirusX' })}   getVaccinesByManufacturer={() => [{ name: 'Vaccine1' }]}   getVaccinesByAccreditation={() => [{ name: 'Vaccine2' }]}   getRecommendationByVaccine={(vaccine) => 'Recommendation'}   italizeScientificNames={(text) => <i>{text}</i>}   convertCamelCaseToReadable={(text) => text.replace(/([a-z])([A-Z])/g, '$1 $2')}   changedFrom='Sidebar'/>
```
<a name="Sidebar"></a>

## Sidebar ⇒ <code>JSX.Element</code>
Sidebar Component

**Kind**: global namespace  
**Returns**: <code>JSX.Element</code> - The Sidebar component for selecting manufacturers and searching.  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | The component accepts various props to handle sidebar functionality. |
| props.setDetailsType | <code>function</code> | Function to set the type of details to be displayed ('Microbe', 'Vaccine', 'Manufacturer', 'Accreditation'). |
| props.manufacturersList | <code>Array</code> | List of manufacturers available for selection. |
| props.selectedManufacturer | <code>Object</code> | The currently selected manufacturer. |
| props.setSelectedManufacturer | <code>function</code> | Function to update the selected manufacturer. |
| props.handleSelectManufacturer | <code>function</code> | Function to handle the selection of a manufacturer. |
| props.handleSearch | <code>function</code> | Function to handle the search input changes. |
| props.setChangedFrom | <code>function</code> | Function to set the source of the change triggering the view update. |

**Example**  
```js
// Example usage of Sidebar component<Sidebar    setDetailsType={(type) => console.log(type)}   manufacturersList={[{ name: 'ManufacturerA' }, { name: 'ManufacturerB' }]}   selectedManufacturer={{ name: 'ManufacturerA' }}   setSelectedManufacturer={(manufacturer) => console.log(manufacturer)}   handleSelectManufacturer={(manufacturer) => console.log(manufacturer)}   handleSearch={(query) => console.log(query)}   setChangedFrom={(source) => console.log(source)}/>
```
<a name="App"></a>

## App() ⇒ <code>JSX.Element</code>
This is the main component of the vaccine profile application. It manages the state of selected items, handles user interactions, and renders the Header, Sidebar, InformationView, and AlphabetsNavigation components.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - The main application component containing all sub-components and logic.  
**Component**:   
**Example**  
```js
// Example usage of App component<App />
```

* [App()](#App) ⇒ <code>JSX.Element</code>
    * [~handleSearch(keyword)](#App..handleSearch)
    * [~handleSelectMicrobe(microbe)](#App..handleSelectMicrobe)
    * [~handleSelectVaccine(vx)](#App..handleSelectVaccine)
    * [~handleSelectManufacturer(manufacturer)](#App..handleSelectManufacturer)
    * [~handleSelectAccreditation(accreditation)](#App..handleSelectAccreditation)
    * [~getVaccineById(vaccineId)](#App..getVaccineById) ⇒ <code>object</code>
    * [~getMicrobeByVaccine(vaccine)](#App..getMicrobeByVaccine) ⇒ <code>object</code>
    * [~getCountriesByVaccine(vx)](#App..getCountriesByVaccine) ⇒ <code>string</code>
    * [~getRecommendationByVaccine(vx)](#App..getRecommendationByVaccine) ⇒ <code>string</code>
    * [~getVaccinesByAccreditation()](#App..getVaccinesByAccreditation) ⇒ <code>Array</code>
    * [~getVaccinesByManufacturer()](#App..getVaccinesByManufacturer) ⇒ <code>Array</code>
    * [~convertCamelCaseToReadable(string)](#App..convertCamelCaseToReadable) ⇒ <code>string</code>
    * [~italizeScientificNames(text)](#App..italizeScientificNames) ⇒ <code>JSX.Element</code>

<a name="App..handleSearch"></a>

### App~handleSearch(keyword)
Handles the search input change.

**Kind**: inner method of [<code>App</code>](#App)  

| Param | Type | Description |
| --- | --- | --- |
| keyword | <code>string</code> | The search keyword. |

<a name="App..handleSelectMicrobe"></a>

### App~handleSelectMicrobe(microbe)
Handles selecting a microbe.

**Kind**: inner method of [<code>App</code>](#App)  

| Param | Type | Description |
| --- | --- | --- |
| microbe | <code>object</code> | The selected microbe object. |

<a name="App..handleSelectVaccine"></a>

### App~handleSelectVaccine(vx)
Handles selecting a vaccine.

**Kind**: inner method of [<code>App</code>](#App)  

| Param | Type | Description |
| --- | --- | --- |
| vx | <code>object</code> | The selected vaccine object. |

<a name="App..handleSelectManufacturer"></a>

### App~handleSelectManufacturer(manufacturer)
Handles selecting a manufacturer.

**Kind**: inner method of [<code>App</code>](#App)  

| Param | Type | Description |
| --- | --- | --- |
| manufacturer | <code>object</code> | The selected manufacturer object. |

<a name="App..handleSelectAccreditation"></a>

### App~handleSelectAccreditation(accreditation)
Handles selecting an accreditation.

**Kind**: inner method of [<code>App</code>](#App)  

| Param | Type | Description |
| --- | --- | --- |
| accreditation | <code>string</code> | The selected accreditation. |

<a name="App..getVaccineById"></a>

### App~getVaccineById(vaccineId) ⇒ <code>object</code>
Retrieves a vaccine by its ID.

**Kind**: inner method of [<code>App</code>](#App)  
**Returns**: <code>object</code> - The vaccine object.  

| Param | Type | Description |
| --- | --- | --- |
| vaccineId | <code>string</code> | The ID of the vaccine. |

<a name="App..getMicrobeByVaccine"></a>

### App~getMicrobeByVaccine(vaccine) ⇒ <code>object</code>
Retrieves the microbe associated with a vaccine.

**Kind**: inner method of [<code>App</code>](#App)  
**Returns**: <code>object</code> - The microbe object.  

| Param | Type | Description |
| --- | --- | --- |
| vaccine | <code>object</code> | The vaccine object. |

<a name="App..getCountriesByVaccine"></a>

### App~getCountriesByVaccine(vx) ⇒ <code>string</code>
Retrieves the countries associated with a vaccine.

**Kind**: inner method of [<code>App</code>](#App)  
**Returns**: <code>string</code> - Comma-separated list of countries.  

| Param | Type | Description |
| --- | --- | --- |
| vx | <code>object</code> | The vaccine object. |

<a name="App..getRecommendationByVaccine"></a>

### App~getRecommendationByVaccine(vx) ⇒ <code>string</code>
Retrieves the recommendation associated with a vaccine.

**Kind**: inner method of [<code>App</code>](#App)  
**Returns**: <code>string</code> - The recommendation.  

| Param | Type | Description |
| --- | --- | --- |
| vx | <code>object</code> | The vaccine object. |

<a name="App..getVaccinesByAccreditation"></a>

### App~getVaccinesByAccreditation() ⇒ <code>Array</code>
Retrieves vaccines by accreditation.

**Kind**: inner method of [<code>App</code>](#App)  
**Returns**: <code>Array</code> - List of vaccines with the selected accreditation.  
<a name="App..getVaccinesByManufacturer"></a>

### App~getVaccinesByManufacturer() ⇒ <code>Array</code>
Retrieves vaccines by manufacturer.

**Kind**: inner method of [<code>App</code>](#App)  
**Returns**: <code>Array</code> - List of vaccines from the selected manufacturer.  
<a name="App..convertCamelCaseToReadable"></a>

### App~convertCamelCaseToReadable(string) ⇒ <code>string</code>
Converts camel case strings to readable format.

**Kind**: inner method of [<code>App</code>](#App)  
**Returns**: <code>string</code> - The readable string.  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>string</code> | The camel case string. |

<a name="App..italizeScientificNames"></a>

### App~italizeScientificNames(text) ⇒ <code>JSX.Element</code>
Italizes scientific names in a given text.

**Kind**: inner method of [<code>App</code>](#App)  
**Returns**: <code>JSX.Element</code> - The text with scientific names italicized.  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | The text containing scientific names. |

