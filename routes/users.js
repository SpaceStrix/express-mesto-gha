const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getAllUsers,
  getUser,
  getUserInfo,
  updateDataUser,
  updateAvatarUser,
} = require('../controllers/users');

router.get('/', getAllUsers); // * Роут ко всем пользователям
router.get('/me', getUserInfo); // * Роут получения информации о пользователе
router.get('/:userId', getUser); // * Роут id пользователя

//* Редактирование информации пользователя
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateDataUser);

//* Редактирование аватарки пользователя
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string(),
  }),
}), updateAvatarUser);

module.exports = router;
