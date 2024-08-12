## Objects

<dl>
<dt><a href="#Header">Header</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Header Component</p>
</dd>
<dt><a href="#Licenser">Licenser</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Licenser Component</p>
</dd>
<dt><a href="#Manufacturer">Manufacturer</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>ManufacturerProfile Component</p>
</dd>
<dt><a href="#Pathogen">Pathogen</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Pathogen Component</p>
</dd>
<dt><a href="#Vaccine">Vaccine</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>VaccineInformation Component</p>
</dd>
<dt><a href="#VaccineListTable">VaccineListTable</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>VaccineListTable Component</p>
</dd>
<dt><a href="#Main">Main</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Main Component</p>
</dd>
<dt><a href="#Sidebar">Sidebar</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Sidebar Component</p>
<p>A component that displays a sidebar for selecting manufacturers, products, or pathogens. It supports changing the active tab and handling item selection.</p>
</dd>
<dt><a href="#TopBar">TopBar</a> : <code>object</code></dt>
<dd><p>TopBar Component</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#App">App()</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>This is the main component of the vaccine profile application. It manages the state of selected items, 
handles user interactions, and renders the Header, Sidebar, Main, and other components. It 
is the entry point into the application.</p>
</dd>
<dt><a href="#filterManufacturers">filterManufacturers(keywordLower)</a> ⇒ <code>Array</code></dt>
<dd><p>Filters the list of manufacturers based on the search keyword.</p>
<p>This function filters manufacturers and also checks related vaccines and pathogens for matches with the search keyword.</p>
</dd>
<dt><a href="#filterVaccines">filterVaccines(keyword)</a> ⇒ <code>Array</code></dt>
<dd><p>Filters the list of vaccines based on the search keyword.</p>
<p>This function filters vaccines and also checks related pathogens and manufacturers for matches with the search keyword.</p>
</dd>
<dt><a href="#filterPathogens">filterPathogens(keyword)</a> ⇒ <code>Array</code></dt>
<dd><p>Filters the list of pathogens based on the search keyword.</p>
<p>This function filters pathogens and also checks related vaccines and manufacturers for matches with the search keyword.</p>
</dd>
<dt><a href="#filterPathogens">filterPathogens(keyword)</a> ⇒ <code>Array</code></dt>
<dd><p>Filters the list of pathogens based on the search keyword.</p>
<p>This function filters pathogens and also checks related vaccines and manufacturers for matches with the search keyword.</p>
</dd>
<dt><a href="#filterLists">filterLists()</a> ⇒ <code>void</code></dt>
<dd><p>Filters the sidebar list based on the currently selected tab and search keyword.</p>
<p>This function determines which filtering function to use based on the active tab and updates the <code>sidebarList</code> state
with the filtered list of items that match the search criteria.</p>
</dd>
</dl>

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
<a name="Licenser"></a>

## Licenser ⇒ <code>JSX.Element</code>
Licenser Component

**Kind**: global namespace  
**Returns**: <code>JSX.Element</code> - The Licenser Information component.  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | The component accepts handleSelectVaccine, selectedLicenser, and getVaccinesByLicenser as props. |
| props.handleSelectVaccine | <code>function</code> | Function that gets triggered once a vaccine is selected. |
| props.selectedLicenser | <code>string</code> | The licenser that is selected. |
| props.getVaccinesByLicenser | <code>function</code> | Function that gets a list of vaccines for a specific licenser. |

**Example**  
```js
// Render the Licenser component with dummy data and functions<Licenser   handleSelectVaccine={vaccineName => console.log('Selected vaccine:', vaccineName)}  selectedLicenser="FDA"  getVaccinesByLicenser={() => [    { name: 'Vaccine A', vaccineType: 'Type 1', comments: 'Effective', revenue: '$1M' },    { name: 'Vaccine B', vaccineType: 'Type 2', comments: 'Moderate', revenue: '$500K' }  ]}/>
```
<a name="Manufacturer"></a>

