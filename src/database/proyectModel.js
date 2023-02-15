let data = require("./proyectos.json");
const fs = require("fs");

const getAllProyects = (page, url) => {

  return {paginate: dataPaginate(page, url), content: paginatedContent(page) }

}

const paginatedContent = (page) => {
  const perPage = 10;
  const proyectsInPage = []
  for (let x = (page-1)*perPage; x<(page*perPage); x++){
    proyectsInPage.push(data.proyectos[x])
  }
  return proyectsInPage
}

const dataPaginate = (page, url) => {
  const maxPages = Math.ceil(Object.entries(data.proyectos).length - 1 / 10);

  let dataPaginate={
    totalPages : maxPages,
    actual: page,
    next : url + "?page="+ (page+1),
    actual : url + "?page="+ (page),
    previous : url + "?page="+ (page-1)
  }
  return dataPaginate
}

const getProyect = (id) => {
  return data.proyectos[id];
}

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