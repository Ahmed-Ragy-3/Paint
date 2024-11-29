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
         return <CreatePolygon shape={shape} handleClick = {handleClick} />
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

function CreateEllipse({ shape, handleClick }) {
   const shapeRef = React.useRef();
   const transformerRef = React.useRef();

   const { selectedId, putShapeInId, equalTop, undoStack, setUndoStack, data } = useAppContext();

   useEffect(() => {
      if (selectedId === shape.id && transformerRef.current && shapeRef.current) {
         transformerRef.current.nodes([shapeRef.current]);
         transformerRef.current.getLayer().batchDraw();
      }
   }, [selectedId, shape.id]);

   const pushToUndoStackIfNeeded = () => {
      if (!equalTop(undoStack, data)) {
         console.log("push in undo stack");
         setUndoStack((prevUndoStack) => [...prevUndoStack, data]);
      }
   };

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
            
            onDragStart={() => {
               pushToUndoStackIfNeeded();
            }}

            onDragEnd={(e) => {
               const updatedShape = { ...shape }; // Clone shape to prevent mutation
               updatedShape.centerX = e.target.x();
               updatedShape.centerY = e.target.y();

               putShapeInId(updatedShape.id, updatedShape);
               pushToUndoStackIfNeeded();
            }}

            onTransformStart={() => {
               pushToUndoStackIfNeeded();
            }}

            onTransformEnd={() => {
               const node = shapeRef.current;
               const updatedShape = { ...shape }; // Clone shape to avoid mutation

               // Handle scaling
               const scaleX = node.scaleX();
               const scaleY = node.scaleY();
               node.scaleX(1);
               node.scaleY(1);

               // Update transformed properties
               updatedShape.centerX = node.x();
               updatedShape.centerY = node.y();
               updatedShape.radiusX = Math.max(5, node.radiusX() * scaleX); // Ensure minimum size
               updatedShape.radiusY = Math.max(5, node.radiusY() * scaleY);

               putShapeInId(updatedShape.id, updatedShape);
               pushToUndoStackIfNeeded();
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

   const { selectedId, putShapeInId, equalTop, undoStack, setUndoStack, data} = useAppContext();

   useEffect(() => {
      if (selectedId === shape.id && transformerRef.current && shapeRef.current) {
         transformerRef.current.nodes([shapeRef.current]);
         transformerRef.current.getLayer().batchDraw();
      }
   }, [selectedId, shape.id]);

   
   const pushToUndoStackIfNeeded = () => {
      if (!equalTop(undoStack, data)) {
         console.log("push in undo stack");
         setUndoStack((prevUndoStack) => [...prevUndoStack, data]);
      }
   };
   
   useEffect(() => {
      pushToUndoStackIfNeeded()
   }, [])

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
            
            onDragStart={(e) => {
               pushToUndoStackIfNeeded();
            }}

            onDragEnd={(e) => {
               const updatedShape = { ...shape };
               updatedShape.centerX = e.target.x();
               updatedShape.centerY = e.target.y();
             
               putShapeInId(updatedShape.id, updatedShape);
             
               pushToUndoStackIfNeeded();
            }}
             
            onTransformStart={(e) => {
               pushToUndoStackIfNeeded();
            }}
             
            onTransformEnd={(e) => {
               const node = shapeRef.current;
               const updatedShape = { ...shape }; 
             
               const scaleX = node.scaleX();
               const scaleY = node.scaleY();
               node.scaleX(1);
               node.scaleY(1);
             
               // Update shape properties
               updatedShape.centerX = node.x();
               updatedShape.centerY = node.y();
               updatedShape.width = Math.max(5, node.width() * scaleX);
               updatedShape.height = Math.max(5, node.height() * scaleY);
             
               putShapeInId(updatedShape.id, updatedShape);
             
               // Push to undoStack if data has changed
               pushToUndoStackIfNeeded();
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


function CreatePolygon({ shape, handleClick }) {
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

function CreateLine({ shape, handleClick }) {
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

function CreateFreeDraw({shape, handleClick}) {
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
   />
}


