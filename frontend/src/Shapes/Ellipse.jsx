import { useAppContext } from '../AppContext'; 

const ellipse = {
   type: 'Ellipse',
   draggable: false,
   id: 0,
   centerX: 0,
   centerY: 0,
   strokeWidth: 2,
   strokeColor: 'black',
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
      isDrawing, setIsDrawing
   } = useAppContext();

   const onMouseUp = (e) => {
      const { x, y } = e.target.getStage().getPointerPosition();
      if (!isDrawing) {
         setData([...data, currentShape]);
         setCurrentShape(null);
         setIsDrawing(true);
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
      setIsDrawing(false);
   };

   const onMouseDown = (e) => {
      const { x, y } = e.target.getStage().getPointerPosition();
      setInitialPoint([x, y]);

      if (!currentShape) {
         ellipse.id = data.length;
         ellipse.centerX = x;
         ellipse.centerY = y;
         setCurrentShape(ellipse);
      } else {
         setIsDrawing(false) 
      }
   };

   return { onMouseUp, onMouseMove, onMouseDown };
};

export default Ellipse;