## Manufacturer ⇒ <code>JSX.Element</code>
ManufacturerProfile Component

**Kind**: global namespace  
**Returns**: <code>JSX.Element</code> - The Manufacturer Information component.  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | The component accepts selectedManufacturer and convertCamelCaseToReadable as props. |
| props.selectedManufacturer | <code>Object</code> | The manufacturer information object. |
| props.selectedManufacturer.name | <code>string</code> | The name of the manufacturer. |
| props.selectedManufacturer.description | <code>string</code> | The description of the manufacturer. |
| props.selectedManufacturer.details | <code>Object</code> | Additional information about the manufacturer. |
| props.selectedManufacturer.details.sources | <code>Array.&lt;Object&gt;</code> | List of sources related to the manufacturer. |
| props.convertCamelCaseToReadable | <code>function</code> | Function that converts camel case strings to a readable format. |

**Example**  
```js
// Render the ManufacturerProfile component with dummy data and function<ManufacturerProfile   selectedManufacturer={{    name: 'Manufacturer X',    description: 'A leading manufacturer in the industry.',    information: {      type: 'Biotechnology',      country: 'USA',      sources: [        { title: 'Source 1', link: 'http://source1.com', lastUpdated: '2024-01-01' },        { title: 'Source 2', link: 'http://source2.com', lastUpdated: '2024-02-01' }      ]    }  }}  convertCamelCaseToReadable={key => key.replace(/([A-Z])/g, ' $1').toLowerCase()}/>
```
<a name="Pathogen"></a>

## Pathogen ⇒ <code>JSX.Element</code>
Pathogen Component

**Kind**: global namespace  
**Returns**: <code>JSX.Element</code> - The Pathogen Information component.  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | The component accepts selectedPathogen and italizeScientificNames as props. |
| props.selectedPathogen | <code>Object</code> | The selected pathogen object containing its details. |
| props.selectedPathogen.name | <code>string</code> | The name of the selected pathogen. |
| props.selectedMPathogen.description | <code>string</code> | The description of the selected pathogen. |
| props.italizeScientificNames | <code>function</code> | Function that converts scientific names in the description to italicized text. |

