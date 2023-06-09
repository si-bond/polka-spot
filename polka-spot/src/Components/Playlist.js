import React, {useState} from 'react'
import PlaylistTrack from './PlaylistTrack'

function Playlist({ playlistData, 
                    removeSongFromPlaylist, 
                    addNewPlaylist, 
                    playlistList, 
                    getPlaylistTracks,
                    updateTracksToPlaylist,
                    deletePlaylist,
                    updatePlaylist,
                    clearPlaylist
                }){

   const [playListName, setPlaylistName] = useState("")
   const [newPlaylist, setNewPlaylist] = useState(true)
   const [selectedPlaylistUri, setSelectedPlaylistUri] = useState("")

   function handleChange(event){
    const changedValue = event.target.value

    setPlaylistName(changedValue)

   }

    function handleClick(event){

        if(newPlaylist){
            addNewPlaylist(playListName)
        } else {
            updatePlaylist(selectedPlaylistUri,playListName)
            updateTracksToPlaylist(selectedPlaylistUri)
        }   
    }

    function deletePlay(){
        deletePlaylist(selectedPlaylistUri)
    }

   function handleSelect(event){
        const selectedElement = event.target
        const playlistUri = selectedElement.value
        const playlistName = selectedElement.options[selectedElement.selectedIndex].text;


        if(playlistUri==="new-playlist"){
            setNewPlaylist(true)
            setPlaylistName("")
            clearPlaylist()
            return
        }
        getPlaylistTracks(playlistUri)
        setSelectedPlaylistUri(playlistUri)
        setPlaylistName(playlistName)
        setNewPlaylist(false)
   }


    const playlistTracks = playlistData.map(track => {
        return (
            <PlaylistTrack 
                songName={track.name}
                artist={track.artist}
                key={track.uri}
                uri={track.uri}
                removeSongFromPlaylist={removeSongFromPlaylist}
            />
        )
    })

    const playlistDropdown = playlistList.map(playlist => {
        return <option key={playlist.id} value={playlist.id}>{playlist.name}</option>
    })

    return (
        <div className="playlist" id="playlist">
           <h2>Playlists</h2>
           Select Playlist<br />
           <select 
                name="playlists" 
                id="playlist-select"
                onChange={handleSelect}
            >
                <option value="new-playlist">New Playlist</option>
                {playlistDropdown}
            </select><br /><br />
           Playlist Name<br />
           <input 
                type="text" 
                value={playListName} 
                onChange={handleChange}
                placeholder="Playlist Name"
            /><br /><br />
            <button onClick={handleClick}>{newPlaylist?"Add Playlist":"Update Playlist"}</button>
            {!newPlaylist&&<button onClick={deletePlay}>Delete Playlist</button>}
            <div className="playlist-container">
             {playlistTracks}    
             </div>       
        </div>
    )
}

export default Playlist 