const express = require('express');
const router = require('express').Router();
const { getAllUsers, getUser, createUser } = require('../controllers/users');

router.get('/', getAllUsers); // Роут ко всем пользователям
router.get('/:userId', getUser); // Роут ко всем пользователям
router.post('/', express.json(), createUser); // Роут создания пользователя

module.exports = router;
