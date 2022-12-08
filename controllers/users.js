const Users = require('../models/users');

// Получаем всех пользователей
module.exports.getAllUsers = (req, res) => {
  Users.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getUser = (req, res) => {
  Users.findById(req.params.userId) // com findOne работает
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// Создаем пользователя
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  Users.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: err.message }));
};
