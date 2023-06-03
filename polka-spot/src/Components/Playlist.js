import React, {useState} from 'react'
import PlaylistTrack from './PlaylistTrack'

function Playlist({playlistData, removeSongFromPlaylist}){

   // console.log(songData)
   const [playListName, setPlaylistName] = useState("")

   function onChange(e){
    const changedValue = e.target.value
    setPlaylistName(changedValue)
    console.log(changedValue)
   }

    const playlistTracks = playlistData.map(track => {
 
        return (
            <PlaylistTrack 
                songName={track.name}
                artist={track.artist}
                key={track.id}
                id={track.id}
                removeSongFromPlaylist={removeSongFromPlaylist}
            />
        )
    })

    return (
        <div>
           <h2>Playlist</h2>
           <input 
                type="text" 
                value={playListName} 
                onChange={onChange}
                placeholder="Playlist Name"
            />
           <button>Add Playlist</button>
           {playlistTracks}           
        </div>
    )
}

export default Playlist 