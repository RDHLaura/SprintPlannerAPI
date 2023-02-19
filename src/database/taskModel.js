let data = require("./tareas.json");
const fs = require("fs");
const {paginatedContent, filterContent, dataPaginate, checkfilterTasksByProyect} = require("../utils/filters")


const getAllTasks = (params, url) => {
  const filteredContent = filterContent(params.proyecto, data.tareas, checkfilterTasksByProyect)
  return {
    pagination: dataPaginate(params, url, filteredContent),
    content: paginatedContent(params, filteredContent)
  }

}

const getTask = (id) => {
  if(data.tareas[id] === undefined)
    return false

  return data.tareas[id];
}

const deleteTask = (id) => {

  const task = getTask(id);

  //borro la tarea
  delete data.tareas[id];

  //escribo los datos actualizados en el json
  fs.writeFileSync(
    "./src/database/tareas.json",
    JSON.stringify(data, null, 2),
    "utf8"
  );

  return task;
};

const createTask = ( newTask) => {

  const last = Number(Object.keys(data.tareas)[Object.keys(data.tareas).length-1]);
  const id = last + 1;
  newTask.id = id

  //se almacena en la bd
  data.tareas[id] = newTask;

  //Escribe el proyecto nuevo en el json
  fs.writeFileSync(
    "./src/database/tareas.json",
    JSON.stringify(data, null, 2),
    "utf8"
  );

  return newTask;
}

const updateTask = (id, newDataTask) => {

  //Compruebo que el proyecto exista
  const task = getTask(id)

  if(!task)
    return false;
  else{
    data.tareas[id] = newDataTask;
    //Escribe el producto nuevo en el json
    fs.writeFileSync(
      "./src/database/tareas.json",
      JSON.stringify(data, null, 2),
      "utf8"
    );
    return getTask(id);
  }
}



module.exports = {
  getAllTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask

}