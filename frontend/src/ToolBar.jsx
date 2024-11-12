/* eslint-disable react/prop-types */
// import { useState } from 'react';
import './bars.css';

import move_tool from './assets/move-tool.svg';
import line from './assets/line-icon.svg';
import polygon from './assets/polygon.svg';
import triangle from './assets/triangle.svg';
import rectangle from './assets/rectangle.svg';
import circle from './assets/circle.svg';
import brush from './assets/brush-tool.svg';
import text from './assets/textIcon.svg';
import addImage from './assets/add-image.svg';


export default function ToolBar() {

  return (
    <div className='toolbar'>

      <button data-tooltip="Move tool">
        <img src={move_tool} alt="Move Tool" />
      </button>
      
      <button data-tooltip="My">
        <img src={line} alt="Line Tool" />
      </button>
      
      <button data-tooltip="My Custom Tooltip">
        <img src={polygon} alt="Polygon Tool" />
      </button>
      
      <button data-tooltip="My Custom Tooltip">
        <img src={triangle} alt="Triangle Tool" />
      </button>
      
      <button data-tooltip="My Custom Tooltip">
        <img src={rectangle} alt="Rectangle Tool" />
      </button>
      
      <button data-tooltip="My Custom Tooltip">
        <img src={circle} alt="Circle Tool" />
      </button>
      
      <button data-tooltip="My Custom Tooltip">
        <img src={brush} alt="Brush Tool" />
      </button>
      
      <button data-tooltip="My Custom Tooltip">
        <img src={text} alt="Text Tool" />
      </button>
      
      <button data-tooltip="My Custom Tooltip">
        <img src={addImage} alt="Add Image Tool" />
      </button>

    </div>
  );
}
