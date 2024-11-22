import v_align from './icons/vertical-align.svg';
import h_align from './icons/horizontal-align.svg';

export default function Align() {
  return (
    <div className="Align">
      
      <button className="v-btn" title='Vertical Align'>
        <img src={v_align}/>
      </button>

      <button className="h-btn" title='Horizontal Align'>
        <img src={h_align}/>
      </button>

    </div>
  )
}
