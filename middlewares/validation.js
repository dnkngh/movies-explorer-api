const { Joi, celebrate } = require('celebrate');
const isUrl = require('validator/lib/isURL');

const BadRequest = require('./errors/BadRequest');

const urlValidator = (url) => {
  if (isUrl(url)) {
    return url;
  }
  throw new BadRequest('Bad request');
}

module.exports.loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.createUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.updateUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.getMovieByIdValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
});

module.exports.createMovieValidator = celebrate({
  body: Joi.object().keys({
    movieId: Joi.number().required().integer(),
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().custom(urlValidator).required(),
    trailerLink: Joi.string().custom(urlValidator).required(),
    thumbnail: Joi.string().custom(urlValidator).required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

