import './Fill.css';

// import { SketchPicker } from 'react-color';
// import { useState } from 'react';

export default function Fill() {
  // const [fillColor, setFillColor] = useState('#ffffff');
  // const [showPicker, setShowPicker] = useState(false);

  // const handleFillColorChange = (color) => setFillColor(color.hex);
  // const togglePicker = () => setShowPicker(!showPicker);

  return (
    <div className="Fill" role="group">

      <label className='fill-lable'>Fill :</label>
      
      <input type='color'/>
      
      {/* <div 
        className="fill-color" 
        style={{backgroundColor: fillColor}} 
        onClick={togglePicker}
      >
      </div> */}

      {/* {showPicker && (
        <div className="color-picker">
          <SketchPicker color={fillColor} onChangeComplete={handleFillColorChange} />
        </div>
      )} */}
      
    </div>
  )
}

// npm install react-slider react-color bootstrap