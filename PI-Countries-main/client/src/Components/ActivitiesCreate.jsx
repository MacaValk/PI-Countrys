import React from 'react'
import {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import {postActivities, getActivities} from "../actions/index";
import {useDispatch} from "react-redux"; 

// El método test() ejecuta la búsqueda de una ocurrencia entre una expresión regular y una cadena especificada. Devuelve true o false.
function validate(input){
  let errors = {}

   if(!input.name) {errors.name = "Campo Necesario"}
  else if (/[0-9]/.test(input.nombre)){
    errors.nombre = "Nombre invalido"
}
  if(!input.dificultad){ errors.dificultad = "Campo Necesario" 
}  else if(input.dificultad < 1 || input.dificultad > 5)
    errors.dificultad = "Debe ser un numero entre 1 y 5"

  if(!input.duracion) {errors.duracion = "Campo Necesario" }
  else if(input.duracion < 1 || input.duracion > 24) {
    errors.duracion = "Debe ser un numero entre 1 y 24"       
  }
  if(!input.idPais) {errors.idPais = "Campo Necesario"}
  else if(!/^[A-Z]{3}$/.test(input.iPais)){
    errors.idPais = "Debe ser un codigo valido"
}

  console.log(errors)
  return errors;
}





function ActivitiesCreate() {
    const dispatch = useDispatch();
    const history = useHistory()
    // const activities = useSelector((state) => state.activities)
    const [errors, setErrors] = useState({})

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
      setErrors(validate({
        ...input,
        [e.target.name] : e.target.value
      }))
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
      if(!input.name || !input.dificultad || !input.duracion || !input.temporada || !input.idPais) {
        return alert ('Complete correctamente el formulario antes de enviarlo')} 
      
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

  return (
    <div className='Form'>
      <Link to="/home"><button className='button'>Volver a home</button></Link>
      <h1>Crear Actividad!</h1>
      
       <form  method="post" onSubmit={(e) => {handlerSubmit(e)}}>
        <div>
          <label>nombre:</label>
            <input type="text" value={input.name} name="name" onChange={handlerChange} placeholder='Name' class="input" required="">
            </input>
            { errors.name && (<p className="error">{errors.name}</p>)}            
        </div>
        <div>
          <label>dificultad:</label>
            <input type="text" value={input.dificultad} name="dificultad" onChange={handlerChange} placeholder='1 al 5' class="input" required="">
            </input>
            { errors.dificultad && (<p className="error">{errors.dificultad}</p>)}
        </div>
        <div>
          <label>duracion:</label>
            <input type="number" value={input.duracion} name="duracion" onChange={handlerChange} placeholder='1 al 24' class="input" required="">
            </input>
            { errors.duracion && (<p className="error">{errors.duracion}</p>)}
        </div>
        <div>
          <label> ID Pais:</label>  
                <input type="text" value={input.idPais} name="idPais" onChange={handlerChange} placeholder='ej: ARG ' class="input" required="" />
                { errors.idPais && (<p className="error">{errors.idPais}</p>)}               
        </div>
        <div className='CheckBox'>
          <label >temporada:</label>
          
              <input type="checkbox" value="verano" name="verano" onChange={(e) => handlerCheck(e)}/>
              <label> Verano </label>
          
              <input type="checkbox" value="otoño" name="otoño"  onChange={(e) => handlerCheck(e)}/>
              <label> Otoño </label>   
        
              <input type="checkbox" value="invierno" name="invierno"  onChange={(e) => handlerCheck(e)}/>
              <label> Invierno </label>
            
              <input type="checkbox" value="primavera" name="primavera"  onChange={(e) => handlerCheck(e)}/>
              <label> Primavera </label>  
        </div>
          <button type='submit' className='button'>Crear Actividad</button>
      </form>
    </div>
  )
}

export default ActivitiesCreate
