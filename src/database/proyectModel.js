let data = require("./proyectos.json");
const fs = require("fs");


/**
 * @name getAllProyects
 * @param page la página solicitada
 * @param url url completa donde se hace la petición, para usarla en los datos de la paginación
 * @returns {{paginate: {next: null, actual: string, previous: null, totalPages: number}, content: {}}} devuelve un objeto con la información de la
 * paginación y otro con los proyectos
 */
const getAllProyects = (page, url) => {
  return {paginate: dataPaginate(page, url), content: paginatedContent(page) }
}


/**
 * @name paginatedContent
 * @description selecciona 10 los proyectos correspondientes a la pág pasada por parámetro
 * @param page Pagina solicitada en parametro de url
 * @returns {{}} devuelve un objeto que contiene los id de los proyectos como claves y el objeto proyecto como valor.
 */
const paginatedContent = (page) => {
  const perPage = 10;
  const start = (page-1)*perPage;
  const end = (page) * perPage -1;
  const content = {}

  //selecciona los elementos correspondientes a la pag y formatea la salida
  Object.entries(data.proyectos).slice(start,end).map((element)=>{
    content[element[0]] = element[1]
  })

  return content;
}


/**
 * @name dataPaginate
 * @param page Pagina solicitada en parametro de url
 * @param url url completa donde se hace la petición, para usarla en los datos de la paginación
 * @returns {{next: null, actual: string, previous: null, totalPages: number}} objeto que contiene toda la información de la paginación
 */
const dataPaginate = (page, url) => {
  const maxPages = Math.ceil(Object.entries(data.proyectos).length - 1 / 10);

  let dataPaginate={
    totalPages : maxPages,
    actual: page,
    next : null,
    actual : url + "?page="+ (page),
    previous : null
  }
  if(page != "1")
    dataPaginate.previous = url + "?page="+ (page-1)
  if(page != maxPages)
    dataPaginate.next = url + "?page="+ (page+1)


  return dataPaginate
}


/**
 * @name getProyect
 * @param id id del proyecto que se pide
 * @returns {*} el proyecto solicitado
 */
const getProyect = (id) => {
  return data.proyectos[id];
}


/**
 * @name deleteProyect
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
 * @param newProyect datos de proyecto a crear
 * @returns {*} devuelve el objeto proyecto creado
 */
const createProyect = (newProyect) => {

  const last = Number(Object.keys(data.proyectos)[Object.keys(data.proyectos).length-1]);
  const id = last + 1;

  //se almacena en la bd
  data.proyectos[id] = newProyect;

  //Escribe el proyecto nuevo en el json
  fs.writeFileSync(
    "./src/database/proyectos.json",
    JSON.stringify(data, null, 2),
    "utf8"
  );

  return newProyect;
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
    return proyect;
  }


}



module.exports = {
  getAllProyects,
  getProyect,
  createProyect,
  deleteProyect,
  updateProyect

}