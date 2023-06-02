import logo from './logo.svg';
import './App.css';
import songData from './songData'
import SearchBar from './Components/SearchBar'

function App() {

  console.log(songData.artists.items[1].name)

  return (
    <div className="App">
      <header className="App-header">
        <h1>PolkaSpot</h1>
        <SearchBar />
      </header>
    </div>
  );
}

export default App;
