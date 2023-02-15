const getBaseUrl = (req) => {
  return "full url ==> ",req.protocol + '://' + req.get('host');
}

const getFullUrl = (req) => {
  return "full url ==> ",req.protocol + '://' + req.get('host') + req.originalUrl;
}

module.exports = {
  getBaseUrl, getFullUrl
}