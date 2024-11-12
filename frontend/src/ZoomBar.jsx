import { useState } from 'react'
import hand from './assets/hand.svg';
import zoom_in from './assets/zoom-in.svg';
import zoom_out from './assets/zoom-out.svg';
import { Message } from './ToolBar';

export default function ZoomBar() {
  const [message, setMessage] = useState({ visible: false, name: '', x: 0, y: 0 });

  const showMessage = (name, event) => {
    const icon = event.currentTarget.getBoundingClientRect();
    setMessage({
      visible: true,
      name,
      x: icon.left,
      y: icon.top + 10,
    });
  };

  const hideMessage = () => {
    setMessage({ ...message, visible: false });
  };

  return (
    <div className="zoom-bar">

      <button onMouseEnter={(e) => showMessage('Hand tool', e)} onMouseLeave={hideMessage}>
        <img src={hand} alt="Hand Tool" />
      </button>
      
      <button onMouseEnter={(e) => showMessage('Zoom in', e)} onMouseLeave={hideMessage}>
        <img src={zoom_in} alt="Zoom in Tool" />
      </button>
      
      <button onMouseEnter={(e) => showMessage('Zoom out', e)} onMouseLeave={hideMessage}>
        <img src={zoom_out} alt="Zoom out Tool" />
      </button>
      
      {message.visible && <Message name={message.name} x={message.x} y={message.y} />}
    </div>

  )
}
