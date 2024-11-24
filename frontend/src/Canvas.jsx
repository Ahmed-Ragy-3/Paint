/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Layer, Stage } from 'react-konva';

import createShape from './create.jsx';
import './Canvas.css';

export default function Canvas({data, setData, activeTool, setActiveTool}) {
  
  // const canvasRef = useRef()
  const [initialPoint, setInitialPoint] = useState([0, 0])
    
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

  useEffect(() => {
    switch (activeTool) {
      case "line":
          
        break;
      case "polygon":
          
        break;
      case "triangle":
          
        break;
      case "rectangle":
          
        break;
      case "circle":
          
        break;
      case "brush":
          
        break;
      case "text":
          
        break;
      case "add image":
          
        break;
    
      default:
        break;
    }
    
  }, [activeTool, setData])

  const handleMouseUp = () => {
    if (!currentShape) return;

    console.log(currentShape)
    if(activeTool == "rectangle" || activeTool == "ellipse") {
      setData([...data, currentShape]);
      setCurrentShape(null);

    }//else if(activeTool == "polygon") {}
  }
  
  const handleMouseDown = (e) => {
    const { x, y } = e.target.getStage().getPointerPosition();
    
    if (activeTool === "move") {
      setData((prevData) =>
        prevData.map((shape) => ({
          ...shape,
          draggable: true,
        })))
    } else if (activeTool === 'rectangle') {
      
      console.log(`${x} - ${y}`)
      setCurrentShape({
        type: 'Rectangle',
        draggable: false,
        id: data.length,
        centerX: x,
        centerY: y,
        strokeWidth: 2,
        strokeColor: 'black',
        fill: 'transparent',
        opacity: 1,
        width: 0,
        height: 0
      })
      
      setInitialPoint([x, y])

    } else if (activeTool === 'ellipse') {
      setCurrentShape({
        type: 'Ellipse',
        draggable: false,
        id: data.length,
        centerX: x,
        centerY: y,
        strokeWidth: 2,
        strokeColor: 'black',
        fill: 'transparent',
        opacity: 1,
        radiusX: 0,
        radiusY: 0
      });

      setInitialPoint([x, y])

    } else if (activeTool === 'polygon') {
      if (!currentShape) {
        setCurrentShape({
          type: 'Polygon',
          draggable: false,
          id: data.length,
          points: [x, y],
          strokeWidth: 4,
          strokeColor: 'black',
          opacity: 1,
        });
      } else {
        setCurrentShape((prevShape) => ({
          ...prevShape,
          points: [...prevShape.points, x, y],
        }));
      }

    }
  }
  
  const handleMouseMove = (e) => {
    if (!currentShape) return;
    // we should make a switch
    const { x, y } = e.target.getStage().getPointerPosition();

    if (activeTool === 'rectangle') {
      let w = Math.abs(x - initialPoint[0]);
      setCurrentShape((prevShape) => ({
        ...prevShape,
        centerX: (initialPoint[0] + x) / 2,
        centerY: (initialPoint[1] + y) / 2,
        width: w,
        height: e.evt.shiftKey ? w : Math.abs(y - initialPoint[1])
      }));

    } else if (activeTool === 'ellipse') {
      setCurrentShape((prevShape) => ({
        ...prevShape,
        centerX: (initialPoint[0] + x) / 2,
        centerY: (initialPoint[1] + y) / 2,
        radiusX: Math.abs(x - initialPoint[0]),
        radiusY: Math.abs(y - initialPoint[1])
      }));

    } else if (activeTool === 'polygon') {
      setCurrentShape((prevShape) => {
        const updatedPoints = [...prevShape.points];
    
        updatedPoints[updatedPoints.length - 2] = x;
        updatedPoints[updatedPoints.length - 1] = y;
    
        return {...prevShape, points: updatedPoints,};
      });
    }
  };
  
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
