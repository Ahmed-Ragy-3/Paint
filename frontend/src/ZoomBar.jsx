import hand from './assets/hand.svg';
import zoom_in from './assets/zoom-in.svg';
import zoom_out from './assets/zoom-out.svg';

import { useAppContext } from './AppContext';

export default function ZoomBar() {

  const {
  } = useAppContext();
  
  return (
    <div 
      title='
Copy                Ctrl + C
Cut                   Ctrl + X
Paste                Ctrl + V

Undo                Ctrl + Z
Redo                 Ctrl + Y

Send to Back    Ctrl + B'

      style={{
        width: '1.5%',
        height: '3.5%',
        position: 'absolute',
        
        left: '43%',
        top: '2%',
        fontSize: '25px',
        color:'white',
        backgroundColor: '#2E2E2E',
        borderRadius: '30px',
        justifyContent: 'center',

        padding:'5px 0px 5px 15px',
        // fontFamily: 'Callibri',
      }}
    >
      i
    </div>
    // <div className="zoom-bar">

    //   <button data-tooltip="My Custom Tooltip">
    //     <img src={hand} alt="Hand Tool" />
    //   </button>
      
    //   <button data-tooltip="My Custom Tooltip">
    //     <img src={zoom_in} alt="Zoom in Tool" />
    //   </button>
      
    //   <button data-tooltip="My Custom Tooltip">
    //     <img src={zoom_out} alt="Zoom out Tool" />
    //   </button>
      
    // </div>

  )
}
