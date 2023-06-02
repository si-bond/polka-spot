import React, {useState} from 'react'

function SearchBar(){

    const [searchBarText, setSearchBarText] = useState("Enter Song or Artist")

    return (
        <div>
            <input 
                type="text" 
                class="search-bar" 
                value={searchBarText}
            />
            <button>Search</button>
        </div>
    )
}

export default SearchBar