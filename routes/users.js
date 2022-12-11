const express = require('express');
const router = require('express').Router();
const {
  getAllUsers, getUser, createUser, updateDataUser, updateAvatarUser,
} = require('../controllers/users');

router.get('/', getAllUsers); // * Роут ко всем пользователям
router.get('/:userId', getUser); // * Роут id пользователя
router.post('/', express.json(), createUser); // * Роут создания пользователя

router.patch('/me', express.json(), updateDataUser); //* Редактирование информации пользователя
router.patch('/me/avatar', express.json(), updateAvatarUser); //* Редактирование аватарки пользователя

module.exports = router;
