

function SearchInput (props){

    return(
        <div className="SearchBox">
            <input
                onChange={props.onQueryChange}
                placeholder="Pokemon Name"
                value={props.searchQuery}
            />
      </div>
    )
}

export default SearchInput;