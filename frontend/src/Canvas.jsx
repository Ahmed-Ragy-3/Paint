/* eslint-disable react/prop-types */

// import React from 'react'
import { Stage, Layer } from 'react-konva';

import createShape from './create.jsx';
// import dataJson from "../sample.json";

import './Canvas.css'

export default function Canvas({data}) {
  
  return (
    <Stage
      className="konva-container"
      width={window.innerWidth}
      height={window.innerHeight}
    >
      {
        console.log(window.innerWidth)
        // console.log(window.innerHeight)
      }
      <Layer>
        {
          data.map((shape) => {
            return createShape(shape);
          })
        }
      </Layer>
    </Stage>
  )
}
