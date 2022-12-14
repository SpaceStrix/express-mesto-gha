const router = require('express').Router();
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');

const usersRoutes = require('./users');
const cardsRoutes = require('./cards');

router.use(auth);
router.use('/users', usersRoutes);
router.use('/cards', cardsRoutes);

router.use('*', (req, res, next) => { next(new NotFoundError('Указанный путь не найден')); });

module.exports = router;
