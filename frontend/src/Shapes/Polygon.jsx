import { useAppContext } from '../AppContext'; 

export const polygon = {
   type: 'Polygon',
   draggable: false,
   id: 0,
   points: [0, 0],
   strokeWidth: 4,
   strokeColor: 'black',
   opacity: 1,
}

const Polygon = () => {
   const {
      initialPoint, setInitialPoint,
      shapeDone, setShapeDone,
      currentShape, setCurrentShape,
      data, setData
   } = useAppContext();

   function onMouseMove(e) {
      const { x, y } = e.target.getStage().getPointerPosition();
      console.log(currentShape)

      if(Math.abs(x - currentShape.points[0]) < 5 && Math.abs(y - currentShape.points[1]) < 5) {
         // console.log("Near")
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
      
      setCurrentShape((prevShape) => ({
            ...prevShape,
            points: [...prevShape.points, x, y],
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