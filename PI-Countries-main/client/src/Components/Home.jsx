import React, { useEffect, useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import {getCountries, filterCountries, orderByName,  orderByPopulation, filterByActivity, getActivities} from "../actions"; 
// import {Link} from "react-router-dom"; 
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import NavBar from "./NavBar";
import "../css/Home.css";

const Home = () => {
    const dispatch = useDispatch();
// ------------------------------- Variable que me trae el estado de filteredContries ------------
    const todosLosPaises = useSelector((state) => state.filteredContries)
    const activities = useSelector(state => state.activities)
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
    console.log(activities)
// ---------------------------------- Use Effect/componentDidMount -------------------------
// treatar de traernos del estado los paises cunado el componente se monta
useEffect(() => {
    dispatch(getCountries())
    dispatch(getActivities())
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

function handlefilteredByActivity(e){
    e.preventDefault();
    dispatch(filterByActivity(e.target.value))
}
 //  recibe como parametro el value del imput accedo a esa funcion con el e.target.value
  
//  console.log("aca estan todos los paises", todosLosPaises)
    return (
        <div className="HomeConteiner">
            <div className="gridContainer">
          
              
              <h1 className="appTitulo">Api Countries</h1>
              <NavBar className="navBarHome"/>
              <SearchBar/> 

              <div className="Filtros">
             <button className="btnCargarPaises" onClick={handlerClick}>Cargar Paises</button>

           

{/* ---------------------------- filtro alfabetico---------------------------------------- */}
            <select  className="Filtro" onChange={(e) => {handlerFilterName(e)}} > 
                <option value="asc">A - Z</option>
                <option value="dec">Z - A</option>
            </select>
{/* -------------------------------- filtro por poblacion -------------------------------  */}
            <select  className="Filtro" onChange={(e) => {handlerFilterPopulation(e)}} > 
                <option value="asc">Menor poblacion  </option>
                <option value="dec">Mayor poblacion</option>
            </select>
{/* -------------------------------------------------------------------------------------- */}
            <select  className="Filtro" onChange={(e) => {handlefilteredByActivity(e)}}>
                <option value="todas">Todas Actividades</option>
                {activities.map((act) => (
                    <option value={act.name}>{act.name}</option>
                ))}
            </select>
{/* ----------------------------------- Filtro Continente -------------------------------- */}
            <select className="Filtro" onChange = {(e) => {handlerFilterContinents(e)}}>
                        <option value = "All">Selecciona todos los Continente</option>
                        <option value = "Asia">Asia</option>
                        <option value = "South America">South America</option>
                        <option value = "North America">North America</option>
                        <option value = "Europe">Europe</option>
                        <option value = "Oceania">Oceania</option>
                        <option value = "Antarctica">Antarctica</option>
                        <option value = "Africa">Africa</option>
            </select>
               
            </div>       
{/* ----------------------------------- Props Cards  ------------------------------------ */}
             <div  className="CardContainer">
                <div className="grid-Card">
                {currentCountries && currentCountries.map( el => {
             console.log(el.name, el.flagsImg, el.continents)
            return (             
              <Card 
                    name={el.name}
                    flagsImg= {el.flagsImg}
                    continents={el.continents}
                    id={el.id}
                    key={el.id}
                />
            )})}
                </div>
            </div>

{/* --------------------------------------------------------------------------------------- */} 
        <div className="Paginado">
        <Paginado 
                countriesPerPage = {countriesPerPage}
                todosLosPaises = {todosLosPaises.length}
                paginado = {paginado} />
        </div>
           

         
        </div>
</div> // ultimo div 
    )
}

export default Home; 