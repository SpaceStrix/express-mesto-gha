const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/users');

const {
  OK,
  BAD_REQUES,
  UNAUTHORIZED,
  NOT_FOUND,
  INTERNAL_SERVER,
} = require('../utils/constants');

// * Получаем всех пользователей
module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(INTERNAL_SERVER).send({ message: '500 — Ошибка по умолчанию.' }));
};
// * Получаем пользователя по ID
module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: '404 — Пользователь по указанному _id не найден.' });
      }
      res.status(OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUES).send({ message: '400 — Переданы некорректные данные' });
      }
      return res.status(INTERNAL_SERVER).send({ message: '500 — Ошибка по умолчанию.' });
    });
};

// * Получаем информацию о пользователе
module.exports.getUserInfo = (req, res) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(() => res.status(INTERNAL_SERVER).send({ message: '500 — Ошибка по умолчанию.' }));
};

// * Создаем пользователя
module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      });
    })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUES).send({ message: '400 — Переданы некорректные данные при создании пользователя.' });
      }
      if (err.code === 11000) {
        return res.status(409).send({ message: '409 — Такой пользователь уже существует' });
      }
      return res.status(INTERNAL_SERVER).send({ message: '500 — Ошибка по умолчанию.' });
    });
};

// * Обновление профиля
module.exports.updateDataUser = (req, res) => {
  const opts = { new: true, runValidators: true };
  const { name, about } = req.body;
  User.findOneAndUpdate(req.user._id, { name, about }, opts)
    .then((newInfo) => {
      if (!newInfo) {
        res.status(NOT_FOUND).send({ message: '404 — Пользователь c указанном _id не найден.' });
        return;
      }
      res.status(OK).send(newInfo);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUES).send({ message: '400 — Переданы некорректные данные при обновлении профиля.' });
      }
      return res.status(INTERNAL_SERVER).send({ message: '500 — Ошибка по умолчанию.' });
    });
};

// * Обновление аватара
module.exports.updateAvatarUser = (req, res) => {
  const opts = { new: true, runValidators: true };
  const { avatar } = req.body;
  User.findOneAndUpdate(req.user._id, { avatar }, opts)
    .then((newInfo) => {
      if (!newInfo) {
        res.status(NOT_FOUND).send({ message: '404 — Пользователь c указанном _id не найден.' });
        return;
      }
      res.status(OK).send(newInfo);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUES).send({ message: '400 — Переданы некорректные данные при обновлении аватара.' });
      }
      return res.status(INTERNAL_SERVER).send({ message: '500 — Ошибка по умолчанию.' });
    });
};

// * Авторизация
module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => res.send({ token: jwt.sign({ _id: user._id }, 'fluffy-law', { expiresIn: '7d' }) }))
    .catch((err) => {
      res.status(UNAUTHORIZED).send({ message: err.message });
    });
};
