const { Router } = require('express');
const  countries  = require("./countries")
const activities = require("./activities")
// const axios = require("axios") 
// const {Country, ActividadTuristica} = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');



const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/countries", countries)
router.use("/activities", activities)

 



module.exports = router;
