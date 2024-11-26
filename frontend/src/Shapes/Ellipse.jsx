import { useAppContext } from '../AppContext'; 

const Ellipse = () => {
   const { 
            initialPoint, setInitialPoint,
            shapeDone, setShapeDone,
            currentShape, setCurrentShape,
            data, setData 
         } = useAppContext();

   const onMouseUp = (e) => {
      const { x, y } = e.target.getStage().getPointerPosition();
      if (shapeDone) {
         setData([...data, currentShape]);
         setCurrentShape(null);
         setShapeDone(false);
      } else {
         let radX = Math.abs(x - initialPoint[0]);
         setCurrentShape((prevShape) => ({
            ...prevShape,
            radiusX: radX,
            radiusY: e.evt.shiftKey ? radX : Math.abs(y - initialPoint[1]),
         }));
      }
   };

   const onMouseMove = (e) => {
      const { x, y } = e.target.getStage().getPointerPosition();
      let radX = Math.abs(x - initialPoint[0]);
      setCurrentShape((prevShape) => ({
         ...prevShape,
         radiusX: radX,
         radiusY: e.evt.shiftKey ? radX : Math.abs(y - initialPoint[1]),
      }));
      setShapeDone(true);
   };

   const onMouseDown = (e) => {
      const { x, y } = e.target.getStage().getPointerPosition();
      setInitialPoint([x, y]);

      if (!currentShape) {
         const newEllipse = {
            type: 'Ellipse',
            draggable: false,
            id: data.length,
            centerX: x,
            centerY: y,
            strokeWidth: 2,
            strokeColor: 'black',
            fill: 'transparent',
            opacity: 1,
            radiusX: 0,
            radiusY: 0,
         };
         setCurrentShape(newEllipse);
       } else {
         setShapeDone(true) 
       }
   };

   return { onMouseUp, onMouseMove, onMouseDown };
};

export default Ellipse;
