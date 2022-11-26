import React, { useEffect, useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import {getCountries, filterCountriesByContinente  } from "../actions"; 
import {Link} from "react-router-dom"; 
import Card from "./Card";
import Paginado from "./Paginado";


const Home = () => {
    const dispatch = useDispatch();
// ------------------------------- Variable que me trae el estado de allCountries ------------
    const todosLosPaises = useSelector((state) => state.allCountries) 

// ------------------------------- Estados locales del componente Home -----------------------
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage, setCountriesPerPage] = useState(9); 

 // ------------------------------ Logica paginado -------------------------------------------- 
    const indexOfLastCountry = currentPage * countriesPerPage; // 9 
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage; // 0
    const currentCountries = todosLosPaises.slice(indexOfFirstCountry, indexOfLastCountry)
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
       // console.log("entro al useEffect")
    dispatch(getCountries())
}, [])

// ------------------------- Click Handlers -------------------------------------------------
const handlerClick = (e) => {
    // console.log("entro al handlerClick")
     e.preventDefault()
    dispatch(getCountries())

 }

 const handlerFilterContinents = (e) => {
    console.log("dentro del handlerFilterContinents")
    e.preventDefault()
    dispatch(filterCountriesByContinente(e.target.value)); 
   
   // recibe como parametro el value del imput accedo a esa funcion con el e.target.value
 }  
//  console.log("aca estan todos los paises", todosLosPaises)
    return (
        <div class="homeComponent"> 
           <Link to= "/activities">Crear Actividades</Link>
           <h1>Api Countries</h1>
           <button class="bn3637 bn37" onClick={handlerClick}>volver a cargar todos los paises</button>
           <div> 
             <select class="select" > 
                <option value="asc">Ascendente</option>
                <option value="dec">Decendente</option>
                <option value="aToz">A-Z </option>
                <option value="zToa">Z-A</option>
                <option  value="cantidadPoblacion">Cantidad_Poblacion</option>
             </select>
{/* -------------------------------------------------------------------------------------- */}
             <select class="select">
                <option value="all">Todos los paises</option>
                <option value="Actividad">Actividad Turistica</option>  
             </select>
{/* ----------------------------------- Filtro Continente -------------------------------- */}
             <select class="select" onChange = {(e) => {handlerFilterContinents(e)}}>
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