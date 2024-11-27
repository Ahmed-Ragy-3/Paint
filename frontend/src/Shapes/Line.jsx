import { useAppContext } from '../AppContext'; 

const line = {
   type: 'Line',
   draggable: false,
   id: 0,
   points: [0, 0, 0, 0],
   strokeColor: 'black', 
   strokeWidth: 2,
   opacity: 1,
};

const Line = () => {
   const {
      currentShape, setCurrentShape,
      data, setData,
      isDrawing, setIsDrawing,
   } = useAppContext();

   function onMouseUp(e) {
      const { x, y } = e.target.getStage().getPointerPosition();
      if (isDrawing) {
         setData([...data, currentShape]);
         setCurrentShape(null);
         setIsDrawing(false);
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
      setIsDrawing(true);
   }

   function onMouseDown(e) {
      const { x, y } = e.target.getStage().getPointerPosition();
      if (!currentShape) {
         line.id = data.length;
         line.points = [x, y, x, y];
         setCurrentShape(line);
      } else {
         setIsDrawing(true)
      }
   }

   return {
      onMouseDown,
      onMouseMove,
      onMouseUp,
   };
};

export default Line;
