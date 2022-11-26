import React from "react";

 const Paginado = ({countriesPerPage, todosLosPaises, paginado}) => {
    const pageNumbers = []; 
    for (let i = 0; i <= Math.ceil(todosLosPaises/countriesPerPage); i++) {
        pageNumbers.push(i + 1)        
    }

    return (
        <nav>
           <ul className="paginado">
                {pageNumbers && pageNumbers.map(number => (
                     <li className="number" key={number} >
                     <button onClick={() => paginado(number) }>{number}</button>
                  </li>            
                ))}
            </ul> 
        </nav>
    )
 }

 export default Paginado; 