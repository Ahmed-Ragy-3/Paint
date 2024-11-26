import React, { createContext, useState, useContext } from 'react';

// Create the context
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [initialPoint, setInitialPoint] = useState([0, 0])
  const [shapeDone, setShapeDone] = useState(false)
  const [currentShape, setCurrentShape] = useState(null)
  const [selectedShape, setSelectedShape] = useState(null)
  const [secondPointDone,setSecondPointDone]= useState(false)
  const [data, setData] = useState([])
  const [activeTool, setActiveTool] = useState("")
  const [fillColor, setFillColor] = useState('#ffffff');

  return (
    <AppContext.Provider
      value={{
        initialPoint, setInitialPoint,
        shapeDone, setShapeDone,
        currentShape, setCurrentShape,
        selectedShape, setSelectedShape,
        secondPointDone, setSecondPointDone,
        data, setData,
        activeTool, setActiveTool,
        fillColor, setFillColor,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access the context
export const useAppContext = () => useContext(AppContext);
