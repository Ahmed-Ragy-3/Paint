/* eslint-disable react/prop-types */

import { useAppContext } from '../AppContext';

import Fill from './Fill';
import Stroke from './Stroke';
import Size from './Size';
import Opacity from './Opacity'

import './styleBar.css';

import undo_icon from './icons/undo.svg';
import redo_icon from './icons/redo.svg';
// import v_align from './icons/vertical-align.svg';
// import h_align from './icons/horizontal-align.svg';

function StyleBar() {

  const {
    selectedShapeType,
    data,
    styleBar, setStyleBar ,
    undoStack, setUndoStack,
    undo, redo
  } = useAppContext();

  return (
    
    <div className="style-bar">
      
      <div className="UndoRedo">

        <button className="btn" title='Undo' onClick={undo}>
          <img src={undo_icon} />
        </button>

        <button className="btn" title='Redo' onClick={redo}>
          <img src={redo_icon} />
        </button>

      </div>

      {
        (selectedShapeType !== 'Line' && selectedShapeType !== 'Free') &&
        <Fill styleBar={styleBar} setStyleBar={setStyleBar}/>
      }
      <Stroke styleBar={styleBar} setStyleBar={setStyleBar}/>
      <Opacity styleBar={styleBar} setStyleBar={setStyleBar}/>

      {/* <div className="Align">
      
        <button className="v-btn" title='Vertical Align'>
          <img src={v_align}/>
        </button>

        <button className="h-btn" title='Horizontal Align'>
          <img src={h_align}/>
        </button>

      </div> */}

      <Size styleBar={styleBar} setStyleBar={setStyleBar}/>
      
    </div>
  );
}

export default StyleBar;
