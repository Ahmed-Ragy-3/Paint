import { useAppContext } from '../AppContext';

const free = {
   type: "Free",
   id: 0,
   points: [],
   draggable: false,
   stroke: "#000000", 
   strokeWidth: 5,
   opacity: 1,
}

const Free = () => {
   const {
      currentShape, setCurrentShape,
      data, setData,
      styleBar, setStyleBar
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
      free.stroke = styleBar.stroke;
      setCurrentShape(free);
   }

   function onMouseUp(e) {
      setData([...data, currentShape]);
      setCurrentShape(null);
   }

   return { onMouseDown, onMouseMove, onMouseUp }
}

export default Free;