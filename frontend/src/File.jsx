import React, { useState } from 'react';
import { useAppContext } from './AppContext';

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
  
  const XMLToJSON = (e) =>  {
    const obj = {};

    if (xml.nodeType === 1) {
      if (xml.attributes.length > 0) {
        obj['@attributes'] = {};
        for (let i = 0; i < xml.attributes.length; i++) {
          const attr = xml.attributes.item(i);
          obj['@attributes'][attr.nodeName] = attr.nodeValue;
        }
      }
    }

    if (xml.hasChildNodes()) {
      for (let i = 0; i < xml.childNodes.length; i++) {
        const item = xml.childNodes.item(i);
        const nodeName = item.nodeName;

        if (typeof obj[nodeName] === 'undefined') {
          obj[nodeName] = XMLToJSON(item);
        } else {
          if (Array.isArray(obj[nodeName])) {
            obj[nodeName].push(XMLToJSON(item));
          } else {
            obj[nodeName] = [obj[nodeName], XMLToJSON(item)];
          }
        }
      }
    } else {
      obj = xml.nodeValue;
    }

    return obj;
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

  function JSONToXML(json) {
    let xml = '';
  
    for (const key in json) {
      if (json.hasOwnProperty(key)) {
        const value = json[key];
  
        if (Array.isArray(value)) {
          // Handle arrays by wrapping them in their own tags
          value.forEach((item) => {
            xml += `<${key}>${JSONToXML(item)}</${key}>`;
          });
        } else if (typeof value === 'object') {
          // Recursively process objects
          xml += `<${key}>${JSONToXML(value)}</${key}>`;
        } else {
          // Handle primitive values (strings, numbers, etc.)
          xml += `<${key}>${value}</${key}>`;
        }
      }
    }
  
    return xml;
  }

  const handleSaveXML = () => {
    const xmlString = JSONToXML(data); 
    const blob = new Blob([xmlString], { type: 'application/xml' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'data.xml';
    link.click();
  };

  return (
    <div>
      <div>
        <button onClick={() => setShowButtons(!showButtons)}>
          📂
        </button>
      </div>

      {showButtons && (
        <div>
          <div>
            <button onClick={() => jsonFileInputRef.current.click()}>Load JSON File</button>
            <input
              type="file"
              accept=".json"
              ref={jsonFileInputRef}
              style={{ display: 'none' }}
              onChange={handleLoadJSON}
            />
          </div>

          <div>
            <button onClick={() => xmlFileInputRef.current.click()}>Load XML File</button>
            <input
              type="file"
              accept=".xml"
              ref={xmlFileInputRef}
              style={{ display: 'none' }}
              onChange={handleLoadXML}
            />
          </div>

          <div>
            <button onClick={handleSaveJSON}>Save JSON File</button>
          </div>

          <div>
            <button onClick={handleSaveXML}>Save XML File</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default File;
