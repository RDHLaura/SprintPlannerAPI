let data = require("./proyectos.json");
const fs = require("fs");
const {paginatedContent, checkfilterProyectsByUser, filterContent, dataPaginate} = require("../utils/filters")


/**
 * @name getAllProyects
 * @param page la página solicitada
 * @param url url completa donde se hace la petición, para usarla en los datos de la paginación
 * @returns {{paginate: {next: null, actual: string, previous: null, totalPages: number}, content: {}}} devuelve un objeto con la información de la
 * paginación y otro con los proyectos
 */
const getAllProyects = (params, url) => {
  const filteredContent = filterContent(params.user, data.proyectos, checkfilterProyectsByUser)
  return {
    paginate: dataPaginate(params, url, filteredContent),
    content: paginatedContent(params, filteredContent)
  }
}


/**
 * @name getProyect
 * @description devuelve el proyecto
 * @param id id del proyecto que se ha pasado por parámtro en la url
 * @returns {*} objeto con los datos del proyecto solicitado
 */
const getProyect = (id) => {
  if(data.proyectos[id]===undefined)
    return false
  return data.proyectos[id];;
}


/**
 * @name deleteProyect
 * @description elimina un proyecto concreto
 * @param id id del proyecto a eliminar
 * @returns {*} el proyecto eliminado
 */
const deleteProyect = (id) => {

  const proyect = getProyect(id);

  //borro el proyecto
  delete data.proyectos[id];

  //escribo los datos actualizados en el json
  fs.writeFileSync(
    "./src/database/proyectos.json",
    JSON.stringify(data, null, 2),
    "utf8"
  );

  return proyect;
};

/**
 * @name createProyect
 * @description crea un proyecto con los datos que recibe
 * @param newProyect datos de proyecto a crear
 * @returns {*} devuelve un objeto con los datos del proyecto creado
 */
const createProyect = (newProyect) => {

  const last = Number(Object.keys(data.proyectos)[Object.keys(data.proyectos).length-1]);
  const id = last + 1;
  newProyect.id = id;
  //se almacena en la bd
  data.proyectos[id] = newProyect;

  //Escribe el proyecto nuevo en el json
  fs.writeFileSync(
    "./src/database/proyectos.json",
    JSON.stringify(data, null, 2),
    "utf8"
  );

  return getProyect(id);
}


/**
 * @name updateProyect
 * @param id id del proyecto que se quiere modificar
 * @param newDataProyect nuevos datos actualizados
 * @returns {*|boolean} devuelve false si el proyecto a modificar no existe o el objeto del proyecto ya modificado
 */
const updateProyect = (id, newDataProyect) => {

  //Compruebo que el proyecto exista
   const proyect = getProyect(id)

  if(!proyect)
    return false;
  else{
    data.proyectos[id] = newDataProyect;
    //Escribe el producto nuevo en el json
    fs.writeFileSync(
      "./src/database/proyectos.json",
      JSON.stringify(data, null, 2),
      "utf8"
    );
    //console.log(getProyect(id))
    return getProyect(id)
  }


}



module.exports = {
  getAllProyects,
  getProyect,
  createProyect,
  deleteProyect,
  updateProyect

}