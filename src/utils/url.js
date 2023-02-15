
const getBaseUrl = (req) => {
  return "full url ==> ",req.protocol + '://' + req.get('host');
}

const getFullUrl = (req) => {
  return req.protocol + '://' + req.get('host') + req.originalUrl.split("?").shift();
}


module.exports = {
  getBaseUrl,
  getFullUrl,
}