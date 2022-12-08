import React from 'react'
import {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import {postActivities, getCountries} from "../actions/index";
import {useDispatch, useSelector} from "react-redux"; 
import "../css/formulario.css"
// El método test() ejecuta la búsqueda de una ocurrencia entre una expresión regular y una cadena especificada. Devuelve true o false.
function validate(input){
  let errors = {}
  
   if(!input.name) {errors.name = "Campo Necesario"}
  else if (/[0-9]/.test(input.name)){
    errors.name = "Nombre invalido"
}
  if(!input.dificultad){ errors.dificultad = "Campo Necesario" 
}  else if(input.dificultad < 1 || input.dificultad > 5)
    errors.dificultad = "Debe ser un numero entre 1 y 5"

  if(!input.duracion) {errors.duracion = "Campo Necesario" }
  else if(input.duracion < 1 || input.duracion > 24) {
    errors.duracion = "Debe ser un numero entre 1 y 24"       
  }
  if(!input.idPais) {errors.idPais = "Campo Necesario"}

  console.log(errors)
  return errors;
}





function ActivitiesCreate() {
    const allCountries = useSelector(state => state.allCountries)
    
    const dispatch = useDispatch();
    const history = useHistory()
    // const activities = useSelector((state) => state.activities)
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
      name: "",
      dificultad:"",
      duracion:  "",
      temporada: "",
      idPais: []
    })
     
    useEffect(() => {
      if (!allCountries.length) {
      dispatch(getCountries())
      } }, [dispatch, allCountries]) 

    const handlerChange = (e) => { // registra cada vez que cambien o se modifiquen mis inputs
      console.log(e.target)
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

    const handlerIdPais = (e) => {
      if (!input.idPais.includes(e.target.value)){
        setInput({
          ...input,
        idPais : [...input.idPais, e.target.value]
        })
      }
      

    }

    const handlerCheck = (e) => {
      if(e.target.checked){
        setInput({
          ...input,
          temporada: e.target.value
        })
      }
    }

    const handleDelete = (e) => {
    setInput({
      ...input, 
      idPais : input.idPais.filter(el => el !== e)
    }) 
    }

    // console.log("errors:", errors)
    const areFieldsEmpty = !input.name || !input.dificultad || !input.duracion || !input.temporada || !input.idPais
    const thereAreErrors = Object.keys(errors).length

    // El método Object.keys() devuelve un array de las propiedades names de un objeto, en el mismo orden como se obtienen en un loop normal
    const canSubmit = !thereAreErrors && !areFieldsEmpty
    // console.log("canSubmit", canSubmit)

    const handlerSubmit = (e) => {
      e.preventDefault();
      console.log(input)
      if(areFieldsEmpty) {
        return alert ('Complete correctamente el formulario antes de enviarlo')} 
      
      dispatch(postActivities(input))
      alert("Actividad creada con exito")
      setInput({
        name: "",
        dificultad:"",
        duracion: "",
        temporada: "",
        idPais: []
      })
      history.push("/home") // redirigir al usuario
    }

    console.log("esto es input.idPais",input.idPais)

  return (
    <div className='Form'>
      <Link to="/home"><button className='button'>Volver a home</button></Link>
      
      <div className='cardForm'>
      <h1>Crear Actividad!</h1>
       <form  method="post" onSubmit={(e) => {handlerSubmit(e)}}>
        <div>
          <label className='words'>Nombre </label>
            <input type="text" value={input.name} name="name" onChange={handlerChange} placeholder='Name' className="input" required="">
            </input>
            { errors.name && (<p className="error">{errors.name}</p>)}            
        </div>
        <div>
          <label className='words'>Dificultad </label>
            <input type="text" value={input.dificultad} name="dificultad" onChange={handlerChange} placeholder='1 al 5' className="input" required="">
            </input>
            { errors.dificultad && (<p className="error">{errors.dificultad}</p>)}
        </div>
        <div>
          <label className='words'>Duracion </label>
            <input type="number" value={input.duracion} name="duracion" onChange={handlerChange} placeholder='1 al 24' className="input" required="">
            </input>
            { errors.duracion && (<p className="error">{errors.duracion}</p>)}
        </div>
        <div>
          <label className='words'> ID Pais </label>  
            <select  className="input" name="idPais" onChange={handlerIdPais}>
                  {allCountries.map((country) => (
                      <option value={country.id}>{country.name}</option>
                      
                  ))}
              </select>
                  { input.idPais?.map( el => {
                    return (
                      <div key={el}>
                      <button onClick={() => {handleDelete(el)}}>X</button> <span> {el} </span>
                    </div>
                    )}) 
                  }

        </div>
        <div className='CheckBox'>
        <fieldset>
     
          <legend className='words'>Estacion </legend>
          
              <input type="checkbox" value="verano" name="verano" onChange={(e) => handlerCheck(e)}/>
              <label className='temporada'> Verano </label>
          
              <input type="checkbox" value="otoño" name="otoño"  onChange={(e) => handlerCheck(e)}/>
              <label className='temporada'> Otoño </label>   
        
              <input type="checkbox" value="invierno" name="invierno"  onChange={(e) => handlerCheck(e)}/>
              <label className='temporada'> Invierno </label>
            
              <input type="checkbox" value="primavera" name="primavera"  onChange={(e) => handlerCheck(e)}/>
              <label className='temporada'> Primavera </label>  
      
        </fieldset>
      </div>
          <button type='submit' className='buttonSubmit' disabled={!canSubmit}>Crear Actividad</button>

      </form>
      </div>
    </div>
  )
}

export default ActivitiesCreate
