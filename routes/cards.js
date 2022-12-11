const express = require('express');
const router = require('express').Router();

const {
  getAllCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getAllCards); //* Роут ко всем карточкам
router.post('/', express.json(), createCard); //* Роут создания карточки
router.delete('/:cardId', deleteCard); //* Роут удаления карточки

router.put('/:cardId/likes', likeCard); //* Роут для утановки лайка
router.delete('/:cardId/likes', express.json(), dislikeCard); //* Роут для удаления лайка

module.exports = router;
