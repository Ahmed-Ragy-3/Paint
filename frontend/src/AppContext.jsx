import React, { createContext, useContext, useState } from 'react';

// Create the context
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [data, setData] = useState([])
  const [currentShape, setCurrentShape] = useState(null)
  const [activeTool, setActiveTool] = useState("")
  
  const [initialPoint, setInitialPoint] = useState([0, 0])
  const [shapeDone, setShapeDone] = useState(false)

  const [isDrawing, setIsDrawing] = useState(false)
  
  const [selectedShape, setSelectedShape] = useState(null)
  const [secondPointDone,setSecondPointDone]= useState(false)
  

  const [styleBar, setStyleBar] = useState({
    fillColor: '#e6e6e6',
    width: 10,
    height: 10,
    ratio: 1,
    link: false,
    opacity: 1,
    strokeColor: '#000000',
    strokeWidth: 5,
  });

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
        
        styleBar, setStyleBar,
        isDrawing, setIsDrawing
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access the context
export const useAppContext = () => useContext(AppContext);
