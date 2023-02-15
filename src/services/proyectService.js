const proyectModel = require("../database/proyectModel");
const taskService = require("../services/taskService")
const {all} = require("express/lib/application");

const getAllProyects = (page, url) => {
  return proyectModel.getAllProyects(page, url);
};


const getProyect = (id) => {
  return proyectModel.getProyect(id);
};


const createProyect = (newProduct) => {
  const today = new Date().toISOString();

  //Creo el nuevo objeto, estableciendo fecha de creación y de modificación
  newProduct = {
    ...newProduct,
    createdAt: today,
    updatedAt: today,
  };

  return proyectModel.createProyect(newProduct);
};

const deleteProyect = (id) => {

  //Compruebo si el proyecto existe
  const exist = getProyect(id);
  if(!exist)//Si ese producto no existe en la base de datos, devuelvo false
    return false
  else{
    //borro las tareas que pertenezcan al proyecto
    const allTask = taskService.getAllTask();

    for (const [key, value] of Object.entries(allTask)) {
      (value.id_proyecto==id) && taskService.deleteTask(key)
    }

    //elimino el proyecto
    const proyect = proyectModel.deleteProyect(id);
    return proyect
  }

};

const updateProyect = (id, newDataProyect) => {
  let today = new Date().toISOString();

  let oldproyect = proyectModel.getProyect(id);
  //"Construyo" el nuevo objeto, estableciendo un id
  let newProyect = {
    ...oldproyect,
    ...newDataProyect,
    updatedAt: today,
  };

  //actualiza el proyecto
  return proyectModel.updateProyect(id, newProyect);
};

module.exports = {
  getAllProyects,
  getProyect,
  createProyect,
  deleteProyect,
  updateProyect
};