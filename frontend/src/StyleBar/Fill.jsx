// import { useState } from 'react';
/* eslint-disable react/prop-types */

export default function Fill({ fillColor, setFillColor }) {

  const handleFillColorChange = (e) => {
    setFillColor(e.target.value)
    // console.log(fillColor)
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
