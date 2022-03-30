import {React, useEffect, useState} from "react";
import PokeTable from "./components/pokemonTable/PokeTable.js";
import SearchInput from "./components/searchInput/SearchIpnut.js"

function App() {
// STATE
  const [pokemonData, setPokemonData] = useState([])
  const [searchQuery, setSearchQuery] = useState("")

  /// FUNCTIONS
  function fetchKantoPokemon(){
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response => response.json())
      .then(data =>{
        setPokemonData(data.results)
      })
  }
  useEffect(fetchKantoPokemon,[])
  
  function onQueryChange(ev) {
    setSearchQuery(ev.target.value);
    console.log(searchQuery)
  }

  return (
   <div className ="App">
     <SearchInput searchQuery={searchQuery} onQueryChange={onQueryChange}/>
      <PokeTable pokemonData={pokemonData} searchQuery={searchQuery}/>
   </div>
  );
  
}

export default App;
