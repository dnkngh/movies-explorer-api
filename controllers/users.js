const status = require('http2').constants;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = require('../models/user');

const NotFound = require('../middlewares/errors/NotFound');
const BadRequest = require('../middlewares/errors/BadRequest');
const AlreadyTaken = require('../middlewares/errors/AlreadyTaken');

module.exports.getUser = (req, res, next) => {
  userSchema.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFound('Не найдено');
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
        throw new NotFound('Не найдено');
      }
      res.status(status.HTTP_STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Bad Request'));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      userSchema
        .create({
          name, email, password: hash,
        })
        .then(() => res.status(status.HTTP_STATUS_CREATED)
          .send({
            data: {
              name, email,
            },
          }))
        .catch((err) => {
          if (err.code === 11000) {
            return next(new AlreadyTaken('This email has already been registrred'));
          }

          if (err.name === 'ValidationError') {
            return next(new BadRequest('Bad request'));
          }

          return next(err);
        });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return userSchema.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};
