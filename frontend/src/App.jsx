import Canvas from './Canvas.jsx';
import StyleBar from './StyleBar/StyleBar';
import ToolBar from "./ToolBar";
import ZoomBar from "./ZoomBar";
import File from './File';

import { useAppContext } from './AppContext';

function App() {

  const {
    data,
    undoStack, setUndoStack,
  } = useAppContext();

  return (
    <>
      <File/>
      <Canvas/>
      <StyleBar/>
      <ToolBar/>
      <ZoomBar/>
    </>
  );
}

export default App;