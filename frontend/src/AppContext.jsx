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
  const [selectedShapeType, setSelectedShapeType] = useState(null);

  
  const [styleBar, setStyleBar] = useState({
    opacity: 1,
    strokeColor: "#000000",
    strokeWidth: 2,
    fillColor: "#ffffff",
    height: 1,
    width: 1,
    link: false,
    //add here
    radiusX: 1,
    radiusY: 1,
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
        selectedShapeType, setSelectedShapeType
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access the context
export const useAppContext = () => useContext(AppContext);
