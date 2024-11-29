import { useAppContext } from '../AppContext';
import unlink from './icons/unlink.svg';
import link from './icons/link.svg';
import { useState } from 'react';

export default function Size() {

  const { 
    data,
    undoStack, setUndoStack,
    styleBar, setStyleBar, selectedShapeType,
    equalTop

  } = useAppContext();
  const [ratio, setRatio] = useState(1);

  const handleWidthChange = (e) => {
    if(!equalTop(undoStack, data)) {
      console.log("push in undo stack")
      
      setUndoStack((prevUndoStack) => [...prevUndoStack, data]);
    }

    const newValue = parseFloat(e.target.value);
    if (selectedShapeType === 'Rectangle') {
      setStyleBar({
        ...styleBar,
        width: newValue,
        height: styleBar.link ? newValue / ratio : styleBar.height,
      });
    } else {
      const newRadiusY = styleBar.link ? newValue / ratio : styleBar.radiusY;
      setStyleBar({
        ...styleBar,
        radiusX: newValue,
        radiusY: newRadiusY,
      });
    }
  };

  const handleHeightChange = (e) => {
    if(!equalTop(undoStack, data)) {
      console.log("push in undo stack")
      
      setUndoStack((prevUndoStack) => [...prevUndoStack, data]);
    }

    const newValue = parseFloat(e.target.value);
    if (selectedShapeType === 'Rectangle') {
      setStyleBar({
        ...styleBar,
        width: styleBar.link ? newValue * ratio : styleBar.width,
        height: newValue,
      });
    } else {
      const newRadiusX = styleBar.link ? newValue * ratio : styleBar.radiusX;
      setStyleBar({
        ...styleBar,
        radiusX: newRadiusX,
        radiusY: newValue,
      });
    }
  };

  const handleLinkToggle = () => {

    const [dim1, dim2] = selectedShapeType === 'Rectangle'
      ? [styleBar.width, styleBar.height]
      : [styleBar.radiusX, styleBar.radiusY];

    const newRatio = dim2 !== 0 ? dim1 / dim2 : 1;

    setRatio(newRatio);
    setStyleBar({ ...styleBar, link: !styleBar.link });
  };

  return (
    (selectedShapeType === 'Rectangle' || selectedShapeType === 'Ellipse') && (
      <div className="length-and-width">
        
        <div className="length-and-width-line">
          <label className="length-and-width-label">
            {selectedShapeType === 'Rectangle' ? 'W' : 'X'}
          </label>
          <input
            className="length-and-width-input"
            type="number"
            value={selectedShapeType === 'Rectangle' ? styleBar.width : styleBar.radiusX}
            min={0}
            onChange={handleWidthChange}
            title={selectedShapeType === 'Rectangle' ? "Change Width Value" : 'Change Radius X Value'}

            // onBlur={() => {
            //   console.log("push in undo stack")
            //   if(!equalTop(undoStack, data)) {
                
            //     setUndoStack((prevUndoStack) => [...prevUndoStack, data]);
            //   }
            // }}
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
          <label className="length-and-width-label">
            {selectedShapeType === 'Rectangle' ? 'H' : 'Y'}
          </label>

          <input
            className="length-and-width-input"
            type="number"
            value={selectedShapeType === 'Rectangle' ? styleBar.height : styleBar.radiusY}
            min={0}
            onChange={handleHeightChange}
            title={selectedShapeType === 'Rectangle' ? "Change Height Value" : 'Change Radius Y Value'}

            // onBlur={() => {
            //   console.log("push in undo stack")
            //   if(!equalTop(undoStack, data)) {
                
            //     setUndoStack((prevUndoStack) => [...prevUndoStack, data]);
            //   }
            // }}
          />
        </div>
      </div>
    )
  );
}
