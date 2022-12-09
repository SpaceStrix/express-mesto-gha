const Cards = require('../models/cards');

// * Получаем все карточки GET
module.exports.getAllCards = (req, res) => {
  Cards.find({})
    .populate('owner')
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// * Удаление карточки
module.exports.deleteCard = (req, res) => {
  Cards.findOneAndRemove(req.params.id)
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// * Создание новой карточки POST
module.exports.createCard = (req, res) => {
  // const idUser = req.user._id;
  const { name, link } = req.body;
  Cards.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: err.message }));
};
