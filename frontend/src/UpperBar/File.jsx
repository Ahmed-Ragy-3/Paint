import './File.css';
import { useState } from 'react';

export default function File() {
  const [isOpen, setIsOpen] = useState(true);

  // Function to toggle drawer visibility
  const toggleDrawer = () => {
      setIsOpen(!isOpen);
  };

  // Handlers for the buttons
  const handleSave = () => {
    console.log('Save clicked');
  };

  const handleLoad = () => {
    console.log('Load clicked');
  };

  const handleNew = () => {
    console.log('New clicked');
  };

  return (
    <div className='File'>

      <button onClick={toggleDrawer} className="drawer-btn">
        File {isOpen ? <span class="oui--arrow-down"></span> : <span class="oui--arrow-up"></span>}
      </button>

      <div className={`drawer ${isOpen ? 'closed' : 'open'}`}>

          <button className="btn" onClick={handleSave}>
            Save
          </button>

          <button className="btn" onClick={handleLoad}>
            Load
          </button>

          <button className="btn" onClick={handleNew}>
            New
          </button>

      </div>

    </div>
  );
}
