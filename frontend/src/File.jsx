import React, { useState } from 'react';
import { useAppContext } from './AppContext';

import file from './assets/file.svg';

function File() {
  const { data, setData } = useAppContext();
  const [showButtons, setShowButtons] = useState(false);

  const jsonFileInputRef = React.createRef();
  const xmlFileInputRef = React.createRef();

  const handleLoadJSON = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const parsedData = JSON.parse(reader.result);
        setData(parsedData);
      };
      reader.readAsText(file);
    }

    console.log(data);
    
  };
  
  function XMLToJSON(xmlString) {
    // can't do
  }
  
  const handleLoadXML = (e) => {
   const file = e.target.files[0];
   if (file) {
     const reader = new FileReader();
     reader.onload = () => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(reader.result, 'application/xml');
      setData(XMLToJSON(xmlDoc));
     };
     reader.readAsText(file);
   }
 };

  const handleSaveJSON = () => {
    const jsonData = data
    const blob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'data.json';
    link.click();
  };

  function jsonToXml(json, rootElement = 'root') {
    const xmlDocument = document.implementation.createDocument('', rootElement, null);
  
    function convertJsonToXml(jsonObj, parentElement) {
      for (const key in jsonObj) {
        if (jsonObj.hasOwnProperty(key)) {
          const value = jsonObj[key];
  
          // Create a new key if it's invalid for an XML tag name
          let validKey = key;
          if (!/^[A-Za-z_][A-Za-z0-9_-]*$/.test(key)) {
            validKey = `item_${key}`; // Modify the key to make it a valid tag name
          }
  
          // Create a new element for each key in the JSON
          const element = xmlDocument.createElement(validKey);
  
          if (typeof value === 'object' && !Array.isArray(value)) {
            // Recursively process objects
            convertJsonToXml(value, element);
          } else if (Array.isArray(value)) {
            // Handle arrays by creating multiple elements for the same key
            value.forEach((item, index) => {
              const arrayElement = xmlDocument.createElement(`${validKey}_${index}`);
              convertJsonToXml(item, arrayElement);
              element.appendChild(arrayElement);
            });
          } else {
            // Set primitive values (string, number, etc.)
            const textNode = xmlDocument.createTextNode(value);
            element.appendChild(textNode);
          }
  
          // Append the created element to the parent
          parentElement.appendChild(element);
        }
      }
    }
  
    // Start the conversion from the root
    convertJsonToXml(json, xmlDocument.documentElement);
  
    // Use XMLSerializer to convert the DOM to an XML string
    const serializer = new XMLSerializer();
    return serializer.serializeToString(xmlDocument);
  }

  const handleSaveXML = () => {
    const xmlString = jsonToXml(data, 'root'); 
    const blob = new Blob([xmlString], { type: 'application/xml' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'data.xml';
    link.click();
  };

  return (
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <div>
        <button 
        style={{
          height : '100%',
          backgroundColor : 'transparent',
          border : 'none',
          marginTop : '5px',
          marginLeft : '5px',
          cursor: 'pointer'

        }}
        onClick={() => setShowButtons(!showButtons)}>
          <img src={file} alt="unlink" />
        </button>
      </div>

      {showButtons && (
        <div style={{display: 'flex', flexDirection: 'row', marginTop: '16px', gap: '5px'}}>
          <div>
            <button 
              style={{
                backgroundColor: '#515151',
                color: '#D4D4D4',
                padding: '5px 10px',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Roboto',
                fontSize: '16px',
                marginBottom: '10px',
              }}
              onClick={() => jsonFileInputRef.current.click()}>Load JSON</button>
            <input
              type="file"
              accept=".json"
              ref={jsonFileInputRef}
              style={{ display: 'none' }}
              onChange={handleLoadJSON}
            />
          </div>

          <div>
            <button 
            style={{
              backgroundColor: '#515151',
              color: '#D4D4D4',
              padding: '5px 10px',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Roboto',
              fontSize: '16px',
              marginBottom: '10px',
            }}
            onClick={() => xmlFileInputRef.current.click()}>Load XML</button>
            <input
              type="file"
              accept=".xml"
              ref={xmlFileInputRef}
              style={{ display: 'none' }}
              onChange={handleLoadXML}
            />
          </div>

          <div>
            <button 
            style={{
              backgroundColor: '#515151',
              color: '#D4D4D4',
              padding: '5px 10px',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Roboto',
              fontSize: '16px',
              marginBottom: '10px',
            }}
            onClick={handleSaveJSON}>Save JSON</button>
          </div>

          <div>
            <button 
            style={{
              backgroundColor: '#515151',
              color: '#D4D4D4',
              padding: '5px 10px',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Roboto',
              fontSize: '16px',
              marginBottom: '10px',
            }}
            onClick={handleSaveXML}>Save XML</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default File;
