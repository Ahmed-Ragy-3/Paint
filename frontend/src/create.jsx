import React, { useEffect, useRef, useState } from "react";
import { Ellipse, Line, Rect, Text } from 'react-konva';

import { Transformer } from 'react-konva';
import { useAppContext } from './AppContext';

function createShape(shape, handleClick) {
   switch (shape.type) {
      case "Ellipse":
         return <CreateEllipse shape={shape} handleClick={handleClick}/>;
      case "Rectangle":
         return <CreateRectangle shape={shape} handleClick={handleClick}/>;
      case "Triangle":
         return <CreateTriangle shape={shape} handleClick={handleClick}/>
      case "Polygon":
         return <CreatePolygon shape={shape} handleClick={handleClick}/>
      case "Line":
         return <CreateLine shape={shape} handleClick={handleClick}/>
      case "Text":
         return <CreateText shape={shape} handleClick={handleClick}/>
      case "Free":
         return <CreateFreeDraw shape={shape} handleClick={handleClick}/>
      default: return null;
   }
}

export default createShape;

function CreateEllipse({ shape, handleClick }) {
   const shapeRef = React.useRef();
   const transformerRef = React.useRef();

   const { selectedId, putShapeInId,
      pushToUndoStack   
   } = useAppContext();

   useEffect(() => {
      if (selectedId === shape.id && transformerRef.current && shapeRef.current) {
         transformerRef.current.nodes([shapeRef.current]);
         transformerRef.current.getLayer().batchDraw();
      }
   }, [selectedId, shape.id]);

   useEffect(() => {
      pushToUndoStack()
   }, [])

   return (
      <React.Fragment>
         <Ellipse
            key={shape.id}
            draggable={shape.draggable}
            x={shape.centerX}
            y={shape.centerY}
            strokeWidth={shape.strokeWidth}
            stroke={shape.stroke}
            fill={shape.fill}
            opacity={shape.opacity}
            radiusX={shape.radiusX}
            radiusY={shape.radiusY}
            onClick={() => handleClick(shape.id)}
            ref={shapeRef}


            onDragEnd={(e) => {
               pushToUndoStack();
               const updatedShape = { ...shape }; // Clone shape to prevent mutation
               updatedShape.centerX = e.target.x();
               updatedShape.centerY = e.target.y();

               putShapeInId(updatedShape.id, updatedShape);
            }}

            onTransformEnd={(e) => {
               pushToUndoStack();
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
            }}
         />
         {selectedId === shape.id && (
            <Transformer
               ref={transformerRef}
               rotateEnabled={false}  // rotate is set to false for now
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

   const { selectedId, putShapeInId,
      pushToUndoStack,
   } = useAppContext();

   useEffect(() => {
      if (selectedId === shape.id && transformerRef.current && shapeRef.current) {
         transformerRef.current.nodes([shapeRef.current]);
         transformerRef.current.getLayer().batchDraw();
      }
   }, [selectedId, shape.id]);

   
   useEffect(() => {
      pushToUndoStack()
   }, [])

   return (
      <React.Fragment>
         <Rect
            key={shape.id}
            draggable={shape.draggable}
            x={shape.centerX}
            y={shape.centerY}
            strokeWidth={shape.strokeWidth}
            stroke={shape.stroke}
            fill={shape.fill}
            opacity={shape.opacity}
            height={shape.height}
            width={shape.width}
            onClick={() => handleClick(shape.id)}
            ref={shapeRef}
            

            onDragEnd={(e) => {
               pushToUndoStack();
               const updatedShape = { ...shape };
               updatedShape.centerX = e.target.x();
               updatedShape.centerY = e.target.y();
             
               putShapeInId(updatedShape.id, updatedShape);
             
            }}
             
            onTransformEnd={(e) => {
               pushToUndoStack();
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
             
            }}
             
         />
         {selectedId === shape.id && (
            <Transformer
               ref={transformerRef}
               rotateEnabled={false}  // rotate is set to false for now
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
   const { selectedId, putShapeInId, pushToUndoStack } = useAppContext();

   useEffect(() => {
      if (selectedId === shape.id && transformerRef.current && shapeRef.current) {
         transformerRef.current.nodes([shapeRef.current]);
         transformerRef.current.getLayer().batchDraw();
      }
   }, [selectedId, shape.id]);

   useEffect(() => {
      pushToUndoStack()
   }, [])

   return (
      <React.Fragment>
         <Line
            key={shape.id}
            draggable={shape.draggable}
            points={shape.points}
            stroke={shape.stroke}
            strokeWidth={shape.strokeWidth}
            fill={shape.fill}
            closed={true}
            opacity={shape.opacity}
            ref={shapeRef}
            onClick={() => handleClick(shape.id)}

            onDragEnd={(e) => {
               pushToUndoStack();
               const { x, y } = e.target.position();
             
               const updatedPoints = shape.points.map((coord, index) => {
                 return index % 2 === 0 ? coord + x : coord + y;
               });
             
               const updatedShape = { ...shape, points: updatedPoints };
             
               putShapeInId(shape.id, updatedShape);
             
               e.target.position({ x: 0, y: 0 });
             }}
             

            onTransformEnd={(e) => {
               pushToUndoStack();
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

function CreateText({ shape, handleClick }) {
   const shapeRef = useRef();
   const transformerRef = useRef();
   const { selectedId, putShapeInId, pushToUndoStack } = useAppContext();
   
   const [isEditing, setIsEditing] = useState(false);
   
   const [text, setText] = useState(shape.text);

   useEffect(() => {
      if (selectedId === shape.id && transformerRef.current && shapeRef.current) {
         transformerRef.current.nodes([shapeRef.current]);
         transformerRef.current.getLayer().batchDraw();
      }
   }, [selectedId, shape.id]);

   useEffect(() => {
      pushToUndoStack()
   }, [])

   const handleTextChange = (e) => {
      setText(e.target.value);
   };

   const handleTextBlur = () => {
      const updatedShape = { ...shape, text };
      putShapeInId(shape.id, updatedShape);
      setIsEditing(false);
   };

   useEffect(() => {
      if (isEditing) {
         console.log("in effffect")
         // const input = document.querySelector(`#input-${shape.id}`);
         // if (input) {
         //    input.focus();
         // }
      }
   }, [isEditing, shape.id]);

   return (
      <React.Fragment>
         {
         // !isEditing && (
            <Text
               key={shape.id}
               x={shape.x}
               y={shape.y}
               text={text}
               fontSize={shape.fontSize}
               fill={shape.fill}
               draggable={shape.draggable}
               opacity={shape.opacity}
               ref={shapeRef}
               onClick={() => handleClick(shape.id)}

               onDblClick={() => setIsEditing((prev) => !prev)}
               
               onDragEnd={(e) => {
                  pushToUndoStack();
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
                  pushToUndoStack();
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
         // )
         }

         {selectedId === shape.id && !isEditing && (
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



         {/* {isEditing && ( */}
            <input
               id={`input-${shape.id}`}
               value="kjhwekfbwe olfwe"
               onChange={handleTextChange}
               onBlur={handleTextBlur}
               type="text"
               
               style={{
                  position: 'absolute',
                  left: shape.x,
                  top: shape.y,
                  // width: `${shape.text.length * 10 + 20}px`,
                  width: '400px',
                  height: '200px',
                  fontSize: `${shape.fontSize}px`,
                  backgroundColor: 'transparent',
                  border: '1px solid black',
                  padding: '2px',
                  outline: 'none',
                  resize: 'none',
               }}
            />
         {/* )} */}
      </React.Fragment>
   );
}

function CreatePolygon({shape, handleClick}) {
   const shapeRef = React.useRef();
   const transformerRef = React.useRef();
   const { selectedId, putShapeInId, pushToUndoStack } = useAppContext();

   useEffect(() => {
      if (selectedId === shape.id && transformerRef.current && shapeRef.current) {
         transformerRef.current.nodes([shapeRef.current]);
         transformerRef.current.getLayer().batchDraw();
      }
   }, [selectedId, shape.id]);

   useEffect(() => {
      pushToUndoStack()
   }, [])

   return (
      <React.Fragment>
      <Line
         key={shape.id}   
         draggable={shape.draggable}
         points={shape.points}
         fill={shape.fill}
         stroke={shape.stroke}
         opacity={shape.opacity}
         strokeWidth={shape.strokeWidth}
         closed={shape.closed}
         onClick={() => { handleClick(shape.id)}}
         ref={shapeRef}
         
         onDragEnd={(e) => {
            pushToUndoStack();
            const { x, y } = e.target.position();
          
            const updatedPoints = shape.points.map((coord, index) =>
              index % 2 === 0 ? coord + x : coord + y
            );
          
            putShapeInId(shape.id, { ...shape, points: updatedPoints });
          
            e.target.position({ x: 0, y: 0 });
          
            const layer = e.target.getLayer();
            if (layer) {
              layer.batchDraw();
            }
          }}
          
          onTransformEnd={(e) => {
            pushToUndoStack();
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
            putShapeInId(shape.id, updatedShape);
         }}
      />
      {selectedId === shape.id && (
         <Transformer
            ref={transformerRef}
            rotateEnabled={false} // no rotation
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
   )
}

function CreateLine({shape, handleClick}) { // no transformer
   const { selectedId, putShapeInId, pushToUndoStack } = useAppContext();
   
   useEffect(() => {
      pushToUndoStack()
   }, [])

   return <Line
      key={shape.id}   
      draggable={shape.draggable}
      points={shape.points}
      stroke={shape.stroke}
      opacity={shape.opacity}
      strokeWidth={shape.strokeWidth}
      lineJoin="round"
      // lineCap="round"
      
      onClick={() => {handleClick(shape.id)}}
      // ref={shapeRef}

      onDragEnd={(e) => {
         pushToUndoStack();
         const { x, y } = e.target.position();
      
         const updatedPoints = shape.points.map((coord, index) => {
         return index % 2 === 0 ? coord + x : coord + y;
         });
      
         const updatedShape = { ...shape, points: updatedPoints };
      
         putShapeInId(shape.id, updatedShape);
      
         e.target.position({ x: 0, y: 0 });
      }}
   />
}

function CreateFreeDraw({shape, handleClick}) { // no transformer
   const { selectedId, putShapeInId, pushToUndoStack } = useAppContext();
   
   useEffect(() => {
      pushToUndoStack()
   }, [])

   return <Line
      key={shape.id}
      points={shape.points}
      draggable={shape.draggable}
      stroke={shape.stroke}
      strokeWidth={shape.strokeWidth}
      opacity={shape.opacity}
      tension={0.5}
      lineJoin="round"
      lineCap="round"
      onClick={() => {handleClick(shape.id)}}
      // ref={shapeRef}
      onDragEnd={(e) => {
         pushToUndoStack();
         const { x, y } = e.target.position();
      
         const updatedPoints = shape.points.map((coord, index) => {
         return index % 2 === 0 ? coord + x : coord + y;
         });
      
         const updatedShape = { ...shape, points: updatedPoints };
      
         putShapeInId(shape.id, updatedShape);
      
         e.target.position({ x: 0, y: 0 });
      }}
   />
}


