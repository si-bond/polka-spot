import React from 'react'
import './Track.css';

function PlaylistTrack({songName, artist, id,removeSongFromPlaylist}){

    function handleClick(){
        removeSongFromPlaylist(id)
    }
    
    return(
        <div className="track">
            <div className="song-details">
                <h3>{songName}</h3>
                <p>{artist}</p>
            </div>
            <div className="add-to-playlist" onClick={handleClick}>-</div>
        </div>
    )
}

export default PlaylistTrack