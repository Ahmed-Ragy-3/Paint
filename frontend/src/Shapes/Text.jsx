import { useAppContext } from '../AppContext';

export let text = {
  type: 'Text',
  id: 0,
  x: 0,
  y: 0,
  text: '',
  fontSize: 20,
  fill: '#000000',
  opacity: 1,
  draggable: true,
};

const TextTool = () => {
  const {
    currentShape, setCurrentShape,
    data, setData,
    styleBar, setStyleBar
  } = useAppContext();

  const onMouseDown = (e) => {
    const { x, y } = e.target.getStage().getPointerPosition();
    console.log(x, y);
  
    if (!currentShape) {
      const newText = {
        ...text,  // Spread the default text properties
        id: data.length,
        x,
        y,
        text: 'Enter text here',
      };
      setData([...data, newText]);  // Add new text object to data
      setCurrentShape(null);
    }
  
    console.log(data);
  };

  const onMouseMove = (e) => {
    return;
  };

  const onMouseUp = (e) => {
    return;
  };

  return { onMouseDown, onMouseMove, onMouseUp };
};

export default TextTool;
