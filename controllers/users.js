const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/users');

const NotFoundError = require('../errors/not-found-err');
const BadRequest = require('../errors/bad-request-err');
const Conflict = require('../errors/conflict-err');
const OK = require('../errors/ok-err');
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
      if (!user) throw new NotFoundError();
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') next(new BadRequest());
      next(err);
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
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      });
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === '11000') next(new Conflict());
      if (err.name === 'ValidationError') next(new BadRequest());
      next(err);
    });
};

// * Обновление профиля
module.exports.updateDataUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findOneAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((newInfo) => {
      if (!newInfo) { throw new NotFoundError(); }
      res.status(OK).send(newInfo);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') next(new BadRequest());
      next(err);
    });
};

// * Обновление аватара
module.exports.updateAvatarUser = (req, res, next) => {
  const opts = { new: true, runValidators: true };
  const { avatar } = req.body;
  User.findOneAndUpdate(req.user._id, { avatar }, opts)
    .then((newInfo) => {
      if (!newInfo) { throw new NotFoundError(); }

      throw new OK();
    })
    .catch((err) => {
      if (err.name === 'ValidationError') next(new BadRequest());
      next(err);
    });
};

// * Авторизация
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => res.status(200).send({ token: jwt.sign({ _id: user._id }, 'fluffy-law', { expiresIn: '7d' }) }))
    .catch((err) => {
      next(new Forbidden());
      next(err);
    });
};
