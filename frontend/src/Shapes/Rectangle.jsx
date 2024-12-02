import { useAppContext } from '../AppContext';

import { shape } from '../ToolBar.jsx'
// export const rectangle = {
//    type: 'Rectangle',
//    draggable: false,
//    id: 0,
//    centerX: 0,
//    centerY: 0,
//    width: 0, 
//    height: 0,
//    strokeWidth: 2,
//    stroke: '#000000',
//    fill: '#000000',
//    opacity: 1,
// };

const Rectangle = () => {
   const {
      currentShape, setCurrentShape,
      data, setData,
      initialPoint, setInitialPoint,
      isDrawing, setIsDrawing,
      styleBar, setStyleBar
   } = useAppContext();

   function onMouseUp(e) {
      if(isDrawing) {

         setData([...data, currentShape]);
         setCurrentShape(null);
         setIsDrawing(false);
      } else {
         const { x, y } = e.target.getStage().getPointerPosition();
         let w = Math.abs(x - initialPoint[0]);
         let h = Math.abs(y - initialPoint[1]);
   
         let cx = (initialPoint[0] + x) / 2
         let cy = (initialPoint[1] + y) / 2
   
         if(e.evt.shiftKey) {
            if(h < w) {
               h = w
               // cy = (h) / 2
               cy = (initialPoint[1] + h) / 2
            }else {
               w = h
               // cx = (w) / 2
               cx = (initialPoint[0] + w) / 2
            }
         }
   
         setCurrentShape((prevShape) => ({
            ...prevShape,
            // centerX: initialPoint[0] - w / 2,
            centerX: cx,
            centerY: cy,
            // centerY: initialPoint[1] - h / 2,
            width: w,
            height: h,
         }));
      }
   }

   function onMouseMove(e) {
      const { x, y } = e.target.getStage().getPointerPosition();
      let w = Math.abs(x - initialPoint[0]);
      let h = Math.abs(y - initialPoint[1]);
      
      const cx = x < initialPoint[0] ? initialPoint[0] - w : initialPoint[0];
      const cy = y < initialPoint[1] ? initialPoint[1] - h : initialPoint[1];

      if (e.evt.shiftKey) {
         if (h < w) {
            h = w;
         } else {
            w = h;
         }
      }

      setCurrentShape((prevShape) => ({
         ...prevShape,
         centerX: cx,
         centerY: cy,
         width: w,
         height: h,
      }));
      setIsDrawing(true);
   }

   function onMouseDown(e) {
      const { x, y } = e.target.getStage().getPointerPosition();
      setInitialPoint([x, y]);

      if (!currentShape) {
         shape.id = data.length
         shape.centerX = x
         shape.centerY = y
         shape.fill = styleBar.fill;
         shape.stroke = styleBar.stroke;
         setCurrentShape(shape);
      } else {
         setIsDrawing(true);
      }
   }

   return { onMouseDown, onMouseMove, onMouseUp }
};

export default Rectangle;
