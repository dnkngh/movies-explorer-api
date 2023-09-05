const router = require('express').Router();

const usersRouter = require('./users');
const moviesRouter = require('./movies');

const NotFound = require('../middlewares/errors/NotFound');

const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { loginValidator, createUserValidator } = require('../middlewares/validation');

router.use('/signin', loginValidator, login);
router.use('/signup', createUserValidator, createUser);

router.use('/users', usersRouter);
router.use('/movies', auth, moviesRouter);
router.use('/*', (req, res, next) => {
  next(new NotFound('Не найдено'));
});

module.exports = router;
