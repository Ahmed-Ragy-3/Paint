/* eslint-disable react/prop-types */

import { useEffect } from 'react';
import { Layer, Stage } from 'react-konva';

import { useAppContext } from './AppContext';

import Rectangle from './Shapes/Rectangle.jsx';
import Ellipse from './Shapes/Ellipse.jsx';
import Triangle from './Shapes/Triangle.jsx';
import Line from './Shapes/Line.jsx';

import polygon from './Shapes/Polygon.jsx';
import free from './Shapes/Free.jsx'

import createShape from './create.jsx';

export default function Canvas() {

  const { onMouseUp: ellipseOnMouseUp, onMouseMove: ellipseOnMouseMove, onMouseDown: ellipseOnMouseDown } = Ellipse();
  const { onMouseUp: linenOnMouseUp, onMouseMove: linenOnMouseMove, onMouseDown: lineOnMouseDown } = Line();
  const { onMouseUp: trianglenOnMouseUp, onMouseMove: trianglenOnMouseMove, onMouseDown: triangleOnMouseDown } = Triangle();
  const { onMouseUp: rectangleOnMouseUp, onMouseMove: rectangleOnMouseMove, onMouseDown: rectangleOnMouseDown } = Rectangle();
  
  const {
        initialPoint, setInitialPoint,
        shapeDone, setShapeDone,
        currentShape, setCurrentShape,
        selectedShape, setSelectedShape,
        secondPointDone, setSecondPointDone,
        data, setData,
        activeTool, setActiveTool,
        fillColor, setFillColor,
      } = useAppContext();

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
      
    } else if (activeTool == "rectangle") {
      rectangleOnMouseUp(e)
    } else if (activeTool == "line") {
      linenOnMouseUp(e)
    } else if (activeTool === 'ellipse') {
      ellipseOnMouseUp(e)
    } else if (activeTool === 'triangle') {
      trianglenOnMouseUp(e)
    }
    
    console.log(data)
  }
  
  
  ////////////////////////////////////////////////////////////////////////////
  const handleMouseDown = (e) => {
    const { x, y } = e.target.getStage().getPointerPosition();
    setInitialPoint([x, y]);
    
    if (activeTool === 'rectangle') {
      rectangleOnMouseDown(e)
    } else if (activeTool === 'line') {
      lineOnMouseDown(e)
    } else if (activeTool === 'ellipse') {
      ellipseOnMouseDown(e)
    } else if (activeTool === 'triangle') {
      triangleOnMouseDown(e)

    } else if (activeTool === 'polygon') {
      setCurrentShape(polygon.onMouseDown(x, y, data.length));

    } else if (activeTool === 'free') {
      setCurrentShape(free.onMouseDown(x, y, data.length))
    }
  }
  
  //////////////////////////////////////////////////////////////////////////////////////////////
  const handleMouseMove = (e) => {
    if (!currentShape) return;
    
    if (activeTool === 'rectangle') {
      rectangleOnMouseMove(e)
    } else if (activeTool === 'ellipse') {
      ellipseOnMouseMove(e)
    } else if (activeTool === 'line') {
      linenOnMouseMove(e)
    } else if (activeTool === 'triangle') {
      trianglenOnMouseMove(e)
      
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
