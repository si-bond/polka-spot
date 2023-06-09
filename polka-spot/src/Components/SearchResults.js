import React from 'react'
import Track from './Track'
import SearchBar from './SearchBar'

function SearchResults({songData, addSongToPlaylist, getNewSearch}){

   // console.log(songData)
   let songResults = []
    if(songData){
        songResults = songData.tracks.items.map(track => {
            return (
                <Track 
                    songName={track.name}
                    artist={track.artists[0].name}
                    key={track.id}
                    uri={track.uri}
                    addSongToPlaylist={addSongToPlaylist}
                />
            )
        })
    }

    return (
        <div className="search-results" id="search-results">
           <h2>Search Tracks</h2>
           <SearchBar getNewSearch={getNewSearch}/>
           <div className="search-results-container">
                {songData&&songResults}      
           </div>     
        </div>
    )
}

export default SearchResults