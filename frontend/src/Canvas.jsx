/* eslint-disable react/prop-types */

import { act, useEffect, useState } from 'react';
import { Layer, Stage } from 'react-konva';
import rectangle from './Shapes/Rectangle.jsx';
import ellipse from './Shapes/Ellipse.jsx';
import triangle from './Shapes/Triangle.jsx';
import line from './Shapes/Line.jsx';

import createShape from './create.jsx';
import './Canvas.css';

export default function Canvas({data, setData, activeTool, setActiveTool}) {
  
  const [initialPoint, setInitialPoint] = useState([0, 0])
  const [shapeDone, setShapeDone] = useState(false)
  const [currentShape, setCurrentShape] = useState(null)
  // const [selectedShape, setSelectedShape] = useState(null)

  function getId() {
    return data.length
  }

  useEffect(() => {
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

    if(activeTool == "rectangle" || activeTool == "ellipse") {
      setData([...data, currentShape]);
      setCurrentShape(null);
    } else if (activeTool === 'triangle' || activeTool == "line") {
      currentShape.onMouseUp(e, shapeDone, setShapeDone, data, setData, currentShape, setCurrentShape)
    }

    console.log(data)
  }
  
  ////////////////////////////////////////////////////////////////////////////
  const handleMouseDown = (e) => {
    const { x, y } = e.target.getStage().getPointerPosition();
    setInitialPoint([x, y]);
    
    if (activeTool === "move") {
      setData((prevData) =>
        prevData.map((shape) => ({
          ...shape,
          draggable: true,
        })))
    } else if (activeTool === 'rectangle') {
      setCurrentShape(rectangle.onMouseDown(x, y, data.length));

    } else if (activeTool === 'line') {
      if (!currentShape) {
        setCurrentShape(line.onMouseDown(x, y, data.length))
      } else {
        setShapeDone(true) 
      }

    } else if (activeTool === 'ellipse') {
      setCurrentShape(ellipse.onMouseDown(x, y, data.length));

    } else if (activeTool === 'polygon') {
      setCurrentShape(polygon.onMouseDown(x, y, data.length));
      
    } else if (activeTool === 'triangle') {
      if (!currentShape) {
          setCurrentShape(triangle.onMouseDown(x, y, data.length));
      } else {
        setShapeDone(true) 
      }
    }
  }
  
  //////////////////////////////////////////////////////////////////////////////////////////////
  const handleMouseMove = (e) => {
    if (!currentShape) return;
    
    if (activeTool === 'rectangle' || activeTool === 'ellipse' || activeTool === 'triangle' || activeTool === 'line') {
      currentShape.onMouseMove(e, currentShape, setCurrentShape, initialPoint)

    } else if (activeTool === 'polygon') {

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
