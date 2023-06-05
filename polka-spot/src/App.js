import React, {useState, useEffect} from 'react'
import './App.css';
//import songData from './songData'
import SearchResults from './Components/SearchResults'
import Playlist from './Components/Playlist'

const clientId =  '601acf698e384e12b3846478ca604c80'
const clientSecret = '8c99c97d04a84a658636f8178e3f30f5'
const redirectUri = 'http://localhost:3000/callback/';

function App() {

  const [songData, setSongData] = useState("")
  const [playList, setPlaylist] = useState([])
  const [searchMode, setSearchMode] = useState(true)
  const [playlistMode, setPlaylistMode] = useState(true)
  const [accessToken, setAccessToken] = useState("")
  const [accessTokenExpire, setAccessTokenExpire] = useState("")  

  function addSongToPlaylist(name, artist, uri){
    const newPlaylistEntry = {name: name, artist: artist, uri: uri}
    setPlaylist(prevPlaylist => {
      if(prevPlaylist.some(track => track.id===uri)){
        return [...prevPlaylist]
      } else {
        return [newPlaylistEntry,...prevPlaylist]
      }
    })
  }


  //Get params from url
  useEffect(() => {

    console.log("test")

    const param = window.location.hash
    const urlParams = new URLSearchParams(param);
    setAccessToken(urlParams.get('#access_token'))
    console.log(accessToken)
  },[])


  function removeSongFromPlaylist(uri){
    setPlaylist(prevPlaylist => prevPlaylist.filter(track => track.uri!==uri))
  }

  async function getNewSearch(searchParameter){
    console.log(searchParameter)
    let url = ""

    if(!accessToken){
      url = 'https://accounts.spotify.com/authorize';
      url += '?response_type=token';
      url += '&client_id=' + clientId;
      url += '&redirect_uri=' + redirectUri;
      //Redirect to spotify login
      window.location.href = url;
    } else{
      console.log("logged in")
      url = `
            https://api.spotify.com/v1/search?type=track&market=GB&q=
            ${searchParameter}
            &access_token=${accessToken}
            `

      const response = await fetch(url)

      const json = await response.json()
      console.log(json)
      setSongData(json)
    }

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
          {searchMode&&<SearchResults 
            songData={songData} 
            addSongToPlaylist={addSongToPlaylist} 
            getNewSearch={getNewSearch}
            />
          }
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
