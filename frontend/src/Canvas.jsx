/* eslint-disable react/prop-types */

import { useCallback, useEffect, useRef, useState } from 'react';
import { Layer, Stage, Transformer } from 'react-konva';

import { useAppContext } from './AppContext';

import Ellipse from './Shapes/Ellipse.jsx';
import Free from './Shapes/Free.jsx';
import Line from './Shapes/Line.jsx';
import Polygon from './Shapes/Polygon.jsx';
import Rectangle from './Shapes/Rectangle.jsx';
import Text from './Shapes/Text.jsx';
import Triangle from './Shapes/Triangle.jsx';

import createShape from './create.jsx';

const events = {
  rectangle: Rectangle,
  ellipse: Ellipse,
  line: Line,
  triangle: Triangle,
  polygon: Polygon,
  free: Free,
  text: Text
};


export default function Canvas() {

  const {
    initialPoint, setInitialPoint,
    currentShape, setCurrentShape,
    data, setData,
    activeTool, setActiveTool,
    styleBar, setStyleBar,
    isDrawing, setIsDrawing,
    selectedShapeType, setSelectedShapeType,
    undoStack, setUndoStack,
    redoStack, setRedoStack,
    idsStack, setIdsStack,
    equalTop,
    undo, redo
  } = useAppContext();

  const transformerRef = useRef(null);
  const shapeRef = useRef(null)

  const [selectedId, setSelectedId] = useState(null)
  const { onMouseUp, onMouseMove, onMouseDown } = activeTool && activeTool !== "move" ? events[activeTool]() : {};
  const copied = null
  

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
  
  // useEffect(() => {
  //   // Update the transformer whenever the selected shape changes
  //   if (selectedId) {
  //     transformerRef.current.nodes([shapeRef.current]);
  //     transformerRef.current.getLayer().batchDraw();
  //   }
  // }, [selectedId]);

  // useEffect(() => {
  //   undoStack.push(data)
  //   setUndoStack(undoStack)
  // }, [selectedId])

  function getId() {
    if(idsStack.isEmpty()) {
      return data.length;
    }
    return idsStack.pop();
  }
    
  const handleKeyDown = useCallback((e) => {

    switch (e.key.toLowerCase()) {
      case 'v':
        setActiveTool('move');
        break;
      case 'l':
        setActiveTool('line');
        break;
      case 'r':
        setActiveTool('rectangle');
        break;
      case 't':
        setActiveTool('triangle');
        break;
      case 'p':
        setActiveTool('polygon');
        break;
      case 'e':
        setActiveTool('ellipse');
        break;
      case 'b':
        setActiveTool('free');
        break;
      case 'd':
        // some logic
        console.log("push in undo stack")
        undoStack.push(data)
        setUndoStack(undoStack)
        putShapeInId(selectedId, null)
        // idsStack.push(selectedId)
        setSelectedId(null)
        break;
      default:
        break;
    }

    if (e.ctrlKey) {
      switch (e.key.toLowerCase()) {
        case 'z':
          undo();
          break;
        case 'y':
          redo()
          break;
        default:
          break;
      }
    }

    const removeLastPoint = (points) => {
      return points.slice(0, -2);
    }

    if (activeTool === 'polygon' && currentShape) {
      if (e.key === 'Escape') {
        setCurrentShape((prevShape) => {
          const updatedPoints = removeLastPoint(prevShape.points);
          const finalizedShape = { ...prevShape, points: updatedPoints };
          setData((prevData) => [...prevData, finalizedShape]);
          setCurrentShape(null);
          setIsDrawing(false);
          return null;
        });
      } else if (e.key === 'Backspace') {
        setCurrentShape((prevShape) => {
          const updatedPoints = removeLastPoint(prevShape.points);
          return { ...prevShape, points: updatedPoints };
        });
      }
    }

  },[setActiveTool, setData, data, currentShape, setCurrentShape, setIsDrawing, activeTool]);

  useEffect(() => {
    setData((prevData) =>
      prevData.map((shape) => ({
        ...shape,
        draggable: activeTool === 'move',
      }))
    );
  }, [activeTool])

  // Attach event listener in useEffect
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    
  }, [handleKeyDown]);
  

  useEffect(() => {
    console.log("push in undo stack")
    undoStack.push(data)
    setUndoStack(undoStack)
  }, [styleBar]);
  
  
  useEffect(() => {

    putShapeInId(selectedId, 
      {
        opacity: styleBar.opacity,
        strokeColor: styleBar.strokeColor,
        strokeWidth: styleBar.strokeWidth,
        fill: styleBar.fill,
        height: styleBar.height,
        width: styleBar.width,
        radiusX: styleBar.radiusX,
        radiusY: styleBar.radiusY,
      }
    )
  }, [styleBar, selectedId, setData]);
  
  const handleClick = (id) => {
    console.log("in handle click, id = " + id)
    setSelectedId(id)
    const s = data[id]

    setSelectedShapeType(data[id].type)

    setStyleBar({
      opacity: s.opacity,
      strokeColor: s.strokeColor,
      strokeWidth: s.strokeWidth,
      fill: s.fill,
      height: s.height,
      width: s.width,
      radiusX: s.radiusX,
      radiusY: s.radiusY,
      // link: false,
    })
    // console.log(data[selectedId])
  }

  const handleMouseDown = (e) => {
    if(!equalTop(undoStack, data)) {
      console.log("push in undo stack")
      
      undoStack.push(data)
      setUndoStack(undoStack)
    }
    const { x, y } = e.target.getStage().getPointerPosition();
    setInitialPoint([x, y]);
    if (onMouseDown) onMouseDown(e)
  }

  const handleMouseMove = (e) => {
    if (!currentShape) return;
    if (onMouseMove) onMouseMove(e)
  };

  const handleMouseUp = (e) => {
    // console.log(data)
    // console.log(undoStack[undoStack.length - 1])

    if (!currentShape) return;
    if (onMouseUp) onMouseUp(e)
    console.log(data)
  }

  const cursorStyle = () => {
    switch (activeTool) {
      case 'move':
        return 'move';
      case 'rectangle':
        return 'crosshair';
      case 'polygon':
        return 'crosshair';
      case 'free':
        return 'auto';
      default:
        return 'default';
    }
  };

  //////////////////////////////////////////////////////////////////////////////
  return (
      <Stage
        className="konva-container"
        width={window.innerWidth}
        height={window.innerHeight}
        
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}

        style={{
          backgroundColor: !shapeRef && styleBar.fill,
          cursor: cursorStyle(),
          // position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' , transform: 'none'
        }}
      >
        <Layer>
          {currentShape && createShape(currentShape)}
          
          {
            data.map((shape) => {
              return shape ? createShape(shape, handleClick) : null;
            })
          }

          {selectedId !== null && (
            <Transformer
              ref={transformerRef}
              rotateEnabled={true}
              resizeEnabled={true}
              boundBoxFunc={(oldBox, newBox) => {
                if (newBox.width < 5 || newBox.height < 5) {
                  // console.log()
                  return oldBox;
                }
                return newBox;
              }}
            />
          )}
        </Layer>

      </Stage>
  )
}
