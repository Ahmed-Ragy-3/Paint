import UndoRedo from './UndoRedo';
import Fill from './Fill';
import Stroke from './Stroke';
import Size from './Size';
import Align from './Align';
import Opacity from './Opacity'

import './styleBar.css';


function StyleBar() {
  return (
    <div className="style-bar">
      <UndoRedo/>
      <Fill/>
      <Stroke/>
      <Opacity/>
      <Align/>
      <Size/>
    </div>
  );
}

export default StyleBar;
