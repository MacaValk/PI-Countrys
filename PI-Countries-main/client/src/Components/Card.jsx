import React from "react";
import { useHistory } from "react-router-dom";

const Card = ({name, continents, flagsImg, id}) => {
    // console.log(name, continents, flagsImg)
    let history = useHistory();

    
    const rutaDetalle = (e) => {
      history.push(`/home/${id}`)
    }


    return (

      <div className="conteiner" onClick={rutaDetalle}>
         <div className="card"> 
         <h3>{name}</h3> 
            <h5 >{continents}</h5>
            <img className="img" src={flagsImg} alt="img not found" width="200px" height="250px"/>
          </div>
      </div>
       
    )
}

export default Card; 

// { name: 'Iraq', flagsImg: 'https://flagcdn.com/w320/iq.png', continents: 'Asia'}
// continents: "Asia" 
// flagsImg: "https://flagcdn.com/w320/iq.png"
// name: "Iraq"
// key: (...)get 
// key: ƒ ()[[Prototype]]: Object {}[[Prototype]]: Object undefined