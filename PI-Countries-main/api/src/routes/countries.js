const { Router } = require('express');
const router = Router();
const { Sequelize } = require('sequelize')
const {Country, ActividadTuristica, Op} = require("../db.js")
const axios = require("axios")

const getApiInfo = async () => {
    const apiCountriesInfo = await axios.get('https://restcountries.com/v3/all');
        const apiCountries = apiCountriesInfo.data.map((e) => {
          const capital = e.capital ?  e.capital[0] : "no tiene capital";
        //   console.log(e.cca3)
            return {
              id: e.cca3,
              name: e.name.common,
              flagsImg: e.flags[1],
              continents: e.continents[0],
              capital: capital,
              subregion: e.subregion,
              area: e.area,
              population: e.population
              }
            })
            return apiCountries; 
          }
    
          const countriesInDb = async () => {
            try {
                const countries = await Country.findAll();
                if(!countries.length){
                    const data = await getApiInfo()
                    // console.log(data)      
                    await Country.bulkCreate(data)   
                                
                } else {console.log("la base de datos ya fue creada")}
            } catch (error) {
                console.log(error)
            }
          }
    
          const cargarPaises = async () => {
            await countriesInDb()
          }
    
          cargarPaises(); 

// ------------------------------------------------------------------------------------
// router.get("/", async (req, res) => {
//   const {name} = req.query; 
//  try {
//   return res.send(console.log(name))
//  } catch (error) {
//   res.send(error.message)
//  }
  
// })

router.get("/", async (req, res) => {
  try {
    const {name} = req.query 
    if(name) {
      const findName = await Country.findAll(
        { where: {name: name}, 
        include: ActividadTuristica}  
      )
       res.status(200).send(findName)
    } else {
      const daleEncontralo = await Country.findAll(
        {
        include:  ActividadTuristica
      }
      )
      return res.status(200).send(daleEncontralo)
    }
 } catch (error) {
    res.status(400).send(error.message)
  }
 
})


  

 router.get("/:id", async (req, res) => {
  const {id} = req.params;
  try {
    const findId = await Country.findByPk(id, 
       { include:  ActividadTuristica  }
       ); 
    res.json(findId || "pais no encontrado")
  } catch (error) {
    res.status(400).send(error.message)
  }
 })


module.exports = router;