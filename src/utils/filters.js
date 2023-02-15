/**
 * @name paginatedContent
 * @description selecciona 10 los proyectos correspondientes a la pág pasada por parámetro
 * @param page Pagina solicitada en parametro de url
 * @returns {{}} devuelve un objeto que contiene los id de los proyectos como claves y el objeto proyecto como valor.
 */
const paginatedContent = (filters, data) => {
  const page = filters.page || 1
  const perPage = 10;
  const start = (page-1)*perPage;
  const end = (page) * perPage -1;

  const content = {}

  //selecciona los elementos correspondientes a la pag y formatea la salida
  Object.entries(data).slice(start, end).map((element)=>{
    content[element[0]] = element[1]
  })

  return content;
}


/**
 * @name dataPaginate
 * @description crea la información de la paginación
 * @param _page Pagina solicitada en parametro de url
 * @param url url completa donde se hace la petición, para usarla en los datos de la paginación
 * @param data JSON que se quiere paginar
 * @returns {{next: null, actual: string, previous: null, totalPages: number}} objeto que contiene toda la información de la paginación
 */
const dataPaginate = (_page, url, data) => {

  const maxPages = Math.ceil(Object.entries(data).length - 1 / 10);
  const page = _page || 1

  let dataPaginate={
    totalPages : maxPages,
    actualPage: page,
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
 * @name filterContent
 * @description filtra los datos de acuerdo a los filtros que se le pasan por parámetro
 * @param id id del filtro, puede ser del usuario o del proyecto, este se pasa como parametro en la url al hacer la petición
 * @param data datos a filtrar
 * @param checkfilter función que comprueba que el id cumple cierta condición, según sea el id del proyecto o del usuario
 * @returns {{}|*}
 */
const filterContent = (id, data, checkfilter) => {
  let filteredContent = {}
  if(id === undefined)
    return data

  Object.entries(data).map((element)=>{
    if(checkfilter(id, element))
      filteredContent[element[0]] = element[1]
  })

  return filteredContent
}


/**
 * @name checkfilterProyectByUser
 * @description recibe el id del usuario del que se quiere sacar los proyectos y comprueba que el proyecto que recibe por parametro pertenezca a este usuario
 * @param id id del usuario
 * @param proyect objeto JSon que contiene la información del proyecto
 * @returns {boolean}
 */
const checkfilterProyectsByUser = (id, proyect) => {
  return (proyect[1].creador == id || proyect[1].miembros.includes(parseInt(id)))
}


/**
 * @name checkfilterTasksByProyect
 * @description recibe el id del proyecto del que se quiere sacar las tareas y comprueba que la tarea que recibe por parametro pertenezca a este proyecto
 * @param idProyect id del proyecto
 * @param task tarea que se quiere comprobar
 * @returns {boolean}
 */
const checkfilterTasksByProyect = (idProyect, task) => {
  return (task[1].id_proyecto == idProyect )
}


module.exports = {
  paginatedContent,
  dataPaginate,
  filterContent,
  checkfilterProyectsByUser,
  checkfilterTasksByProyect
}