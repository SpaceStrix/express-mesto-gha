const { celebrate, Joi } = require('celebrate');

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateDataUser); //* Редактирование информации пользователя
