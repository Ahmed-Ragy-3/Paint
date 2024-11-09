// Import the SVG as an image and rename it to `delete`
import trash3 from './assets/trash3.svg';

function App() {
  return (
    <>
      <button>
        {/* Use the imported SVG as the src for the <img> */}
        <img src={trash3} alt="Delete icon" width={100} height={100} />
      </button>
    </>
  );
}

export default App;
