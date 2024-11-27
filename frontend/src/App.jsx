import Canvas from './Canvas.jsx';
import StyleBar from './StyleBar/StyleBar';
import ToolBar from "./ToolBar";
import ZoomBar from "./ZoomBar";

// import { useAppContext } from './AppContext';

function App() {

  return (
    <>
      <Canvas/>
      <StyleBar/>
      <ToolBar/>
      <ZoomBar/>
    </>
  );
}

export default App;