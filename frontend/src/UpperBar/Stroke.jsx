// import { SketchPicker } from 'react-color';
import { useState } from 'react';

import './Stroke.css';

export default function Stroke() {
  // const [strokeColor, setStrokeColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(5);
  // const [showPicker, setShowPicker] = useState(false);

  // const handleStrokeColorChange = (color) => setStrokeColor(color.hex);
  const handleStrokeWidthChange = (e) => setStrokeWidth(e.target.value);
  // const togglePicker = () => setShowPicker(!showPicker);

  return (
    <div className="Stroke" role="group">

      <label className='fill-lable'>Stroke :</label>

      <div className='color-input-container'>

        {/* <div className="fill-color" 
          style={{backgroundColor: strokeColor}} 
          onClick={togglePicker}
        >
        </div>

        {showPicker && ( <div className="color-picker">
            <SketchPicker color={strokeColor} onChangeComplete={handleStrokeColorChange} />
          </div>
        )} */}
        
        <input type='color'/>

        <input
          type="number"
          min={0}
          value={strokeWidth}
          onChange={handleStrokeWidthChange}
        />

      </div>

    </div>
  );
}

//npm install @babel/runtime
