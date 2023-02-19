const proyectService = require("../services/proyectService");
const { getFullUrl} = require("../utils/url")

/**
 * GET /api/v1/proyectos
 */
const getAllProyects = (req, res, next) => {
  const urlAPI = getFullUrl(req);
  let params = req.query
  const allProyects = proyectService.getAllProyects(params, urlAPI);

  if(Object.keys(allProyects).length !== 0){
    res.send(allProyects);
  }else{
    res.status(404).send({mensaje: "No existen proyectos."});
  }
  res.end();
};


/**
 * POST /api/v1/proyectos
 */

const createProyect = async (req, res, next) => {
  //body de la petición http
  const { body } = req;

  if(!body.titulo || !body.descripcion || !body.miembros || !body.creador)
    res.status(400).send({mensaje: "Faltan datos"});
  else {
    // Extraigo los datos del body de la petición para mandarlos al servicio
    const newProyect = {
      "titulo": body.titulo,
      "descripcion": body.descripcion,
      "miembros": body.miembros,
      "creador": body.creador
    }
    const createdProyect = await proyectService.createProyect(newProyect);

    if (createdProyect)
      res.status(200).send({createdProyect, mensaje: "Proyecto creado con éxito."});
    else
      res.status(406).send({mensaje: "A ocurrido algún error. El proyecto no se ha guardado. "});
  }
  res.end();
}

/**
 * GET  /api/v1/productos/:prod
 */

const getProyect = (req, res, next) => {
  //PRIMERO obtengo el parámetro de ruta
  const { id } = req.params;

  const oneProyect = proyectService.getProyect(id);

  if (oneProyect) {
    res.send(oneProyect);
  } else {
    res.status(404).send({mensaje: "No existe el proyecto."});
  }

  res.end();
};





// /api/v1/productos/:id
const updateProyect = (req, res, next) => {
  //id
  const { id } = req.params;
  //extraigo los datos del body de la petición
  const {body} = req;

  //compruebo que el proyecto existe
  const existProyect = proyectService.getProyect(id);

  if (existProyect) {
    const updatedProyect = proyectService.updateProyect(id, body)

    if(updatedProyect)
      res.status(200).send({updatedProyect, mensaje: "Se ha modificado el proyecto."})
    else
      res.status(406).send({mensaje: "Ha ocurrido un error, no se ha podido actualizar el proyecto."})

  } else
    res.status(404).send({mensaje: "No se encuentra el proyecto."});


  res.end();
};


/**
 *DELETE   /api/v1/productos/:prod
 */

const deleteProyect = (req, res, next) => {
  //PRIMERO obtengo el parámetro de ruta
  const { id } = req.params;

  const deletedProyect = proyectService.deleteProyect(id);

  if (deletedProyect)  res.status(200).send(deletedProyect);
  else  res.status(404).send({mensaje: "No existe la publicación"});

  res.end();
};



module.exports = {
  getAllProyects,
  createProyect,
  getProyect,
  updateProyect,
  deleteProyect,
};