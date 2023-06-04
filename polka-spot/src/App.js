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

  async function getNewSearch(searchParameter){
    console.log(searchParameter)
//
    //const response = await fetch("https://swapi.dev/api/people/1")
    const response = await fetch("https://accounts.spotify.com/authorize")
    const json = await response.json()
    console.log(json)

  }

//   var client_id = 'CLIENT_ID';
// var redirect_uri = 'http://localhost:8888/callback';

// var app = express();

// app.get('/login', function(req, res) {

//   var state = generateRandomString(16);
//   var scope = 'user-read-private user-read-email';

//   res.redirect('https://accounts.spotify.com/authorize?' +
//     querystring.stringify({
//       response_type: 'code',
//       client_id: client_id,
//       scope: scope,
//       redirect_uri: redirect_uri,
//       state: state
//     }));
// });

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
