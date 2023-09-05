const status = require('http2').constants;
const movieSchema = require('../models/movie');

const NotFound = require('../middlewares/errors/NotFound');
const BadRequest = require('../middlewares/errors/BadRequest');
const InternalServerError = require('../middlewares/errors/InternalServerError');
const Forbidden = require('../middlewares/errors/Forbidden');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;

  movieSchema.find({ owner })
    .then((movies) => res.status(status.HTTP_STATUS_OK).send(movies))
    .catch((next));
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
  } = req.body;
  const owner = req.user._id;

  movieSchema
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      nameRU,
      nameEN,
      movieId,
    })
    .then((movie) => res.status(status.HTTP_STATUS_CREATED).send(movie))

};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  movieSchema
    .findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFound('Not found');
      }

      if (!movie.owner.equals(req.user._id)) {
        return next(new Forbidden('Forbidden'));
      }

      return movie.deleteOne();
    })
    .then((movie) => res.send(movie))
    .catch(next);
};
