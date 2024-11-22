import undo from './icons/undo.svg';
import redo from './icons/redo.svg';

export default function UndoRedo() {
  return (
    <div className="UndoRedo">

      <button className="btn" title='Undo'>
        <img src={undo}/>
      </button>

      <button className="btn" title='Redo'> 
        <img src={redo}/>
      </button>
    </div>
  )
}