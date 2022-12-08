import React from "react";
import "./paginado.css"

 const Paginado = ({countriesPerPage, todosLosPaises, paginado}) => {
    const pageNumbers = []; 
    for (let i = 1; i <= Math.ceil(todosLosPaises/countriesPerPage); i++) {
        pageNumbers.push(i)        
    }
// me deja la ultima pagina vacia, revisar si hay alguna manera de resolverlo. 
    return (
       
         <nav>
           <ul className="paginacionBar">
                {pageNumbers && pageNumbers.map(number => (
                     <li className="paginacionNum" key={number} >
                     <button onClick={() => paginado(number) }>{number}</button>
                  </li>            
                ))}
            </ul> 
        </nav>
       
        
    )
 }

 export default Paginado; 