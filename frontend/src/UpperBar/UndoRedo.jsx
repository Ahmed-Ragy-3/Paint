import './UndoRedo.css'

export default function UndoRedo() {
  return (
    <div className="UndoRedo" role="group">

      <button type="button" className="btn" title='Undo'>
        <span className="solar--undo-left-square-bold"></span>
      </button>

      <button type="button" className="btn" title='Redo'> 
        <span className="solar--redo-left-square-bold"></span>
      </button>
    </div>
  )
}