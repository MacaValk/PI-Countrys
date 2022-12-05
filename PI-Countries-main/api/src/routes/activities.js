const { Router } = require('express');
const router = Router();
const {ActividadTuristica, Country} = require("../db")


router.get("/", async (req, res) => {
    try {
        const getActivities = await ActividadTuristica.findAll()
        if(getActivities){
            return res.send(getActivities); 
        } else { return "no se encontraron actividades" }
        // console.log(getActivities)      
    } catch (error) {
        res.send(error.message)
    }
})

router.post("/", async (req, res) => {
try {
    req.body.duracion = parseFloat(req.body.duracion)
    const {idPais,name,dificultad,duracion,temporada} = req.body
    
    console.log( "estos son los datos que me llegan por body:",idPais,name,dificultad,duracion,temporada)
    let nuevaActividad = await ActividadTuristica.create({
        name, 
        dificultad,
        duracion,
        temporada
    })
    console.log(nuevaActividad)

    const agregarPais = await Country.findOne({
        where: {
            id: idPais,
        }
    })
    
    await nuevaActividad.addCountry(agregarPais)  //mixing sequelize add + nombreTabla

   return res.status(201).send(nuevaActividad) 
} catch (error) {
    res.status(400).send(error.message)
 }   
}) 

router.delete("/:id", async (req, res) => {
    let id = req.params.id; 
    console.log(id)
    try {
    const findAct = await ActividadTuristica.findByPk(id)
    console.log(findAct)
     await ActividadTuristica.destroy({
        where: {
            id,
        }
     })  
        res.send("eliminado con exito")
    } catch (error) {
        res.send(error.message)
    }
    
})


module.exports = router;