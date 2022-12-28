const Card = require('../models/cards');

const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const BadRequest = require('../errors/bad-request-err');

// * Получаем все карточки
module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((card) => res.send(card))
    .catch((err) => next(err));
};

// * Удаление карточки
module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) throw new NotFoundError('Карточка с указанным id не найдена');
      if (!card.owner._id.equals(req.user._id)) { throw new ForbiddenError('У вас нет прав'); }

      return Card.findByIdAndRemove(req.params.cardId)
        .then(() => {
          res.status(200).send(card);
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Плохой запрос'));
      } else {
        next(err);
      }
    });
};

// * Создание новой карточки
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Плохой запрос'));
      } else {
        next(err);
      }
    });
};

// * Поставить лайк карточке
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) throw new NotFoundError('Карточка с указанным id не найдена');
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Плохой запрос'));
      } else {
        next(err);
      }
    });
};

// * Убрать лайк с карточки
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) throw new NotFoundError('Карточка с указанным id не найдена');
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Плохой запрос'));
      } else {
        next(err);
      }
    });
};
