import { useAppContext } from '../AppContext';

const rectangle = {
   type: 'Rectangle',
   draggable: false,
   id: 0,
   centerX: 0,
   centerY: 0,
   width: 0,
   height: 0,
   strokeWidth: 2,
   strokeColor: 'black',
   fill: 'blue',
   opacity: 1,
};

const Rectangle = () => {
   const {
      currentShape, setCurrentShape,
      data, setData,
      initialPoint, setInitialPoint,
      isDrawing, setIsDrawing,
   } = useAppContext();

   function onMouseUp(e) {
      if(!isDrawing) {
         setData([...data, currentShape]);
         setCurrentShape(null);
         setIsDrawing(true);
      } else {
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
      }
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
      setIsDrawing(false);
   }

   function onMouseDown(e) {
      const { x, y } = e.target.getStage().getPointerPosition();
      setInitialPoint([x, y]);

      if (!currentShape) {
         rectangle.id = data.length
         rectangle.centerX = x
         rectangle.centerY = y
         setCurrentShape(rectangle);
      } else {
         setIsDrawing(false);
      }
   }

   return { onMouseDown, onMouseMove, onMouseUp }
};

export default Rectangle;
