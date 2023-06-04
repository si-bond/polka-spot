import React, {useState} from 'react'
import './App.css';
import songData from './songData'
import SearchResults from './Components/SearchResults'
import Playlist from './Components/Playlist'

function App() {

  const [playList, setPlaylist] = useState([])
  const [searchMode, setSearchMode] = useState(true)
  const [playlistMode, setPlaylistMode] = useState(true)

  function addSongToPlaylist(name, artist, id){
    const newPlaylistEntry = {name: name, artist: artist, id: id}
    setPlaylist(prevPlaylist => {
      if(prevPlaylist.some(track => track.id===id)){
        return [...prevPlaylist]
      } else {
        return [newPlaylistEntry,...prevPlaylist]
      }
    })
  }

  function removeSongFromPlaylist(id){
    setPlaylist(prevPlaylist => prevPlaylist.filter(track => track.id!==id))
  }

  function getNewSearch(searchParameter){
    console.log(searchParameter)
  }

  function addNewPlaylist(playlistName){
    console.log(playList)
    console.log(playlistName)
  }

  function handleModeChange(event){
    const buttonClicked = event.target.id

    if(buttonClicked==="search-button"){
      setSearchMode(true)
      setPlaylistMode(false)
    } else if(buttonClicked==="playlist-button"){
      setSearchMode(false)
      setPlaylistMode(true)
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>PolkaSpot</h1>
        <div className="button-container">
          <button id="search-button" onClick={handleModeChange}>Search</button>
          <button id="playlist-button" onClick={handleModeChange}>Playlist</button>
        </div>
        <div className="container">
          {searchMode&&<SearchResults songData={songData} addSongToPlaylist={addSongToPlaylist} getNewSearch={getNewSearch}/>}
          {playlistMode&&<Playlist 
                playlistData={playList} 
                removeSongFromPlaylist={removeSongFromPlaylist}
                addNewPlaylist={addNewPlaylist}
            />
          }
        </div>
      </header>
    </div>
  );
}

export default App;
