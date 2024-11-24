/* eslint-disable react/prop-types */

// import React from 'react'
import { Stage, Layer } from 'react-konva';

import createShape from './create.jsx';
// import dataJson from "../sample.json";

import './Canvas.css'

export default function Canvas({data, setData, activeTool}) {

  const handleCanvasClick = (e) => {
    // we should make a switch
    const { x, y } = e.target.getStage().getPointerPosition();
    if (activeTool === 'Rectangle') {
      setData([
        ...data,
        {
          type: 'Rectangle',
          id: data.length,
          centerX: x,
          centerY: y,
          strokeWidth: 2,
          strokeColor: 'blue',
          fill: 'yellow',
          opacity: 1,
          width: 100,
          height: 60,
        },
      ]);
    }
  };
  
  return (
    <Stage
      className="konva-container"
      width={window.innerWidth}
      height={window.innerHeight}
      onClick={handleCanvasClick}
    >
      <Layer>
        {
          data.map( (shape) => { return createShape(shape); } )
        }
      </Layer>

    </Stage>
  )
}
