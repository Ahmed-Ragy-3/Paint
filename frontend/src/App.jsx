import Canvas from './Canvas.jsx';
import StyleBar from './StyleBar/StyleBar';
import ToolBar from "./ToolBar";
import ZoomBar from "./ZoomBar";

import { useAppContext } from './AppContext';

function App() {

  const {
    data,
    undoStack, setUndoStack,
  } = useAppContext();

  return (
    <div>
      <Canvas/>
      <StyleBar/>
      <ToolBar/>
      <ZoomBar/>
    </div>
  );
}

export default App;