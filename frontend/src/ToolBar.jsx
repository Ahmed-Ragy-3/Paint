/* eslint-disable react/prop-types */
// import { useState } from 'react';
import './bars.css';
// import createShape from './create.jsx';

import { useAppContext } from './AppContext';

import move_tool from './assets/move-tool.svg';
import line from './assets/line-icon.svg';
import polygon_icon from './assets/polygon.svg';
import triangle from './assets/triangle.svg';
import rectangle from './assets/rectangle.svg';
import circle from './assets/circle.svg';
import brush from './assets/brush-tool.svg';
import text from './assets/textIcon.svg';
import addImage from './assets/add-image.svg';

import {polygon} from './Shapes/Polygon.jsx';
import { useEffect } from 'react';

export default function ToolBar() {

  const {
    currentShape, setCurrentShape,
    activeTool, setActiveTool,
    undoStack, setUndoStack,
  } = useAppContext();

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
        onClick={() => { setActiveTool("line") }}
        className={activeTool === "line" ? "active" : ""}
      >
        <img src={line} alt="Line Tool" />
      </button>

      <button 
        title="Polygon Tool (p)" 
        onClick={() => {
          setCurrentShape(polygon)
          setActiveTool("polygon") 
        }}
        className={activeTool === "polygon" ? "active" : ""}
      >
        <img src={polygon_icon} alt="Polygon Tool" />
      </button>

      <button 
        title="Triangle Tool (t)" 
        onClick={() => { setActiveTool("triangle") }}
        className={activeTool === "triangle" ? "active" : ""}
      >
        <img src={triangle} alt="Triangle Tool" />
      </button>

      <button 
        title="Rectangle Tool (r)" 
        onClick={() => { setActiveTool("rectangle") }}
        className={activeTool === "rectangle" ? "active" : ""}
      >
        <img src={rectangle} alt="Rectangle Tool" />
      </button>

      <button 
        title="Ellipse Tool (e)" 
        onClick={() => { setActiveTool("ellipse") }}
        className={activeTool === "ellipse" ? "active" : ""}
      >
        <img src={circle} alt="Circle Tool" />
      </button>

      <button 
        title="Brush Tool (b)" 
        onClick={() => { setActiveTool("free") }}
        className={activeTool === "free" ? "active" : ""}
      >
        <img src={brush} alt="Brush Tool" />
      </button>

      <button 
        title="Text Tool" 
        onClick={() => { setActiveTool("text") }}
        className={activeTool === "text" ? "active" : ""}
      >
        <img src={text} alt="Text Tool" />
      </button>

      <button 
        title="Add Image Tool" 
        onClick={() => { setActiveTool("add image") }}
        className={activeTool === "add image" ? "active" : ""}
      >
        <img src={addImage} alt="Add Image Tool" />
      </button>
    </div>
  );
}
