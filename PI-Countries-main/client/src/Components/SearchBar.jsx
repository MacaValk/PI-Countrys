import React from "react"; 
import { useState } from "react";
import { useDispatch } from "react-redux";
import {getNameContry} from "../actions"

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
        <div> 
            <input type="text" 
                    placeholder="Buscar..."
                    onChange={(e) => handlerInputChange(e)}
                    />
            <button type="submit" onClick={(e)=> handlerSubmit(e)}>Buscar</button>
        </div>
    )
}

export default SearchBar; 