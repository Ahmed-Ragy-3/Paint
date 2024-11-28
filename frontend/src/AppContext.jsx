import React, { createContext, useContext, useState } from 'react';

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

  const [undoStack, setUndoStack] = useState([])
  const [redoStack, setRedoStack] = useState([])
  const [idsStack, setIdsStack]= useState([])

  const [selectedId, setSelectedId] = useState(null)

  function undo() {
    console.log(undoStack)
    if(undoStack.length === 0) {
      return
    }

    const before = data
    const after = undoStack.pop()
    
    setData(after)
    redoStack.push(before)
    setRedoStack(redoStack)

    setUndoStack(undoStack)
  }
  
  function redo() {
    if(redoStack.length === 0) {
      return
    }
    const before = data
    const after = redoStack.pop()

    setData(after)
    undoStack.push(before)

    setRedoStack(redoStack)
    setUndoStack(undoStack)
  }

  function compareObjects(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (let key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }

    return true;
  }

  function compareArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    
    for (let i = 0; i < arr1.length; i++) {
      if (!compareObjects(arr1[i], arr2[i])) return false;
    }
      
    return true;
  }
  
  function equalTop(arr, element) {
    return arr.length !== 0 && compareArrays(element, arr[arr.length - 1])
  }

  function putShapeInId(id, newShape) {
    // console.log("putting in id " + id)
    // console.log("newShape = " + newShape)
    
    if(id === null || id >= data.length) {
      // console.log(".Error in putShapeInId function.")
      // console.log("data.length = " + data.length)
      return
    }

    setData((prevData) => 
      prevData.map((shape) => {

        if (shape && shape.id === id) {
          if (!newShape) {
            return null
          } else {
            return { ...shape, ...newShape }
          }
        } else {
          return shape
        }
      }
      )
    );
  }  
  
  const [styleBar, setStyleBar] = useState({
    opacity: 1,
    strokeColor: "#000000",
    strokeWidth: 2,
    fill: "#ffffff",
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
        selectedShapeType, setSelectedShapeType,
        undoStack, setUndoStack,
        redoStack, setRedoStack,
        idsStack, setIdsStack,
        equalTop,
        undo, redo,
        selectedId, setSelectedId,
        putShapeInId
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access the context
export const useAppContext = () => useContext(AppContext);
