const allowed = [
  'http://localhost:3000',
  'https://localhost:3000',
  'http://localhost:3001',
  'https://localhost:3001',
  'localhost:3000',
  'http://dnknghmovies.nomoredomains.co',
  'https://dnknghmovies.nomoredomains.co',
  'http://api.dnknghmovies.nomoredomains.co',
  'https://api.dnknghmovies.nomoredomains.co',
  'http://dnknghmovies.nomoredomainsicu.ru',
  'https://dnknghmovies.nomoredomainsicu.ru',
];

const requestHandlerCORS = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowed.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};

module.exports = requestHandlerCORS;
