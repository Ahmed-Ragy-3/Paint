import { useAppContext } from '../AppContext'; 

const Line = () => {
   const {
      initialPoint, setInitialPoint,
      shapeDone, setShapeDone,
      currentShape, setCurrentShape,
      data, setData,
   } = useAppContext();

   function onMouseUp(e) {
      const { x, y } = e.target.getStage().getPointerPosition();
      if (shapeDone) {
         setData([...data, currentShape]);
         setCurrentShape(null);
         setShapeDone(false);
      } else {
         setCurrentShape((prevShape) => ({
            ...prevShape,
            points: [prevShape.points[0], prevShape.points[1], x, y],
         }));
      }
   }

   function onMouseMove(e) {
      const { x, y } = e.target.getStage().getPointerPosition();
      setCurrentShape((prevShape) => ({
         ...prevShape,
         points: [prevShape.points[0], prevShape.points[1], x, y],
      }));
      setShapeDone(true);
   }

   function onMouseDown(e) {
      const { x, y } = e.target.getStage().getPointerPosition();
      setInitialPoint([x, y]);
      if (!currentShape) {
         const newLine = {
            type: 'Line',
            draggable: false,
            id: data.length,
            points: [x, y, x, y],
            strokeColor: 'black',
            strokeWidth: 2,
            opacity: 1,
         };
         setCurrentShape(newLine);
      } else {
         setShapeDone(true) 
      }
   }

   return {
      onMouseDown,
      onMouseMove,
      onMouseUp,
   };
};

export default Line;
