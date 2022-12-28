const router = require('express').Router();
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');

const usersRoutes = require('./users');
const cardsRoutes = require('./cards');

router.use('/users', auth, usersRoutes);
router.use('/cards', auth, cardsRoutes);

router.use('*', (req, res, next) => { next(new NotFoundError('Указанный путь не найден')); });

module.exports = router;
