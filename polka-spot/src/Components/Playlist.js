import React, {useState} from 'react'
import PlaylistTrack from './PlaylistTrack'

function Playlist({ playlistData, 
                    removeSongFromPlaylist, 
                    addNewPlaylist, 
                    playlistList, 
                    getPlaylistTracks
                }){

   // console.log(songData)
   const [playListName, setPlaylistName] = useState("")

   console.log(playlistList)

   function handleChange(event){
    const changedValue = event.target.value

    setPlaylistName(changedValue)

   }

    function handleClick(event){

        const targetEl = event.target.id
    
        console.log(targetEl)
        if(targetEl==="add-playlist"){
            console.log("Add playlist")
        } else if(targetEl==="update-playlist"){
            console.log("Update playlist")
        } else if(targetEl==="delete-playlist"){
            console.log("Delete playlist")
        }

        addNewPlaylist(playListName)
    }

   function handleSelect(event){
    const playlistUri = event.target.value
    if(!playlistUri){
        return
    }
    getPlaylistTracks(playlistUri)
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
        return <option value={playlist.id}>{playlist.name}</option>
    })

    return (
        <div className="playlist">
           <h2>Playlist</h2>
           <select 
                name="playlists" 
                id="playlist-select"
                onChange={handleSelect}
            >
                <option>New Playlist</option>
                {playlistDropdown}
            </select>
           <input 
                type="text" 
                value={playListName} 
                onChange={handleChange}
                placeholder="Playlist Name"
            />
            <button onClick={handleClick} id="add-playlist">Add Playlist</button>
            <button onClick={handleClick} id="update-playlist">Update Playlist</button>
            <button onClick={handleClick} id="delete-playlist">Delete</button>
           {playlistTracks}           
        </div>
    )
}

export default Playlist 