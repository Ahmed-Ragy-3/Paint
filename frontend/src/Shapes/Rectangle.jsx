import { useAppContext } from '../AppContext';

const Rectangle = () => {
   const {
      shapeDone, setShapeDone,
      currentShape, setCurrentShape,
      data, setData,
      initialPoint, setInitialPoint
   } = useAppContext();

   function onMouseUp(e) {
      const { x, y } = e.target.getStage().getPointerPosition();

      if (shapeDone) {
         setData([...data, currentShape]);
         setCurrentShape(null);
         setShapeDone(false);
      } else {
         let w = Math.abs(x - initialPoint[0]);
         setCurrentShape((prevShape) => ({
            ...prevShape,
            centerX: (initialPoint[0] + x) / 2,
            centerY: (initialPoint[1] + y) / 2,
            width: w,
            height: e.evt.shiftKey ? w : Math.abs(y - initialPoint[1]),
         }));
         setShapeDone(true);
      }
   }

   function onMouseMove(e) {
      const { x, y } = e.target.getStage().getPointerPosition();
      let w = Math.abs(x - initialPoint[0]);

      setCurrentShape((prevShape) => ({
         ...prevShape,
         centerX: (initialPoint[0] + x) / 2,
         centerY: (initialPoint[1] + y) / 2,
         width: w,
         height: e.evt.shiftKey ? w : Math.abs(y - initialPoint[1]),
      }));
      setShapeDone(true);
   }

   function onMouseDown(e) {
      const { x, y } = e.target.getStage().getPointerPosition();
      setInitialPoint([x, y]);

      if (!currentShape) {
         const newRectangle = {
            type: 'Rectangle',
            draggable: false,
            id: data.length,
            centerX: x,
            centerY: y,
            width: 0,
            height: 0,
            strokeWidth: 2,
            strokeColor: 'black',
            fill: 'blue',
            opacity: 1,
         };
         setCurrentShape(newRectangle);
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

export default Rectangle;
