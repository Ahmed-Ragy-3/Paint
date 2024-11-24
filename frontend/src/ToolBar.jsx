/* eslint-disable react/prop-types */
// import { useState } from 'react';
import './bars.css';
// import createShape from './create.jsx';

import move_tool from './assets/move-tool.svg';
import line from './assets/line-icon.svg';
import polygon from './assets/polygon.svg';
import triangle from './assets/triangle.svg';
import rectangle from './assets/rectangle.svg';
import circle from './assets/circle.svg';
import brush from './assets/brush-tool.svg';
import text from './assets/textIcon.svg';
import addImage from './assets/add-image.svg';

export default function ToolBar({ setActiveTool }) {
  return (
    <div className="toolbar">
      <button title="Move tool" onClick={() => { setActiveTool("move") }}>
        <img src={move_tool} alt="Move Tool" />
      </button>

      <button title="Line Tool" onClick={() => { setActiveTool("line") }}>
        <img src={line} alt="Line Tool" />
      </button>

      <button title="Polygon Tool" onClick={() => { setActiveTool("polygon") }}>
        <img src={polygon} alt="Polygon Tool" />
      </button>

      <button title="Triangle Tool" onClick={() => { setActiveTool("triangle") }}>
        <img src={triangle} alt="Triangle Tool" />
      </button>

      <button title="Rectangle Tool" onClick={() => { setActiveTool("rectangle") }}>
        <img src={rectangle} alt="Rectangle Tool" />
      </button>

      <button title="Circle Tool" onClick={() => { setActiveTool("circle") }}>
        <img src={circle} alt="Circle Tool" />
      </button>

      <button title="Brush Tool" onClick={() => { setActiveTool("brush") }}>
        <img src={brush} alt="Brush Tool" />
      </button>

      <button title="Text Tool" onClick={() => { setActiveTool("text") }}>
        <img src={text} alt="Text Tool" />
      </button>

      <button title="Add Image Tool" onClick={() => { setActiveTool("add image") }}>
        <img src={addImage} alt="Add Image Tool" />
      </button>
    </div>
  );
}
