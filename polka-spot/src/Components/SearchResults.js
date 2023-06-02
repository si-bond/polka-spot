import React, {useState} from 'react'
import Track from './Track'

function SearchResults(props){

    return (
        <div>
           <h2>Results</h2>
            <Track 
                songName="poop"
                artist="barry"
                
            />
            <hr />
            <Track 
                songName="poop"
                artist="barry"
                
            />
            <hr />
            <Track 
                songName="poop"
                artist="barry"
                
            />            
        </div>
    )
}

export default SearchResults