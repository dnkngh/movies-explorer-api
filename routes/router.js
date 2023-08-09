const router = require('express').Router();

const usersRouter = require('./users');
const moviesRouter = require('./movies');

const NotFound = require('../errors/NotFound');

const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { loginValidator, createUserValidator } = require('../middlewares/validation');

router.use('/signin', loginValidator, login);
router.use('/signup', createUserValidator, createUser);

router.use('/users', auth, usersRouter);
router.use('/cards', auth, moviesRouter);
router.use('/*', (req, res, next) => {
  next(new NotFound('Не найдено'));
});

module.exports = router;
