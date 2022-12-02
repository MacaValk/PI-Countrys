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


    useEffect(() => {
            dispatch(getCountriDetail(id)); 
        }, [])

    const contryDetail = useSelector((state) => state.detail)

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

        <div> 
            <h4> actividades: {contryDetail.ActividadTuristicas > 0 ?
                contryDetail.ActividadTuristicas.map(el => el.name + (" ")) : "no existe actividad turistica"}</h4>
        </div>
           <Link to= "/home">
                <button>Volver</button>
           </Link>
        </div>
    )
}

export default CardDetail