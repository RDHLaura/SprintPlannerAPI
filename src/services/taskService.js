const taskModel = require("../database/taskModel");

const getAllTask = (params, url) => {
  return taskModel.getAllTasks(params, url);
};

const getTask = (id) => {
  return taskModel.getTask(id);
};

const createTask = (newTask) => {
  const today = new Date().toDateString();

  //Creo el nuevo objeto, estableciendo fecha de creación y de modificación
  newTask = {
    ...newTask,
    createdAt: today
  };

  return taskModel.createTask(newTask);
};

const deleteTask = (id) => {
  //Compruebo si la tarea existe
  const exist = getTask(id);
  if(!exist)//Si esa tarea no existe en la base de datos, devuelvo false
    return false;
  else
    return taskModel.deleteTask(id);
};

const updateTask = (id, newDataTask) => {
  let today = new Date().toISOString();
  let oldtask = taskModel.getTask(id);

  //"Construyo" el nuevo objeto, estableciendo un id
  let newTask = {
    ...oldtask,
    ...newDataTask,
    updatedAt: today,
  };

  //actualiza el proyecto
  return taskModel.updateTask(id, newTask);
};

module.exports = {
  getAllTask,
  getTask,
  createTask,
  deleteTask,
  updateTask
};