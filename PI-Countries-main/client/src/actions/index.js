import axios from "axios"; 

export const getCountries = () => {
    return async function(dispatch){
        var json = await axios("http://localhost:3001/countries")
        //  console.log(json.data)
        return dispatch({
            type: "GET_COUNTRYS",
            payload: json.data
        })
    }
}

 export const filterCountriesByContinente = (payload) => { 
    console.log(payload) //payload que va a ser el value que me va a llegar 
    return {
        type: "FILTER_BY_CONTINENT", 
        payload 
    }
}
export const getActivities = () => {
    return async function (dispatch){
        const getAllActivities = await axios.get("http://localhost:3001/activities")
        return dispatch ({
            type: "GET_ACTIVITIES",
            payload: getAllActivities.data
        })    
    }     
}
