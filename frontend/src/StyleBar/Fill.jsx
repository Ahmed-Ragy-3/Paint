import { useState } from 'react';

export default function Fill() {
  const [fillColor, setFillColor] = useState('#ffffff');

  const handleFillColorChange = (event) => {setFillColor(event.target.value)
    console.log(fillColor)
  };

  return (
    <div className="Fill">

      <label className='fill-lable'>Fill</label>
      
      <input 
        className='fill-color-picker' 
        type='color' 
        value={fillColor} 
        onChange={handleFillColorChange}
        title='Pick Fill Color'
      />
      
    </div>
  )
}
