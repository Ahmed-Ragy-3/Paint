import Canvas from './Canvas.jsx';
import StyleBar from './StyleBar/StyleBar';
import ToolBar from "./ToolBar";
import ZoomBar from "./ZoomBar";

import { useAppContext } from './AppContext';

function App() {
  const {
    initialPoint, setInitialPoint,
    currentShape, setCurrentShape,
    isEditing, setIsEditing,
    data, setData,
    userText, setUserText
  } = useAppContext();

  return (
    <>
      {isEditing && (
        <div
          style={{
            display: 'flex',
            position: 'relative',
            height: '30px',
            width: '200px',
            top: `${initialPoint[1]}px`,
            left: `${initialPoint[0]}px`,
            zIndex: 10,
            border: '1px solid #ccc',
          }}
        >
          <input
            style={{ 
              height: '30px',
              width: '200px',
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: '16px',
              fontFamily: 'Arial',
              color: 'black',
            }}
            type="text"
            value={userText}
            onChange={(e) => {
              setUserText(e.target.value)
            }}
            placeholder="Enter text here"
            autoFocus
          />
          <button onClick={() => {
            console.log('Initial Point:', initialPoint);
            setData((prevData) => [...prevData, { ...currentShape, text: userText ,x: initialPoint[0], y: initialPoint[1],}]);
            setCurrentShape(null);
            setIsEditing(false)
            setUserText('')
            }}>T</button>
        </div>
      )}
      <Canvas/>
      <StyleBar/>
      <ToolBar/>
      <ZoomBar/>
    </>
  );
}

export default App;