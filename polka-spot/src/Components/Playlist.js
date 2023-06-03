import React from 'react'
import Track from './Track'

function SearchResults({songData, addSongToPlaylist}){

   // console.log(songData)

    const songResults = songData.tracks.items.map(track => {
        return (
            <Track 
                songName={track.name}
                artist={track.artists[0].name}
                key={track.id}
                id={track.id}
                addSongToPlaylist={addSongToPlaylist}
            />
        )
    })

    return (
        <div>
           <h2>Results</h2>
           {songResults}           
        </div>
    )
}

export default SearchResults 