const taskService = require("../services/taskService");
const {getFullUrl} = require("../utils/url");


/**
 * GET /api/v1/proyectos
 */
const getAllTasks = (req, res, next) => {
  const urlAPI = getFullUrl(req);
  let params = req.query

  const allTasks = taskService.getAllTask(params, urlAPI);

  if(Object.keys(allTasks).length !== 0){
    res.send(allTasks);
  }else{
    res.status(404).send({mensaje: "No existen tareas."});
  }
  res.end();
};


/**
 * POST /api/v1/proyectos
 */

const createtask = (req, res, next) => {

  //body de la petición http
  const { body } = req;

  if(!body.titulo || !body.descripcion || !body.asignada_a || !body.fecha_entrega || !body.estado)
    res.status(400).send({mensaje: "Faltan datos"});
  else {
    // Extraigo los datos del body de la petición para mandarlos al servicio
    const newTask = {
      "titulo": body.titulo,
      "descripcion": body.descripcion,
      "asignada_a": body.asignada_a,
      "fecha_entrega": body.fecha_entrega,
      "id_proyecto": body.id_proyecto,
      "estado": body.estado
    }
    const createdTask = taskService.createTask(newTask);

    if (createdTask)
      res.status(200).send({createdTask, mensaje: "Tarea creado con éxito."});
    else
      res.status(406).send({mensaje: "A ocurrido algún error. La tarea no se ha guardado. "});
  }
  res.end();
}

/**
 * GET    /api/v1/productos/:prod
 */

const getTask = (req, res, next) => {
  //PRIMERO obtengo el parámetro de ruta
  const { id } = req.params;

  const oneTask = taskService.getTask(id);

  if (oneTask) {
    res.send(oneTask);
  } else {
    res.status(404).send({mensaje: "No existe el tarea."});
  }

  res.end();
};





// /api/v1/productos/:id
const updateTask = (req, res, next) => {

  const { id } = req.params;
  //extraigo los datos del body de la petición
  const {body} = req;

  //compruebo que el proyecto existe
  const existTask = taskService.getTask(id);

  if (existTask) {
    const updatedTask = taskService.updateTask(id, body)

    if(updatedTask)
      res.status(200).send({updatedTask, mensaje: "Se ha modificado la tarea."})
    else
      res.status(406).send({mensaje: "Ha ocurrido un error, no se ha podido actualizar la tarea."})

  } else
    res.status(404).send({mensaje: "No se encuentra la tarea."});

  res.end();
};


/**
 *DELETE   /api/v1/productos/:prod
 */
const deleteTask = (req, res, next) => {
  //PRIMERO obtengo el parámetro de ruta
  const { id } = req.params;

  const deletedTask = taskService.deleteTask(id);

  if (deletedTask)  res.status(200).send({deletedTask, mensaje:"Tarea borrado"});
  else  res.status(404).send({mensaje: "No existe la publicación"});

  res.end();
};



module.exports = {
  getAllTasks,
  createtask,
  getTask,
  updateTask,
  deleteTask,
};