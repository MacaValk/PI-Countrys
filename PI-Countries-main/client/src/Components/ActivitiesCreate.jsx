import React from 'react'
import {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import {postActivities, getActivities} from "../actions/index";
import {useDispatch, useSelector} from "react-redux"; 

function ActivitiesCreate() {
    const dispatch = useDispatch();
    const history = useHistory()
    const activities = useSelector((state) => state.activities)

    const [input, setInput] = useState({
      name: "",
      dificultad:"",
      duracion:  "",
      temporada: "",
      idPais: ""
    })
     
    useEffect(() => {
      dispatch(getActivities())
    }, [dispatch]) 

    const handlerChange = (e) => { // registra cada vez que cambien o se modifiquen mis inputs
      setInput({
        ...input,
        [e.target.name] : e.target.value
      })
      console.log(input)
    }

    const handlerCheck = (e) => {
      if(e.target.checked){
        setInput({
          ...input,
          temporada: e.target.value
        })
      }
    }

    const handlerSubmit = (e) => {
      e.preventDefault();
      console.log(input)
      // if(!input.name || !input.difficulty || !input.duration || !input.season || !input.countries) {
      //   return alert ('Complete correctamente el formulario antes de enviarlo')} 
      dispatch(postActivities(input))
      alert("Actividad creada con exito")
      setInput({
        name: "",
        dificultad:"",
        duracion: "",
        temporada: "",
        idPais: ""
      })
      history.push("/home") // redirigir al usuario
    }

    // const handlerSelect = (e) => {
    //   setInput({
    //     ...input, 
    //     activities: [...input.activities, e.target.value]
    //   })
    // }

  return (
    <div>
      <Link to="/home"><button>Volver a home</button></Link>
      <h1>Crear Actividad!</h1>
      <form  method="post" onSubmit={(e) => {handlerSubmit(e)}}>
        <div>
          <label>nombre:</label>
            <input type="text" value={input.name} name="name" onChange={handlerChange}>
            </input>
        </div>
        <div>
          <label>dificultad:</label>
            <input type="text" value={input.dificultad} name="dificultad" onChange={handlerChange}>
            </input>
        </div>
        <div>
          <label>duracion:</label>
            <input type="number" value={input.duracion} name="duracion" onChange={handlerChange}>
            </input>
        </div>
        <div>
          <label> ID Pais:</label>  
                <input type="text" value={input.idPais} name="idPais" onChange={handlerChange} />
                      
        </div>
        <div>
          <label>temporada:</label>
            <label>
              <input type="checkbox" value="verano" name="verano" onChange={(e) => handlerCheck(e)}/>
                Verano </label>
            <label>
              <input type="checkbox" value="otoño" name="otoño"  onChange={(e) => handlerCheck(e)}/>
                Otoño </label>   
            <label>
              <input type="checkbox" value="invierno" name="invierno"  onChange={(e) => handlerCheck(e)}/>
                Invierno </label>
            <label>
              <input type="checkbox" value="primavera" name="primavera"  onChange={(e) => handlerCheck(e)}/>
                Primavera </label>  
        </div>
          {/* <ul><li>{input.activities.map(el => el + " ,")}</li></ul> */}
          <button type='submit'>Crear Actividad</button>
      </form>
    </div>
  )
}

export default ActivitiesCreate
