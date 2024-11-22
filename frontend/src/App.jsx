
import ToolBar from "./ToolBar";
import StyleBar from './StyleBar/StyleBar';
import ZoomBar from "./ZoomBar";


import Canvas from './Canvas.jsx';

// import './AppStyle.css'


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