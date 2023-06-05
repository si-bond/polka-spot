import React, {useState} from 'react'
import './App.css';
import songData from './songData'
import SearchResults from './Components/SearchResults'
import Playlist from './Components/Playlist'

const clientId =  '601acf698e384e12b3846478ca604c80'
const clientSecret = '8c99c97d04a84a658636f8178e3f30f5'
const redirectUri = 'http://localhost:3000/callback/';

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


// const param = window.location.search
// const urlParams = new URLSearchParams(param);
//   console.log(urlParams.get('product'))

  function removeSongFromPlaylist(id){
    setPlaylist(prevPlaylist => prevPlaylist.filter(track => track.id!==id))
  }

  async function getNewSearch(searchParameter){
    console.log(searchParameter)

    let  url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + clientId;
    url += '&redirect_uri=' + redirectUri;
    //Redirect to spotify login
    window.location.href = url;




    // const response = fetch(url, {
    //     // headers: {
    //     //   'Content-Type': 'application/x-www-form-urlencoded'
    //     // },
    //     redirect: 'follow',
    //     method: 'GET',
    //     mode: 'no-cors'
    // })

    //const json = await response.json()
    //console.log(json)


    //Get api token
    // const url = 'https://accounts.spotify.com/api/token';
    // const response = await fetch(url, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //     },
    //     body: 'grant_type=client_credentials&client_id=' + clientId + '&client_secret=' + clientSecret,
    //     json: true
    // });
    // if (response.ok) {
    //     const jsonResponse = await response.json();
    //     console.log(jsonResponse);
    // } else {
    //     console.log(response.statusText);
    //     throw new Error(`Request failed! Status code: ${response.status} ${response.statusText}`);
    // }

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
