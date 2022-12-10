const Users = require('../models/users');
const { BEDREQUEST, NOTFOUND, ENTERNALSERVER } = require('../ResStatus');
// * Получаем всех пользователей
module.exports.getAllUsers = (req, res) => {
  Users.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: ENTERNALSERVER }));
};
// * Получаем пользователя
module.exports.getUser = (req, res) => {
  Users.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: NOTFOUND });
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: BEDREQUEST });
      }
      return res.status(500).send({ message: ENTERNALSERVER });
    });
};

// * Создаем пользователя
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  Users.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: ENTERNALSERVER }));
};

// * Обновление профиля
module.exports.updateDataUser = (req, res) => {
  const id = req.user._id;

  const { name, about } = req.body;
  Users.findOneAndUpdate(id, { name, about }, { new: true })
    .then((newInfo) => res.send(newInfo))
    .catch(() => res.status(500).send({ message: ENTERNALSERVER }));
};

// * Обновление аватара
module.exports.updateAvatarUser = (req, res) => {
  const id = req.user._id;

  const { avatar } = req.body;
  Users.findOneAndUpdate(id, { avatar }, { new: true })
    .then((newInfo) => res.send(newInfo))
    .catch(() => res.status(500).send({ message: ENTERNALSERVER }));
};
