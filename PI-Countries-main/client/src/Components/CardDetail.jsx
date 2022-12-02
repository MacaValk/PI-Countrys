import React from "react";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountriDetail } from "../actions";
import { useParams } from "react-router-dom"
import {useEffect} from "react";

const CardDetail = (props) => {
    console.log(props)
    const dispatch = useDispatch()
    let {id} = useParams()
    console.log(id)

    

    useEffect(() => {
            dispatch(getCountriDetail(id)); 
        }, [])

    const contryDetail = useSelector((state) => state.detail)
    console.log(contryDetail.ActividadTuristicas)
    return (
        <div>
          {
            contryDetail && contryDetail ?
           <div>
                <h1> id: {contryDetail.id}</h1>
                <h1> Pais: {contryDetail.name}</h1>
                <img src={contryDetail.flagsImg ?  contryDetail.flagsImg : contryDetail.flagsImg } alt="bandera"/>
                <h1> continente: {contryDetail.continents}</h1>
                <h1> capital: {contryDetail.capital}</h1>
                <h1> subregion: {contryDetail.subregion}</h1>
                <h1> area: {contryDetail.area}</h1>
                <h1> poblacion: {contryDetail.population}</h1>
          </div> :  <p>Loading...</p>
           } 
            
        <div >
           {
            ( contryDetail.ActividadTuristicas ? contryDetail.ActividadTuristicas.map(
                (el) => {
                    return (
                        <div >
                        <h3 > Actividad: {el.name} </h3>
                        <h3 > Dificultad: {el.dificultad} </h3>
                        <h3 > Duracion: {el.duracion} </h3>
                        <h3 > Temporada: {el.temporada} </h3>
                    </div>
                    )}) :  <h2>no hay actividades</h2>)
           }

        </div>
           <Link to= "/home">
                <button>Volver</button>
           </Link>
        </div>
    )
}

export default CardDetail