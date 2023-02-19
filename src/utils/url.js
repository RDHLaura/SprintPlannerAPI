//devuelve la base de la url donde está desplegada la api
const getBaseUrl = (req) => {
  return "full url ==> ", 'https://' + req.get('host');
}

//devuelve la url completa de la api que se ha usado para la petición
const getFullUrl = (req) => {
  return 'https://' + req.get('host') + req.originalUrl.split("?").shift();
}


module.exports = {
  getBaseUrl,
  getFullUrl,
}