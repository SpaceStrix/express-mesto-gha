const User = require('../models/users');
// * Получаем всех пользователей
module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: '500 — Ошибка по умолчанию.' }));
};
// * Получаем пользователя
module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: '404 — Пользователь по указанному _id не найден.' });
        return;
      }
      res.status(200).send(user);
    })
    .catch(() => res.status(500).send({ message: '500 — Ошибка по умолчанию.' }));
};

// * Создаем пользователя
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: '400 — Переданы некорректные данные при создании пользователя.' });
      }
      return res.status(500).send({ message: '500 — Ошибка по умолчанию.' });
    });
};

// * Обновление профиля
module.exports.updateDataUser = (req, res) => {
  const opts = { new: true, runValidators: true };
  const { name, about } = req.body;
  User.findOneAndUpdate(req.user._id, { name, about }, opts)
    .then((newInfo) => {
      if (!newInfo) {
        res.status(404).send({ message: '404 — Пользователь c указанном _id не найден.' });
        return;
      }
      res.status(200).send(newInfo);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: '400 — Переданы некорректные данные при обновлении профиля.' });
      }
      return res.status(500).send({ message: '500 — Ошибка по умолчанию.' });
    });
};

// * Обновление аватара
module.exports.updateAvatarUser = (req, res) => {
  const opts = { new: true };
  const { avatar } = req.body;
  User.findOneAndUpdate(req.user._id, { avatar }, opts)
    .then((newInfo) => {
      if (!newInfo) {
        res.status(404).send({ message: '404 — Пользователь c указанном _id не найден.' });
        return;
      }
      res.status(200).send(newInfo);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: '400 — Переданы некорректные данные при обновлении аватара.' });
      }
      return res.status(500).send({ message: '500 — Ошибка по умолчанию.' });
    });
};
// err.message.split(':').at(-1)
