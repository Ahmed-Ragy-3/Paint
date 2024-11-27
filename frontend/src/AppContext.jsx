import React, { createContext, useContext, useRef, useState } from 'react';
import { Transformer } from 'react-konva';

// Create the context
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [data, setData] = useState([])
  const [currentShape, setCurrentShape] = useState(null)
  const [activeTool, setActiveTool] = useState("")
  const [initialPoint, setInitialPoint] = useState([0, 0])
  const [isDrawing, setIsDrawing] = useState(false)
  const [secondPointDone,setSecondPointDone]= useState(false);

  
  const [styleBar, setStyleBar] = useState({
    opacity: 0,
    strokeColor: "#ffffff",
    strokeWidth: 0,
    fillColor: "#ffffff",
    height: 0,
    width: 0,
    link: false,
    
  });
  

  return (
    <AppContext.Provider
      value={{
        initialPoint, setInitialPoint,
        currentShape, setCurrentShape,
        data, setData,
        activeTool, setActiveTool,
        isDrawing, setIsDrawing,
        secondPointDone, setSecondPointDone,
        styleBar, setStyleBar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access the context
export const useAppContext = () => useContext(AppContext);
