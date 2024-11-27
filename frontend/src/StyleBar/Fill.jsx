// import { useState } from 'react';
/* eslint-disable react/prop-types */

export default function Fill({ styleBar, setStyleBar }) {

  const handleFillColorChange = (e) => {
    setStyleBar({...styleBar, fillColor: e.target.value})
    // console.log(fillColor)
  };

  return (
    <div className="Fill">

      <label className='fill-label'>Fill</label>
      
      <input
        className='fill-color-picker' 
        type='color' 
        value={styleBar.fillColor} 
        onChange={handleFillColorChange}
        title='Pick Fill Color'
      />
      
    </div>
  )
}
