import hand from './assets/hand.svg';
import zoom_in from './assets/zoom-in.svg';
import zoom_out from './assets/zoom-out.svg';

export default function ZoomBar() {
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
