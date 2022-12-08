import React from "react";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountriDetail} from "../../redux/actions/index";
import { useParams } from "react-router-dom"
import {useEffect } from "react";
import "./cardDetail.css"

const CardDetail = (props) => {
    const dispatch = useDispatch()
    let {id} = useParams()
  
    useEffect(() => {
            dispatch(getCountriDetail(id)); 
        }, [dispatch, id])

    const contryDetail = useSelector((state)=> state.detail)
    // const seraArray = contryDetail.ActividadTuristicas
    // console.log( "contryDetail", typeof seraArray)
    
 return (
     <div>
        <div className="cardConteinerDetail">              
            <div className="location">
                        <Link to="/home">
                            <button className="btnCardDetail">Volver</button>
                        </Link> 
                    </div>  

          { 
            contryDetail && contryDetail ?
           <div className="conteinerDetail">
                
                <h1 className="pais">{contryDetail.name}</h1>
                <h1 className="id"> ID: {contryDetail.id}</h1>
                <h1 className="continente">{contryDetail.continents}</h1>
                <img className="img" src={contryDetail.flagsImg ?  contryDetail.flagsImg : contryDetail.flagsImg } alt="bandera"/>
                <h1 className="capital"> capital: {contryDetail.capital}</h1>
                <h1 className="subregion"> subregion: {contryDetail.subregion}</h1>
                <h1 className="area"> area: {contryDetail.area}</h1>
                <h1 className="poblacion"> poblacion: {contryDetail.population}</h1>
                
          </div> :  <p className="loading">Loading...</p>
           } 
        <div  className="actividades">
           {
            ( 
                contryDetail.ActividadTuristicas.length ? contryDetail.ActividadTuristicas.map(
                (el) => {
                        return (
                     <div>
                        <h3  className="actividad" > Actividad: {el.name} </h3>
                        <h3  className="dificultad"> Dificultad: {el.dificultad} </h3>
                        <h3  className="duracion" > Duracion: {el.duracion} </h3>
                        <h3  className="pais"> Temporada: {el.temporada} </h3>
                     </div>
                    )}) :  <h1 className="actividades"> no hay actividades </h1>) 
           } 
                </div>
        </div>
        </div>
    )
}

export default CardDetail