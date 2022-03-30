import "./pagination.css";

function Pagination(props){
    
    //logic for page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(props.parsePokemonData.length / props.pokemonPerPage); i++) {
      pageNumbers.push(i);
    }

    return(
        <ul className="page-numbers">
            {pageNumbers.map(number => 
                <li
                    key={number}
                    id={number}
                    onClick={props.handleClick}
                    className={number === props.currentPage? "active-number": ""}
                >
                    {number}
                </li>
                )}
            </ul>
    )
}

export default Pagination;