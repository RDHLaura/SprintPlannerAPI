/**
 * Rutas para las servir las "tareas"
 *
 */

const express = require("express");
const router = express.Router();
const taskController = require("../../controller/taskController")

// localhost:3001/api/v1/tareas/
router.route("/")
  .get(taskController.getAllTasks)
  .post(taskController.createtask);

// localhost:3001/api/v1/tareas/:id
router.route("/:id")
  .get(taskController.getTask)
  .put(taskController.updateTask)
  .delete(taskController.deleteTask);


module.exports.router = router;