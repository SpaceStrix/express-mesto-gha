const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { signinValidation, signupValidation } = require('./middlewares/validatons');
const router = require('./routes');
const { createUser, login } = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.set('strictQuery', false); // убираем варнинг mongoose
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());
app.post('/signin', signinValidation, login);
app.post('/signup', signupValidation, createUser);
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
  console.log(`App listening on port ${PORT}`);
});
