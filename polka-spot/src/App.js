import React, {useState,useEffect} from 'react'
import './App.css';
//import songData from './songData'
import SearchResults from './Components/SearchResults'
import Playlist from './Components/Playlist'

const clientId =  '601acf698e384e12b3846478ca604c80'
const redirectUri = 'http://localhost:3000/callback/';

function App() {

  const [songData, setSongData] = useState("")
  const [playList, setPlaylist] = useState([])
  const [searchMode, setSearchMode] = useState(true)
  const [playlistMode, setPlaylistMode] = useState(true)
  const [playlistList, setPlaylistList] = useState([])

  useEffect(() => {
    const playlistItems = getPlaylists()
  },[])

  function checkTokenValid(){
    //Read token from hash url parameters
    const urlHashString = window.location.hash
    const urlHashParams = new URLSearchParams(urlHashString);
    const urlAccessToken = urlHashParams.get('#access_token')

    //If url token present then store token & timestamp and clear url
    if(urlAccessToken){
      const currentTime = new Date();

      localStorage.setItem("accessToken", urlAccessToken);
      localStorage.setItem("expiryToken", currentTime);
      window.location.hash = ""

      return urlAccessToken
    }
    
    return isStoredTokenValid()
  }

  function isStoredTokenValid(){
    //Read token from storage
    const storedAccessToken = localStorage.getItem("accessToken");

    //Read token expiry from storage
    const expiryToken = localStorage.getItem("expiryToken");
    const tokenTimestamp = new Date(expiryToken);
    const currentTime = new Date();
    const tokenDuration = (currentTime - tokenTimestamp)/1000

    if(storedAccessToken && tokenDuration<3600){
      return storedAccessToken
    } else{
      return false
    }
  }

  function getValidToken(){

    const validToken = checkTokenValid()

    if(validToken){
      return validToken
    } else{
      connectToSpotify()
    }
  }

  function connectToSpotify(){
    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + clientId;
    url += '&redirect_uri=' + redirectUri;
    url += '&scope=playlist-modify-public playlist-modify-private playlist-read-private';
    

    //Redirect to spotify login
    try {
      window.location.href = url;
    } catch (error){
      console.log(error)
    }  
}

  function check401InvalidCodeError(response){
    const responseStatus = response.status
    if(responseStatus===401){
      connectToSpotify()
    }
  }

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

  function removeSongFromPlaylist(uri){
    setPlaylist(prevPlaylist => prevPlaylist.filter(track => track.uri!==uri))
  }

  function clearPlaylist(){
    setPlaylist([])
  }

  async function getNewSearch(searchParameter){

    let url = ""
    const accessToken = getValidToken()

    if(!searchParameter){
      console.log("Please enter search parameter")
      return
    }

    url = `https://api.spotify.com/v1/search?type=track&market=GB&q=
          ${searchParameter}
          &access_token=${accessToken}`

    try {
      const response = await fetch(url)
      if(response.ok){
        const jsonResponse = await response.json()

        setSongData(jsonResponse)
      } else{
        check401InvalidCodeError(response)
      }
    } catch(error){
      console.log(error)
    }
  
  }

 
  async function addNewPlaylist(playlistName){
    const newPlaylistID = await createNewPlaylists(playlistName)
    if(playList.length>0){
        await addTrackToPlaylist(newPlaylistID)
    }
    
    getPlaylists()
    //setPlaylist([])
  }



  async function getPlaylists(){
    const accessToken = getValidToken()
  //  const urlToFetch = `https://api.spotify.com/v1/me/playlists?access_token=${accessToken}`
    const urlToFetch = `https://api.spotify.com/v1/me/playlists`
    try {
      const response = await fetch(urlToFetch,{
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },
      })
      if(response.ok){     
        const jsonResponse = await response.json()
        //const playlists = jsonResponse.items

        setPlaylistList(jsonResponse.items)
      } else{
        check401InvalidCodeError(response)
      }
    } catch(error){
      console.log(error)
    }
  }



  async function createNewPlaylists(playlistName){
    const accessToken = getValidToken()
    const fetchUrl = `https://api.spotify.com/v1/me/playlists`

    try{
      const response = await fetch(fetchUrl,{
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
        },
        body: JSON.stringify({
          name: playlistName, 
          public: true,
        }),
      })

      if(response.ok){
        const jsonResponse = await response.json()

        const playlistID = jsonResponse.id
        setPlaylist([])
        return playlistID
      } 
    } catch(error) {
      console.log(error)
    }

  }

  async function addTrackToPlaylist(playlistID){
    const accessToken = getValidToken()
    const fetchUrl = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`
   
    const playlistUris = playList.map(track => track.uri)

    try{
      const response = await fetch(fetchUrl,{
        method: "POST",
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "uris": playlistUris,
        })
      })
      if(response.ok){
        const jsonResponse = await response.json()
      } 
    } catch(error){
      console.log(error)
    }
  }

  async function updatePlaylist(playlistID,playlistName){
    const accessToken = getValidToken()
    const fetchUrl = `https://api.spotify.com/v1/playlists/${playlistID}`
   
    try{
      const response = await fetch(fetchUrl,{
        method: "PUT",
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: playlistName, 
            public: true,
        })
      })
    } catch(error){
      console.log(error)
    }
  }

  async function updateTracksToPlaylist(playlistID){
    const accessToken = getValidToken()
    const fetchUrl = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`
   
    const playlistUris = playList.map(track => track.uri)

    try{
      const response = await fetch(fetchUrl,{
        method: "PUT",
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "uris": playlistUris,
        })
      })
      if(response.ok){
        getPlaylists()
      } 
    } catch(error){
      console.log(error)
    }
  }

  async function deletePlaylist(playlistID){
    const accessToken = getValidToken()
    const fetchUrl = `https://api.spotify.com/v1/playlists/${playlistID}/followers`

    try{
      const response = await fetch(fetchUrl,{
        method: "DELETE",
        headers: {
          'Authorization': 'Bearer ' + accessToken,
        },
      })
      if(response.ok){
        clearPlaylist()
        getPlaylists()
      } 
    } catch(error){
      console.log(error)
    }
  }

  async function getPlaylistTracks(playlistUri){
 
    const accessToken = getValidToken()
    const fetchUrl = `https://api.spotify.com/v1/playlists/${playlistUri}/tracks?access_token=${accessToken}`
   
    try{
      const response = await fetch(fetchUrl)

      if(response.ok){
        const jsonResponse = await response.json()

        const playlistTracks = jsonResponse.items.map(track => {
          return {artist: track.track.artists[0].name, name: track.track.name, uri: track.track.uri}
        })

        setPlaylist(playlistTracks)
      } 
    } catch(error){
      console.log(error)
    }
}


  function handleModeChange(event){
    const buttonClicked = event.target.id
    const searchListEl = document.getElementById("search-results")
    const playlistListEl = document.getElementById("playlist")

    if(buttonClicked==="search-button"){
      searchListEl.style.display = "block"
      playlistListEl.style.display = "none"
    } else if(buttonClicked==="playlist-button"){
      searchListEl.style.display = "none"
      playlistListEl.style.display = "block"
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>PolkaSpot</h1>
        <h6>Spotify Playlist Manager</h6>
        <div className="button-container">
          <button id="search-button" onClick={handleModeChange}>Search</button>
          <button id="playlist-button" onClick={handleModeChange}>Playlist</button>
        </div>
        {checkTokenValid()?
        <div className="container">
          <SearchResults 
            songData={songData} 
            addSongToPlaylist={addSongToPlaylist} 
            getNewSearch={getNewSearch}
            />
          
          <Playlist 
                playlistData={playList} 
                removeSongFromPlaylist={removeSongFromPlaylist}
                addNewPlaylist={addNewPlaylist}
                playlistList={playlistList}
                getPlaylistTracks={getPlaylistTracks}
                addTrackToPlaylist={addTrackToPlaylist}
                updateTracksToPlaylist={updateTracksToPlaylist}
                deletePlaylist={deletePlaylist}
                updatePlaylist={updatePlaylist}
                clearPlaylist={clearPlaylist}
            />
          
        </div>:
        <div>Please Connect to Spotify<button onClick={connectToSpotify}>Connect</button></div>}
      </header>
    </div>
  );
}

export default App;
