import React, {useState} from 'react'
import PlaylistTrack from './PlaylistTrack'

function Playlist({playlistData, removeSongFromPlaylist, addNewPlaylist}){

   // console.log(songData)
   const [playListName, setPlaylistName] = useState("")

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

    return (
        <div className="playlist">
           <h2>Playlist</h2>
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