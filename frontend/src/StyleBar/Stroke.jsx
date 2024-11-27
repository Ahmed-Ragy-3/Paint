import { useContext } from 'react';

export default function Stroke({ styleBar, setStyleBar }) {

  const handleStrokeColorChange = (e) => {
    setStyleBar({...styleBar, strokeColor: e.target.value})
  };
  
  const handleStrokeWidthChange = (e) => {
    setStyleBar({...styleBar, strokeWidth: e.target.value})
  };

  return (
    <div className="Stroke">

      <label className='stroke-label'>Stroke</label>

      <div className='stroke-color-width'>
        
        <input 
          className='stroke-color-picker' 
          type='color' 
          value={styleBar.strokeColor} 
          onChange={handleStrokeColorChange}
          title='Pick Stroke Color'
        />

        <input
          className='stroke-width'
          type="number"
          min={0}
          value={styleBar.strokeWidth}
          onChange={handleStrokeWidthChange}
          title='Change Stroke Width'
        />

      </div>

    </div>
  );
}