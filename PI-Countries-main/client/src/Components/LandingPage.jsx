import React from "react";
import {Link} from "react-router-dom";
import "../css/landingPage.css";

const LandingPage = () => {
    return (
        <div className="landingPage" >
            <h1 className="titulo">Bienvenidos a Countries</h1>
            <Link to="/home">
                <button className="btnLanding">Ingresar</button>
            </Link>
        </div> 
    )
}

export default LandingPage; 