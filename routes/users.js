const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;

const {
  getAllUsers,
  getUser,
  getUserInfo,
  updateDataUser,
  updateAvatarUser,
} = require('../controllers/users');

router.get('/', getAllUsers); // * Роут ко всем пользователям
router.get('/me', getUserInfo); // * Роут получения информации о пользователе
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum()
      .custom((value, helpers) => {
        if (ObjectId.isValid(value)) return value;
        return helpers.message('Невалидный id');
      }),
  }),
}), getUser); // * Роут id пользователя

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
    avatar: Joi.string()
      // eslint-disable-next-line no-useless-escape
      .pattern(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/)
      .message('Некорректная ссылка'),
  }),
}), updateAvatarUser);

module.exports = router;
