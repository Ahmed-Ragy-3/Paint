// import React from "react";
import { Rect, Text, Line, Ellipse } from 'react-konva';

function createShape(shape, handleClick) {
   // console.log("shape.id = " + shape.id)
   switch (shape.type) {
      case "Ellipse":   return createEllipse(shape, handleClick);
      case "Rectangle": return createRectangle(shape, handleClick);
      case "Triangle":  return createTriangle(shape, handleClick);
      case "Polygon":   return createPolygon(shape, handleClick);
      case "Line":      return createLine(shape, handleClick);
      case "Text":      return createText(shape, handleClick);
      case "Free":      return createFreeDraw(shape, handleClick);
      default: return null;
   }
}

export default createShape;

function createEllipse(shape, handleClick) {
   return <Ellipse
      key={shape.id}
      draggable={shape.draggable}
      x={shape.centerX}
      y={shape.centerY}
      strokeWidth={shape.strokeWidth}
      stroke={shape.strokeColor}
      fill={shape.fill}
      opacity={shape.opacity}
      radiusX={shape.radiusX}
      radiusY={shape.radiusY}
      
      onClick={() => {handleClick(shape.id)}}
   />
}
   
function createRectangle(shape, handleClick) {
   return <Rect
      key={shape.id}
      draggable={shape.draggable}
      x={shape.centerX }
      y={shape.centerY }
      strokeWidth={shape.strokeWidth}
      stroke={shape.strokeColor}
      fill={shape.fill}
      opacity={shape.opacity}
      height={shape.height}
      width={shape.width}
      
      onClick={() => {handleClick(shape.id)}}
   />
}

function createTriangle(shape, handleClick) {
   return <Line
      key={shape.id}   
      draggable={shape.draggable}
      points={shape.points}
      stroke={shape.strokeColor}
      strokeWidth={shape.strokeWidth}
      fill={shape.fill}
      closed={true}
      opacity={shape.opacity}
      
      onClick={() => {handleClick(shape.id)}}
   />
}

function createText(shape, handleClick) {
   return <Text
      key={shape.id}   
      x={shape.centerX}
      y={shape.centerY}
      text={shape.text}
      fontSize={shape.fontSize} 
      fill={shape.fill} 
      draggable={shape.draggable}
      
      onClick={() => {handleClick(shape.id)}}
   />
}

function createPolygon(shape, handleClick) {
   return <Line
      key={shape.id}   
      draggable={shape.draggable}
      points={shape.points}
      fill={shape.fill}
      stroke={shape.strokeColor}
      opacity={shape.opacity}
      strokeWidth={shape.strokeWidth}
      closed={shape.closed}
      
      onClick={() => {handleClick(shape.id)}}
   />
}

function createLine(shape, handleClick) {
   return <Line
      key={shape.id}   
      draggable={shape.draggable}
      points={shape.points}
      stroke={shape.strokeColor}
      opacity={shape.opacity}
      strokeWidth={shape.strokeWidth}
      lineJoin="round"
      // lineCap="round"
      
      onClick={() => {handleClick(shape.id)}}
   />
}

function createFreeDraw(shape, handleClick) {
   return <Line
      key={shape.id}   
      points={shape.points}
      draggable={shape.draggable}
      stroke={shape.strokeColor}
      strokeWidth={shape.strokeWidth}
      opacity={shape.opacity}
      tension={0.5}
      lineJoin="round"
      lineCap="round"
      
      onClick={() => {handleClick(shape.id)}}
   />
}


