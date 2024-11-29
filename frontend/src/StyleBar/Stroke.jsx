import { useAppContext } from '../AppContext';

export default function Stroke() {
  const {
    styleBar, setStyleBar, selectedShapeType,
    undoStack, setUndoStack, data,
    equalTop,
  } = useAppContext();

  const handleStrokeChange = (e) => {
    setStyleBar({...styleBar, stroke: e.target.value})
  };
  
  const handleStrokeWidthChange = (e) => {
    setStyleBar({...styleBar, strokeWidth: parseFloat(e.target.value)})
  };

  return (
    selectedShapeType !== 'Text' && 
    (<div className="Stroke">

      <label className='stroke-label'>Stroke</label>

      <div className='stroke-color-width'>
        
        <input 
          className='stroke-color-picker' 
          type='color' 
          value={styleBar.stroke} 
          onChange={handleStrokeChange}
          title='Pick Stroke Color'

          onBlur={() => {
            console.log("push in undo stack")
            if(!equalTop(undoStack, data)) {
              
              setUndoStack((prevUndoStack) => [...prevUndoStack, data]);
            }
          }}
        />

        <input
          className='stroke-width'
          type="number"
          min={0}
          value={styleBar.strokeWidth}
          onChange={handleStrokeWidthChange}
          title='Change Stroke Width'

        onBlur={() => {
          console.log("push in undo stack")
          if(!equalTop(undoStack, data)) {
            
            setUndoStack((prevUndoStack) => [...prevUndoStack, data]);
          }
        }}
        />

      </div>

    </div>)
  );
}