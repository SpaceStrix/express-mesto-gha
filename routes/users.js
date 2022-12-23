const express = require('express');

const usersRoutes = express.Router();

const {
  getAllUsers,
  getUser,
  createUser,
  updateDataUser,
  updateAvatarUser,
  login,
} = require('../controllers/users');

usersRoutes.get('/', getAllUsers); // * Роут ко всем пользователям
usersRoutes.get('/:userId', getUser); // * Роут id пользователя
// usersRoutes.post('/', createUser); // * Роут создания пользователя

usersRoutes.patch('/me', updateDataUser); //* Редактирование информации пользователя
usersRoutes.patch('/me/avatar', updateAvatarUser); //* Редактирование аватарки пользователя

usersRoutes.post('/signin', login); //* Авторизация
usersRoutes.post('/signup', createUser); //* Регистрация

module.exports = usersRoutes;
