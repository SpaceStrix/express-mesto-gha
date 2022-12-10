const Cards = require('../models/cards');

// * Получаем все карточки GET
module.exports.getAllCards = (req, res) => {
  Cards.find({})
    .populate(['owner', 'likes'])
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
  const id = req.user._id;
  const { name, link } = req.body;
  Cards.create({ name, link, owner: id })
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// * Поставить лайк карточке
module.exports.likeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: err.message }));
};
// * Убрать лайк с карточки
module.exports.dislikeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: err.message }));
};
