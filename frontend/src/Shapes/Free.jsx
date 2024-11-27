import { useAppContext } from '../AppContext'; 

const free = {
   type: "Free",
   id: 0,
   points: [],
   draggable: true,
   strokeColor: "black",
   strokeWidth: 5,
   opacity: 1,
}

const Free = () => {
   const {
      initialPoint, setInitialPoint,
      shapeDone, setShapeDone,
      currentShape, setCurrentShape,
      data, setData
   } = useAppContext();

   function onMouseMove(e) {
      const { x, y } = e.target.getStage().getPointerPosition();
      setCurrentShape((prevShape) => ({
         ...prevShape,
         points: [...prevShape.points, x, y],
      }));
   }
   
   function onMouseDown(e) {
      const { x, y } = e.target.getStage().getPointerPosition();
      free.id = data.length
      free.points = [x, y]
      setCurrentShape(free);
   }

   function onMouseUp(e) {
      setData([...data, currentShape]);
      setCurrentShape(null);
   }

   return { onMouseDown, onMouseMove, onMouseUp }
}

export default Free;