**Example**  
```js
// Example usage of Pathogen component<Pathogen    selectedPathogen={{        name: 'COVID-19',        description: 'Severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2) is the virus that causes COVID-19.'   }}    italizeScientificNames={text => text.replace(/(SARS-CoV-2)/g, '<i>$1</i>')} />
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
<a name="VaccineListTable"></a>

## VaccineListTable ⇒ <code>JSX.Element</code>
VaccineListTable Component

**Kind**: global namespace  
**Returns**: <code>JSX.Element</code> - The Manufacturer Information Table component.  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | The component accepts activeTab, selectedPathogen, selectedVaccine, selectedLicenser, and several handler and data functions as props. |
| props.activeTab | <code>string</code> | The type of detail currently selected, e.g., "Vaccine", "Pathogen", or "Licenser". |
| props.selectedPathogen | <code>Object</code> | The currently selected pathogen object. |
| props.selectedVaccine | <code>Object</code> | The currently selected vaccine object. |
| props.selectedLicenser | <code>string</code> | The currently selected licenser. |
| props.handleSelectPathogen | <code>function</code> | Function that gets triggered when a pathogen is selected. |
| props.handleSelectVaccine | <code>function</code> | Function that gets triggered when a vaccine is selected. |
| props.handleSelectLicenser | <code>function</code> | Function that gets triggered when an licenser is selected. |
| props.getVaccinesByManufacturer | <code>function</code> | Function that returns a list of vaccines based on the manufacturer. |
| props.getPathogenByVaccine | <code>function</code> | Function that returns the pathogen associated with a specific vaccine. |
| props.getLicenserById | <code>function</code> | Function to retrieve licenser details by ID. |

**Example**  
```js
// Render the VaccineListTable component with dummy data and functions<VaccineListTable   activeTab="Vaccine"  selectedPathogen={{ name: 'Pathogen X' }}  selectedVaccine={{ name: 'Vaccine Y' }}  selectedLicenser="Licenser Z"  handleSelectPathogen={pathogen => console.log('Pathogen selected:', pathogen)}  handleSelectVaccine={vaccine => console.log('Vaccine selected:', vaccine)}  handleSelectLicenser={licenser => console.log('Licenser selected:', licenser)}  getVaccinesByManufacturer={() => [{ name: 'Vaccine Y', licenser: ['Licenser Z'] }]}  getPathogenByVaccine={vaccine => ({ name: 'Pathogen X' })}  getLicenserById={(id) => ({ licenserId: id, name: 'LicenserZ' })}/>
```
<a name="Main"></a>

## Main ⇒ <code>JSX.Element</code>
Main Component

**Kind**: global namespace  
**Returns**: <code>JSX.Element</code> - The Main component displaying detailed information based on the selected type and filters.  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | The component accepts various props to handle the display of information. |
| props.selectedPathogen | <code>Object</code> | The currently selected pathogen. |
| props.selectedVaccine | <code>Object</code> | The currently selected vaccine. |
| props.selectedManufacturer | <code>Object</code> | The currently selected manufacturer. |
| props.selectedLicenser | <code>Object</code> | The currently selected licenser. |
| props.activeTab | <code>string</code> | The type of details to display ('Pathogen', 'Vaccine', 'Manufacturer', 'Licenser'). |
| props.handleSelectPathogen | <code>function</code> | Function to handle the selection of a pathogen. |
| props.handleSelectVaccine | <code>function</code> | Function to handle the selection of a vaccine. |
| props.handleSelectLicenser | <code>function</code> | Function to handle the selection of an licenser. |
| props.getPathogenByVaccine | <code>function</code> | Function to get the pathogen associated with a vaccine. |
| props.getVaccinesByManufacturer | <code>function</code> | Function to get vaccines associated with a manufacturer. |
| props.getVaccinesByLicenser | <code>function</code> | Function to get vaccines associated with an licenser. |
| props.italizeScientificNames | <code>function</code> | Function to italicize scientific names in descriptions. |
| props.convertCamelCaseToReadable | <code>function</code> | Function to convert camel case strings to a readable format. |
| props.getLicenserById | <code>function</code> | Function to retrieve licenser details by ID. |
| props.changedFrom | <code>string</code> | Source of the change triggering the main update. |

**Example**  
```js
// Example usage of Main component<Main   selectedPathogen={{ name: 'COVID-19', description: '...' }}   selectedVaccine={{ name: 'VaccineX', description: '...', link: '...', lastUpdated: '...' }}   selectedManufacturer={{ name: 'ManufacturerY', description: '...' }}   selectedLicenser='LicenserZ'   activeTab='Pathogen'   handleSelectPathogen={(pathogen) => console.log(pathogen)}   handleSelectVaccine={(vaccine) => console.log(vaccine)}   handleSelectLicenser={(licenser) => console.log(licenser)}   getPathogenByVaccine={(vaccine) => ({ name: 'VirusX' })}   getVaccinesByManufacturer={() => [{ name: 'Vaccine1' }]}   getVaccinesByLicenser={() => [{ name: 'Vaccine2' }]}   italizeScientificNames={(text) => <i>{text}</i>}   convertCamelCaseToReadable={(text) => text.replace(/([a-z])([A-Z])/g, '$1 $2')}   changedFrom='Sidebar'   getLicenserById={(id) => ({ licenserId: id, name: 'LicenserZ' })}/>
```
<a name="Sidebar"></a>

## Sidebar ⇒ <code>JSX.Element</code>
Sidebar ComponentA component that displays a sidebar for selecting manufacturers, products, or pathogens. It supports changing the active tab and handling item selection.

**Kind**: global namespace  
**Returns**: <code>JSX.Element</code> - The Sidebar component for selecting items and updating the main based on the active tab.  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | The component accepts various props to handle sidebar functionality. |
| props.activeTab | <code>string</code> | The currently active tab, which can be 'Manufacturer', 'Product', or 'Pathogen'. |
| props.setActiveTab | <code>function</code> | Function to set the type of details to be displayed ('Manufacturer', 'Product', or 'Pathogen'). |
| props.sidebarList | <code>Array</code> | List of items (manufacturers, products, or pathogens) available for selection. |
| props.selectedVaccine | <code>Object</code> | The currently selected product (vaccine). |
| props.selectedPathogen | <code>Object</code> | The currently selected pathogen. |
| props.selectedManufacturer | <code>Object</code> | The currently selected manufacturer. |
| props.selectedLicenser | <code>Object</code> | The currently selected licenser. |
| props.setSelectedVaccine | <code>function</code> | Function to update the selected product (vaccine). |
| props.setSelectedPathogen | <code>function</code> | Function to update the selected pathogen. |
| props.setSelectedManufacturer | <code>function</code> | Function to update the selected manufacturer. |
| props.setSelectedLicenser | <code>function</code> | Function to update the selected licenser. |
| props.setChangedFrom | <code>function</code> | Function to set the source of the change triggering the main update. |

**Example**  
```js
// Example usage of Sidebar component<Sidebar    activeTab="Manufacturer"   setActiveTab={(type) => console.log(type)}   sidebarList={[{ name: 'ItemA' }, { name: 'ItemB' }]}   selectedManufacturer={{ name: 'ItemA' }}   selectedVaccine={{ name: 'ItemB' }}   selectedPathogen={{ name: 'ItemC' }}   selectedLicenser={{ name: 'ItemC' }}   setSelectedManufacturer={(item) => console.log(item)}   setSelectedVaccine={(item) => console.log(item)}   setSelectedPathogen={(item) => console.log(item)}   setSelectedLicenser={(item) => console.log(item)}   setChangedFrom={(source) => console.log(source)}/>
```
<a name="Sidebar..handleClickSidebar"></a>

### Sidebar~handleClickSidebar(item)
Handles the click events for sidebar items based on the active tab.It selects or unselects an item depending on the current selection state.The behavior varies depending on whether the item belongs to the Manufacturer, Product, or Pathogen tab.

**Kind**: inner method of [<code>Sidebar</code>](#Sidebar)  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>Object</code> | The item object that is clicked. |

<a name="TopBar"></a>

## TopBar : <code>object</code>
TopBar Component

**Kind**: global namespace  
**Component**:   
**Example**  
```js
Example usage of TopBar component<TopBar />
```
<a name="App"></a>

## App() ⇒ <code>JSX.Element</code>
This is the main component of the vaccine profile application. It manages the state of selected items, handles user interactions, and renders the Header, Sidebar, Main, and other components. It is the entry point into the application.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - The main application component containing all sub-components and logic.  
**Component**:   
**Example**  
```js
// Example usage of App component<App />
```

* [App()](#App) ⇒ <code>JSX.Element</code>
    * [~getPathogenByVaccine](#App..getPathogenByVaccine) ⇒ <code>object</code>
    * [~getVaccinesByManufacturer](#App..getVaccinesByManufacturer) ⇒ <code>Array</code>
    * [~getVaccineByPathogen](#App..getVaccineByPathogen) ⇒ <code>Array</code>
    * [~getManufacturerByVaccine](#App..getManufacturerByVaccine) ⇒ <code>Array</code>
    * [~getLicenserById](#App..getLicenserById) ⇒ <code>Array</code>
    * [~sortLicensers](#App..sortLicensers) ⇒ <code>Array.&lt;Object&gt;</code>
    * [~handleTabChange(tab)](#App..handleTabChange)
    * [~handleSearch(keyword)](#App..handleSearch)
    * [~handleSelectPathogen(pathogen)](#App..handleSelectPathogen)
    * [~handleSelectVaccine(vx)](#App..handleSelectVaccine)
    * [~handleSelectManufacturer(manufacturer)](#App..handleSelectManufacturer)
    * [~handleSelectLicenser(licenser)](#App..handleSelectLicenser)
    * [~getVaccinesByLicenser()](#App..getVaccinesByLicenser) ⇒ <code>Array</code>
    * [~convertCamelCaseToReadable(string)](#App..convertCamelCaseToReadable) ⇒ <code>string</code>
    * [~italizeScientificNames(text)](#App..italizeScientificNames) ⇒ <code>JSX.Element</code>

<a name="App..getPathogenByVaccine"></a>

### App~getPathogenByVaccine ⇒ <code>object</code>
Retrieves the pathogen associated with a vaccine.

**Kind**: inner constant of [<code>App</code>](#App)  
**Returns**: <code>object</code> - The pathogen object.  

| Param | Type | Description |
| --- | --- | --- |
| vaccine | <code>object</code> | The vaccine object. |

<a name="App..getVaccinesByManufacturer"></a>

### App~getVaccinesByManufacturer ⇒ <code>Array</code>
Retrieves vaccines by manufacturer.

**Kind**: inner constant of [<code>App</code>](#App)  
**Returns**: <code>Array</code> - List of vaccines from the selected manufacturer.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [manufacturer] | <code>Object</code> | <code>selectedManufacturer</code> | The manufacturer object to filter vaccines by. Defaults to `selectedManufacturer` if not provided. |

<a name="App..getVaccineByPathogen"></a>

### App~getVaccineByPathogen ⇒ <code>Array</code>
Retrieves vaccines by pathogen.

**Kind**: inner constant of [<code>App</code>](#App)  
**Returns**: <code>Array</code> - List of vaccines associated with the given pathogen.  

| Param | Type | Description |
| --- | --- | --- |
| pathogen | <code>Object</code> | The pathogen object. |

<a name="App..getManufacturerByVaccine"></a>

### App~getManufacturerByVaccine ⇒ <code>Array</code>
Retrieves manufacturers by vaccine.

**Kind**: inner constant of [<code>App</code>](#App)  
**Returns**: <code>Array</code> - List of manufacturers associated with the given vaccine.  

| Param | Type | Description |
| --- | --- | --- |
| vaccine | <code>Object</code> | The vaccine object. |

<a name="App..getLicenserById"></a>

### App~getLicenserById ⇒ <code>Array</code>
Retrieves licenser by licenserId.

**Kind**: inner constant of [<code>App</code>](#App)  
**Returns**: <code>Array</code> - Licenser associated with the given licenserId.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>Object</code> | The licenserId. |

<a name="App..sortLicensers"></a>

### App~sortLicensers ⇒ <code>Array.&lt;Object&gt;</code>
Sorts a list of licensers with a custom priority for 'AMA', 'EMA', and 'WHO',followed by alphabetical sorting for the rest.The function first prioritizes 'FDA', 'EMA', and 'WHO' in that order. If neitherlicenser is in the custom priority list, it sorts the rest alphabetically by their names.

**Kind**: inner constant of [<code>App</code>](#App)  
**Returns**: <code>Array.&lt;Object&gt;</code> - - The sorted list of licensers.  

| Param | Type | Description |
| --- | --- | --- |
| list | <code>Array.&lt;Object&gt;</code> | The list of licensers to be sorted. |
| list[].name | <code>string</code> | The name of the licenser to be used for sorting. |

**Example**  
```js
const licensers = [    { name: 'WHO' },    { name: 'EMA' },    { name: 'AMA' },    { name: 'FDA' },    { name: 'CDC' }];const sortedLicensers = sortLicensers(licensers);// Result: [ { name: 'FDA' }, { name: 'EMA' }, { name: 'WHO' }, { name: 'CDC' }, { name: 'HSA' } ]
```
<a name="App..handleTabChange"></a>

### App~handleTabChange(tab)
Handles the search input change.

**Kind**: inner method of [<code>App</code>](#App)  

| Param | Type | Description |
| --- | --- | --- |
| tab | <code>string</code> | The selected tab type can be "Manufacturers", "Pathogens" or "Products". |

<a name="App..handleSearch"></a>

### App~handleSearch(keyword)
Handles the search input change.

**Kind**: inner method of [<code>App</code>](#App)  

| Param | Type | Description |
| --- | --- | --- |
| keyword | <code>string</code> | The search keyword. |

<a name="App..handleSelectPathogen"></a>

### App~handleSelectPathogen(pathogen)
Handles selecting a pathogen.

**Kind**: inner method of [<code>App</code>](#App)  

| Param | Type | Description |
| --- | --- | --- |
| pathogen | <code>object</code> | The selected pathogen object. |

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

<a name="App..handleSelectLicenser"></a>

### App~handleSelectLicenser(licenser)
Handles selecting an licenser.

**Kind**: inner method of [<code>App</code>](#App)  

| Param | Type | Description |
| --- | --- | --- |
| licenser | <code>string</code> | The selected licenser. |

<a name="App..getVaccinesByLicenser"></a>

### App~getVaccinesByLicenser() ⇒ <code>Array</code>
Retrieves vaccines by licenser.

**Kind**: inner method of [<code>App</code>](#App)  
**Returns**: <code>Array</code> - List of vaccines with the selected licenser.  
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

<a name="filterManufacturers"></a>

## filterManufacturers(keywordLower) ⇒ <code>Array</code>
Filters the list of manufacturers based on the search keyword.This function filters manufacturers and also checks related vaccines and pathogens for matches with the search keyword.

**Kind**: global function  
**Returns**: <code>Array</code> - - An array of filtered manufacturers.  

| Param | Type | Description |
| --- | --- | --- |
| keywordLower | <code>string</code> | The lowercased search keyword used for filtering. |

<a name="filterVaccines"></a>

## filterVaccines(keyword) ⇒ <code>Array</code>
Filters the list of vaccines based on the search keyword.This function filters vaccines and also checks related pathogens and manufacturers for matches with the search keyword.

**Kind**: global function  
**Returns**: <code>Array</code> - - An array of filtered vaccines.  

| Param | Type | Description |
| --- | --- | --- |
| keyword | <code>string</code> | The lowercased search keyword used for filtering. |

<a name="filterPathogens"></a>

## filterPathogens(keyword) ⇒ <code>Array</code>
Filters the list of pathogens based on the search keyword.This function filters pathogens and also checks related vaccines and manufacturers for matches with the search keyword.

**Kind**: global function  
**Returns**: <code>Array</code> - - An array of filtered pathogens.  

| Param | Type | Description |
| --- | --- | --- |
| keyword | <code>string</code> | The lowercased search keyword used for filtering. |

<a name="filterPathogens"></a>

## filterPathogens(keyword) ⇒ <code>Array</code>
Filters the list of pathogens based on the search keyword.This function filters pathogens and also checks related vaccines and manufacturers for matches with the search keyword.

**Kind**: global function  
**Returns**: <code>Array</code> - - An array of filtered pathogens.  

| Param | Type | Description |
| --- | --- | --- |
| keyword | <code>string</code> | The lowercased search keyword used for filtering. |

<a name="filterLists"></a>

## filterLists() ⇒ <code>void</code>
Filters the sidebar list based on the currently selected tab and search keyword.This function determines which filtering function to use based on the active tab and updates the `sidebarList` statewith the filtered list of items that match the search criteria.

**Kind**: global function  
**Returns**: <code>void</code> - This function does not return a value. It updates the `sidebarList` state directly.  
