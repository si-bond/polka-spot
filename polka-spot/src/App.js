import React, {useState} from 'react'
import './App.css';
import songData from './songData'
import SearchBar from './Components/SearchBar'
import SearchResults from './Components/SearchResults'

function App() {

  const [playList, setPlaylist] = useState([])

  function addSongToPlaylist(name, artist, id){

    const newPlaylistEntry = {name: name, artist: artist, id: id}

     setPlaylist(prevPlaylist => [...prevPlaylist, newPlaylistEntry])
 
  }

  //console.log(songData)

  return (
    <div className="App">
      <header className="App-header">
        <h1>PolkaSpot</h1>
        <SearchBar />
        <SearchResults songData={songData} addSongToPlaylist={addSongToPlaylist}/>
      </header>
    </div>
  );
}

export default App;
