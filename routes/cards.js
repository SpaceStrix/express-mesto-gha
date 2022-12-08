const express = require('express');
const router = require('express').Router();

const { getAllCards, createCard, deleteCard } = require('../controllers/cards');

router.get('/', getAllCards);
router.post('/', express.json(), createCard);
router.delete('/:cardId', deleteCard);

module.exports = router;
