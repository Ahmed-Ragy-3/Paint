import { Stage, Layer } from 'react-konva';
import ToolBar from "./ToolBar";
import UpperBar from './UpperBar/UpperBar';
import ZoomBar from "./ZoomBar";

import createShape from '../create.js';
import data from "../sample.json";

// import './AppStyle.css'


function App() {
  return (
    <>
      <Stage width={1250} height={680}>
        <Layer>
          {
            data.shapes.map((shape) => {
              createShape(shape)
            })
          }
        </Layer>
      </Stage>

      <UpperBar/>
      <ToolBar/>
      <ZoomBar/>
    </>
  );
}

export default App;