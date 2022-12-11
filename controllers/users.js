const User = require('../models/users');
const {
  OK,
  BAD_REQUES,
  NOT_FOUND,
  INTERNAL_SERVER,
} = require('../constants');

// * Получаем всех пользователей
module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(INTERNAL_SERVER).send({ message: '500 — Ошибка по умолчанию.' }));
};
// * Получаем пользователя
module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: '404 — Пользователь по указанному _id не найден.' });
        return;
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

// * Создаем пользователя
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUES).send({ message: '400 — Переданы некорректные данные при создании пользователя.' });
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
