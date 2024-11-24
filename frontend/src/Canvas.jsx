/* eslint-disable react/prop-types */

import { useState } from 'react';
import { Layer, Stage } from 'react-konva';

import createShape from './create.jsx';
// import dataJson from "../sample.json";

import './Canvas.css';

export default function Canvas({data, setData, activeTool}) {
  
  // const canvasRef = useRef()
  const [initialPoint, setInitialPoint] = useState([0, 0])
  
  const [currentShape, setCurrentShape] = useState(null)
  // const [isDrawing, setIsDrawing] = useState(false)

  function getId() {
    return data.length
  }

  // useEffect(() => {
  //   switch (activeTool) {
  //     case "move":
          
  //       break;
  //     case "line":
          
  //       break;
  //     case "polygon":
          
  //       break;
  //     case "triangle":
          
  //       break;
  //     case "rectangle":
          
  //       break;
  //     case "circle":
          
  //       break;
  //     case "brush":
          
  //       break;
  //     case "text":
          
  //       break;
  //     case "add image":
          
  //       break;
    
  //     default:
  //       break;
  //   }
  // }, [activeTool])

  const handleMouseUp = () => {
    if (!currentShape) return;

    console.log(currentShape)

    setData([...data, currentShape]);
    setCurrentShape(null);
    
  }
  
  const handleMouseDown = (e) => {
    const { x, y } = e.target.getStage().getPointerPosition();
    
    if (activeTool === 'rectangle') {
      
      console.log(`${x} - ${y}`)
      setCurrentShape({
        type: 'Rectangle',
        id: data.length,
        centerX: x,
        centerY: y,
        strokeWidth: 2,
        strokeColor: 'blue',
        fill: 'blue',
        opacity: 1,
        width: 0,
        height: 0
      })
      
      setInitialPoint([x, y])
    }
  }
  
  const handleMouseMove = (e) => {
    if (!currentShape) return;
    // we should make a switch
    const { x, y } = e.target.getStage().getPointerPosition();
    
    if (activeTool === 'rectangle') {
      setCurrentShape((prevShape) => ({
        ...prevShape,
        centerX: (initialPoint[0] + x) / 2,
        centerY: (initialPoint[1] + y) / 2,
        width: Math.abs(x - initialPoint[0]),
        height: Math.abs(y - initialPoint[1])
      }));
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
