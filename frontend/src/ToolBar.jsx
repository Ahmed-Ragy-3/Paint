/* eslint-disable react/prop-types */
// import { useState } from 'react';
import './bars.css';

import { useAppContext } from './AppContext';

import move_tool from './assets/move-tool.svg';
import line_icon from './assets/line-icon.svg';
import polygon_icon from './assets/polygon.svg';
import triangle_icon from './assets/triangle.svg';
import rectangle_icon from './assets/rectangle.svg';
import circle from './assets/circle.svg';
import brush from './assets/brush-tool.svg';
import text from './assets/textIcon.svg';

export let shape

export default function ToolBar() {

  const {
    currentShape, setCurrentShape,
    activeTool, setActiveTool,
    undoStack, setUndoStack,
    setSelectedShapeType,
    isDrawing, setIsDrawing
  } = useAppContext();

  async function getShape(shapeName) {
    try {
      const response = await fetch('http://localhost:8080/shapes/get-shape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({shapeType: `${shapeName}`}),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const shape = await response.json();
      return shape
  
    } catch (error) {
      console.error('Error: ', error);
    }
  }

  return (
    <div className="toolbar">
      <button 
        title="Move tool (v)" 
        onClick={() => { setActiveTool("move") }}
        className={activeTool === "move" ? "active" : ""}
      >
        <img src={move_tool} alt="Move Tool" />
      </button>

      <button 
        title="Line Tool (l)" 
        onClick={async () => {
          shape = await getShape("Line")
          setSelectedShapeType("Line")
          setActiveTool("line")
        }}
        className={activeTool === "line" ? "active" : ""}
      >
        <img src={line_icon} alt="Line Tool" />
      </button>

      <button 
        title="Polygon Tool (p)" 
        onClick={async () => {
          shape = await getShape("Polygon")
          shape.opacity = 1
          shape.strokeWidth = 2
          setCurrentShape(shape)
          setSelectedShapeType("Polygon")
          setActiveTool("polygon") 
        }}
        className={activeTool === "polygon" ? "active" : ""}
      >
        <img src={polygon_icon} alt="Polygon Tool" />
      </button>

      <button 
        title="Triangle Tool (t)" 
        onClick={async () => {
          shape = await getShape("Triangle")
          setSelectedShapeType("Triangle")
          setActiveTool("triangle")
        }}
        className={activeTool === "triangle" ? "active" : ""}
      >
        <img src={triangle_icon} alt="Triangle Tool" />
      </button>

      <button 
        title="Rectangle Tool (r)" 
        onClick={async () => {
          shape = await getShape("Rectangle")
          setSelectedShapeType("Rectangle")
          setActiveTool("rectangle")
        }}
        className={activeTool === "rectangle" ? "active" : ""}
      >
        <img src={rectangle_icon} alt="Rectangle Tool" />
      </button>

      <button 
        title="Ellipse Tool (e)" 
        onClick={async () => {
          shape = await getShape("Ellipse")
          setSelectedShapeType("Ellipse")
          console.log(currentShape);
          setActiveTool("ellipse")
        }}
        className={activeTool === "ellipse" ? "active" : ""}
      >
        <img src={circle} alt="Circle Tool" />
      </button>

      <button
        title="Brush Tool (b)" 
        onClick={async () => {
          shape = await getShape("Free")
          setSelectedShapeType("Free")
          setActiveTool("free")
        }}
        className={activeTool === "free" ? "active" : ""}
      >
        <img src={brush} alt="Brush Tool" />
      </button>

      <button 
        title="Text Tool" 
        onClick={() => {
          setActiveTool("text")
        }}
        className={activeTool === "text" ? "active" : ""}
      >
        <img src={text} alt="Text Tool" />
      </button>

      {/* <button 
        title="Add Image Tool" 
        onClick={() => {
          setActiveTool("add image")
        }}
        className={activeTool === "add image" ? "active" : ""}
      >
        <img src={addImage} alt="Add Image Tool" />
      </button> */}
    </div>
  );
}
