require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const { celebrate, Joi, errors } = require('celebrate');
const { createUser, login } = require('./controllers/users');
const router = require('./routes');

const { PORT } = process.env;
const app = express();

mongoose.set('strictQuery', false); // убираем варнинг mongoose
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
    about: Joi.string().min(2).max(30).default('Исследователь'),
    avatar: Joi.string().default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png')
      // eslint-disable-next-line no-useless-escape
      .pattern(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/)
      .message('Некорректная ссылка'),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);
app.use(router);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`Приложении запущено на ${PORT} порту`);
});
