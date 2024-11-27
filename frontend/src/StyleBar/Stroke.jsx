import { useState } from 'react';

export default function Stroke() {
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(5);

  const handleStrokeColorChange = (e) => {
    setStrokeColor(e.target.value)
  };
  const handleStrokeWidthChange = (e) => {
    setStrokeWidth(e.target.value)
  };

  return (
    <div className="Stroke">

      <label className='stroke-label'>Stroke</label>

      <div className='stroke-color-width'>
        
        <input 
          className='stroke-color-picker' 
          type='color' 
          value={strokeColor} 
          onChange={handleStrokeColorChange}
          title='Pick Stroke Color'
        />

        <input
          className='stroke-width'
          type="number"
          min={0}
          value={strokeWidth}
          onChange={handleStrokeWidthChange}
          title='Change Stroke Width'
        />

      </div>

    </div>
  );
}