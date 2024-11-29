import React from "react";
import { Rect, Text, Line, Ellipse, Circle} from 'react-konva';
import { useEffect, useRef } from 'react';

import { useAppContext } from './AppContext';
import { Transformer } from 'react-konva';

function createShape(shape, handleClick) {
   // const { selectedId, setSelectedId } = useAppContext();
   // console.log("shape.id = " + shape.id)
   switch (shape.type) {
      case "Ellipse":   
         // return createEllipse(shape, handleClick);
         return <CreateEllipse shape={shape} handleClick={handleClick} />;
      case "Rectangle": 
         return <CreateRectangle shape={shape} handleClick={handleClick} />;
         // return createRectangle(shape, handleClick);
      case "Triangle":  
         return <CreateTriangle shape={shape} handleClick = {handleClick} />
         // return createTriangle(shape, handleClick);
      case "Polygon":   
         return <CreatePloygon shape={shape} handleClick = {handleClick} />
         // return createPolygon(shape, handleClick);
      case "Line":      
         return <CreateLine shape={shape} handleClick = {handleClick} />
         // return createLine(shape, handleClick);
      case "Text":      
               return <CreateText shape={shape} handleClick = {handleClick} />
         // return createText(shape, handleClick);
      case "Free":      
         return <CreateFreeDraw shape={shape} handleClick = {handleClick} />
         // return createFreeDraw(shape, handleClick);
      default: return null;
   }
}

export default createShape;

function CreateEllipse({shape, handleClick}) {
   const shapeRef = React.useRef();
   const transformerRef = React.useRef();

   const { selectedId, putShapeInId} = useAppContext();

   useEffect(() => {
      if (selectedId === shape.id && transformerRef.current && shapeRef.current) {
         transformerRef.current.nodes([shapeRef.current]);
         transformerRef.current.getLayer().batchDraw();
      }
   }, [selectedId, shape.id]);

   return (
      <React.Fragment>
         <Ellipse
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
            onClick={() => handleClick(shape.id)}
            ref={shapeRef}
            
            onDragEnd={(e) => {
               shape.centerX = e.target.x();
               shape.centerY = e.target.y();
               
               putShapeInId(shape.id, shape)
            }}
            
            onTransformEnd={(e) => {  // there is a problem when changing fill color after changing radiuses
               const node = shapeRef.current;
               const scaleX = node.scaleX();
               const scaleY = node.scaleY();
               
               node.scaleX(1);
               node.scaleY(1);
               shape.centerX = node.x();
               shape.centerY = node.y();
               
               shape.radiusX = shape.radiusX * scaleX
               shape.radiusY = shape.radiusY * scaleY

               putShapeInId(shape.id, shape)
            }}
         />
         {selectedId === shape.id && (
            <Transformer
               ref={transformerRef}
               rotateEnabled={true}
               resizeEnabled={true}
               flipEnabled={false}
               boundBoxFunc={(oldBox, newBox) => {
                  if (newBox.width < 5 || newBox.height < 5) {
                     return oldBox;
                  }
                  return newBox;
               }}
            />
         )}
      </React.Fragment>
   );
}
   
function CreateRectangle({ shape, handleClick }) {
   const shapeRef = React.useRef();
   const transformerRef = React.useRef();

   const { selectedId, putShapeInId} = useAppContext();

   useEffect(() => {
      if (selectedId === shape.id && transformerRef.current && shapeRef.current) {
         transformerRef.current.nodes([shapeRef.current]);
         transformerRef.current.getLayer().batchDraw();
      }
   }, [selectedId, shape.id]);

   return (
      <React.Fragment>
         <Rect
            key={shape.id}
            draggable={shape.draggable}
            x={shape.centerX}
            y={shape.centerY}
            strokeWidth={shape.strokeWidth}
            stroke={shape.strokeColor}
            fill={shape.fill}
            opacity={shape.opacity}
            height={shape.height}
            width={shape.width}
            onClick={() => handleClick(shape.id)}
            ref={shapeRef}
            
            onDragEnd={(e) => {
               shape.centerX = e.target.x();
               shape.centerY = e.target.y();
               
               putShapeInId(shape.id, shape)
            }}
            
            onTransformEnd={(e) => {
               const node = shapeRef.current;
               const scaleX = node.scaleX();
               const scaleY = node.scaleY();
               
               node.scaleX(1);
               node.scaleY(1);
               shape.centerX = node.x();
               shape.centerY = node.y();
               
               shape.width = Math.max(5, node.width() * scaleX);
               shape.height = Math.max(node.height() * scaleY);

               putShapeInId(shape.id, shape)
            }}
         />
         {selectedId === shape.id && (
            <Transformer
               ref={transformerRef}
               rotateEnabled={true}
               resizeEnabled={true}
               flipEnabled={false}
               boundBoxFunc={(oldBox, newBox) => {
                  if (newBox.width < 5 || newBox.height < 5) {
                     return oldBox;
                  }
                  return newBox;
               }}
            />
         )}
      </React.Fragment>
   );
}


