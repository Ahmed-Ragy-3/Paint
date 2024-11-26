/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import { Layer, Stage } from 'react-konva';

import rectangle from './Shapes/Rectangle.jsx';
import ellipse from './Shapes/Ellipse.jsx';
import triangle from './Shapes/Triangle.jsx';
import line from './Shapes/Line.jsx';
import polygon from './Shapes/Polygon.jsx';
import free from './Shapes/Free.jsx'

import createShape from './create.jsx';

export default function Canvas({data, setData, activeTool, setActiveTool, fillColor}) {
  
  const [initialPoint, setInitialPoint] = useState([0, 0])
  const [shapeDone, setShapeDone] = useState(false)
  const [currentShape, setCurrentShape] = useState(null)
  const [selectedShape, setSelectedShape] = useState(null)
  const [secondPointDone,setSecondPointDone]= useState(false)

  // function getId() {
  //   return data.length
  // }

  useEffect(() => {

    // handle draggable attribute
    if (activeTool === "move") {
      setData((prevData) =>
        prevData.map((shape) => ({
          ...shape,
          draggable: true,
        })
      ))
    } else {
      setData((prevData) =>
        prevData.map((shape) => ({
          ...shape,
          draggable: false,
        })
      ))
    }
    const removeLastPoint = (points) => {
      return points.slice(0, -2);
    }
    
    const handleKeyDown = (e) => {
      if (activeTool === 'polygon' && currentShape) {
        if (e.key === 'Escape') {
          setCurrentShape((prevShape) => {
            const updatedPoints = removeLastPoint(prevShape.points);
            const finalizedShape = { ...prevShape, points: updatedPoints };
            setData((prevData) => [...prevData, finalizedShape]);
            return null;
          });
        } else if (e.key === 'Backspace') {
          setCurrentShape((prevShape) => {
            const updatedPoints = removeLastPoint(prevShape.points);
            return { ...prevShape, points: updatedPoints };
          });
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeTool, currentShape, setData]);
    
  /////////////////////////////////////////////////////////////////////////////////////////////
  const handleMouseUp = (e) => {
    if (!currentShape) return;

    if(activeTool == "free") {
      setData([...data, currentShape]);
      setCurrentShape(null);
    } else if (activeTool == "ellipse" || activeTool == "rectangle" || activeTool === 'triangle' || activeTool == "line") {
      currentShape.onMouseUp(e, shapeDone, setShapeDone, data, setData, currentShape, setCurrentShape, initialPoint, secondPointDone, setSecondPointDone)
    }

    console.log(data)
  }
  

  ////////////////////////////////////////////////////////////////////////////
  const handleMouseDown = (e) => {
    const { x, y } = e.target.getStage().getPointerPosition();
    setInitialPoint([x, y]);
    
    if (activeTool === 'rectangle') {
      if (!currentShape) {
        setCurrentShape(rectangle.onMouseDown(x, y, data.length));
      } else {
        setShapeDone(true) 
      }

    } else if (activeTool === 'line') {
      if (!currentShape) {
        setCurrentShape(line.onMouseDown(x, y, data.length));
      } else {
        setShapeDone(true) 
      }

    } else if (activeTool === 'ellipse') {
      if (!currentShape) {
        setCurrentShape(ellipse.onMouseDown(x, y, data.length));
      } else {
        setShapeDone(true) 
      }

    } else if (activeTool === 'polygon') {
      setCurrentShape(polygon.onMouseDown(x, y, data.length));
      
    } else if (activeTool === 'triangle') {
      if (!currentShape) {
          setCurrentShape(triangle.onMouseDown(x, y, data.length));
      } else if (!secondPointDone) {
        setSecondPointDone(true)
        console.log("true in down")
      } else {
        setShapeDone(true) 
      }
    } else if (activeTool === 'free') {
      setCurrentShape(free.onMouseDown(x, y, data.length))
    }
  }
  
  //////////////////////////////////////////////////////////////////////////////////////////////
  const handleMouseMove = (e) => {
    if (!currentShape) return;
    
    if (activeTool === 'rectangle' || activeTool === 'ellipse' || activeTool === 'triangle' || activeTool === 'line') {
      currentShape.onMouseMove(e, shapeDone, setShapeDone, currentShape, setCurrentShape, initialPoint, secondPointDone, setSecondPointDone)
      
    } else if (activeTool === 'free') {
      // console.log(currentShape.type)
      currentShape.onMouseMove(e, setCurrentShape)
    }
  };

  //////////////////////////////////////////////////////////////////////////////////
  return (
    <Stage
      className="konva-container"
      width={window.innerWidth}
      height={window.innerHeight}
      
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}

      style={{backgroundColor: !selectedShape && fillColor}}
    >

      <Layer>
        {currentShape && createShape(currentShape)}
        {
          data.map((shape) => {
            return createShape(shape);
          })
        }
      </Layer>

    </Stage>
  )
}
