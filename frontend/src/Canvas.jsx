/* eslint-disable react/prop-types */

import { useState, useEffect, useRef } from 'react';
import { Layer, Stage } from 'react-konva';
import { Transformer } from 'react-konva';

import { useAppContext } from './AppContext';

import Rectangle from './Shapes/Rectangle.jsx';
import Ellipse from './Shapes/Ellipse.jsx';
import Triangle from './Shapes/Triangle.jsx';
import Line from './Shapes/Line.jsx';
import Text from './Shapes/Text.jsx';
import Polygon from './Shapes/Polygon.jsx';
import Free from './Shapes/Free.jsx'

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
  } = useAppContext();

  const transformerRef = useRef(null);
  const shapeRef = useRef(null)

  const [selectedShape, setSelectedShape] = useState(null)
  
  useEffect(() => {
    // Update the transformer whenever the selected shape changes
    if (selectedShape) {
      transformerRef.current.nodes([selectedShape]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selectedShape]);

  useEffect(() => {
    consol.log(selectedShape)
    setSelectedShape({...selectedShape, fill: styleBar.fillColor})
    // selectedShape.fill
  }, [styleBar])

  // function getId() {
  //   return data.length
  // }

  const { onMouseUp, onMouseMove, onMouseDown } = activeTool && activeTool !== "move" ? events[activeTool]() : {};
  
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
            setCurrentShape(null)
            setIsDrawing(false)
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
  
  
  const handleClick = (e) => {
    setSelectedShape(e.target)
  }

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
          backgroundColor: !shapeRef && styleBar.fillColor,
          cursor: cursorStyle(),
          // position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' , transform: 'none'
        }}

        onClick={handleClick}
      >
        <Layer>
          {currentShape && createShape(currentShape)}
          
          {
            data.map((shape) => {
              return createShape(shape, shapeRef);
            })
          }

          {selectedShape && (
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
