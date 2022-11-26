import React from "react";


const Card = ({name, continents, flagsImg}) => {
    // console.log(name, continents, flagsImg)
    return (

      <div class="conteiner">
         <div class="card"> 
         <h3>{name}</h3> 
           
            <h5 >{continents}</h5>
           
            <img class="img" src={flagsImg} alt="img not found" width="200px" height="250px"/>
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