import { useAppContext } from '../AppContext';

const Triangle = () => {
   const {
      shapeDone, setShapeDone,
      currentShape, setCurrentShape,
      data, setData,
      secondPointDone, setSecondPointDone
   } = useAppContext();

   let moved = false;

   function onMouseMove(e) {
      const { x, y } = e.target.getStage().getPointerPosition();
      
      moved = true;

      if (!secondPointDone) {
         setCurrentShape((prevShape) => ({
            ...prevShape,
            points: [prevShape.points[0], prevShape.points[1], x, y, prevShape.points[4], prevShape.points[5]],
         }));
         console.log('Updating second point...');
      } else {
         setCurrentShape((prevShape) => ({
            ...prevShape,
            points: [prevShape.points[0], prevShape.points[1], prevShape.points[2], prevShape.points[3], x, y],
         }));
         console.log('Updating third point...');
      }
   }

   function onMouseUp(e) {
      const { x, y } = e.target.getStage().getPointerPosition();

      if (shapeDone) {
         moved = false;
         setData([...data, currentShape]);
         setCurrentShape(null);
         setShapeDone(false);
         setSecondPointDone(false);
      } else if (!secondPointDone) {
         if (!moved) {
            return;
         }
         setCurrentShape((prevShape) => ({
            ...prevShape,
            points: [prevShape.points[0], prevShape.points[1], x, y, prevShape.points[4], prevShape.points[5]],
         }));
         setSecondPointDone(true);
         console.log('Second point finalized.');
      } else {
         setCurrentShape((prevShape) => ({
            ...prevShape,
            points: [prevShape.points[0], prevShape.points[1], prevShape.points[2], prevShape.points[3], x, y],
         }));
         console.log('Third point finalized.');
      }
   }

   function onMouseDown(e) {
      const { x, y } = e.target.getStage().getPointerPosition();

      if (!currentShape) {
         const newTriangle = {
            type: 'Triangle',
            draggable: false,
            id: data.length,
            points: [x, y, x, y, x, y],
            strokeColor: 'black',
            strokeWidth: 2,
            fill: 'transparent',
            opacity: 1,
         };
         setCurrentShape(newTriangle);
      } else if (!secondPointDone) {
         setSecondPointDone(true);
      } else {
         setShapeDone(true);
      }
   }

   return {
      onMouseDown,
      onMouseMove,
      onMouseUp,
   };
};

export default Triangle;
