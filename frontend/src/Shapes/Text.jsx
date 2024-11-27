import { useAppContext } from '../AppContext';

const text = {
    type: 'Text',
    id: 0,
    x: 0,
    y: 0,
    text: '',
    fontSize: 20,
    fontFamily: 'Arial',
    fill: 'black',
    draggable: true,
};

const Text = () => {
   const {
        initialPoint, setInitialPoint,
        currentShape, setCurrentShape,
        data, setData,
        userisEditing, setIsEditing,
   } = useAppContext();

   const onMouseDown = (e) => {
    const { x, y } = e.target.getStage().getPointerPosition();
    console.log(x, y);
    setInitialPoint([x, y]);

    if (!currentShape) {
        text.id = data.length
      setCurrentShape(text);
      setIsEditing(true);
    }
  };
  

   const onMouseMove = (e) => {
    return;
   };

   const onMouseUp = (e) => {
    return;
   };

   return { onMouseDown, onMouseMove, onMouseUp };
};

export default Text;
