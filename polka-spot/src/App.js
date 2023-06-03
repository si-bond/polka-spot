import React, {useState} from 'react'
import './App.css';
import songData from './songData'
import SearchBar from './Components/SearchBar'
import SearchResults from './Components/SearchResults'
import Playlist from './Components/Playlist'

function App() {

  const [playList, setPlaylist] = useState([])

  function addSongToPlaylist(name, artist, id){

    const newPlaylistEntry = {name: name, artist: artist, id: id}

    setPlaylist(prevPlaylist => {
      if(prevPlaylist.some(track => track.id===id)){
        return [...prevPlaylist]
      } else {
        return [...prevPlaylist, newPlaylistEntry]
      }
    })
  }

  function removeSongFromPlaylist(id){
    setPlaylist(prevPlaylist => prevPlaylist.filter(track => track.id!==id))
  }

  // function addNewPlaylist(playlistName){
  //   console.log(playList)
  //   console.log(playlistName)
  // }

  //console.log(playList)

  return (
    <div className="App">
      <header className="App-header">
        <h1>PolkaSpot</h1>
        <SearchBar />
        <SearchResults songData={songData} addSongToPlaylist={addSongToPlaylist}/>
        <Playlist 
            laylistData={playList} 
            removeSongFromPlaylist={removeSongFromPlaylist}
            //addNewPlaylist={addNewPlaylist}
        />
      </header>
    </div>
  );
}

export default App;
