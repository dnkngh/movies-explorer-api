const userSchema = require('../models/user');
const status = require('http2').constants;

const NotFoundError = require('../errors/NotFound');
const BadRequestError = require('../errors/BadRequest');


module.exports.getUser = (req, res, next) => {
  userSchema.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Не найдено');
      }
      res.status(status.HTTP_STATUS_OK).send(user);
    })
    .catch(next);
};

