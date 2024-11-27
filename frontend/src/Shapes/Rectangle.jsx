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
      setData([...data, currentShape]);
      setCurrentShape(null);
   }

   function onMouseMove(e) {
      const { x, y } = e.target.getStage().getPointerPosition();
      let w = Math.abs(x - initialPoint[0]);
      let h = Math.abs(y - initialPoint[1]);

      let cx = (initialPoint[0] + x) / 2
      let cy = (initialPoint[1] + y) / 2

      if(e.evt.shiftKey) {
         if(h < w) {
            h = w
            cy = (initialPoint[1] + h) / 2
         }else {
            w = h
            cx = (initialPoint[0] + w) / 2
         }
      }

      setCurrentShape((prevShape) => ({
         ...prevShape,
         centerX: cx,
         centerY: cy,
         width: w,
         height: h,
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
