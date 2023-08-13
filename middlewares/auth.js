require('dotenv').config();
const jwt = require('jsonwebtoken');

const Unauthrized = require('./errors/Unauthorized');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Unauthrized('Пройдите авторизацию');
  }

  let payload
  const token = authorization.replace('Bearer ', '');

  try {
    payload = jwt.verify(
      token,
      process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : '5sd0fhd5sqsa62ghs',
    );
  } catch(err) {
    return next(new Unauthrized('Пройдите авторизацию'));
  }

  req.user = payload;
  return next();
};
