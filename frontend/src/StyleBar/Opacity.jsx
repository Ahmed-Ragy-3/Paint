import { useAppContext } from '../AppContext';

export default function Opacity() {

  const {
    styleBar, setStyleBar
  } = useAppContext();

  const handleOpacityChange = (e) => {
    setStyleBar({...styleBar, opacity: e.target.value / 100})
  };

  return (
    <div className="Opacity" >

        <label className='opacity-label'>Opacity</label>
        
        <input
          className='opacity-input'
          type="range"
          min={0}
          max={100}
          value={styleBar.opacity * 100}
          onChange={handleOpacityChange}
          title='Change Opacity'
        />

    </div>
  );
}