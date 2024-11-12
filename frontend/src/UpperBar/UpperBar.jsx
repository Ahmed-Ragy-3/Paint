import React from 'react';

import UndoRedo from './UndoRedo';
import File from './File';
import Fill from './Fill';
import Stroke from './Stroke';
import Size from './Size';
import Align from './Align';
import Opacity from './Opacity'

import '../variables.css';
import './UpperBarStyle.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


function UpperBar() {
  return (
    <div className="upper-bar">
      <UndoRedo/>
      <File/>
      <Fill/>
      <Stroke/>
      <Opacity/>
      <Align/>
      <Size/>
    </div>
  );
}

export default UpperBar;
