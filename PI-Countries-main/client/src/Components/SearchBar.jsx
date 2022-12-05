import React from "react"; 
import { useState } from "react";
import { useDispatch } from "react-redux";
import {getNameContry} from "../actions"
import "../css/SearchBar.css"

const SearchBar = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState(""); 

const handlerInputChange = (e) => { // guarda el name que llega desde el input 
    e.preventDefault()
    setName(e.target.value)
    console.log(name)
}

const handlerSubmit = (e) => { // envia el nombre que pasa el usuario en el input como name para ser tomado por la action 
    e.preventDefault()
    dispatch(getNameContry(name))

}
 

    return (
        <div className="input-group"> 
            <input className="input"
                    type="text" 
                    placeholder="Buscar..."
                    onChange={(e) => handlerInputChange(e)}
                    />
            <button className="button--submit" type="submit" onClick={(e)=> handlerSubmit(e)}>search</button>
        </div>
    )
}

export default SearchBar; 