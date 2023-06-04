import React, {useState} from 'react'

function SearchBar({getNewSearch}){

    const [searchBarText, setSearchBarText] = useState("")

    function handleChangeText(event){
        const changedText = event.target.value
        setSearchBarText(changedText)
    }

    function handleSearchClick(){
        getNewSearch(searchBarText)
    }

    return (
        <div>
            <input 
                type="text" 
                className="search-bar" 
                value={searchBarText}
                onChange={handleChangeText}
                placeholder="Enter Song or Artist"
            />
            <button onClick={handleSearchClick}>Search</button>
        </div>
    )
}

export default SearchBar