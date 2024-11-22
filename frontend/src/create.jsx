// import React from "react";
import { Rect, Text, Line, Ellipse } from 'react-konva';

function createShape(shape) {
   // console.log(shape)
   switch (shape.type) {
      case "Ellipse":   return createEllipse(shape);
      case "Rectangle": return createRectangle(shape);
      case "Triangle":  return createTriangle(shape);
      case "Polygon":   return createPolygon(shape);
      case "Line":      return createLine(shape);
      case "Text":      return createText(shape);
      default: return null;
   }
}

// npm install react-konva konva

export default createShape;

function createEllipse(shape) {
   return <Ellipse
      key={shape.id}
      draggable
      x={shape.centerX}         // centerX is the center, no need to adjust
      y={shape.centerY}         // centerY is the center, no need to adjust
      strokeWidth={shape.strokeWidth}
      stroke={shape.strokeColor}
      fill={shape.fill}
      opacity={shape.opacity}
      radiusX={shape.width / 2}  // radiusX is half of the width
      radiusY={shape.height / 2} // radiusY is half of the height
   />
}
   
function createRectangle(shape) {
   return <Rect
      key={shape.id}   
      draggable
      x={shape.centerX - shape.width / 2}  // Adjust x to top-left corner
      y={shape.centerY - shape.height / 2} // Adjust y to top-left corner
      strokeWidth={shape.strokeWidth}
      stroke={shape.strokeColor}
      fill={shape.fill}
      opacity={shape.opacity}
      height={shape.height}
      width={shape.width}
   />
}

function createTriangle(shape) {
   return <Line
      key={shape.id}   
      draggable
      points={shape.points}
      stroke={shape.strokeColor}
      strokeWidth={shape.strokeWidth}
      fill={shape.fill}
      opacity={shape.opacity}
      closed={true}
   />
}

function createText(shape) {
   return <Text
      key={shape.id}   
      draggable 
      text={shape.text}
      fontSize={shape.fontSize} 
      fill={shape.fill} 
      x={shape.centerX}  // Text positioning starts at the top-left corner
      y={shape.centerY}  // Text positioning starts at the top-left corner
   />
}

function createPolygon(shape) {
   return <Line
      key={shape.id}   
      draggable
      points={shape.points}
      fill={shape.fill}
      stroke={shape.strokeColor}
      strokeWidth={shape.strokeWidth}
      closed={true}
   />
}

function createLine(shape) {
   return <Line
      key={shape.id}   
      draggable
      points={shape.points}
      stroke={shape.strokeColor}
      strokeWidth={shape.strokeWidth}
      lineJoin="round"
   />
}
