const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/users');
const { OK, CREATED } = require('../utils/constants');
const NotFoundError = require('../errors/not-found-err');
const BadRequest = require('../errors/bad-request-err');
const Conflict = require('../errors/conflict-err');
const Forbidden = require('../errors/unauthorized-js');

// * Получаем всех пользователей
module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => next(err));
};
// * Получаем пользователя по ID
module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) throw new NotFoundError('Пользователь с указанным id не найден');
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Плохой запрос'));
      } else {
        next(err);
      }
    });
};

// * Получаем информацию о пользователе
module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

// * Создаем пользователя
module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then(() => {
      res.status(CREATED).send({
        name,
        about,
        avatar,
        email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict('Email уже используется'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequest('Плохой запрос'));
      } else {
        next(err);
      }
    });
};

// * Обновление профиля
module.exports.updateDataUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findOneAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((newInfo) => {
      if (!newInfo) { throw new NotFoundError('Пользователь с указанным id не найден'); }
      res.status(OK).send(newInfo);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Плохой запрос'));
      } else {
        next(err);
      }
    });
};

// * Обновление аватара
module.exports.updateAvatarUser = (req, res, next) => {
  const { avatar } = req.body;
  User.findOneAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((newInfo) => {
      if (!newInfo) { throw new NotFoundError('Пользователь с указанным id не найден'); }
      res.status(OK).send(newInfo);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Плохой запрос'));
      } else {
        next(err);
      }
    });
};

// * Авторизация
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => res.send({ token: jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'fluffy-law', { expiresIn: '7d' }) }))
    .catch(() => next(new Forbidden('Доступ запрещен')));
};
