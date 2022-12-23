const express = require('express');
const auth = require('../middlewares/auth');

const usersRoutes = express.Router();

const {
  getAllUsers,
  getUser,
  getUserInfo,
  createUser,
  updateDataUser,
  updateAvatarUser,
  login,
} = require('../controllers/users');

usersRoutes.get('/', auth, getAllUsers); // * Роут ко всем пользователям
usersRoutes.get('/:userId', getUser); // * Роут id пользователя
usersRoutes.get('/me', getUserInfo); // * Роут получения информации о пользователе

usersRoutes.patch('/me', updateDataUser); //* Редактирование информации пользователя
usersRoutes.patch('/me/avatar', updateAvatarUser); //* Редактирование аватарки пользователя

usersRoutes.post('/signin', login); //* Авторизация
usersRoutes.post('/signup', createUser); //* Регистрация

module.exports = usersRoutes;
