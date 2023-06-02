import logo from './logo.svg';
import './App.css';
import songData from './songData'
import SearchBar from './Components/SearchBar'
import SearchResults from './Components/SearchResults'

function App() {

  console.log(songData.artists.items[1].name)

  return (
    <div className="App">
      <header className="App-header">
        <h1>PolkaSpot</h1>
        <SearchBar />
        <SearchResults />
      </header>
    </div>
  );
}

export default App;
