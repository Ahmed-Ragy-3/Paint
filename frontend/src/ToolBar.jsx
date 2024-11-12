/* eslint-disable react/prop-types */
import { useState } from 'react';
import './bars.css';

import move_tool from './assets/move-tool.svg';
import line from './assets/line-icon.svg';
import polygon from './assets/polygon.svg';
import triangle from './assets/triangle.svg';
import rectangle from './assets/rectangle.svg';
import circle from './assets/circle.svg';
import brush from './assets/brush-tool.svg';
import text from './assets/textIcon.svg';
import addImage from './assets/add-image.svg';

function Message({ name, x, y }) {
  return (
    <div style={{
        position: 'absolute',
        top: y,
        left: x,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        color: 'white',
        padding: '5px',
        borderRadius: '8px',
        fontSize: '0.8em',
      }}>
      {name}
    </div>
  );
}

export default function ToolBar() {
  const [message, setMessage] = useState({ visible: false, name: '', x: 0, y: 0 });

  const showMessage = (name, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMessage({
      visible: true,
      name,
      x: rect.right + 15,
      y: rect.top,
    });
  };

  const hideMessage = () => {
    setMessage({ ...message, visible: false });
  };

  return (
    <div className='toolbar'>

      <button onMouseEnter={(e) => showMessage('Move tool', e)} onMouseLeave={hideMessage}>
        <img src={move_tool} alt="Move Tool" />
      </button>
      
      <button onMouseEnter={(e) => showMessage('Line tool', e)} onMouseLeave={hideMessage}>
        <img src={line} alt="Line Tool" />
      </button>
      
      <button onMouseEnter={(e) => showMessage('Polygon tool', e)} onMouseLeave={hideMessage}>
        <img src={polygon} alt="Polygon Tool" />
      </button>
      
      <button onMouseEnter={(e) => showMessage('Triangle tool', e)} onMouseLeave={hideMessage}>
        <img src={triangle} alt="Triangle Tool" />
      </button>
      
      <button onMouseEnter={(e) => showMessage('Rectangle tool', e)} onMouseLeave={hideMessage}>
        <img src={rectangle} alt="Rectangle Tool" />
      </button>
      
      <button onMouseEnter={(e) => showMessage('Circle tool', e)} onMouseLeave={hideMessage}>
        <img src={circle} alt="Circle Tool" />
      </button>
      
      <button onMouseEnter={(e) => showMessage('Brush tool', e)} onMouseLeave={hideMessage}>
        <img src={brush} alt="Brush Tool" />
      </button>
      
      <button onMouseEnter={(e) => showMessage('Text tool', e)} onMouseLeave={hideMessage}>
        <img src={text} alt="Text Tool" />
      </button>
      
      <button onMouseEnter={(e) => showMessage('Add Image', e)} onMouseLeave={hideMessage}>
        <img src={addImage} alt="Add Image Tool" />
      </button>

      {message.visible && <Message name={message.name} x={message.x} y={message.y} />}
    </div>
  );
}
