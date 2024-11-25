import Canvas from './Canvas.jsx';
import StyleBar from './StyleBar/StyleBar';
import ToolBar from "./ToolBar";
import ZoomBar from "./ZoomBar";

import { useState } from 'react';

function App() {
  const [data, setData] = useState([])
  const [activeTool, setActiveTool] = useState("")
  const [fillColor, setFillColor] = useState('#ffffff');


  return (
    <>
      <Canvas data={data} setData={setData} activeTool={activeTool} setActiveTool={setActiveTool} fillColor={fillColor}/>
      <StyleBar fillColor={fillColor} setFillColor={setFillColor}/>
      <ToolBar activeTool={activeTool} setActiveTool={setActiveTool}/>
      <ZoomBar/>
    </>
  );
}

export default App;