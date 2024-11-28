import { useAppContext } from '../AppContext';

const text = {
  type: 'Text',
  id: 0,
  x: 0,
  y: 0,
  text: '',
  fontSize: 20,
  fill: 'black',
  draggable: true,
};

const Text = () => {
  const {
    currentShape, setCurrentShape,
    data, setData,
    styleBar, setStyleBar
  } = useAppContext();

  const onMouseDown = (e) => {
    const { x, y } = e.target.getStage().getPointerPosition();
    console.log(x, y);

    if (!currentShape) {
      text.id = data.length
      text.x = x
      text.y = y
      text.text = 'Enter text here'
      // text.fill = styleBar.fillColor
      setData([...data, text]);
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

export default Text;
