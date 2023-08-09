const userRoutes = require('express').Router();

const { getUser, updateUser } = require('../controllers/users');
const { updateUserValidator } = require('../middlewares/validation');


userRoutes.get('/me', getUser);
userRoutes.patch('/me', updateUserValidator, updateUser);

module.exports = userRoutes;
