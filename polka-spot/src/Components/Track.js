import React from 'react'
import './Track.css';

function Track({songName, artist, uri, addSongToPlaylist}){

    function handleClick(){
        addSongToPlaylist(songName, artist, uri)
    }
    
    return(
        <div className="track">
            <div className="song-details">
                <h3>{songName}</h3>
                <p>{artist}</p>
            </div>
            <button className="add-to-playlist" onClick={handleClick}>Add to Playlist</button>
        </div>
    )
}

export default Track