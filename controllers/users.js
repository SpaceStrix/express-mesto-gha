const User = require('../models/users');
const { BAD_REQUEST, NOT_FOUND, ENTERNAL_SERVER } = require('../ResStatus');
// * Получаем всех пользователей
module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: ENTERNAL_SERVER }));
};
// * Получаем пользователя
module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: NOT_FOUND });
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: BAD_REQUEST });
      }
      return res.status(500).send({ message: ENTERNAL_SERVER });
    });
};

// * Создаем пользователя
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: ENTERNAL_SERVER });
      }
      return res.status(500).send({ message: ENTERNAL_SERVER });
    });
};

// * Обновление профиля
module.exports.updateDataUser = (req, res) => {
  const { name, about } = req.body;
  User.findOneAndUpdate(req.user._id, { name, about }, { new: true })
    .then((newInfo) => res.send(newInfo))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: BAD_REQUEST });
      }
      return res.status(500).send({ message: ENTERNAL_SERVER });
    });
};

// * Обновление аватара
module.exports.updateAvatarUser = (req, res) => {
  const { avatar } = req.body;
  User.findOneAndUpdate(req.user._id, { avatar }, { new: true })
    .then((newInfo) => res.send(newInfo))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: BAD_REQUEST });
      }
      return res.status(500).send({ message: ENTERNAL_SERVER });
    });
};
// err.message.split(':').at(-1)
