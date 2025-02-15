import { useAppContext } from '../AppContext';

import { shape } from '../ToolBar.jsx'

// export const ellipse = {
//    type: 'Ellipse',
//    draggable: false,
//    id: 0,
//    centerX: 0, 
//    centerY: 0,
//    strokeWidth: 2,
//    stroke: '#000000',
//    fill: 'transparent',
//    opacity: 1,
//    radiusX: 0,
//    radiusY: 0,
// };

const Ellipse = () => {
   const {
      initialPoint, setInitialPoint,
      currentShape, setCurrentShape,
      data, setData,
      isDrawing, setIsDrawing,
      styleBar, setStyleBar
   } = useAppContext();

   const onMouseUp = (e) => {
      const { x, y } = e.target.getStage().getPointerPosition();
      if (isDrawing) {
         setData([...data, currentShape]);
         setCurrentShape(null);
         setIsDrawing(false);
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
      setIsDrawing(true);
   };

   const onMouseDown = (e) => {
      const { x, y } = e.target.getStage().getPointerPosition();
      setInitialPoint([x, y]);

      if (!currentShape) {
         shape.id = data.length;
         shape.centerX = x;
         shape.centerY = y;
         shape.fill = styleBar.fill;
         shape.stroke = styleBar.stroke;
         setCurrentShape(shape);
      } else {
         setIsDrawing(true) 
      }
   };

   return { onMouseUp, onMouseMove, onMouseDown };
};

export default Ellipse;
