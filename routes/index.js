const router = require('express').Router();
const usersRoutes = require('./users');
const cardsRoutes = require('./cards');

const { NOT_FOUND } = require('../constants');

router.use('/users', usersRoutes);
router.use('/cards', cardsRoutes);

router.use('*', (req, res) => res.status(NOT_FOUND)
  .send({ message: '404 - Страница не найдена ' }));

module.exports = router;
