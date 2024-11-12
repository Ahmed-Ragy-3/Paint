import './Align.css';
import v_align from '../assets/vertical-align.svg';
import h_align from '../assets/horizontal-align.svg';

export default function Align() {
  return (
    <div className="Align" role="group">
      
      <button className="btn" title='Vertical Align'>
        <img src={v_align} alt='Vertical align'/>
      </button>

      <button className="btn" title='Horizontal Align'>
        <img src={h_align} alt='Horizontal align'/>
      </button>

    </div>
  )
}
