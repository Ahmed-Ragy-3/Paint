import { useAppContext } from '../AppContext';
/* eslint-disable react/prop-types */

export default function Fill() {

  const {
    data,
    styleBar, setStyleBar,
    selectedShapeType,
    undoStack, setUndoStack,
    equalTop,
  } = useAppContext();

  const handleFillColorChange = (e) => {
    setStyleBar({...styleBar, fill: e.target.value})
  };

  return (
      <div className="Fill">

      <label className='fill-label'>Fill</label>
      
      <input
        className='fill-color-picker' 
        type='color' 
        value={styleBar.fill} 
        onChange={handleFillColorChange}
        title='Pick Fill Color'
      />
      
    </div>
  )
}
