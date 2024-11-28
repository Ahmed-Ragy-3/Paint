import { useAppContext } from '../AppContext';
/* eslint-disable react/prop-types */

export default function Fill() {

  const {
    styleBar, setStyleBar,
    selectedShapeType
  } = useAppContext();

  const handleFillColorChange = (e) => {
    setStyleBar({...styleBar, fillColor: e.target.value})
  };

  return (
     (selectedShapeType !== 'Line' && selectedShapeType !== 'Free')
     && (<div className="Fill">

      <label className='fill-label'>Fill</label>
      
      <input
        className='fill-color-picker' 
        type='color' 
        value={styleBar.fillColor} 
        onChange={handleFillColorChange}
        title='Pick Fill Color'
      />
      
    </div>)
  )
}
