const express = require('express');

const cardsRoutes = express.Router();
const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRoutes.get('/', getAllCards); //* Роут ко всем карточкам
cardsRoutes.post('/', createCard); //* Роут создания карточки
cardsRoutes.delete('/:cardId', deleteCard); //* Роут удаления карточки

cardsRoutes.put('/:cardId/likes', likeCard); //* Роут для утановки лайка
cardsRoutes.delete('/:cardId/likes', dislikeCard); //* Роут для удаления лайка

module.exports = cardsRoutes;
