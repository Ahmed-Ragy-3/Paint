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

  };
  
  const XMLToJSON = async (xmlString) => {
    try {
      const response = await fetch('http://localhost:8080/canvas/loadXML', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/xml',
        },
        body: xmlString,
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const notModifiedJson = await response.json();

      const json = notModifiedJson.item.map((item) => {
        // Iterate over each key-value pair in the object
        for (const key in item) {
          if (item.hasOwnProperty(key)) {
            // Check if the value is a string that can be converted to a number
            if (!isNaN(item[key]) && item[key] !== null && item[key] !== '') {
              // If it's a valid number, convert to number
              item[key] = key === 'draggable' ? item[key] === "true" : parseFloat(item[key]);
            }
          }
        }
        return item;
      });

    console.log(json);
    
    return json
  
    } catch (error) {
      console.error('Error: ', error);
      return [];
    }
  }
  
  const handleLoadXML = (e) => {
   const file = e.target.files[0];
   if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const xmlString = reader.result;
        const json = await XMLToJSON(xmlString);
        setData(json);
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

  const jsonToXml = async (json) => {
    try {
      const response = await fetch('http://localhost:8080/canvas/saveXML', {
        method: 'POST',
        body: JSON.stringify(json),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const xmlString = await response.text();
      return xmlString
  
    } catch (error) {
      console.error('Error: ', error);
      return '';
    }
  }

  const handleSaveXML = async () => {
    const xmlString = await jsonToXml(data); 
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
