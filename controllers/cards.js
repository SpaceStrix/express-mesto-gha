const Cards = require('../models/cards');

// Получаем все карточки GET
module.exports.getAllCards = (req, res) => {
  Cards.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// Удаление карточки
module.exports.deleteCard = (req, res) => {
  Cards.findById(req.params.id)
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// Создание новой карточки POST
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Cards.create({ name, link })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
