import { useAppContext } from '../AppContext';

const ellipse = {
   type: 'Ellipse',
   draggable: false,
   id: 0,
   centerX: 0, 
   centerY: 0,
   strokeWidth: 2,
   strokeColor: '#000000',
   fill: 'transparent',
   opacity: 1,
   radiusX: 0,
   radiusY: 0,
};

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
         ellipse.id = data.length;
         ellipse.centerX = x;
         ellipse.centerY = y;
         ellipse.fill = styleBar.fill;
         ellipse.strokeColor = styleBar.strokeColor;
         setCurrentShape(ellipse);
      } else {
         setIsDrawing(true) 
      }
   };

   return { onMouseUp, onMouseMove, onMouseDown };
};

export default Ellipse;
