const Card = require('../models/cards');
const {
  OK,
  BAD_REQUES,
  NOT_FOUND,
  INTERNAL_SERVER,
} = require('../utils/constants');

// * Получаем все карточки
module.exports.getAllCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((card) => res.send(card))
    .catch(() => res.status(INTERNAL_SERVER).send({ message: '500 — Ошибка по умолчанию.' }));
};

// * Удаление карточки
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: '404 — Карточка по указанному _id не найдена.' });
        return;
      }
      res.status(OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUES).send({ message: '400 — Переданы некорректные данные' });
      }
      return res.status(INTERNAL_SERVER).send({ message: '500 — Ошибка по умолчанию.' });
    });
};

// * Создание новой карточки
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUES).send({ message: '400 — Переданы некорректные данные при создании карточки.' });
      }
      return res.status(INTERNAL_SERVER).send({ message: '500 — Ошибка по умолчанию.' });
    });
};

// * Поставить лайк карточке
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: '404 — Передан несуществующий _id карточки' });
        return;
      }
      res.status(OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUES).send({ message: '400 — Переданы некорректные данные для постановки/снятии лайка.' });
      }
      return res.status(INTERNAL_SERVER).send({ message: '500 — Ошибка по умолчанию.' });
    });
};

// * Убрать лайк с карточки
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: '404 — Передан несуществующий _id карточки' });
        return;
      }
      res.status(OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUES).send({ message: '400 — Переданы некорректные данные для постановки/снятии лайка.' });
      }
      return res.status(INTERNAL_SERVER).send({ message: '500 — Ошибка по умолчанию.' });
    });
};
