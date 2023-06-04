import React from 'react'
import Track from './Track'
import SearchBar from './SearchBar'

function SearchResults({songData, addSongToPlaylist, getNewSearch}){

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
        <div className="search-results">
           <h2>Search</h2>
           <SearchBar getNewSearch={getNewSearch}/>
           {songResults}           
        </div>
    )
}

export default SearchResults