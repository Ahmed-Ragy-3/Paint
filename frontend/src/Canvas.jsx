/* eslint-disable react/prop-types */

import { useEffect } from 'react';
import { Layer, Stage } from 'react-konva';

import { useAppContext } from './AppContext';

import Rectangle from './Shapes/Rectangle.jsx';
import Ellipse from './Shapes/Ellipse.jsx';
import Triangle from './Shapes/Triangle.jsx';
import Line from './Shapes/Line.jsx';

import Polygon from './Shapes/Polygon.jsx';
import Free from './Shapes/Free.jsx'

import createShape from './create.jsx';

const shapeHandlers = {
  // move: {},
  rectangle: Rectangle,
  ellipse: Ellipse,
  line: Line,
  triangle: Triangle,
  polygon: Polygon,
  free: Free,
};


export default function Canvas() {
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

  const { onMouseUp, onMouseMove, onMouseDown } = activeTool && activeTool !== "move" ? shapeHandlers[activeTool]() : {};
  
  useEffect(() => {
    
    // handle draggable attribute move tool is active
    setData((prevData) =>
      prevData.map((shape) => ({
        ...shape,
        draggable: activeTool === 'move',
      }))
    );

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
    
  
  const handleMouseDown = (e) => {
    const { x, y } = e.target.getStage().getPointerPosition();
    setInitialPoint([x, y]);
    if (onMouseDown) onMouseDown(e)
  }

  const handleMouseMove = (e) => {
    if (!currentShape) return;
    if (onMouseMove) onMouseMove(e)
  };
  
  const handleMouseUp = (e) => {
    if (!currentShape) return;
    if (onMouseUp) onMouseUp(e)
    console.log(data)
  }

  const cursorStyle = () => {
    switch (activeTool) {
      case 'move':
        return 'url(http://www.w3.org/2000/svg)';
      case 'rectangle':
        return 'crosshair';
      case 'polygon':
        return 'crosshair';
      case 'free':
        return 'pointer';
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
        backgroundColor: !selectedShape && fillColor,
        cursor: cursorStyle(),
      }}
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
