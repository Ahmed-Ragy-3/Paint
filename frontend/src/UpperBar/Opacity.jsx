import { useState } from 'react';
import './Opacity.css';

export default function Size() {
  const [opacity, setOpacity] = useState(50);

  const handleOpacityChange = (e) => setOpacity(e.target.value);

  return (
    <div className="Opacity" >
      <div className='line'>

        <label>Opacity :</label>

        <input
          type="number"
          min={0}
          max={100}
          value={opacity}
          onChange={handleOpacityChange}
        />
        
      </div>

    </div>
  );
}