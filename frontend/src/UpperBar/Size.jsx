import { useState } from 'react';
import './Size.css';
export default function Size() {
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);
  const [linkDimensions, setLinkDimensions] = useState(false);

  const handleWidthChange = (e) => setWidth(e.target.value);
  const handleHeightChange = (e) => setHeight(e.target.value);

  const handleLinkToggle = () => {
    setLinkDimensions((prev) => !prev);
    if (linkDimensions) {
      setHeight(width);  // If linked, update height to match width
    }
  };

  return (
    <div className="Size" role="group">
      <div className='line'>
        <label>W</label>
        <input
          type="number"
          value={width}
          min={0}
          onChange={handleWidthChange}
        />
      </div>
      
      <button
        className="btn"
        onClick={handleLinkToggle}
        title='Link Width and Height'
      >
        {linkDimensions ? <span className="ci--link-horizontal-off"></span> : <span className="ci--link-horizontal"></span>}
      </button>

      <div className='line'>
        <label>H</label>
        <input
          type="number"
          value={linkDimensions ? width : height}
          min={0}
          onChange={handleHeightChange}
          disabled={linkDimensions}
        />
      </div>

    </div>
  );
}