## Objects

<dl>
<dt><a href="#Footer">Footer</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Footer Component</p>
</dd>
<dt><a href="#Header">Header</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Header Component</p>
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
<dt><a href="#Alphabets">Alphabets(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>A component that renders a list of alphabet letters as clickable items.
Highlights the active filter alphabet and triggers a callback function when an alphabet is clicked.</p>
</dd>
</dl>

<a name="Footer"></a>

## Footer ⇒ <code>JSX.Element</code>
Footer Component

**Kind**: global namespace  
**Returns**: <code>JSX.Element</code> - The Footer component that displays the footer and contact information.  
**Component**:   
**Example**  
```js
// Example usage of Footer component
<Footer />
```
<a name="Header"></a>

## Header ⇒ <code>JSX.Element</code>
Header Component

**Kind**: global namespace  
**Returns**: <code>JSX.Element</code> - The Header component that displays the main title and a welcome message.  
**Component**:   
**Example**  
```js
// Example usage of Header component
<Header />
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
| props.sidebarList | <code>Array</code> | List of items (manufacturers, vaccines, or pathogens) available for selection. |
| props.activeTab | <code>string</code> | The type of details to display ('Pathogen', 'Vaccine', 'Manufacturer', 'Licenser'). |
| props.activeFilters | <code>Object</code> | The current active filters. |
| props.setActiveFilters | <code>Object</code> | Sets the current active filters. |
| props.handleSelectPathogen | <code>function</code> | Function to handle the selection of a pathogen. |
| props.handleSelectVaccine | <code>function</code> | Function to handle the selection of a vaccine. |
| props.handleSelectLicenser | <code>function</code> | Function to handle the selection of an licenser. |
| props.getPathogenByVaccine | <code>function</code> | Function to get the pathogen associated with a vaccine. |
| props.getVaccinesByManufacturer | <code>function</code> | Function to get vaccines associated with a manufacturer. |
| props.getVaccinesByLicenser | <code>function</code> | Function to get vaccines associated with an licenser. |
| props.changedFrom | <code>String</code> | The param where the selected item change took place |
| props.italizeScientificNames | <code>function</code> | Function to italicize scientific names in descriptions. |
| props.convertCamelCaseToReadable | <code>function</code> | Function to convert camel case strings to a readable format. |
| props.getLicenserById | <code>function</code> | Function to retrieve licenser details by ID. |

**Example**  
```js
// Example usage of Main component
<Main
   selectedPathogen={{ name: 'COVID-19', description: '...' }}
   selectedVaccine={{ name: 'VaccineX', description: '...', link: '...', lastUpdated: '...' }}
   selectedManufacturer={{ name: 'ManufacturerY', description: '...' }}
   selectedLicenser='LicenserZ'
   sidebarList={[{ name: 'ItemA' }, { name: 'ItemB' }]}
   activeTab='Pathogen'
   activeFilters={activeFilters}
   setActiveFilters={filters=>console.log(activeFilters)}
   handleSelectPathogen={(pathogen) => console.log(pathogen)}
   handleSelectVaccine={(vaccine) => console.log(vaccine)}
   handleSelectLicenser={(licenser) => console.log(licenser)}
   getPathogenByVaccine={(vaccine) => ({ name: 'VirusX' })}
   getVaccinesByManufacturer={() => [{ name: 'Vaccine1' }]}
   getVaccinesByLicenser={() => [{ name: 'Vaccine2' }]}
   changedFrom='Sidebar'
   italizeScientificNames={(text) => <i>{text}</i>}
   convertCamelCaseToReadable={(text) => text.replace(/([a-z])([A-Z])/g, '$1 $2')}
   getLicenserById={(id) => ({ licenserId: id, name: 'LicenserZ' })}
/>
```
<a name="Sidebar"></a>

## Sidebar ⇒ <code>JSX.Element</code>
Sidebar Component

A component that displays a sidebar for selecting manufacturers, products, or pathogens. It supports changing the active tab and handling item selection.

**Kind**: global namespace  
**Returns**: <code>JSX.Element</code> - The Sidebar component for selecting items and updating the main based on the active tab.  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | The component accepts various props to handle sidebar functionality. |
| props.activeTab | <code>string</code> | The currently active tab, which can be 'Manufacturer', 'Vaccine', or 'Pathogen'. |
| props.setActiveTab | <code>function</code> | Function to set the type of details to be displayed ('Manufacturer', 'Vaccine', or 'Pathogen'). |
| props.sidebarList | <code>Array</code> | List of items (manufacturers, products, or pathogens) available for selection. |
| props.selectedVaccine | <code>Object</code> | The currently selected vaccine. |
| props.selectedPathogen | <code>Object</code> | The currently selected pathogen. |
| props.selectedManufacturer | <code>Object</code> | The currently selected manufacturer. |
| props.selectedLicenser | <code>Object</code> | The currently selected licenser. |
| props.setSelectedVaccine | <code>function</code> | Function to update the selected vaccine. |
| props.setSelectedPathogen | <code>function</code> | Function to update the selected pathogen. |
| props.setSelectedManufacturer | <code>function</code> | Function to update the selected manufacturer. |
| props.setSelectedLicenser | <code>function</code> | Function to update the selected licenser. |
| props.changedFrom | <code>String</code> | The param where the selected item change took place |
| props.setChangedFrom | <code>function</code> | Function to set the source of the change triggering the main update. |
| props.italizeScientificNames | <code>function</code> | Function that converts scientific names in the description to italicized text. |

**Example**  
```js
// Example usage of Sidebar component
<Sidebar 
   activeTab="Manufacturer"
   setActiveTab={(type) => console.log(type)}
   sidebarList={[{ name: 'ItemA' }, { name: 'ItemB' }]}
   selectedManufacturer={{ name: 'ItemA' }}
   selectedVaccine={{ name: 'ItemB' }}
   selectedPathogen={{ name: 'ItemC' }}
   selectedLicenser={{ name: 'ItemC' }}
   setSelectedManufacturer={(item) => console.log(item)}
   setSelectedVaccine={(item) => console.log(item)}
   setSelectedPathogen={(item) => console.log(item)}
   setSelectedLicenser={(item) => console.log(item)}
   changedFrom='Sidebar'
   setChangedFrom={(source) => console.log(source)}
   italizeScientificNames={text => text.replace(/(SARS-CoV-2)/g, '<i>$1</i>')}
/>
```
<a name="TopBar"></a>

## TopBar : <code>object</code>
TopBar Component

**Kind**: global namespace  
**Component**:   
**Example**  
```js
Example usage of TopBar component
<TopBar 
/>
```
<a name="Alphabets"></a>

## Alphabets(props) ⇒ <code>JSX.Element</code>
A component that renders a list of alphabet letters as clickable items.
Highlights the active filter alphabet and triggers a callback function when an alphabet is clicked.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - The rendered component.  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | The props object. |
| props.activeFilters | <code>Object</code> | The current active filters. |
| props.activeFilters.firstAlphabet | <code>string</code> | The currently selected alphabet for filtering. |
| props.handleAlphabetChange | <code>function</code> | The function to call when an alphabet is clicked. |

**Example**  
```js
const activeFilters = { firstAlphabet: 'A' };
const handleAlphabetChange = (letter) => {  
  return (
    <Alphabets 
      activeFilters={activeFilters}
      handleAlphabetChange={handleAlphabetChange}
    />
  );
};
```
