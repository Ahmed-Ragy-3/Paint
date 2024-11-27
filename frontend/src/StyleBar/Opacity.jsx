import { useState } from 'react';

export default function Size() {
  const [opacity, setOpacity] = useState(50);

  const handleOpacityChange = (e) => {
    setOpacity(e.target.value)
  };

  return (
    <div className="Opacity" >

        <label className='opacity-label'>Opacity</label>
        
        <input
          className='opacity-input'
          type="range"
          min={0}
          max={100}
          value={opacity}
          onChange={handleOpacityChange}
          title='Change Oacity Value'
        />

    </div>
  );
}