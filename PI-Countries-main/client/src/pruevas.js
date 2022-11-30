

// el switch va analizando, como puedo cambiar de ruta sin meter mano en el componente, LINK
// dentro de un componente puedo deribar a otra ruta, 
// switch pregunta en que caso estas// evalua la ruta a ver si matchea
// route muestra determinado componente en determinada ruta
// nav link --> activeClassName=""; le puedo agregar estilos. 


case SORT_BY_POPULATION:
          let sortedByPopulation = action.payload === "asc" ? 
              state.countries.sort((a, b) => {
                  if (a.population > b.population) {
                    return 1;
                  }
                  if (b.population > a.population) {
                    return -1;
                  }
                    return 0;
                    
              })
              : state.countries.sort((a, b) => {
                  if (a.population > b.population) {
                    return -1;
                  }
                  if (b.population > a.population) {
                    return 1;
                  }
                    return 0;
              });
            return {
                ...state,
                allCountries: sortedByPopulation,
                countries: sortedByPopulation,
            };   




        //     case SORT_BY_NAME: 
        //     let sortedByName = action.payload === 'asc' ?
        //         state.countries.sort((a, b) => {
        //           if(a.name > b.name) {
        //             return 1
        //           } else if (b.name > a.name) {
        //             return -1
        //           } else {
        //             return 0
        //           }}) : 
        //         state.countries.sort((a, b) => {
        //           if(a.name > b.name) {
        //             return -1
        //           } else if (b.name > a.name) {
        //             return 1
        //           } else {
        //             return 0
        //           }}) 
        //     return {
        //         ...state,
        //         allCountries: sortedByName,
        //         countries: sortedByName
        //     }


        case FILTER_BY_ACTIVITY:
                const toFilterByActivity = state.allCountries;
                const activityFilter = action.payload === 'all' ? toFilterByActivity :
                    // toFilterByActivity.filter(c => c.activities.find((a) => a.name.toLowerCase() === action.payload.toLowerCase()));
                    // console.log('Filtro', activityFilter)
                    toFilterByActivity.filter((e) =>
                    e.activities &&
                    e.activities.map((e) => e.name).includes(action.payload));                
                return {
                    ...state,
                    countries: activityFilter
                }