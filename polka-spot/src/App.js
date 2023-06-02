import logo from './logo.svg';
import './App.css';
import songData from './songData'

function App() {

  console.log(songData.artists.items[1].name)

  return (
    <div className="App">
      <header className="App-header">
        <p>
          PolkaSpot
        </p>
      </header>
    </div>
  );
}

export default App;
