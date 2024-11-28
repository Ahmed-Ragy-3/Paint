import { useAppContext } from '../AppContext';

const triangle = {
   type: 'Triangle',
   draggable: false,
   id: 0,
   points: [0, 0, 0, 0, 0, 0],
   strokeColor: 'black',
   strokeWidth: 2,
   fill: 'transparent', 
   opacity: 1,
};

const Triangle = () => {
   const {
      currentShape, setCurrentShape,
      data, setData,
      secondPointDone, setSecondPointDone,
      isDrawing, setIsDrawing,
      styleBar, setStyleBar
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
         // console.log('Updating second point...');
      } else {
         setCurrentShape((prevShape) => ({
            ...prevShape,
            points: [prevShape.points[0], prevShape.points[1], prevShape.points[2], prevShape.points[3], x, y],
         }));
         // console.log('Updating third point...');
      }
   }

   function onMouseUp(e) {
      const { x, y } = e.target.getStage().getPointerPosition();

      if (isDrawing) {
         moved = false;
         setData([...data, currentShape]);
         setCurrentShape(null);
         setIsDrawing(false);
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
         // console.log('Second point finalized.');
      } else {
         setCurrentShape((prevShape) => ({
            ...prevShape,
            points: [prevShape.points[0], prevShape.points[1], prevShape.points[2], prevShape.points[3], x, y],
         }));
         // console.log('Third point finalized.');
      }
   }

   function onMouseDown(e) {
      const { x, y } = e.target.getStage().getPointerPosition();

      if (!currentShape) {
         triangle.id = data.length
         triangle.points = [x, y, x, y, x, y],
         triangle.fill = styleBar.fillColor;
         triangle.strokeColor = styleBar.strokeColor;
         setCurrentShape(triangle);
      } else if (!secondPointDone) {
         setSecondPointDone(true);
      } else {
         setIsDrawing(true);
      }
   }

   return {
      onMouseDown,
      onMouseMove,
      onMouseUp,
   };
};

export default Triangle;
