import hand from './assets/hand.svg';
import zoom_in from './assets/zoom-in.svg';
import zoom_out from './assets/zoom-out.svg';

import { useAppContext } from './AppContext';

export default function ZoomBar() {

  const {
    initialPoint, setInitialPoint,
        shapeDone, setShapeDone,
        currentShape, setCurrentShape,
        selectedShape, setSelectedShape,
        secondPointDone, setSecondPointDone,
        data, setData,
        activeTool, setActiveTool,
        fillColor, setFillColor,
  } = useAppContext();
  
  return (
    <div className="zoom-bar">

      <button data-tooltip="My Custom Tooltip">
        <img src={hand} alt="Hand Tool" />
      </button>
      
      <button data-tooltip="My Custom Tooltip">
        <img src={zoom_in} alt="Zoom in Tool" />
      </button>
      
      <button data-tooltip="My Custom Tooltip">
        <img src={zoom_out} alt="Zoom out Tool" />
      </button>
      
    </div>

  )
}
