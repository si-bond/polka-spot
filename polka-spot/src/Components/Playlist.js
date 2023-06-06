import React, {useState} from 'react'
import PlaylistTrack from './PlaylistTrack'

function Playlist({playlistData, removeSongFromPlaylist, addNewPlaylist, playlistList}){

   // console.log(songData)
   const [playListName, setPlaylistName] = useState("")

   console.log(playlistList)

   function handleChange(event){
    const changedValue = event.target.value

    setPlaylistName(changedValue)

   }

   function handleAddPlaylistClick(){
        addNewPlaylist(playListName)
   }

    const playlistTracks = playlistData.map(track => {
 
        return (
            <PlaylistTrack 
                songName={track.name}
                artist={track.artist}
                key={track.id}
                uri={track.uri}
                removeSongFromPlaylist={removeSongFromPlaylist}
            />
        )
    })

    const playlistDropdown = playlistList.map(playlist => {
        return <option>{playlist.name}</option>
    })

    return (
        <div className="playlist">
           <h2>Playlist</h2>
           <select name="playlists" id="playlist-select">
                <option>New Playlist</option>
                {playlistDropdown}
            </select>
           <input 
                type="text" 
                value={playListName} 
                onChange={handleChange}
                placeholder="Playlist Name"
            />
           <button onClick={handleAddPlaylistClick}>Add Playlist</button>
           {playlistTracks}           
        </div>
    )
}

export default Playlist 