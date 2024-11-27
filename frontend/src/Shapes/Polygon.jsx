import { useAppContext } from '../AppContext'; 

export const polygon = {
   type: 'Polygon',
   draggable: false,
   id: 0,
   fill: 'grey',
   points: [],
   strokeWidth: 4, 
   strokeColor: 'black',
   opacity: 1,
   closed: false,
}

const Polygon = () => {
   const {
      currentShape, setCurrentShape,
      isDrawing, setIsDrawing
   } = useAppContext();

   function onMouseMove(e) {
      if(!isDrawing) return
      const { x, y } = e.target.getStage().getPointerPosition();
      // console.log(currentShape)

      if(Math.abs(x - currentShape.points[0]) < 10 && Math.abs(y - currentShape.points[1]) < 10) {
         console.log("Near")
      }

      setCurrentShape((prevShape) => {
         const updatedPoints = [...prevShape.points];
     
         updatedPoints[updatedPoints.length - 2] = x;
         updatedPoints[updatedPoints.length - 1] = y;
     
         return {...prevShape, points: updatedPoints,};
      });
   }

   function onMouseDown(e) {
      const { x, y } = e.target.getStage().getPointerPosition();
      // console.log(currentShape.points)
      setIsDrawing(true)

      if(Math.abs(x - currentShape.points[0]) < 10 && Math.abs(y - currentShape.points[1]) < 10) {
         setCurrentShape((prevShape) => ({
            ...prevShape,
            points: [...prevShape.points, currentShape.points[0], currentShape.points[1], x, y],
            closed: true,
         }));
         
         return;
      }
      
      setCurrentShape((prevShape) => ({
         ...prevShape,
         points: [...prevShape.points, x, y, x, y],
         closed: false,
         })
      );
      console.log(currentShape)
   }
   
   function onMouseUp(e) {
      // nothing (handled by keydown events)
      // setCurrentShape(currentShape)
   }

   return { onMouseDown, onMouseMove, onMouseUp }
}

export default Polygon;