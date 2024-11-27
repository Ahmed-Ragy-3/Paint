/* eslint-disable react/prop-types */

import { useAppContext } from '../AppContext';

import Fill from './Fill';
import Stroke from './Stroke';
import Size from './Size';
import Opacity from './Opacity'

import './styleBar.css';

import undo from './icons/undo.svg';
import redo from './icons/redo.svg';
import v_align from './icons/vertical-align.svg';
import h_align from './icons/horizontal-align.svg';

function StyleBar() {

  const { styleBar, setStyleBar } = useAppContext();

  return (
    <div className="style-bar">
      
      <div className="UndoRedo">

        <button className="btn" title='Undo'>
          <img src={undo} />
        </button>

        <button className="btn" title='Redo'>
          <img src={redo} />
        </button>

      </div>

      <Fill styleBar={styleBar} setStyleBar={setStyleBar}/>
      <Stroke styleBar={styleBar} setStyleBar={setStyleBar}/>
      <Opacity styleBar={styleBar} setStyleBar={setStyleBar}/>

      <div className="Align">
      
        <button className="v-btn" title='Vertical Align'>
          <img src={v_align}/>
        </button>

        <button className="h-btn" title='Horizontal Align'>
          <img src={h_align}/>
        </button>

      </div>

      <Size styleBar={styleBar} setStyleBar={setStyleBar}/>
      
    </div>
  );
}

export default StyleBar;
