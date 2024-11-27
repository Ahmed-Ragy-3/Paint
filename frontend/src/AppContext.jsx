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
  const [data, setData] = useState([])
  const [activeTool, setActiveTool] = useState("")
  const [fillColor, setFillColor] = useState('#ffffff');
  const [isDrawing, setIsDrawing] = useState(true)
  const [initialPoint, setInitialPoint] = useState([0, 0]);
  const [secondPointDone,setSecondPointDone]= useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userText, setUserText] = useState('');

  return (
    <AppContext.Provider
      value={{
        initialPoint, setInitialPoint,
        shapeDone, setShapeDone,
        currentShape, setCurrentShape,
        selectedShape, setSelectedShape,
        data, setData,
        activeTool, setActiveTool,
        fillColor, setFillColor,
        isDrawing, setIsDrawing,
        secondPointDone, setSecondPointDone,
        isEditing, setIsEditing,
        userText, setUserText
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access the context
export const useAppContext = () => useContext(AppContext);
