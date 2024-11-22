// import React from 'react'
import { Stage, Layer } from 'react-konva';

import createShape from '../create.jsx';
import data from "../sample.json";

import './Canvas.css'


export default function Canvas() {
  return (
    <div className='konva-container'>

      <Stage width={1250} height={680}>
        
        <Layer>

          {
            data.shapes.map( (shape) => { return createShape(shape); } )
          }
          
        </Layer>

      </Stage>

    </div>
  )
}