function CreateTriangle({ shape, handleClick }) {
   const shapeRef = React.useRef();
   const transformerRef = React.useRef();
   const { selectedId, putShapeInId } = useAppContext();

   useEffect(() => {
      if (selectedId === shape.id && transformerRef.current && shapeRef.current) {
         transformerRef.current.nodes([shapeRef.current]);
         transformerRef.current.getLayer().batchDraw();
      }
   }, [selectedId, shape.id]);

   return (
      <React.Fragment>
         <Line
            key={shape.id}
            draggable={shape.draggable}
            points={shape.points}
            stroke={shape.strokeColor}
            strokeWidth={shape.strokeWidth}
            fill={shape.fill}
            closed={true}
            opacity={shape.opacity}
            ref={shapeRef}
            onClick={() => handleClick(shape.id)}

            onDragEnd={(e) => {
               const deltaX = e.target.x() - shapeRef.current.x();
               const deltaY = e.target.y() - shapeRef.current.y();

               const updatedPoints = shape.points.map((coord, index) =>
                  index % 2 === 0 ? coord + deltaX : coord + deltaY
               );

               const updatedShape = { ...shape, points: updatedPoints };
               putShapeInId(shape.id, updatedShape);
            }}

            onTransformEnd={(e) => {
               const node = shapeRef.current;
               const scaleX = node.scaleX();
               const scaleY = node.scaleY();

               const updatedPoints = shape.points.map((coord, index) => {
                  if (index % 2 === 0) {
                     return coord * scaleX;
                  } else {
                     return coord * scaleY;
                  }
               });

               node.scaleX(1);
               node.scaleY(1);

               const updatedShape = { ...shape, points: updatedPoints };
               putShapeInId(shape.id, updatedShape); // Update the shape state
            }}
         />

         {selectedId === shape.id && (
            <Transformer
               ref={transformerRef}
               rotateEnabled={false}
               resizeEnabled={true}
               flipEnabled={false}
               boundBoxFunc={(oldBox, newBox) => {
                  if (newBox.width < 5 || newBox.height < 5) {
                     return oldBox;
                  }
                  return newBox;
               }}
            />
         )}
      </React.Fragment>
   );
}




function CreateText(shape, handleClick) {
   const shapeRef = React.useRef();
   const transformerRef = React.useRef();
   const { selectedId, putShapeInId } = useAppContext();

   useEffect(() => {
      if (selectedId === shape.id && transformerRef.current && shapeRef.current) {
         transformerRef.current.nodes([shapeRef.current]);
         transformerRef.current.getLayer().batchDraw();
      }
   }, [selectedId, shape.id]);

   return (
      <React.Fragment>
         <Text
            key={shape.id}
            x={shape.x}
            y={shape.y}
            text={shape.text}
            fontSize={shape.fontSize}
            fill={shape.fill}
            draggable={shape.draggable}
            opacity={shape.opacity}
            ref={shapeRef}
            onClick={() => handleClick(shape.id)}

            onDragEnd={(e) => {
               const deltaX = e.target.x() - shape.x;
               const deltaY = e.target.y() - shape.y;

               const updatedShape = {
                  ...shape,
                  x: shape.x + deltaX,
                  y: shape.y + deltaY,
               };

               putShapeInId(shape.id, updatedShape);
            }}

            onTransformEnd={(e) => {
               const node = shapeRef.current;
               const scaleX = node.scaleX();
               const scaleY = node.scaleY();
               node.scaleX(1);
               node.scaleY(1);

               const updatedShape = {
                  ...shape,
                  x: node.x(),
                  y: node.y(),
                  fontSize: shape.fontSize * Math.max(scaleX, scaleY),
               };


               putShapeInId(shape.id, updatedShape);
            }}
         />

         {selectedId === shape.id && (
            <Transformer
               ref={transformerRef}
               rotateEnabled={false}
               resizeEnabled={true}
               flipEnabled={false}
               boundBoxFunc={(oldBox, newBox) => {
                  if (newBox.width < 10 || newBox.height < 10) {
                     return oldBox;
                  }
                  return newBox;
               }}
            />
         )}
      </React.Fragment>
   );
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
      // ref={shapeRef}
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
      // ref={shapeRef}
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
      // ref={shapeRef}
   />
}


