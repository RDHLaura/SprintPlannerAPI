/**
 * Se establecen las rutas a los recursos que sirve nuestra API
 */

const express = require("express");
const router = express.Router();
const proyectRoutes = require("./proyectRoutes")
const taskRoutes = require("./taskRoutes")
const {getFullUrl} = require("../../utils/url");


// Ruta raíz: http://localhost:3001/api/v1

router.get("/", (req, res, next)=>{
  res.send(`<h1>¡Bienvenido a la API de SprintPlanner!</h1>` + getFullUrl(req))
});

// Rutas específicas de cada uno de los recursos (importadas desde los ficheros):

router.use("/proyectos",  proyectRoutes.router); // http://localhost:3001/api/v1/proyectos
router.use("/tareas",  taskRoutes.router); // http://localhost:3001/api/v1/tareas


module.exports.router = router;
