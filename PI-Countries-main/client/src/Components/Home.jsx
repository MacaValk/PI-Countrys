import React, { useEffect, useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import {getCountries, filterCountries, orderByName,  orderByPopulation} from "../actions"; 
import {Link} from "react-router-dom"; 
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

const Home = () => {
    const dispatch = useDispatch();
// ------------------------------- Variable que me trae el estado de filteredContries ------------
    const todosLosPaises = useSelector((state) => state.filteredContries)
    console.log(todosLosPaises)
// ------------------------------- Estados locales del componente Home -----------------------
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage, setCountriesPerPage] = useState(9); 

 // ------------------------------ Logica paginado -------------------------------------------- 
    const indexOfLastCountry = currentPage * countriesPerPage; // 9 
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage; // 0
    const currentCountries = todosLosPaises.slice(indexOfFirstCountry, indexOfLastCountry)

    console.log(currentCountries)
// esta constante nos va a ayudar para el renderizado del paginado

    const paginado = (pageNumber) => {
        if (pageNumber === 1) {
            setCountriesPerPage(9);
            setCurrentPage(pageNumber)
        } else if (pageNumber > 25) {
            setCountriesPerPage(10);
            setCurrentPage(25)
        } else {
            setCountriesPerPage(10);
            setCurrentPage(pageNumber)
        }
    }
// ---------------------------------- Use Effect/componentDidMount -------------------------
// treatar de traernos del estado los paises cunado el componente se monta
useEffect(() => {
    dispatch(getCountries())
}, [dispatch])

// ------------------------- Click Handlers -------------------------------------------------
const handlerClick = (e) => {
    // console.log("entro al handlerClick")
     e.preventDefault()
    dispatch(getCountries())
}


 const handlerFilterContinents = (e) => {
    console.log("dentro del handlerFilterContinents")
    e.preventDefault()
    dispatch(filterCountries(e.target.value)); 
}

const handlerFilterName = (e) => {
    e.preventDefault(e);
    console.log(e.target.value)
    dispatch(orderByName(e.target.value))
}

const handlerFilterPopulation = (e) => {
    e.preventDefault(e);
    dispatch(orderByPopulation(e.target.value))
}
 //  recibe como parametro el value del imput accedo a esa funcion con el e.target.value
  
//  console.log("aca estan todos los paises", todosLosPaises)
    return (
        <div className="homeComponent"> 
           <Link to= "/activities">Crear Actividades</Link>
           <h1>Api Countries</h1>
           <button className="bn3637 bn37" onClick={handlerClick}>volver a cargar todos los paises</button>
           
           <div> 
{/* ---------------------------- filtro alfabetico---------------------------------------- */}
             <select  className="select" onChange={(e) => {handlerFilterName(e)}} > 
                <option value="asc">A - Z</option>
                <option value="dec">Z - A</option>
            </select>
{/* -------------------------------- filtro por poblacion -------------------------------  */}
            <select  className="select" onChange={(e) => {handlerFilterPopulation(e)}} > 
                <option value="asc">Menor poblacion  </option>
                <option value="dec">Mayor poblacion</option>
             </select>
{/* -------------------------------------------------------------------------------------- */}
             <select className="select">
                <option value="Actividad">Actividad Turistica</option>  
             </select>
{/* ----------------------------------- Filtro Continente -------------------------------- */}
             <select className="select" onChange = {(e) => {handlerFilterContinents(e)}}>
                        <option value = "All">Selecciona todos los Continente</option>
                        <option value = "Asia">Asia</option>
                        <option value = "South America">South America</option>
                        <option value = "North America">North America</option>
                        <option value = "Europe">Europe</option>
                        <option value = "Oceania">Oceania</option>
                        <option value = "Antarctica">Antarctica</option>
                        <option value = "Africa">Africa</option>
            </select>
{/* ------------------------------------- Props Paginado --------------------------------- */}
             <Paginado 
                countriesPerPage = {countriesPerPage}
                todosLosPaises = {todosLosPaises.length}
                paginado = {paginado} />

                <SearchBar/> 
{/* ----------------------------------- Props Cards  ------------------------------------ */}
             <div>{
        currentCountries && currentCountries.map( el => {
            // console.log(el.name, el.flagsImg, el.continents)
            return (             
              <Card 
                    name={el.name}
                    flagsImg= {el.flagsImg}
                    continents={el.continents}
                    key={el.id}
                />
            )})
        }</div>
{/* --------------------------------------------------------------------------------------- */}
           </div>
        </div>
    )
}

export default Home; 