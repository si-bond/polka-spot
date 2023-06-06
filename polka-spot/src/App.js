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

  function checkTokenValid(){
    //Read token from hash url parameters
    const urlHashString = window.location.hash
    const urlHashParams = new URLSearchParams(urlHashString);
    const urlAccessToken = urlHashParams.get('#access_token')
    const currentTime = new Date();

    //If url token present then store token & timestamp and clear url
    if(urlAccessToken){
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
    url += '&scope=playlist-modify-public playlist-modify-private';
    

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

  async function getNewSearch(searchParameter){
    console.log(searchParameter)
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
        console.log(jsonResponse)
        setSongData(jsonResponse)
      } else{
        check401InvalidCodeError(response)
      }
    } catch(error){
      console.log(error)
    }
  
  }

 
  function addNewPlaylist(playlistName){
    //console.log(playList)
   // console.log(playlistName)

    //getPlaylists()
    createNewPlaylists(playlistName)
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
        console.log(jsonResponse)
        setPlaylistList(jsonResponse.items)
      } else{
        check401InvalidCodeError(response)
      }
    } catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    const playlistItems = getPlaylists()
  },[])

  async function createNewPlaylists(playlistName){
    const accessToken = getValidToken()
    const fetchUrl = `https://api.spotify.com/v1/me/playlists`
    

    // const encodedData = window.btoa(clientId + ':' + clientSecret);
    // console.log(encodedData)
    // const authorizationHeaderString = 'Authorization: Basic ' + encodedData;
    // console.log(authorizationHeaderString)

    console.log(accessToken)

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

      console.log(response)

      if(response.ok){
        const jsonResponse = await response.json()

        const playlistID = jsonResponse.id
        
        
        console.log(jsonResponse)
        console.log(playlistID)
        addTrackToPlaylist(playlistID)
        getPlaylists()
      } 
    } catch(error) {
      
      console.log(error.response)
    }
    
    //
  }

  async function addTrackToPlaylist(playlistID){
    const accessToken = getValidToken()
    const fetchUrl = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`

    try{
      const response = await fetch(fetchUrl,{
        method: "POST",
        headers: {
          'Authorization': 'Bearer ' + accessToken,
        },
        body: JSON.stringify({
            "uris": [
              "spotify:track:24BYTj1tb5ovZcnIbtdTYD"
          ],
          "position": 0
        })
      })
      if(response.ok){
        const jsonResponse = await response.json()
        console.log("add")
        console.log(jsonResponse)
      } 
    } catch(error){
      console.log(error)
    }
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
        {checkTokenValid()?
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
                playlistList={playlistList}
            />
          }
        </div>:<div>Please Connect to Spotify<button onClick={connectToSpotify}>Connect</button></div>}
      </header>
    </div>
  );
}

export default App;
