const Users = require('../models/users');

// * Получаем всех пользователей
module.exports.getAllUsers = (req, res) => {
  Users.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: err.message }));
};
// * Получаем пользователя
module.exports.getUser = (req, res) => {
  const id = req.user._id;

  Users.findById(id)
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// * Создаем пользователя
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  Users.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// * Обновление профиля
module.exports.updateDataUser = (req, res) => {
  const id = req.user._id;

  const { name, about } = req.body;
  Users.findOneAndUpdate(id, { name, about }, { new: true })
    .then((newInfo) => res.send(newInfo))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// * Обновление аватара
module.exports.updateAvatarUser = (req, res) => {
  const id = req.user._id;

  const { avatar } = req.body;
  Users.findOneAndUpdate(id, { avatar }, { new: true })
    .then((newInfo) => res.send(newInfo))
    .catch((err) => res.status(500).send({ message: err.message }));
};
