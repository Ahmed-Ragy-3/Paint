import { useState } from 'react';

import link from './icons/link.svg';
import unlink from './icons/unlink.svg';

export default function Size() {
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [ratio, setRatio] = useState(1);
  const [linkDimensions, setLinkDimensions] = useState(false);

  const handleWidthChange = (e) => {
    const newWidth = e.target.value;

    if (linkDimensions) {
      setWidth(newWidth);
      setHeight(newWidth / ratio);
    } else {
      setWidth(newWidth);
    }
  };

  const handleHeightChange = (e) => {
    const newHeight = e.target.value;

    if (linkDimensions) {
      setHeight(newHeight);
      setWidth(newHeight * ratio);
    } else {
      setHeight(newHeight);
    }
  };

  const handleLinkToggle = () => {
    setLinkDimensions((prev) => !prev);

    if (!linkDimensions) {
      setRatio(width / height);
    }
  };

  return (
    <div className="length-and-width">
      <div className="length-and-width-line">
        <label className="length-and-width-label">W</label>
        <input
          className="length-and-width-input"
          type="number"
          value={width}
          min={0}
          onChange={handleWidthChange}
          title="Change Width Value"
        />
      </div>

      <button
        className="length-and-width-btn"
        onClick={handleLinkToggle}
        title="Link Width and Height"
      >
        {linkDimensions ? <img src={unlink} alt="unlink" /> : <img src={link} alt="link" />}
      </button>

      <div className="length-and-width-line">
        <label className="length-and-width-label">H</label>
        <input
          className="length-and-width-input"
          type="number"
          value={height}
          min={0}
          onChange={handleHeightChange}
          title="Change Height Value"
        />
      </div>
    </div>
  );
}
