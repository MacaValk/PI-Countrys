import React from "react";
import {Link} from "react-router-dom";
import "./navBar.css"

 const NavBar = () => {

    return (
        <div className="navContainer">
            <Link to="/activities" className="navButton">Crear Actividades</Link>
            {/* <Link to="/home">Home</Link>  */}
        </div>
    )
}

export default NavBar; 
