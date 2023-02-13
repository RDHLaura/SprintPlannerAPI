/**
 * Rutas para las servir los "proyectos"
 *
 */

const express = require("express");
const router = express.Router();
const proyectController = require("../../controller/proyectController")

// localhost:3001/api/v1/proyectos/
router.route("/")
  .get(proyectController.getAllProyects)
  .post(proyectController.createProyect);

// localhost:3001/api/v1/productos/:id
router.route("/:id")
  .get(proyectController.getProyect)
  .put(proyectController.updateProyect)
  .delete(proyectController.deleteProyect);


module.exports.router = router;