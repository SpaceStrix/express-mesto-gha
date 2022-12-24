const routes = require('express').Router();

const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

routes.get('/', getAllCards); //* Роут ко всем карточкам
routes.post('/', createCard); //* Роут создания карточки
routes.delete('/:cardId', deleteCard); //* Роут удаления карточки

routes.put('/:cardId/likes', likeCard); //* Роут для утановки лайка
routes.delete('/:cardId/likes', dislikeCard); //* Роут для удаления лайка

module.exports = routes;
