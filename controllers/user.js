const userSchema = require('../models/user');
const status = require('http2').constants;

const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');


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

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  userSchema.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Не найдено');
      }
      res.status(status.HTTP_STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Bad Request'));
      } else {
        next(err);
      }
    });
};