import {React, useEffect, useState} from "react";
import "./pokemonTable.css"
import Pagination from "../Pagination/Pagination.js"

function PokeTable(props){
    //GLOBAL STATE VARIABLES
    const [parsePokemonData, setParsedPokemonData] = useState([])
    const [selectedCol, setSelectedCol] = useState("ID")
    const [currentPage, setCurrentPage] = useState(1) //lifted state for <Pagination/>
    const pokemonPerPage = 6 //lifted variable for <Pagination/>


    //THIS FUNCTION FETCHES ORIGINAL POKEMONDATA FROM APP.JS AND PARSES IT INTO THE NEEDED DATA
    let urls = []
    props.pokemonData.forEach(
    pokemonName => urls.push(`https://pokeapi.co/api/v2/pokemon/${pokemonName.name}?limit=151`)
    )
    function fetchPokeData(){
        Promise.all(urls.map(url =>
            fetch(url).then(response => response.json())
        )).then(data => {
            setParsedPokemonData(data)
        })
    }

    
    //THIS FUNCTION IS FOR ALL THE PAGINATION LOGIC
    function handleClick(event) {
        setCurrentPage(Number(event.target.id));
    }
    const indexOfLastPokemon = currentPage * pokemonPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
    const currentPokemon = parsePokemonData.slice(indexOfFirstPokemon, indexOfLastPokemon);

    // THIS FUNCTION SORTS THE TABLE NAME AND ID COLUMN
    
    let sortedData = [...currentPokemon]
    function conditionalSortedData(){
        if(props.searchQuery.length > 1){
            sortedData = [...parsePokemonData]
        }else{
            sortedData = [...currentPokemon]
        }
    }
    
    function sortingFunction(){
        sortedData.sort((a, b) => {
        if(selectedCol === "name"){
            if (a.name < b.name) {
            return -1;
            } else if (a.name > b.name) {
            return 1;
            }
            return 0;
        } else if (selectedCol === "ID") {
            return a.id - b.id
        } else{
            return console.log("error")
        }
      });
    }

    //FUNCTION INVOCATION
    useEffect(fetchPokeData, [props.pokemonData])
    conditionalSortedData();
    sortingFunction()

    return(
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>
                            Pokemon
                            {selectedCol === "name"? "*": ""}
                            <br></br>
                            <button onClick={() => {
                                setSelectedCol("name")
                            }}> Sort A-Z </button>
                        </th>
                        <th>
                            ID
                            {selectedCol === "ID"? "*": ""}
                            <br></br>
                            <button onClick={() => {
                                setSelectedCol("ID")}
                            }> Sort</button>
                        </th>
                        <th>
                            Type
                        </th>
                        <th>
                            Start Move
                        </th>
                        <th>
                            Image
                        </th>
                    </tr>
                        {
                            sortedData.filter( pokemon => 
                            pokemon.name.toLowerCase().includes(props.searchQuery.toLowerCase().trim())
                            )
                            .map( (pokemon, index) =>
                                <tr>
                                    <td key={index}> {pokemon.name}</td>
                                    <td> {pokemon.id}</td>
                                    <td> {pokemon.types[0].type.name}</td>
                                    <td> {pokemon.moves[0].move.name} </td>
                                    <td>
                                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt="pokemon"/>
                                    </td>
                                </tr>
                            )
                        }
                </tbody>              
            </table>
            <Pagination
                parsePokemonData={parsePokemonData}
                handleClick={handleClick}
                pokemonPerPage={pokemonPerPage}
                currentPage={currentPage}
            />
        </div>
    )
}

export default PokeTable