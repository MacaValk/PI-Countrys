
const initialState = {
    allCountries: [], 
    activities : [], 
    country: []
   }; 

function rootReducer (state = initialState, action){
    switch(action.type){
        case "GET_COUNTRYS":
            return {
                ...state,
                allCountries: action.payload, 
            }
        case "GET_ACTIVITIES":
                return {
                    ...state,
                    activities: action.payload,
                }
        case "FILTER_BY_CONTINENT":
            const todosLosPaises =state.allCountries;
        //   todosLosPaises.map(el => console.log(el.continents) )
        //   console.log(action.payload)
            const continentFilter = action.payload === "All" ? todosLosPaises : 
            todosLosPaises.filter(el => el.continents.includes(action.payload))
            return {
                ...state,
                allCountries : continentFilter 
            }
            default:
                return state;
    } 
}

export default rootReducer; 