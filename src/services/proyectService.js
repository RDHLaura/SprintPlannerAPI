const proyectModel = require("../database/proyectModel");
const dataTask = require("../database/tareas.json")
const taskService = require("./taskService")


const getAllProyects = (params, url) => {

  return proyectModel.getAllProyects(params, url);
};


const getProyect = (id) => {
  return proyectModel.getProyect(id);
};


const createProyect = (newProduct) => {
  const today = new Date().toISOString();

  //Creo el nuevo objeto, estableciendo fecha de creación y de modificación
  newProduct = {
    ...newProduct,
    createdAt: today
  };

  return proyectModel.createProyect(newProduct);
};

const deleteProyect = (id) => {

  //Compruebo si el proyecto existe
  const exist = getProyect(id);

  if(!exist)
    return false

  else{
    //borro las tareas que pertenezcan al proyecto
    const allTask = dataTask.tareas;
    const deletedTask = []
    Object.entries(allTask).map(task => {
      if(task[1].id_proyecto==id){
        deletedTask.push(taskService.deleteTask(task[0]))
      }
    })


    //elimino el proyecto
    const proyect = proyectModel.deleteProyect(id);

    return {deletedProyect: proyect, deletedTask: deletedTask, mensaje:"Proyecto borrado"}
  }

};

const updateProyect = (id, newDataProyect) => {
  let today = new Date().toISOString();
  let oldproyect = Object.values(proyectModel.getProyect(id))[0];

  //Actualizo el proyecto existente con los nuevos datos
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