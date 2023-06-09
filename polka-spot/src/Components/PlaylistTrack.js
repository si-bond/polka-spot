import React from 'react'
import './Track.css';

function PlaylistTrack({songName, artist, uri,removeSongFromPlaylist}){

    function handleClick(){
        removeSongFromPlaylist(uri)
    }
    
    return(
        <div className="track">
            <div className="song-details">
                <h3>{songName}</h3>
                <p>{artist}</p>
            </div>
            <button className="add-to-playlist" onClick={handleClick}>Remove from Playlist</button>
        </div>
    )
}

export default PlaylistTrack