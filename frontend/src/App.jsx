import UpperBar from './UpperBar/UpperBar';

// import { Stage } from "react-konva";
import ToolBar from "./ToolBar";
import './AppStyle.css'
import ZoomBar from "./ZoomBar";


function App() {
  return (
    <>
      <UpperBar/>
      <ToolBar/>
      <ZoomBar/>
    </>
  );
}

export default App;