const movieRoutes = require('express').Router();

const {
  getMovies,
  deleteMovie,
  createMovie,
} = require('../controllers/movies');
const { createMovieValidator, getMovieByIdValidator } = require('../middlewares/validation');

movieRoutes.get('/', getMovies);
movieRoutes.post('/', createMovieValidator, createMovie);
movieRoutes.delete('/:movieId', getMovieByIdValidator, deleteMovie);

module.exports = movieRoutes;
