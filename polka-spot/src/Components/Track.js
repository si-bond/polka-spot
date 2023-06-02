import React from 'react'
import './Track.css';

function Track({songName, artist}){
    return(
        <div className="track">
            <div className="song-details">
                <h3>{songName}</h3>
                <p>{artist}</p>
            </div>
            <div className="add-to-playlist">+</div>
        </div>
    )
}

export default Track