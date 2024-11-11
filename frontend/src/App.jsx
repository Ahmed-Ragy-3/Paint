// Import the SVG as an image and rename it to `delete`

// import { Stage } from "react-konva";
import ToolBar from "./ToolBar";
import './AppStyle.css'
import ZoomBar from "./ZoomBar";


function App() {
  return (
    <>
      <ToolBar/>
      <ZoomBar/>
    </>
  );
}

export default App;
