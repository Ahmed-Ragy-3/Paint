import { useAppContext } from '../AppContext';

import unlink from './icons/unlink.svg';
import link from './icons/link.svg';

export default function Size() {

  const {styleBar, setStyleBar} = useAppContext();

  const handleWidthChange = (e) => {
    const newWidth = e.target.value;
    setStyleBar({...styleBar, width: newWidth, height: link ? newWidth / ratio : height})
    // setWidth(newWidth);
    // if (styleBar.link) {
    //   setHeight(newWidth / ratio);
    // }
  };
  
  const handleHeightChange = (e) => {
    const newHeight = e.target.value;
    setStyleBar({...styleBar, height: newHeight, width: link ? newHeight * ratio : width})
    
    // setHeight(newHeight);
    // if (link) {
    //   setWidth(newHeight * ratio);
    // }
  };

  const handleLinkToggle = () => {
    // setlink((prev) => !prev);

    // if (!link) {
    //   setRatio(width / height);
    // }
  };

  return (
    <div className="length-and-width">
      <div className="length-and-width-line">
        <label className="length-and-width-label">W</label>
        <input
          className="length-and-width-input"
          type="number"
          value={styleBar.width}
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
        {styleBar.link ? <img src={unlink} alt="unlink" /> : <img src={link} alt="link" />}
      </button>

      <div className="length-and-width-line">
        <label className="length-and-width-label">H</label>
        <input
          className="length-and-width-input"
          type="number"
          value={styleBar.height}
          min={0}
          onChange={handleHeightChange}
          title="Change Height Value"
        />
      </div>
    </div>
  );
}
